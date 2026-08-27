#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import ts from "typescript"
import { z } from "zod"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args.ts"
import { errorMessage } from "../../../../tools/lib/check-workflow/error-message"
import { examineFilePopulation } from "../../../../tools/lib/check-workflow/population"
import { remediationHint } from "../../../../tools/lib/check-workflow/remediation-doc"

const LualibMatchSchema = z.union([z.tuple([z.string(), z.string()]).rest(z.string()), z.null()])

import { getRepoRoot } from "../lib/repo-root.ts"
import {
  type NormalizedFinding,
  type SyntaxScannerEntry,
  scriptKindFor,
} from "../lib/syntax-scanner-entry.ts"
import { type ClassFinding, scanClassDeclarations } from "../lib/ts-class-declarations.ts"
import { listTsFiles } from "../lib/ts-file-iteration.ts"
import { exitOnResult } from "../../../../tools/lib/check-workflow/violation-reporter"

const PREFIX = "[no-class]"

const LUALIB_FEATURE_BASENAMES: ReadonlySet<string> = new Set([
  "ArrayAt",
  "ArrayConcat",
  "ArrayEntries",
  "ArrayEvery",
  "ArrayFill",
  "ArrayFilter",
  "ArrayForEach",
  "ArrayFind",
  "ArrayFindIndex",
  "ArrayFrom",
  "ArrayIncludes",
  "ArrayIndexOf",
  "ArrayIsArray",
  "ArrayJoin",
  "ArrayMap",
  "ArrayPush",
  "ArrayPushArray",
  "ArrayReduce",
  "ArrayReduceRight",
  "ArrayReverse",
  "ArrayUnshift",
  "ArraySort",
  "ArraySlice",
  "ArraySome",
  "ArraySplice",
  "ArrayToObject",
  "ArrayFlat",
  "ArrayFlatMap",
  "ArraySetLength",
  "ArrayToReversed",
  "ArrayToSorted",
  "ArrayToSpliced",
  "ArrayWith",
  "Await",
  "Class",
  "ClassExtends",
  "CloneDescriptor",
  "CountVarargs",
  "Date",
  "Decorate",
  "DecorateLegacy",
  "DecorateParam",
  "Delete",
  "DelegatedYield",
  "DescriptorGet",
  "DescriptorSet",
  "Error",
  "FunctionBind",
  "Generator",
  "InstanceOf",
  "InstanceOfObject",
  "Iterator",
  "LuaIteratorSpread",
  "Map",
  "MapGroupBy",
  "Match",
  "MathAtan2",
  "MathModf",
  "MathSign",
  "MathTrunc",
  "New",
  "Number",
  "NumberIsFinite",
  "NumberIsInteger",
  "NumberIsNaN",
  "NumberParseInt",
  "NumberParseFloat",
  "NumberToString",
  "NumberToFixed",
  "ObjectAssign",
  "ObjectDefineProperty",
  "ObjectEntries",
  "ObjectFromEntries",
  "ObjectGetOwnPropertyDescriptor",
  "ObjectGetOwnPropertyDescriptors",
  "ObjectGroupBy",
  "ObjectKeys",
  "ObjectRest",
  "ObjectValues",
  "ParseFloat",
  "ParseInt",
  "Promise",
  "PromiseAll",
  "PromiseAllSettled",
  "PromiseAny",
  "PromiseRace",
  "Set",
  "SetDescriptor",
  "SparseArrayNew",
  "SparseArrayPush",
  "SparseArraySpread",
  "WeakMap",
  "WeakSet",
  "SourceMapTraceBack",
  "Spread",
  "StringAccess",
  "StringCharAt",
  "StringCharCodeAt",
  "StringEndsWith",
  "StringIncludes",
  "StringPadEnd",
  "StringPadStart",
  "StringReplace",
  "StringReplaceAll",
  "StringSlice",
  "StringSplit",
  "StringStartsWith",
  "StringSubstr",
  "StringSubstring",
  "StringTrim",
  "StringTrimEnd",
  "StringTrimStart",
  "Symbol",
  "SymbolRegistry",
  "TypeOf",
  "Unpack",
  "Using",
  "UsingAsync",
])

const LUALIB_PATH_RE = /(?:^|\/)lualib\/src\/([A-Za-z0-9_]+)\.ts$/
function isLualibPolyfill(filePath: string): boolean {
  const m = LualibMatchSchema.parse(filePath.match(LUALIB_PATH_RE))
  if (!m) return false
  return LUALIB_FEATURE_BASENAMES.has(m[1])
}

function isPermitted(finding: ClassFinding): boolean {
  if (finding.isExpression) return false
  if (finding.extendsName === "Error") return true
  if (
    (finding.extendsName === "React.Component" || finding.extendsName === "Component") &&
    finding.hasErrorBoundaryMethod
  )
    return true
  return false
}

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

function messageOf(v: ClassFinding): string {
  const label = v.name ?? "<anonymous>"
  const ext = v.extendsName != null ? ` extends ${v.extendsName}` : ""
  const kind = v.isExpression ? "class expression" : "class declaration"
  return `${kind} ${label}${ext}`
}

function formatViolation(v: ClassFinding): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

export const noClassEntry: SyntaxScannerEntry = {
  name: "no-class",
  preFileSkip: (rel) => isLualibPolyfill(rel),
  findFindings: (sf) => {
    const out: NormalizedFinding[] = []
    for (const f of scanClassDeclarations(sf)) {
      if (isPermitted(f)) continue
      out.push({
        file: f.file,
        line: f.line,
        column: f.column,
        message: messageOf(f),
        groupKey: topLevelGroup(f.file),
      })
    }
    return out
  },
  successMessage: "No `class` keyword usage detected.",
  remediationDoc: remediationHint("instead: a plain function"),
}

async function main(): Promise<undefined> {
  let flags: {
    json: boolean
    repoRoot: string | undefined
    treeSha: string | undefined
    cacheDir: string | undefined
  }
  try {
    const parsed = parseArgs(
      process.argv.slice(2),
      { ...STANDARD_FLAGS, treeSha: { kind: "string" }, cacheDir: { kind: "string" } },
      { passthrough: true }
    )
    flags = {
      json: parsed.flags.json,
      repoRoot: parsed.flags.repoRoot,
      treeSha: parsed.flags.treeSha,
      cacheDir: parsed.flags.cacheDir,
    }
  } catch (err) {
    process.stderr.write(`${PREFIX} ${err instanceof Error ? err.message : String(err)}\n`)
    process.exit(2)
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    process.stderr.write(`${PREFIX} --repo-root ${repoRoot} does not exist\n`)
    process.exit(2)
  }

  const { population, violations: findings } = examineFilePopulation<ClassFinding>({
    files: (
      await listTsFiles({ repoRoot, treeSha: flags.treeSha, cacheDir: flags.cacheDir })
    ).filter((rel) => !isLualibPolyfill(rel)),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`listTsFiles` reads its members off the ts-file nodes of a graph that is already built when it " +
        "returns — a cache hit keyed on the tree sha, or an awaited `engine.build` that rejects rather " +
        "than yielding a graph missing nodes — and the lualib-polyfill narrowing is decided from the path",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) =>
      scanClassDeclarations(
        ts.createSourceFile(rel, source, ts.ScriptTarget.Latest, true, scriptKindFor(rel))
      ).filter((f) => !isPermitted(f)),
  })

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `class declarations / expressions in TS source — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage: "No `class` keyword usage detected.",
      remediationDoc: remediationHint("instead: a plain function"),
      groupBy: (v) => topLevelGroup(v.file),
      formatViolation,
    },
  })
}

if (import.meta.main) {
  main().catch((err) => {
    process.stderr.write(`${PREFIX} Unexpected error: ${errorMessage(err)}\n`)
    process.exit(2)
  })
}
