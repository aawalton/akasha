export const BYPASS_PREDICATES = ["writes-its-own-verdict", "writes-its-own-report"] as const
export type BypassPredicate = (typeof BYPASS_PREDICATES)[number]

export const BYPASS_SIZE = 3

export type EmissionRoute = "routed" | "bypass" | "inert"

export interface CheckScript {
  readonly file: string
  readonly route: EmissionRoute
}

export type ChokepointViolationKind = "undeclared-bypass" | "ratchet-mismatch"

export interface ChokepointViolation {
  readonly kind: ChokepointViolationKind
  readonly message: string
  readonly file?: string
}

export type ResolvedKind = "routed-out" | "emits-nothing" | "not-in-corpus"

export interface ResolvedBypass {
  readonly kind: ResolvedKind
  readonly file: string
}

export interface ChokepointTally {
  readonly scripts: number
  readonly routed: number
  readonly bypass: number
  readonly inert: number
  readonly undeclaredBypass: number
}

export interface ChokepointResult {
  readonly violations: readonly ChokepointViolation[]
  readonly resolved: readonly ResolvedBypass[]
  readonly tally: ChokepointTally
}

export interface ChokepointInput {
  readonly scripts: readonly CheckScript[]
  readonly bypass: ReadonlyMap<string, BypassPredicate>
  readonly ratchetCeiling?: number
}

const EMITTER_CALL = /\b(?:exitOnResult|reportViolations)\s*[<(]/
const SELF_EMISSION =
  /\bprocess\.exit\s*\(|\bconsole\.\w+\s*\(|\bprocess\.std(?:out|err)\.write\s*\(|\bBun\.(?:write\s*\(|std(?:out|err)\b)|\bwriteSync\s*\(/

export function classifyEmission(source: string): EmissionRoute {
  if (EMITTER_CALL.test(source)) return "routed"
  return SELF_EMISSION.test(source) ? "bypass" : "inert"
}

export function reconcileChokepoint(input: ChokepointInput): ChokepointResult {
  const { scripts, bypass } = input
  const ceiling = input.ratchetCeiling ?? BYPASS_SIZE
  const violations: ChokepointViolation[] = []
  const resolved: ResolvedBypass[] = []
  const corpus = new Set(scripts.map((s) => s.file))

  const counts = { routed: 0, bypass: 0, inert: 0, undeclaredBypass: 0 }

  for (const script of scripts) {
    const predicate = bypass.get(script.file)
    if (script.route === "bypass" && predicate === undefined) {
      counts.undeclaredBypass++
      violations.push({
        kind: "undeclared-bypass",
        file: script.file,
        message: `prints its own verdict without routing through violation-reporter, and is not in the declared bypass list. Route it — hand the findings to \`exitOnResult\` with a \`population\` built by \`examinePopulation\` or \`examineFilePopulation\` over the population this run walked — or add it to "bypass" and raise BYPASS_SIZE. A surface that is silently absent is how a verdict rejoins CI carrying no population at all.`,
      })
      continue
    }
    counts[script.route]++

    if (predicate !== undefined && script.route !== "bypass") {
      resolved.push({
        kind: script.route === "routed" ? "routed-out" : "emits-nothing",
        file: script.file,
      })
    }
  }

  for (const [file] of bypass) {
    if (corpus.has(file)) continue
    resolved.push({ kind: "not-in-corpus", file })
  }

  if (bypass.size !== ceiling) {
    const grew = bypass.size > ceiling
    violations.push({
      kind: "ratchet-mismatch",
      message: `the bypass list holds ${bypass.size} entries but BYPASS_SIZE is ${ceiling}, so the list ${grew ? "GREW without the constant" : "SHRANK without the constant"}. ${grew ? `The act that settles a grow is to raise BYPASS_SIZE to ${bypass.size} in the same commit that added the entry, and a bypass is admissible only where routing would degrade what the check protects. If the entry is not yours, a sibling added it and raising the number is still the whole repair.` : `The act that settles a shrink is to lower BYPASS_SIZE to ${bypass.size} in the same commit that dropped the entry. If you dropped nothing, a sibling routed a surface out and left the constant behind; lowering it is still the whole repair.`} The two are held equal in both directions on purpose: a ceiling would absorb a new bypass under leftover headroom, which is the failure this check exists to prevent.`,
    })
  }

  return { violations, resolved, tally: { scripts: scripts.length, ...counts } }
}
