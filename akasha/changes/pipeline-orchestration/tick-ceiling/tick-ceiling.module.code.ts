import { LOG } from "../orchestrator-log/orchestrator-log.module.code.ts"

export interface Ceiling {
  readonly reached: () => boolean
  readonly refuse: (waitingOn: string) => Error
}

export function ceilingIn(ms: number): Ceiling {
  const until = Date.now() + ms
  return {
    reached: () => Date.now() >= until,
    refuse: (waitingOn) =>
      new Error(
        `${LOG} a tick was still ${waitingOn} ${ms}ms after it started, so it ended rather ` +
          "than leaving a second tick to start beside it"
      ),
  }
}
