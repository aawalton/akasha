const SURFACE_LITERAL_RE = /(?:^|.*:)bg-surface-[1-4]$/

const BG_NON_COLOR_PREFIXES: readonly string[] = [
  "bg-clip-",
  "bg-origin-",
  "bg-blend-",
  "bg-position-",
  "bg-size-",
]

const BG_NON_COLOR_EXACT: ReadonlySet<string> = new Set([
  "bg-cover",
  "bg-contain",
  "bg-auto",
  "bg-fixed",
  "bg-local",
  "bg-scroll",
  "bg-no-repeat",
  "bg-repeat",
  "bg-repeat-x",
  "bg-repeat-y",
  "bg-repeat-round",
  "bg-repeat-space",
  "bg-none",
  "bg-current",
  "bg-inherit",
  "bg-transparent",
  "bg-top",
  "bg-bottom",
  "bg-left",
  "bg-right",
  "bg-center",
  "bg-left-top",
  "bg-left-bottom",
  "bg-right-top",
  "bg-right-bottom",
  "bg-linear",
  "bg-radial",
  "bg-conic",
  "bg-gradient",
])

const BORDER_NON_COLOR_PREFIXES: readonly string[] = ["border-spacing-"]

const BORDER_NON_COLOR_EXACT: ReadonlySet<string> = new Set([
  "border-collapse",
  "border-separate",
  "border-solid",
  "border-dashed",
  "border-dotted",
  "border-double",
  "border-hidden",
  "border-none",
  "border-transparent",
  "border-current",
  "border-inherit",
])

const INTERACTIVE_VARIANT_PREFIXES: readonly string[] = [
  "hover:",
  "focus:",
  "focus-visible:",
  "focus-within:",
  "active:",
  "disabled:",
  "data-[",
  "aria-",
  "group-hover:",
  "group-focus:",
  "group-focus-visible:",
  "group-active:",
  "peer-hover:",
  "peer-focus:",
  "peer-focus-visible:",
  "peer-active:",
]

const SURFACE_CALL_NAMES: ReadonlySet<string> = new Set(["surfaceClass"])

const SURFACE_PAINTING_COMPONENTS: ReadonlySet<string> = new Set(["SurfaceProvider"])

function stripModifiers(token: string): string {
  let t = token
  if (t.startsWith("!")) t = t.slice(1)
  if (t.startsWith("-")) t = t.slice(1)
  return t
}

export function splitVariantPrefixes(token: string): {
  prefixes: readonly string[]
  base: string
} {
  const segments = token.split(":")
  const base = segments[segments.length - 1] ?? ""
  const prefixes = segments.slice(0, -1)
  return { prefixes, base }
}

export function isDescendantTargetingPrefix(prefix: string): boolean {
  if (prefix === "**" || prefix === "*") return true
  if (prefix.startsWith("[&")) return true
  return false
}

export function hasDescendantTargetingVariant(prefixes: readonly string[]): boolean {
  for (const p of prefixes) if (isDescendantTargetingPrefix(p)) return true
  return false
}

function isLayoutOnlyBg(base: string): boolean {
  if (BG_NON_COLOR_EXACT.has(base)) return true
  for (const prefix of BG_NON_COLOR_PREFIXES) if (base.startsWith(prefix)) return true
  return false
}

function isLayoutOnlyBorder(base: string): boolean {
  if (BORDER_NON_COLOR_EXACT.has(base)) return true
  for (const prefix of BORDER_NON_COLOR_PREFIXES) if (base.startsWith(prefix)) return true
  return false
}

function isInteractiveVariantPrefixed(prefixes: readonly string[]): boolean {
  for (const p of prefixes) {
    const withColon = `${p}:`
    for (const interactive of INTERACTIVE_VARIANT_PREFIXES)
      if (withColon === interactive || withColon.startsWith(interactive)) return true
  }
  return false
}

function isWidthConstraintToken(base: string): boolean {
  if (base === "w-full" || base === "w-screen") return true
  if (base.startsWith("max-w-")) return true
  if (base.startsWith("w-[")) return true
  return false
}

function isViewportClampedContainer(tokens: readonly string[]): boolean {
  let hasMxAuto = false
  let hasWidthConstraint = false
  for (const raw of tokens) {
    const cleaned = stripModifiers(raw)
    if (cleaned.length === 0) continue
    const { base } = splitVariantPrefixes(cleaned)
    if (base === "mx-auto") hasMxAuto = true
    else if (isWidthConstraintToken(base)) hasWidthConstraint = true
    if (hasMxAuto && hasWidthConstraint) return true
  }
  return false
}

export function isZeroMargin(base: string): boolean {
  return (
    base === "m-0" ||
    base === "mt-0" ||
    base === "mb-0" ||
    base === "ml-0" ||
    base === "mr-0" ||
    base === "mx-0" ||
    base === "my-0"
  )
}

export function isPositionedElement(tokens: readonly string[]): boolean {
  for (const raw of tokens) {
    const cleaned = stripModifiers(raw)
    if (cleaned.length === 0) continue
    const { prefixes, base } = splitVariantPrefixes(cleaned)
    if (hasDescendantTargetingVariant(prefixes)) continue
    if (base === "fixed" || base === "absolute" || base === "sticky") return true
  }
  return false
}

export function hasVisibleBoundary(
  tokens: readonly string[],
  callExpressionNames: readonly string[],
  jsxTagName?: string | null
): boolean {
  if (jsxTagName != null && SURFACE_PAINTING_COMPONENTS.has(jsxTagName)) return true
  for (const name of callExpressionNames) {
    if (SURFACE_CALL_NAMES.has(name)) return true
  }
  if (isViewportClampedContainer(tokens)) return true
  for (const raw of tokens) {
    const cleaned = stripModifiers(raw)
    if (cleaned.length === 0) continue
    if (SURFACE_LITERAL_RE.test(cleaned)) return true
    const { prefixes, base } = splitVariantPrefixes(cleaned)
    const interactive = isInteractiveVariantPrefixed(prefixes)
    if (base.startsWith("bg-") && !isLayoutOnlyBg(base)) {
      if (base === "bg-surface-0" && !interactive) continue
      return true
    }
    if ((base === "border" || base.startsWith("border-")) && !isLayoutOnlyBorder(base)) {
      return true
    }
  }
  return false
}

export interface BoundaryInputs {
  readonly tokens: readonly string[]
  readonly callExpressionNames: readonly string[]
  readonly jsxTagName: string | null
}

export interface BoundaryRoute {
  readonly label: string
  readonly remedy: {
    readonly tokens?: readonly string[]
    readonly callExpressionNames?: readonly string[]
    readonly jsxTagName?: string
  }
}

export const REFUSED_ROOT_ELEMENT: BoundaryInputs = {
  tokens: ["p-4", "flex", "gap-2"],
  callExpressionNames: [],
  jsxTagName: "div",
}

export const BOUNDARY_ROUTES: readonly BoundaryRoute[] = [
  { label: "surfaceClass(...)", remedy: { callExpressionNames: ["surfaceClass"] } },
  { label: "bg-surface-{1..4}", remedy: { tokens: ["bg-surface-2"] } },
  { label: "non-surface bg color", remedy: { tokens: ["bg-accent"] } },
  { label: "border", remedy: { tokens: ["border"] } },
  {
    label: "viewport-clamped container (mx-auto + width-constraint)",
    remedy: { tokens: ["mx-auto", "max-w-3xl"] },
  },
]

export function applyBoundaryRoute(route: BoundaryRoute): BoundaryInputs {
  return {
    tokens: [...REFUSED_ROOT_ELEMENT.tokens, ...(route.remedy.tokens ?? [])],
    callExpressionNames: [
      ...REFUSED_ROOT_ELEMENT.callExpressionNames,
      ...(route.remedy.callExpressionNames ?? []),
    ],
    jsxTagName: route.remedy.jsxTagName ?? REFUSED_ROOT_ELEMENT.jsxTagName,
  }
}

export function satisfiesVisibleBoundary(inputs: BoundaryInputs): boolean {
  return hasVisibleBoundary(inputs.tokens, inputs.callExpressionNames, inputs.jsxTagName)
}

export function renderBoundaryRoutes(): string {
  const labels = BOUNDARY_ROUTES.map((route) => route.label)
  const last = labels.pop()
  if (last === undefined) return ""
  return labels.length === 0 ? last : `${labels.join(", ")}, or ${last}`
}
