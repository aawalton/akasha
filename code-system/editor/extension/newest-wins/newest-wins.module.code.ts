export function newestWins<Ask>(
  run: (ask: Ask) => Promise<undefined>
): (ask: Ask) => Promise<undefined> {
  let inFlight: Promise<undefined> | undefined
  let waiting: { readonly ask: Ask } | undefined
  return async (ask: Ask): Promise<undefined> => {
    waiting = { ask }
    const held = inFlight
    if (held !== undefined) {
      await held.catch(() => undefined)
      return undefined
    }
    let thrown: { readonly err: unknown } | undefined
    while (waiting !== undefined) {
      const next = waiting.ask
      waiting = undefined
      try {
        const started = run(next)
        inFlight = started
        await started
      } catch (err) {
        thrown ??= { err }
      } finally {
        inFlight = undefined
      }
    }
    if (thrown !== undefined) throw thrown.err
    return undefined
  }
}
