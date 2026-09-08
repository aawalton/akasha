const DASH = "-"

export type Named = { readonly named: string | null } | { readonly why: string }

export function subagentIn(argv: readonly string[], said: string): Named {
  if (argv.length > 1) {
    return { why: `a ${said} names one subagent or none, and this call named more` }
  }
  const one = argv[0]
  if (one === undefined) return { named: null }
  if (one.startsWith(DASH)) {
    return { why: `a ${said} names a subagent as a bare word, and takes no flag` }
  }
  return { named: one }
}
