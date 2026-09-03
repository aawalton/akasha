#!/usr/bin/env bun

import { relative } from "node:path"
import ts from "typescript"
import {
  FILESYSTEM_WALK_EXEMPT_DIRS,
  findFiles,
} from "../../../../../tools/lib/check-workflow/file-finder"
import {
  examineFilePopulation,
  type Population,
} from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  type ClientPageAccessFinding,
  type ClientPageAccessKind,
  scanClientPageAccess,
} from "../../modules/ts-client-page-access/ts-client-page-access.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[client-page-access-boundary]"

export interface GrandfatheredEntry {
  readonly file: string
  readonly issue: string
  readonly reason: string
}

export const GRANDFATHERED_FILES: readonly GrandfatheredEntry[] = []

export function isGrandfathered(relPath: string): boolean {
  return GRANDFATHERED_FILES.some((e) => e.file === relPath)
}

const scriptKindFor = (filePath: string): ts.ScriptKind =>
  filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS

function hasLeadingUseClientDirective(source: string): boolean {
  const body = source.startsWith("#!") ? source.slice(source.indexOf("\n") + 1) : source
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, true, ts.LanguageVariant.Standard, body)
  let token = scanner.scan()
  while (token === ts.SyntaxKind.StringLiteral) {
    if (scanner.getTokenValue() === "use client") return true
    token = scanner.scan()
    if (token === ts.SyntaxKind.SemicolonToken) token = scanner.scan()
  }
  return false
}

const BOUNDARY_PACKAGE_PREFIXES = ["shared/pages-ui/", "shared/pages-ui-store/"]

export function shouldScanFile(relPath: string, source: string): boolean {
  if (!relPath.endsWith(".ts") && !relPath.endsWith(".tsx")) return false
  if (BOUNDARY_PACKAGE_PREFIXES.some((prefix) => relPath.startsWith(prefix))) return false
  if (relPath.split("/").some((segment) => FILESYSTEM_WALK_EXEMPT_DIRS.has(segment))) return false
  return hasLeadingUseClientDirective(source)
}

interface Census {
  readonly fileCount: number
  readonly grandfathered: readonly ClientPageAccessFinding[]
  readonly fresh: readonly ClientPageAccessFinding[]
  readonly population: Population
}

function scan(repoRoot: string): Census {
  const files = findFiles({
    cwd: repoRoot,
    patterns: ["**/*.ts", "**/*.tsx"],
    absolute: true,
  })
  let fileCount = 0
  const { population, violations } = examineFilePopulation<ClientPageAccessFinding>({
    files,
    unit: "files",
    membership: {
      kind: "enumerated",
      because:
        "`findFiles` globs `repoRoot` through `Bun.Glob.scanSync`, which raises ENOENT on a root that is not there, so fewer files means fewer files on disk",
    },
    scan: (absPath, text) => {
      const relPath = relative(repoRoot, absPath)
      if (!shouldScanFile(relPath, text)) return []
      fileCount++
      const sf = ts.createSourceFile(
        relPath,
        text,
        ts.ScriptTarget.Latest,
        true,
        scriptKindFor(relPath)
      )
      return scanClientPageAccess(sf)
    },
  })
  const grandfathered: ClientPageAccessFinding[] = []
  const fresh: ClientPageAccessFinding[] = []
  for (const f of violations) {
    if (isGrandfathered(f.file)) grandfathered.push(f)
    else fresh.push(f)
  }
  return { fileCount, grandfathered, fresh, population }
}

const ACT_BY_KIND: Readonly<Record<ClientPageAccessKind, string>> = {
  "pages-access-import":
    "call it from inside a @shared/pages-ui useOptimistic* wrapper, so the write is predicted and reconciled",
  "raw-from-pages":
    "read pages with usePagesSupabase from @shared/pages-ui, which shares one interned query per options shape",
  "raw-pages-subscription":
    "delete this channel and take updates from usePagesSupabase in @shared/pages-ui — a parallel subscription duplicates the realtime traffic and bypasses prediction reconciliation",
}

function formatFinding(f: ClientPageAccessFinding): string {
  return `${f.file}:${f.line}:${f.column} — [${f.kind}] ${f.callee} — ${ACT_BY_KIND[f.kind]}`
}

function main(): never {
  let flags: { json: boolean; repoRoot: string | undefined }
  try {
    flags = parseArgs(process.argv.slice(2), STANDARD_FLAGS).flags
  } catch (err) {
    return exitOnToolError({ error: err, prefix: PREFIX })
  }

  const repoRoot = flags.repoRoot ?? getRepoRoot()

  let census: Census
  try {
    census = scan(repoRoot)
  } catch (err) {
    return exitOnToolError({ error: err, prefix: PREFIX })
  }

  if (census.grandfathered.length > 0) {
    if (flags.json) {
      for (const f of census.grandfathered) {
        process.stdout.write(`${JSON.stringify({ ...f, grandfathered: true })}\n`)
      }
    } else {
      process.stdout.write(`${PREFIX} grandfathered (#8847):\n`)
      for (const f of census.grandfathered) process.stdout.write(`  - ${formatFinding(f)}\n`)
    }
  }

  return exitOnResult({
    violations: census.fresh.map((f) => ({ ...f, grandfathered: false })),
    options: {
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header:
        "new (non-grandfathered) browser-side page-access site(s) outside the client-state boundary — each line names the shape found and the act that clears it. The rule is Directive Is Not The Boundary",
      successMessage: `ENFORCING — ${census.fileCount} use-client file(s) scanned, 0 browser-side page-access site(s) outside the client-state boundary (0 direct pages-access calls, 0 raw from('pages') chains, 0 hand-rolled pages subscriptions)`,
      population: census.population,
      formatViolation: formatFinding,
    },
  })
}

if (import.meta.main) {
  main()
}
