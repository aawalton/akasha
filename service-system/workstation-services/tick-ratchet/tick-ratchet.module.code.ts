// A tick loop that catches its own throw and logs it leaves systemd nothing to look at: the unit
// reads `active (running)` while the work has stopped. `surplus-fall-notifier` read green that
// way from 2026-08-23 to 2026-09-01, throwing on every one of its five-minute ticks.
//
// A ratchet counts the throws that follow one another. One throw is a store blinking; enough of
// them in a row is a service that has stopped working, and a service that has stopped working
// has to stop running, because a dead process is the only thing systemd can see.
//
// The count resets on any tick that works, so a loop that recovers never ends.

export const TICKS_BEFORE_ENDING = 3

export interface TickRatchet {
  /** A tick worked. The run of throws goes back to nothing. */
  readonly worked: () => void
  /** A tick threw. Answers how many have thrown in a row, counting this one. */
  readonly threw: () => number
  /** Whether the run of throws has reached the threshold, so the process should end. */
  readonly spent: () => boolean
  /** What to log on the way out, naming the count and the threshold. */
  readonly why: () => string
}

export function tickRatchet(name: string, threshold: number = TICKS_BEFORE_ENDING): TickRatchet {
  if (!Number.isInteger(threshold) || threshold < 1) {
    throw new Error(
      `tickRatchet: \`${name}\` set a threshold of ${threshold}, and a run of throws is counted in whole ticks from one`
    )
  }
  let run = 0
  return {
    worked: (): void => {
      run = 0
    },
    threw: (): number => {
      run += 1
      return run
    },
    spent: (): boolean => run >= threshold,
    why: (): string =>
      `${name} has thrown on ${run} ticks in a row, which is the ${threshold} it is allowed; ` +
      "ending nonzero so the unit fails rather than reading healthy while it does nothing",
  }
}
