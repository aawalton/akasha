const HYPOTHESIS = "hypothesis"

const CODED = "coded"

const ENFORCED = "enforced"

export type Stage = typeof HYPOTHESIS | typeof CODED | typeof ENFORCED

export function stageOf(_slug: string, _root?: string): Stage {
  return HYPOTHESIS
}
