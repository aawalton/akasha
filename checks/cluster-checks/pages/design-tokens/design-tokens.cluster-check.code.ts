#!/usr/bin/env bun

import { readdirSync, readFileSync } from "node:fs"
import * as semanticTokens from "@akasha/design-tokens/semantic-color"
import * as surfaceTokens from "@akasha/design-tokens/surface-color"
import * as textTokens from "@akasha/design-tokens/text-color"
import { parseArgs, REPO_ROOT_FLAG } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  type ColorToken,
  colorTokenLabel,
  colorTokenSourceRel,
  colorTokenUnion,
  type ExportedColor,
  judgeColorToken,
  type Oklch,
  type ParityViolation,
  parseOklchVars,
  type Rgb,
  type TokenSpec,
} from "../../modules/design-token-parity/design-token-parity.module.code.ts"
import { examinePopulation } from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[design-tokens]"

const TOKENS_CSS_REL = "design/system/token-values/token-values.stylesheet.styles.css"
const TOKENS_PKG_REL = "design/tokens"

const READ_MODULES: readonly string[] = ["surface-color", "semantic-color", "text-color"]

// Under akasha's flat layout a module is a folder holding <slug>.module.ts beside
// <slug>.module.code.ts, so the package root holds one folder per module plus its own
// page and manifest. Anything else there is a colour this check does not compare.
const PACKAGE_ROOT_FILES: readonly string[] = ["package.json", "design-tokens.workspace-package.ts"]

function moduleCodeRel(slug: string): string {
  return `${TOKENS_PKG_REL}/${slug}/${slug}.module.code.ts`
}

const SURFACE_CSS_VARS: Record<string, string> = {
  SURFACE_0: "surface-0",
  SURFACE_1: "surface-1",
  SURFACE_2: "surface-2",
  SURFACE_3: "surface-3",
  SURFACE_4: "surface-4",
}

const SEMANTIC_CSS_VARS: Record<string, string> = {
  GREEN: "green",
  BLUE: "blue",
  PURPLE: "purple",
  YELLOW: "yellow",
  ORANGE: "orange",
  RED: "red",
}

const TEXT_CSS_VARS: Record<string, string> = {
  TEXT_PRIMARY: "primary",
  TEXT_SECONDARY: "secondary",
  TEXT_TERTIARY: "tertiary",
}

const MODULE_MAPS: readonly {
  readonly module: Record<string, unknown>
  readonly sourceRel: string
  readonly cssVarOf: Record<string, string>
}[] = [
  {
    module: { ...surfaceTokens },
    sourceRel: moduleCodeRel("surface-color"),
    cssVarOf: SURFACE_CSS_VARS,
  },
  {
    module: { ...semanticTokens },
    sourceRel: moduleCodeRel("semantic-color"),
    cssVarOf: SEMANTIC_CSS_VARS,
  },
  {
    module: { ...textTokens },
    sourceRel: moduleCodeRel("text-color"),
    cssVarOf: TEXT_CSS_VARS,
  },
]

function isRgb(value: unknown): value is Rgb {
  return Array.isArray(value) && value.length === 3 && value.every((c) => typeof c === "number")
}

function unreadTokenModules(packageDir: string): readonly string[] {
  const unread: string[] = []
  for (const entry of readdirSync(packageDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!READ_MODULES.includes(entry.name)) unread.push(`${entry.name}/`)
      continue
    }
    if (!PACKAGE_ROOT_FILES.includes(entry.name)) unread.push(entry.name)
  }
  return unread.sort()
}

function specsOf(
  sourceRel: string,
  cssVarOf: Record<string, string>,
  module: Record<string, unknown>
): readonly TokenSpec[] {
  const specs: TokenSpec[] = []
  for (const tokenName of Object.keys(cssVarOf)) {
    const cssVar = cssVarOf[tokenName]
    if (cssVar === undefined) continue
    const rgb = module[tokenName]
    if (!isRgb(rgb))
      throw new Error(
        `${sourceRel} is mapped to --${cssVar} through export "${tokenName}", which the module does not export as an Rgb tuple. Either the export was renamed or removed, or the mapping in check-design-tokens.ts is stale. The mapping runs from export name to CSS custom property, which no typechecker holds.`
      )
    specs.push({ tokenName, cssVar, rgb, sourceRel })
  }
  return specs
}

function main(): undefined {
  const repoRoot =
    parseArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
    getRepoRoot()

  let unread: readonly string[] = []
  try {
    unread = unreadTokenModules(`${repoRoot}/${TOKENS_PKG_REL}`)
  } catch (error) {
    exitOnToolError({ error, prefix: PREFIX })
  }
  if (unread.length > 0) {
    exitOnToolError({
      error: new Error(
        `${TOKENS_PKG_REL} holds ${unread.length} entr(ies) this check does not read: ${unread.join(", ")}. Every module folder under @akasha/design-tokens may hold a colour, so any colour in one of these is outside this comparison and this run certifies nothing about it. Map each of its Rgb exports to its tokens.css custom property in check-design-tokens.ts, or name the file in PACKAGE_ROOT_FILES if it holds no colour.`
      ),
      prefix: PREFIX,
    })
  }

  let specs: readonly TokenSpec[]
  let exported: readonly ExportedColor[]
  let vars: ReadonlyMap<string, Oklch>
  try {
    specs = MODULE_MAPS.flatMap((entry) => specsOf(entry.sourceRel, entry.cssVarOf, entry.module))
    exported = MODULE_MAPS.flatMap((entry) =>
      Object.entries(entry.module)
        .filter(([, value]) => isRgb(value))
        .map(([tokenName]) => ({ tokenName, sourceRel: entry.sourceRel }))
    )
    vars = parseOklchVars(readFileSync(`${repoRoot}/${TOKENS_CSS_REL}`, "utf-8"))
  } catch (error) {
    exitOnToolError({ error, prefix: PREFIX })
  }

  const { population, violations } = examinePopulation<ColorToken, ParityViolation>({
    members: colorTokenUnion({
      specs,
      exported,
      cssVars: [...vars.keys()],
      cssSourceRel: TOKENS_CSS_REL,
    }),
    unit: "color tokens",
    labelOf: colorTokenLabel,
    siteOf: (token) => `${repoRoot}/${colorTokenSourceRel(token)}`,
    examine: (token) => judgeColorToken(token, vars),
    membership: {
      kind: "enumerated",
      because:
        "the members are the union of the two sides themselves — every Rgb export of the modules `@akasha/design-tokens` is made of, read off each loaded module rather than off a list here, which a read of the package's own folder makes a refusal to miss a module of, and every oklch() custom property in tokens.css, from one read that raises rather than returning part of the file",
    },
  })

  exitOnResult<ParityViolation>({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header: `every colour @akasha/design-tokens and ${TOKENS_CSS_REL} declare must be mirrored by the other, with matching values`,
      successMessage:
        "Every design-token colour is declared on both sides and every tuple matches its oklch() source.",
      formatViolation: (v) => v.message,
    },
  })
}

main()
