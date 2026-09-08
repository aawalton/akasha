export const TICKS_BEFORE_ENDING = 3

export interface TickRatchet {
  readonly worked: () => undefined
  readonly threw: () => number
  readonly spent: () => boolean
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
    worked: (): undefined => {
      run = 0
      return undefined
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
