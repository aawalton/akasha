export interface DepartedEntry {
  readonly entry: string
  readonly carrier: string
}

export interface SuppressionSplit {
  readonly departed: readonly DepartedEntry[]
  readonly repaired: readonly string[]
}

export function splitBySubject(args: {
  readonly stale: readonly string[]
  readonly carrierOf: (entry: string) => string
  readonly liveCarriers: ReadonlySet<string>
}): SuppressionSplit {
  const departed: DepartedEntry[] = []
  const repaired: string[] = []
  for (const entry of args.stale) {
    const carrier = args.carrierOf(entry)
    if (args.liveCarriers.has(carrier)) repaired.push(entry)
    else departed.push({ entry, carrier })
  }
  return { departed, repaired }
}

export function departedDetail(args: {
  readonly departed: DepartedEntry
  readonly carrierNoun: string
}): string {
  return (
    `accepted entry \`${args.departed.entry}\` names a ${args.carrierNoun} the corpus does not ` +
    `hold: \`${args.departed.carrier}\`. It suppresses nothing and cannot again, so it is not an ` +
    `exemption — it is a line that keeps this list looking like it covers something. Re-run with ` +
    `--write to drop it.`
  )
}

export function renderTightening(args: {
  readonly prefix: string
  readonly repaired: readonly string[]
  readonly defectNoun: string
}): string {
  const n = args.repaired.length
  if (n === 0) return ""
  return (
    `\n${args.prefix} TIGHTENING AVAILABLE — ${n} accepted entr${n === 1 ? "y's" : "ies'"} ` +
    `${args.defectNoun}${n === 1 ? " is" : "s are"} gone while ${n === 1 ? "its" : "their"} ` +
    `carrier${n === 1 ? " remains" : "s remain"} in the corpus; re-run with --write to drop ` +
    `${n === 1 ? "it" : "them"}.`
  )
}

export function renderRemovals(args: {
  readonly split: SuppressionSplit
  readonly carrierNoun: string
  readonly defectNoun: string
}): string {
  const departed = args.split.departed.length
  const repaired = args.split.repaired.length
  return (
    `dropped ${departed + repaired}: ${departed} whose ${args.carrierNoun} left the corpus, ` +
    `${repaired} whose ${args.defectNoun} was deleted from a ${args.carrierNoun} still in it`
  )
}
