export const HYPOTHESIS = "hypothesis"

export const CODED = "coded"

export const ENFORCED = "enforced"

export type Stage = typeof HYPOTHESIS | typeof CODED | typeof ENFORCED

export function stageOf(_slug: string, _root?: string): Stage {
  return HYPOTHESIS
}
