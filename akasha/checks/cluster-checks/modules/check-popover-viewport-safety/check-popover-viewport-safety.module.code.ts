#!/usr/bin/env bun

import { existsSync, readdirSync } from "node:fs"
import { relative, resolve } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import ts from "typescript"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population.ts"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../../../../../tools/lib/check-workflow/violation-reporter.ts"
import { parseArgs as parseCliArgs } from "../cli-args/cli-args.module.code.ts"
import { extractJsxClassUsagesFrom } from "../jsx-class-tokens/jsx-class-tokens.module.code.ts"
import { derivePopoverFamilyTags } from "../popover-family-wrappers/popover-family-wrappers.module.code.ts"
import { getRepoRoot } from "../repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../retired/retired.module.code.ts"
import type {
  NormalizedFinding,
  SyntaxScannerEntry,
} from "../syntax-scanner-entry/syntax-scanner-entry.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[check-popover-viewport-safety]"

interface PopoverViolation extends Violation {
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
    exitOnToolError({ error: msg, prefix: PREFIX })
  }
  if (parsed.positionals.length > 0) {
    exitOnToolError({ error: `unknown argument: ${parsed.positionals[0]}`, prefix: PREFIX })
  }
  const rootFlag = parsed.flags.root
  const explicitRoot = rootFlag !== undefined
  const rootDir = rootFlag !== undefined ? resolve(rootFlag) : getRepoRoot()
  if (!existsSync(rootDir)) {
    exitOnToolError({ error: `--root ${rootDir} does not exist`, prefix: PREFIX })
  }
  return {
    jsonOutput: parsed.flags.json,
    rootDir,
    explicitRoot,
  }
}

const ALWAYS_SKIP: ReadonlySet<string> = new Set(["node_modules", "dist", ".next"])

function shouldSkipDir(name: string, includeFixtures: boolean): boolean {
  if (ALWAYS_SKIP.has(name)) return true
  if (!includeFixtures && name === "__fixtures__") return true
  return false
}

function isGeneratedFile(name: string): boolean {
  return name.endsWith(".generated.ts") || name.endsWith(".generated.tsx")
}

function findTsxFiles(rootDir: string, includeFixtures: boolean): readonly string[] {
  const out: string[] = []
  function walk(dir: string): undefined {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const abs = resolve(dir, entry.name)
      if (entry.isDirectory()) {
        if (shouldSkipDir(entry.name, includeFixtures)) continue
        walk(abs)
        continue
      }
      if (!entry.isFile()) continue
      if (!entry.name.endsWith(".tsx")) continue
      if (isGeneratedFile(entry.name)) continue
      out.push(abs)
    }
    return undefined
  }
  walk(rootDir)
  out.sort()
  return out
}

function classifyMaxWidthToken(token: string, family: string): string | null {
  const lastColon = token.lastIndexOf(":")
  const bare = lastColon === -1 ? token : token.slice(lastColon + 1)
  const noImportant = bare.startsWith("!") ? bare.slice(1) : bare

  if (!noImportant.startsWith("max-w-")) return null

  const expectedVar = `var(--radix-${family}-content-available-width)`
  const remedy =
    "drop the token and take the wrapper's cap, or write " +
    `max-w-[calc(min(<your width>,${expectedVar}))] to keep a width of your own under it`

  if (noImportant === "max-w-none") {
    return `max-w-none disables the viewport cap baked into the wrapper — ${remedy}`
  }
  if (noImportant.startsWith("max-w-[") && noImportant.endsWith("]")) {
    const inner = noImportant.slice("max-w-[".length, -1)
    if (inner === expectedVar) return null
    if (inner.startsWith("calc(")) return null
    return `max-w-[${inner}] overrides the viewport cap — ${remedy}`
  }
  return `${noImportant} replaces the viewport cap — tailwind-merge resolves max-w-* as one conflict group, so this token wins over the wrapper's — ${remedy}`
}

function* findBannedPropAttributes(
  sf: ts.SourceFile,
  tags: ReadonlyMap<string, string>
): Generator<{
  line: number
  column: number
  message: string
}> {
  function* visit(node: ts.Node): Generator<{ line: number; column: number; message: string }> {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const opening = ts.isJsxElement(node) ? node.openingElement : node
      const tag = opening.tagName
      if (ts.isIdentifier(tag) && tags.has(tag.text)) {
        const tagText = tag.text
        for (const attr of opening.attributes.properties) {
          if (!ts.isJsxAttribute(attr)) continue
          if (!ts.isIdentifier(attr.name)) continue
          const attrName = attr.name.text
          if (attrName !== "avoidCollisions" && attrName !== "collisionPadding") continue
          const init = attr.initializer
          if (init === undefined) continue
          if (!ts.isJsxExpression(init)) continue
          const expr = init.expression
          if (expr === undefined) continue
          const start = attr.getStart(sf)
          const { line, character } = ts.getLineAndCharacterOfPosition(sf, start)
          const lineNum = line + 1
          const columnNum = character + 1
          if (attrName === "avoidCollisions" && expr.kind === ts.SyntaxKind.FalseKeyword) {
            yield {
              line: lineNum,
              column: columnNum,
              message: `<${tagText} avoidCollisions={false}> disables Radix flip/shift — collisions must remain enabled`,
            }
          } else if (
            attrName === "collisionPadding" &&
            ts.isNumericLiteral(expr) &&
            expr.text === "0"
          ) {
            yield {
              line: lineNum,
              column: columnNum,
              message: `<${tagText} collisionPadding={0}> collapses the safety margin — keep the wrapper default`,
            }
          }
        }
      }
    }
    for (const child of node.getChildren(sf)) {
      yield* visit(child)
    }
  }

  yield* visit(sf)
}

function findPopoverFindings(
  sf: ts.SourceFile,
  tags: ReadonlyMap<string, string>
): readonly NormalizedFinding[] {
  const repoRelative = sf.fileName
  const out: NormalizedFinding[] = []

  for (const usage of extractJsxClassUsagesFrom(sf)) {
    const tag = usage.jsxTagName
    if (tag === null) continue
    const family = tags.get(tag)
    if (family === undefined) continue
    for (const token of usage.tokens) {
      const reason = classifyMaxWidthToken(token, family)
      if (reason === null) continue
      out.push({
        file: repoRelative,
        line: usage.line,
        column: usage.column,
        message: `<${tag} className=…\`${token}\`…>: ${reason}`,
        groupKey: repoRelative,
      })
    }
  }

  for (const hit of findBannedPropAttributes(sf, tags)) {
    out.push({
      file: repoRelative,
      line: hit.line,
      column: hit.column,
      message: hit.message,
      groupKey: repoRelative,
    })
  }

  return out
}

export const popoverViewportSafetyEntry: SyntaxScannerEntry = {
  name: "popover-viewport-safety",
  preFileSkip: (rel) => !rel.endsWith(".tsx"),
  findFindings: (sf, repoRoot) => findPopoverFindings(sf, derivePopoverFamilyTags(repoRoot)),
  successMessage: "No popover-family viewport-safety violations.",
}

function checkSource(
  source: string,
  repoRelative: string,
  tags: ReadonlyMap<string, string>
): readonly PopoverViolation[] {
  const sf = ts.createSourceFile(
    repoRelative,
    source,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.TSX
  )
  return findPopoverFindings(sf, tags).map((f) => ({
    file: f.file,
    line: f.line,
    message: f.message,
  }))
}

function main(): undefined {
  const args = parseArgs()
  const includeFixtures = args.explicitRoot
  let tags: ReadonlyMap<string, string>
  try {
    tags = derivePopoverFamilyTags(getRepoRoot())
  } catch (err) {
    return exitOnToolError({ error: err, prefix: PREFIX })
  }
  let files: readonly string[]
  try {
    files = findTsxFiles(args.rootDir, includeFixtures)
  } catch (err) {
    return exitOnToolError({ error: err, prefix: PREFIX })
  }

  const { population, violations } = examineFilePopulation<PopoverViolation>({
    files: files.map((abs) => relative(args.rootDir, abs)),
    unit: "tsx files",
    membership: {
      kind: "enumerated",
      because:
        "`findTsxFiles` walks with `readdirSync` and catches nothing, so a directory that will not open throws out to the `try` above and exits 2 rather than yielding a shortened list — a smaller `files` is a tree with fewer `.tsx` files in it",
    },
    pathOf: (rel) => resolve(args.rootDir, rel),
    scan: (rel, source) => checkSource(source, rel, tags),
  })

  return exitOnResult({
    violations,
    options: {
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: "Popover-family viewport-safety violations",
      population,
    },
  })
}

if (import.meta.main) {
  main()
}
