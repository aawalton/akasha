import ts from "typescript"
import type { RemediationDoc } from "../remediation-doc/remediation-doc.module.code.ts"

export interface NormalizedFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly message: string
  readonly groupKey: string
}

export interface SyntaxScannerEntry {
  readonly name: string
  readonly preFileSkip?: (rel: string, repoRoot: string) => boolean
  readonly findFindings: (sf: ts.SourceFile, repoRoot: string) => readonly NormalizedFinding[]
  readonly successMessage: string
  readonly remediationDoc?: RemediationDoc
}

export const scannerGroupKey = (args: {
  readonly name: string
  readonly findings: number
  readonly files: number
  readonly remediationDoc?: RemediationDoc
}): string => {
  const counts = `[${args.name}] ${args.findings.toLocaleString()} finding(s) across ${args.files.toLocaleString()} file(s)`
  return args.remediationDoc == null ? counts : `${counts} → see ${args.remediationDoc}`
}

export interface DispatchedBucket {
  readonly name: string
  readonly findings: readonly NormalizedFinding[]
  readonly offered: number
  readonly weighed: number
}

export interface ScannerTally {
  findings: readonly NormalizedFinding[]
  offered: number
  weighed: number
}

export const newScannerTallies = (count: number): readonly ScannerTally[] =>
  Array.from({ length: count }, () => ({ findings: [], offered: 0, weighed: 0 }))

export const offerFileToEntries = (args: {
  readonly entries: readonly SyntaxScannerEntry[]
  readonly tallies: readonly ScannerTally[]
  readonly rel: string
  readonly repoRoot: string
  readonly sourceFile: ts.SourceFile
}): undefined => {
  for (let i = 0; i < args.entries.length; i += 1) {
    const entry = args.entries[i]
    const tally = args.tallies[i]
    if (entry === undefined || tally === undefined) continue
    tally.offered += 1
    if (entry.preFileSkip?.(args.rel, args.repoRoot) === true) continue
    tally.weighed += 1
    const found = entry.findFindings(args.sourceFile, args.repoRoot)
    if (found.length > 0) tally.findings = [...tally.findings, ...found]
  }
}

export const closeScannerTallies = (args: {
  readonly entries: readonly SyntaxScannerEntry[]
  readonly tallies: readonly ScannerTally[]
}): readonly DispatchedBucket[] =>
  args.entries.map((entry, idx) => {
    const tally = args.tallies[idx]
    return {
      name: entry.name,
      findings: tally?.findings ?? [],
      offered: tally?.offered ?? 0,
      weighed: tally?.weighed ?? 0,
    }
  })

export const scriptKindFor = (filePath: string): ts.ScriptKind => {
  if (filePath.endsWith(".tsx")) return ts.ScriptKind.TSX
  if (filePath.endsWith(".jsx")) return ts.ScriptKind.JSX
  if (filePath.endsWith(".mjs") || filePath.endsWith(".cjs") || filePath.endsWith(".js")) {
    return ts.ScriptKind.JS
  }
  return ts.ScriptKind.TS
}

export const dispatchToEntries = (args: {
  readonly files: Iterable<{ readonly rel: string; readonly source: string }>
  readonly entries: readonly SyntaxScannerEntry[]
  readonly repoRoot: string
}): readonly DispatchedBucket[] => {
  const tallies = newScannerTallies(args.entries.length)
  for (const { rel, source } of args.files) {
    const sourceFile = ts.createSourceFile(
      rel,
      source,
      ts.ScriptTarget.Latest,
      true,
      scriptKindFor(rel)
    )
    offerFileToEntries({
      entries: args.entries,
      tallies,
      rel,
      repoRoot: args.repoRoot,
      sourceFile,
    })
  }
  return closeScannerTallies({ entries: args.entries, tallies })
}
