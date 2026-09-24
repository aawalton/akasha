export const SETTLED = "settled"

export const FOLLOWING_ON = "following on"

export function outcomeOf(run: Promise<unknown>, ms: number): Promise<string> {
  return Promise.race([
    run.then(() => SETTLED),
    new Promise<string>((say) => {
      setTimeout(() => say(FOLLOWING_ON), ms)
    }),
  ])
}
