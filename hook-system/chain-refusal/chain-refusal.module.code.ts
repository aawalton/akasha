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

export function judgingCalls<Call>(
  callsIn: (command: string) => readonly Call[],
  refusalFor: (call: Call) => string | null
): (command: string) => string | null {
  return (command) => refusalOver(callsIn(command), refusalFor)
}
