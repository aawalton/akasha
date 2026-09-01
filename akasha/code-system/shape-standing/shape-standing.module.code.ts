export const HYPOTHESIS = "hypothesis"

export const CODED = "coded"

export const ENFORCED = "enforced"

export type FolderShapeStanding = typeof HYPOTHESIS | typeof CODED | typeof ENFORCED

export function standingOfShape(_slug: string, _root?: string): FolderShapeStanding {
  return HYPOTHESIS
}
