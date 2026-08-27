import { z } from "zod"

const ONEDRIVE_SEGMENT = "OneDrive"

const ONEDRIVE_RUST_LITERAL = `"${ONEDRIVE_SEGMENT}"`

const RUST_JOIN_CALL = ".join("

const PATH_SEPARATORS = /[\\/]+/

const RUST_FN_SIGNATURE = /\bfn\s+([A-Za-z_][A-Za-z0-9_]*)/g

export type CandidateOrderVerdict = "disagreement" | "unverified"

export interface CandidateOrderViolation {
  readonly file: string
  readonly line?: number
  readonly message: string
  readonly verdict: CandidateOrderVerdict
}

export function candidateOrderHeader(args: {
  readonly violations: readonly CandidateOrderViolation[]
  readonly examinedWhole: boolean
}): string {
  const count = args.violations.length.toLocaleString()
  if (!args.examinedWhole || args.violations.some((v) => v.verdict === "unverified")) {
    return `ESO \`live/\` probe order UNVERIFIED — the two sides were not compared — ${count} finding(s)`
  }
  return `ESO \`live/\` probe-order drift — ${count} finding(s)`
}

interface RustCandidate {
  readonly offset: number
  readonly hasOneDrive: boolean
}

interface RustResolver {
  readonly fnName: string
  readonly bodyStart: number
  readonly bodyEnd: number
  readonly oneDrive: readonly RustCandidate[]
  readonly plain: readonly RustCandidate[]
}

function lineOfOffset(source: string, offset: number): number {
  let line = 1
  for (let i = 0; i < offset && i < source.length; i++) {
    if (source.charAt(i) === "\n") line++
  }
  return line
}

function findFnBodyAt(source: string, sigAt: number): { start: number; end: number } | null {
  const openAt = source.indexOf("{", sigAt)
  if (openAt < 0) return null
  let depth = 0
  for (let i = openAt; i < source.length; i++) {
    const ch = source.charAt(i)
    if (ch === "{") depth++
    else if (ch === "}") {
      depth--
      if (depth === 0) return { start: openAt + 1, end: i }
    }
  }
  return null
}

function findRustCandidates(source: string, start: number, end: number): readonly RustCandidate[] {
  const out: RustCandidate[] = []
  let stmtStart = start
  for (let i = start; i <= end; i++) {
    if (i < end && source.charAt(i) !== ";") continue
    const text = source.slice(stmtStart, i)
    const joinAt = text.indexOf(RUST_JOIN_CALL)
    if (joinAt >= 0) {
      out.push({ offset: stmtStart + joinAt, hasOneDrive: text.includes(ONEDRIVE_RUST_LITERAL) })
    }
    stmtStart = i + 1
  }
  return out
}

interface FnSignature {
  readonly name: string
  readonly index: number
}

const FnSignatureMatch = z.object({ name: z.string(), index: z.number() })

function parseFnSignature(match: RegExpExecArray | null): FnSignature | null {
  return match === null ? null : FnSignatureMatch.parse({ name: match[1], index: match.index })
}

function findRustResolvers(source: string): readonly RustResolver[] {
  const out: RustResolver[] = []
  RUST_FN_SIGNATURE.lastIndex = 0
  for (;;) {
    const signature = parseFnSignature(RUST_FN_SIGNATURE.exec(source))
    if (signature === null) break
    const fnName = signature.name
    const body = findFnBodyAt(source, signature.index)
    if (body === null) continue
    const candidates = findRustCandidates(source, body.start, body.end)
    const oneDrive = candidates.filter((c) => c.hasOneDrive)
    if (oneDrive.length === 0) continue
    out.push({
      fnName,
      bodyStart: body.start,
      bodyEnd: body.end,
      oneDrive,
      plain: candidates.filter((c) => !c.hasOneDrive),
    })
  }
  return out
}

function looseOneDriveOffsets(
  source: string,
  resolvers: readonly RustResolver[]
): readonly number[] {
  const out: number[] = []
  let from = 0
  for (;;) {
    const at = source.indexOf(ONEDRIVE_RUST_LITERAL, from)
    if (at < 0) return out
    if (!resolvers.some((r) => at >= r.bodyStart && at < r.bodyEnd)) out.push(at)
    from = at + ONEDRIVE_RUST_LITERAL.length
  }
}

function oneDriveIndexes(candidates: readonly string[]): readonly number[] {
  const out: number[] = []
  for (const [index, candidate] of candidates.entries()) {
    if (candidate.split(PATH_SEPARATORS).includes(ONEDRIVE_SEGMENT)) out.push(index)
  }
  return out
}

export interface TsCandidateOrderInput {
  readonly tsCandidates: readonly string[]
  readonly tsFile: string
  readonly rustFn: string
}

export function findTsCandidateOrderViolations(
  input: TsCandidateOrderInput
): readonly CandidateOrderViolation[] {
  const { tsCandidates, tsFile, rustFn } = input
  const shown = `[${tsCandidates.join(", ")}]`

  if (tsCandidates.length < 2) {
    return [
      {
        file: tsFile,
        message:
          `\`esoLiveDirCandidates({ platform: "win32" })\` returned ${tsCandidates.length} candidate(s) ` +
          `${shown}; win32 must enumerate both the OneDrive-redirected and the plain \`Documents\` tree — ` +
          `the agreement with \`${rustFn}\` is UNVERIFIED. ACT: restore the two-candidate win32 branch of ` +
          `\`esoLiveDirCandidates\` in ${tsFile}`,
        verdict: "unverified",
      },
    ]
  }

  const indexes = oneDriveIndexes(tsCandidates)
  if (indexes.length !== 1) {
    return [
      {
        file: tsFile,
        message:
          `\`esoLiveDirCandidates({ platform: "win32" })\` must return exactly one candidate carrying a ` +
          `\`${ONEDRIVE_SEGMENT}\` path segment; found ${indexes.length} in ${shown} — the agreement with ` +
          `\`${rustFn}\` is UNVERIFIED. ACT: in ${tsFile}, make the win32 branch build exactly one ` +
          `\`${ONEDRIVE_SEGMENT}\` candidate and one plain \`Documents\` candidate`,
        verdict: "unverified",
      },
    ]
  }
  if (indexes[0] !== 0) {
    return [
      {
        file: tsFile,
        message:
          `\`esoLiveDirCandidates({ platform: "win32" })\` returns the \`${ONEDRIVE_SEGMENT}\` candidate at ` +
          `index ${indexes[0]}, not index 0 — the TS and Rust ESO \`live/\` probe orders disagree. ACT: in ` +
          `${tsFile}, move the \`${ONEDRIVE_SEGMENT}\` candidate to index 0. The TS order is the ` +
          `SPECIFICATION and \`${rustFn}\` mirrors it, so do not reorder the Rust probe to match this`,
        verdict: "disagreement",
      },
    ]
  }
  return []
}

export interface RustSourceScanInput {
  readonly rustFile: string
  readonly rustSource: string
  readonly rustFn: string
}

export interface RustSourceScan {
  readonly violations: readonly CandidateOrderViolation[]
  readonly namedResolvers: number
  readonly resolvers: number
}

export function scanRustSource(input: RustSourceScanInput): RustSourceScan {
  const { rustFile, rustSource, rustFn } = input
  const violations: CandidateOrderViolation[] = []
  const resolvers = findRustResolvers(rustSource)

  for (const resolver of resolvers) {
    const oneDrive = resolver.oneDrive[0]
    const plain = resolver.plain[0]
    if (resolver.oneDrive.length !== 1 || resolver.plain.length !== 1 || !oneDrive || !plain) {
      violations.push({
        file: rustFile,
        line: lineOfOffset(rustSource, resolver.bodyStart),
        message:
          `\`fn ${resolver.fnName}\` builds a \`${ONEDRIVE_RUST_LITERAL}\` path candidate, so it is an ESO ` +
          `saved-vars resolver, but it holds ${resolver.oneDrive.length} OneDrive and ` +
          `${resolver.plain.length} plain \`${RUST_JOIN_CALL}…)\` candidate(s) rather than one of each — its ` +
          `order cannot be compared and the invariant is UNVERIFIED. ACT: restore the two-candidate shape ` +
          `in ${rustFile}, or teach the parser in \`lib/eso-live-dir-candidate-order.ts\` the new shape`,
        verdict: "unverified",
      })
      continue
    }
    if (oneDrive.offset > plain.offset) {
      violations.push({
        file: rustFile,
        line: lineOfOffset(rustSource, plain.offset),
        message:
          `\`fn ${resolver.fnName}\` probes the plain \`Documents\` candidate (line ` +
          `${lineOfOffset(rustSource, plain.offset)}) BEFORE the \`${ONEDRIVE_SEGMENT}\` candidate (line ` +
          `${lineOfOffset(rustSource, oneDrive.offset)}) — the TS and Rust ESO \`live/\` probe orders ` +
          `disagree. ACT: in ${rustFile}, move the \`${ONEDRIVE_RUST_LITERAL}\` candidate above the plain ` +
          `one. \`esoLiveDirCandidates()\` is the SPECIFICATION and this probe mirrors it, so change this ` +
          `file rather than the TS side`,
        verdict: "disagreement",
      })
    }
  }

  for (const offset of looseOneDriveOffsets(rustSource, resolvers)) {
    violations.push({
      file: rustFile,
      line: lineOfOffset(rustSource, offset),
      message:
        `a \`${ONEDRIVE_RUST_LITERAL}\` literal stands outside every function body this parser could read, ` +
        `so whatever it resolves is UNVERIFIED against \`esoLiveDirCandidates()\`. ACT: move it into the ` +
        `resolver it belongs to in ${rustFile}, or teach the parser in ` +
        `\`lib/eso-live-dir-candidate-order.ts\` to read where it now stands`,
      verdict: "unverified",
    })
  }

  return {
    violations,
    namedResolvers: resolvers.filter((r) => r.fnName === rustFn).length,
    resolvers: resolvers.length,
  }
}

export interface CrateProbeInput {
  readonly namedResolvers: number
  readonly rustFn: string
  readonly crateDir: string
  readonly tsFile: string
}

export function findCrateProbeViolations(
  input: CrateProbeInput
): readonly CandidateOrderViolation[] {
  const { namedResolvers, rustFn, crateDir, tsFile } = input
  if (namedResolvers === 1) return []
  if (namedResolvers === 0) {
    return [
      {
        file: crateDir,
        message:
          `no \`fn ${rustFn}\` building a \`${ONEDRIVE_RUST_LITERAL}\` candidate was found anywhere under ` +
          `${crateDir}, so the Rust mirror of \`esoLiveDirCandidates()\` in ${tsFile} could not be ` +
          `compared and the invariant is UNVERIFIED. ACT: restore the probe under that name, or update ` +
          `\`RUST_FN\` in \`checks/check-eso-live-dir-candidate-order.ts\` to the name it now carries`,
        verdict: "unverified",
      },
    ]
  }
  return [
    {
      file: crateDir,
      message:
        `${namedResolvers} functions named \`${rustFn}\` build a \`${ONEDRIVE_RUST_LITERAL}\` candidate ` +
        `under ${crateDir}; the crate must hold exactly one ESO saved-vars probe under that name or a ` +
        `caller cannot tell which one it reached. ACT: keep one and delete the rest`,
      verdict: "unverified",
    },
  ]
}
