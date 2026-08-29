export function refusalOver<Call>(
  calls: readonly Call[],
  refusalFor: (call: Call) => string | null
): string | null {
  for (const call of calls) {
    const reason = refusalFor(call)
    if (reason !== null) return reason
  }
  return null
}
