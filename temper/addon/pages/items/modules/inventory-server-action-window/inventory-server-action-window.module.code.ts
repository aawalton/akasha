import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const ACTION_LIMIT = 95
const ACTION_WINDOW_MS = 10000
const ACTION_WINDOW_MARGIN_MS = 500
const ACTION_HELD_MS = ACTION_WINDOW_MS + ACTION_WINDOW_MARGIN_MS

let sentAt: number[] = []
let pacedRuns = 0

export function serverActionWaitMs(this: void): number {
  const now = GetGameTimeMilliseconds()
  const kept: number[] = []
  for (const at of sentAt) if (now - at < ACTION_HELD_MS) kept.push(at)
  sentAt = kept
  const oldest = kept[0]
  if (kept.length < ACTION_LIMIT || oldest === undefined) return 0
  const wait = ACTION_HELD_MS - (now - oldest)
  return wait > 0 ? wait : 1
}

export function noteServerAction(this: void): undefined {
  sentAt.push(GetGameTimeMilliseconds())
}

export function isPacingServerActions(this: void): boolean {
  return pacedRuns > 0
}

export function runPaced(
  this: void,
  steps: readonly ((this: void) => boolean)[],
  stillOpen: (this: void) => boolean,
  onDone: (this: void, finished: boolean) => undefined
): undefined {
  pacedRuns++
  let next = 0
  function step(this: void): undefined {
    while (next < steps.length) {
      if (!stillOpen()) {
        pacedRuns--
        onDone(false)
        return
      }
      const wait = serverActionWaitMs()
      if (wait > 0) {
        zo_callLater(step, wait)
        return
      }
      const send = steps[next]
      next++
      if (send?.()) noteServerAction()
    }
    pacedRuns--
    onDone(true)
  }
  step()
}
