import { oklchToSrgbBytes } from "../oklch-to-srgb/oklch-to-srgb.module.code.ts"

export type Rgb = readonly [number, number, number]

export interface Oklch {
  l: number
  c: number
  h: number
}

export interface TokenSpec {
  readonly cssVar: string
  readonly tokenName: string
  readonly rgb: Rgb
  readonly sourceRel: string
}

export interface ExportedColor {
  readonly tokenName: string
  readonly sourceRel: string
}

export type ColorToken =
  | { readonly kind: "mapped"; readonly spec: TokenSpec }
  | { readonly kind: "unmapped-export"; readonly exported: ExportedColor }
  | { readonly kind: "unmirrored-var"; readonly cssVar: string; readonly sourceRel: string }

export interface ParityViolation {
  message: string
  cssVar: string | null
  tokenName: string | null
  reason: "missing-css-var" | "mismatch" | "unmapped-export" | "unmirrored-var"
}

const OKLCH_VAR_RE = /--([\w-]+):\s*oklch\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\s*[/)]/g

export function parseOklchVars(cssText: string): Map<string, Oklch> {
  const out = new Map<string, Oklch>()
  for (const match of cssText.matchAll(OKLCH_VAR_RE)) {
    const name = match[1]
    if (name === undefined) continue
    out.set(name, { l: Number(match[2]), c: Number(match[3]), h: Number(match[4]) })
  }
  return out
}

export function colorTokenLabel(token: ColorToken): string {
  if (token.kind === "mapped") return token.spec.tokenName
  if (token.kind === "unmapped-export") return token.exported.tokenName
  return `--${token.cssVar}`
}

export function colorTokenSourceRel(token: ColorToken): string {
  if (token.kind === "mapped") return token.spec.sourceRel
  if (token.kind === "unmapped-export") return token.exported.sourceRel
  return token.sourceRel
}

export function colorTokenUnion(args: {
  readonly specs: readonly TokenSpec[]
  readonly exported: readonly ExportedColor[]
  readonly cssVars: readonly string[]
  readonly cssSourceRel: string
}): readonly ColorToken[] {
  const mappedNames = new Set(args.specs.map((spec) => spec.tokenName))
  const mappedVars = new Set(args.specs.map((spec) => spec.cssVar))
  const members: ColorToken[] = [
    ...args.specs.map((spec): ColorToken => ({ kind: "mapped", spec })),
    ...args.exported
      .filter((exported) => !mappedNames.has(exported.tokenName))
      .map((exported): ColorToken => ({ kind: "unmapped-export", exported })),
    ...args.cssVars
      .filter((cssVar) => !mappedVars.has(cssVar))
      .map(
        (cssVar): ColorToken => ({ kind: "unmirrored-var", cssVar, sourceRel: args.cssSourceRel })
      ),
  ]
  return members.sort((a, b) => colorTokenLabel(a).localeCompare(colorTokenLabel(b)))
}

function toBytes(rgb: Rgb): readonly [number, number, number] {
  return [Math.round(rgb[0] * 255), Math.round(rgb[1] * 255), Math.round(rgb[2] * 255)]
}

export function judgeColorToken(
  token: ColorToken,
  vars: ReadonlyMap<string, Oklch>,
  tolerance = 1
): readonly ParityViolation[] {
  if (token.kind === "unmapped-export") {
    const { tokenName, sourceRel } = token.exported
    return [
      {
        message: `${tokenName} is exported by @akasha/design-tokens (${sourceRel}) and no CSS custom property is mapped to it, so nothing compares it against tokens.css; map it in check-design-tokens.ts`,
        cssVar: null,
        tokenName,
        reason: "unmapped-export",
      },
    ]
  }

  if (token.kind === "unmirrored-var") {
    return [
      {
        message: `--${token.cssVar} is declared in tokens.css and no @akasha/design-tokens export mirrors it, so the ESO addons have no value for it; add the sRGB tuple to the tokens package and map it in check-design-tokens.ts`,
        cssVar: token.cssVar,
        tokenName: null,
        reason: "unmirrored-var",
      },
    ]
  }

  const { spec } = token
  const oklch = vars.get(spec.cssVar)
  if (oklch === undefined) {
    return [
      {
        message: `${spec.tokenName}: no --${spec.cssVar} oklch() declaration found in tokens.css`,
        cssVar: spec.cssVar,
        tokenName: spec.tokenName,
        reason: "missing-css-var",
      },
    ]
  }

  const expected = oklchToSrgbBytes(oklch.l, oklch.c, oklch.h)
  const actual = toBytes(spec.rgb)
  const within = expected.every((e, i) => Math.abs(e - (actual[i] ?? 0)) <= tolerance)
  if (within) return []
  return [
    {
      message: `${spec.tokenName} = rgb(${actual.join(", ")}) drifted from --${spec.cssVar} oklch(${oklch.l} ${oklch.c} ${oklch.h}) → rgb(${expected.join(", ")}); update the tuple in @akasha/design-tokens to match`,
      cssVar: spec.cssVar,
      tokenName: spec.tokenName,
      reason: "mismatch",
    },
  ]
}
