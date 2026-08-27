#!/usr/bin/env bun

import { readdirSync, readFileSync } from "node:fs"
import { codeModule } from "../../../../../instructions/tools/lib/code-import.ts"
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
import { examinePopulation } from "../../../../../instructions/tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root.ts"
import { exitOnResult, exitOnToolError } from "../../../../../instructions/tools/lib/check-workflow/violation-reporter"

const PREFIX = "[design-tokens]"

const TOKENS_CSS_REL = "packages/shared/design/system/src/styles/tokens.css"
const TOKENS_SRC_REL = "packages/shared/design/tokens/src"

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
  readonly specifier: string
  readonly sourceRel: string
  readonly cssVarOf: Record<string, string>
}[] = [
  {
    specifier: "@shared/design-tokens/surface",
    sourceRel: `${TOKENS_SRC_REL}/surface.ts`,
    cssVarOf: SURFACE_CSS_VARS,
  },
  {
    specifier: "@shared/design-tokens/semantic",
    sourceRel: `${TOKENS_SRC_REL}/semantic.ts`,
    cssVarOf: SEMANTIC_CSS_VARS,
  },
  {
    specifier: "@shared/design-tokens/text",
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
        `${sourceRel} is mapped to --${cssVar} through export "${tokenName}", which the module does not export as an Rgb tuple. Either the export was renamed or removed, or the mapping in check-design-tokens.ts is stale. The tokens package is loaded out of the code checkout at run time, so this mapping is held here rather than by a typechecker.`
      )
    specs.push({ tokenName, cssVar, rgb, sourceRel })
  }
  return specs
}

async function main(): Promise<undefined> {
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
    const loaded = await Promise.all(
      MODULE_MAPS.map(async (entry) => ({
        entry,
        module: await codeModule<Record<string, unknown>>(entry.specifier, repoRoot),
      }))
    )
    specs = loaded.flatMap(({ entry, module }) => specsOf(entry.sourceRel, entry.cssVarOf, module))
    exported = loaded.flatMap(({ entry, module }) =>
      Object.entries(module)
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

await main()
