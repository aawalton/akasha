#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { relative, resolve } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import ts from "typescript"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population.ts"
import {
  exitOnResult,
  type Violation,
} from "../../../../../tools/lib/check-workflow/violation-reporter.ts"
import { parseArgs as parseCliArgs } from "../cli-args/cli-args.module.code.ts"
import {
  hasDescendantTargetingVariant,
  hasVisibleBoundary,
  isPositionedElement,
  isZeroMargin,
  renderBoundaryRoutes,
  splitVariantPrefixes,
} from "../component-layout-boundary/component-layout-boundary.module.code.ts"
import { isCompoundSlotInBoundedFamily } from "../component-slot-detection/component-slot-detection.module.code.ts"
import {
  discoverComponentSources,
  isBareTs,
  isExcludedSource,
} from "../component-sources/component-sources.module.code.ts"
import { findHeadStylesViolations } from "../head-styles-violations/head-styles-violations.module.code.ts"
import { extractJsxClassUsagesFrom } from "../jsx-class-tokens/jsx-class-tokens.module.code.ts"
import { collectTopLevelComponentNames } from "../jsx-class-tokens-roots/jsx-class-tokens-roots.module.code.ts"
import { getRepoRoot } from "../repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../retired/retired.module.code.ts"
import type {
  NormalizedFinding,
  SyntaxScannerEntry,
} from "../syntax-scanner-entry/syntax-scanner-entry.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[check-component-layout]"

interface LayoutViolation extends Violation {
  file: string
  line: number
  message: string
}

const FLAG_SPEC = {
  json: { kind: "boolean" },
  root: { kind: "string" },
} as const

interface CliArgs {
  jsonOutput: boolean
  rootDir: string
  explicitRoot: boolean
}

function parseArgs(): CliArgs {
  let parsed: ReturnType<typeof parseCliArgs<typeof FLAG_SPEC>>
  try {
    parsed = parseCliArgs(process.argv.slice(2), FLAG_SPEC)
  } catch (err) {
    const msg = errorMessage(err).replace(/^Unknown flag: /, "unknown argument: ")
    console.error(`${PREFIX} ${msg}`)
    process.exit(2)
  }
  if (parsed.positionals.length > 0) {
    console.error(`${PREFIX} unknown argument: ${parsed.positionals[0]}`)
    process.exit(2)
  }
  const rootFlag = parsed.flags.root
  const explicitRoot = rootFlag !== undefined
  const rootDir = rootFlag !== undefined ? resolve(rootFlag) : getRepoRoot()
  if (!existsSync(rootDir)) {
    console.error(`${PREFIX} --root ${rootDir} does not exist`)
    process.exit(2)
  }
  return {
    jsonOutput: parsed.flags.json,
    rootDir,
    explicitRoot,
  }
}

const ROOT_PADDING_RE = /^-?p[xytrbl]?-/

const BOUNDARY_ROUTE_LIST = renderBoundaryRoutes()

const TABLE_PRIMITIVE_TAGS: ReadonlySet<string> = new Set([
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
])

const APP_ROUTER_FRAMEWORK_FILE_RE =
  /(?:^|\/)app\/(?:.*\/)?(?:page|loading|layout|error|template|not-found|default)\.tsx$/

const POSITIVE_MARGIN_RE = /^m[tblrxy]?-/

function isNegativeArbitraryMargin(norm: string): boolean {
  return /^m[tblrxy]?-\[-/.test(norm)
}

function normalizeToken(token: string): string {
  const segments = token.split(":")
  return segments[segments.length - 1] ?? ""
}

function findLayoutFindings(sf: ts.SourceFile): readonly NormalizedFinding[] {
  const repoRelative = sf.fileName
  const usages = extractJsxClassUsagesFrom(sf)
  const componentNames = collectTopLevelComponentNames(sf)
  const isAppRouterFrameworkFile = APP_ROUTER_FRAMEWORK_FILE_RE.test(repoRelative)
  const out: NormalizedFinding[] = []
  for (const usage of usages) {
    const rootHasBoundary =
      usage.isRootElement &&
      hasVisibleBoundary(usage.tokens, usage.callExpressionNames, usage.jsxTagName)
    const isTablePrimitiveRoot =
      usage.isRootElement && usage.tagName !== null && TABLE_PRIMITIVE_TAGS.has(usage.tagName)
    const isBoundedCompoundSlot = isCompoundSlotInBoundedFamily(usages, usage, componentNames)
    const elementIsPositioned = isPositionedElement(usage.tokens)
    for (const rawToken of usage.tokens) {
      const norm = normalizeToken(rawToken)
      if (norm.length === 0) continue
      const { prefixes } = splitVariantPrefixes(rawToken)
      if (hasDescendantTargetingVariant(prefixes)) continue
      if (
        usage.isRootElement &&
        !rootHasBoundary &&
        !isAppRouterFrameworkFile &&
        !isTablePrimitiveRoot &&
        !isBoundedCompoundSlot &&
        ROOT_PADDING_RE.test(norm)
      ) {
        out.push({
          file: repoRelative,
          line: usage.line,
          column: usage.column,
          groupKey: repoRelative,
          message: `root element has external padding token \`${rawToken}\` — parents own layout; root padding requires a visible boundary (${BOUNDARY_ROUTE_LIST})`,
        })
      }
      if (
        POSITIVE_MARGIN_RE.test(norm) &&
        !norm.endsWith("-auto") &&
        !isNegativeArbitraryMargin(norm) &&
        !isZeroMargin(norm) &&
        !elementIsPositioned
      ) {
        out.push({
          file: repoRelative,
          line: usage.line,
          column: usage.column,
          groupKey: repoRelative,
          message: `uses positive sibling margin \`${rawToken}\` — parents own sibling spacing via \`gap-*\` (flex/grid) or \`space-{x,y}-*\` (block); negative bleed and \`*-auto\` are the only allowed margins`,
        })
      }
    }
  }
  return out
}

function findHeadStylesFindings(sf: ts.SourceFile): readonly NormalizedFinding[] {
  const repoRelative = sf.fileName
  const out: NormalizedFinding[] = []
  for (const v of findHeadStylesViolations(sf.getFullText())) {
    out.push({
      file: repoRelative,
      line: v.line,
      column: 1,
      groupKey: repoRelative,
      message: `inline-head CSS export \`${v.exportName}\` declares positive \`${v.declaration}\` — Rule 2 (no positive margins) extends to inline-head CSS so it stays in sync with JSX-side rules; use \`padding-left\` and friends, or \`auto\` / negative values for the established carve-outs`,
    })
  }
  return out
}

function asViolation(f: NormalizedFinding): LayoutViolation {
  return { file: f.file, line: f.line, message: f.message }
}

function checkSource(source: string, repoRelative: string): readonly LayoutViolation[] {
  const sf = ts.createSourceFile(
    repoRelative,
    source,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.TSX
  )
  return findLayoutFindings(sf).map(asViolation)
}

function checkTsHeadStylesSource(source: string, repoRelative: string): readonly LayoutViolation[] {
  const sf = ts.createSourceFile(
    repoRelative,
    source,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.TS
  )
  return findHeadStylesFindings(sf).map(asViolation)
}

export const componentLayoutJsxEntry: SyntaxScannerEntry = {
  name: "component-layout",
  preFileSkip: (rel) => !rel.endsWith(".tsx") || isExcludedSource(rel),
  findFindings: (sf) => findLayoutFindings(sf),
  successMessage: "No component-layout violations.",
}

export const componentLayoutHeadStylesEntry: SyntaxScannerEntry = {
  name: "component-layout-head-styles",
  preFileSkip: (rel) => !isBareTs(rel) || isExcludedSource(rel),
  findFindings: (sf) => findHeadStylesFindings(sf),
  successMessage: "No inline-head CSS margin violations.",
}

function main(): undefined {
  const args = parseArgs()
  const includeFixtures = args.explicitRoot
  const { jsxFiles, headStyleFiles } = discoverComponentSources(args.rootDir, includeFixtures)
  const { population, violations } = examineFilePopulation<LayoutViolation>({
    files: [...jsxFiles, ...headStyleFiles].map((abs) => relative(args.rootDir, abs)),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`parseArgs` exits 2 above when `rootDir` is not on disk, and `discoverComponentSources` walks every root `loadWorkspaces` returns plus a whole-tree fallback when that list comes back empty, so no workspace can drop out of the enumeration without the run stopping",
    },
    pathOf: (rel) => resolve(args.rootDir, rel),
    scan: (rel, source) =>
      rel.endsWith(".tsx") ? checkSource(source, rel) : checkTsHeadStylesSource(source, rel),
  })

  exitOnResult({
    violations,
    options: {
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: "Component layout violations",
      population,
    },
  })
}

if (import.meta.main) {
  main()
}
