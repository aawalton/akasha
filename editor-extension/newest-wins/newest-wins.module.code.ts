// ONE RUN AT A TIME, WITH THE NEWEST ASK RUN AFTER THE RUN IN FLIGHT RATHER THAN DROPPED.
//
// Two parts of the editor held a run in flight and answered a second ask by waiting on that run
// and returning. Waiting reads as care and drops the ask: a turn state read off the file while a
// drawing was under way was recorded as read and then never drawn, so the agents panel sat on the
// older state until some later write happened along. Measured on the panel under node, two states
// written 4ms apart drew once and left the first of the two on the rows for as long as the fleet
// stayed quiet.
//
// The ask waiting is replaced rather than queued, because every ask here carries a whole picture
// and the newest one says everything the ones before it said.
//
// A run that throws does not take the ask behind it down, this whole module being here so that an
// ask is not dropped. The throw is carried past the drain and answered to whoever started the run.

export function newestWins<Ask>(
  run: (ask: Ask) => Promise<undefined>
): (ask: Ask) => Promise<undefined> {
  let inFlight: Promise<undefined> | undefined
  let waiting: { readonly ask: Ask } | undefined
  return async (ask: Ask): Promise<undefined> => {
    // The ask is wrapped, so an ask that is itself nothing is still an ask waiting.
    waiting = { ask }
    const held = inFlight
    if (held !== undefined) {
      // The run in flight is somebody else's ask, so its throw is not this caller's to answer.
      // Letting it through rejected every caller that only wanted to hand its ask over.
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
