#!/usr/bin/env bun

import { readdirSync, readFileSync } from "node:fs"
import * as semanticTokens from "@shared/design-tokens/semantic"
import * as surfaceTokens from "@shared/design-tokens/surface"
import * as textTokens from "@shared/design-tokens/text"
import { parseArgs, REPO_ROOT_FLAG } from "../lib/cli-args.ts"
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
} from "../lib/design-token-parity.ts"
import { examinePopulation } from "../../../../tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root.ts"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"

const PREFIX = "[design-tokens]"

const TOKENS_CSS_REL = "shared/design-system/src/styles/tokens.css"
const TOKENS_SRC_REL = "shared/design-tokens/src"

const READ_MODULES: readonly string[] = ["surface.ts", "semantic.ts", "text.ts"]

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
    sourceRel: `${TOKENS_SRC_REL}/surface.ts`,
    cssVarOf: SURFACE_CSS_VARS,
  },
  {
    module: { ...semanticTokens },
    sourceRel: `${TOKENS_SRC_REL}/semantic.ts`,
    cssVarOf: SEMANTIC_CSS_VARS,
  },
  {
    module: { ...textTokens },
    sourceRel: `${TOKENS_SRC_REL}/text.ts`,
    cssVarOf: TEXT_CSS_VARS,
  },
]

function isRgb(value: unknown): value is Rgb {
  return Array.isArray(value) && value.length === 3 && value.every((c) => typeof c === "number")
}

function unreadTokenModules(srcDir: string): readonly string[] {
  return readdirSync(srcDir)
    .filter((name) => name.endsWith(".ts") && !name.includes(".test."))
    .filter((name) => !READ_MODULES.includes(name))
    .sort()
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
    unread = unreadTokenModules(`${repoRoot}/${TOKENS_SRC_REL}`)
  } catch (error) {
    exitOnToolError({ error, prefix: PREFIX })
  }
  if (unread.length > 0) {
    exitOnToolError({
      error: new Error(
        `${TOKENS_SRC_REL} holds ${unread.length} module(s) this check does not read: ${unread.join(", ")}. @shared/design-tokens exports every file in that directory, so any colour in one is outside this comparison and this run certifies nothing about it. Map each of its Rgb exports to its tokens.css custom property in check-design-tokens.ts.`
      ),
      prefix: PREFIX,
    })
  }

  let specs: readonly TokenSpec[]
  let exported: readonly ExportedColor[]
  let vars: ReadonlyMap<string, Oklch>
  try {
    specs = MODULE_MAPS.flatMap((entry) =>
      specsOf(entry.sourceRel, entry.cssVarOf, entry.module)
    )
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
        "the members are the union of the two sides themselves — every Rgb export of the modules `@shared/design-tokens` is made of, read off each loaded module rather than off a list here, which a directory read makes a refusal to miss a module of, and every oklch() custom property in tokens.css, from one read that raises rather than returning part of the file",
    },
  })

  exitOnResult<ParityViolation>({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header: `every colour @shared/design-tokens and ${TOKENS_CSS_REL} declare must be mirrored by the other, with matching values`,
      successMessage:
        "Every design-token colour is declared on both sides and every tuple matches its oklch() source.",
      formatViolation: (v) => v.message,
    },
  })
}

main()
