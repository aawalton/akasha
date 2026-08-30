export const HYPOTHESIS = "hypothesis"

export const CODED = "coded"

export const ENFORCED = "enforced"

export type FolderShapeStatus = typeof HYPOTHESIS | typeof CODED | typeof ENFORCED

export function statusOfShape(_slug: string, _root?: string): FolderShapeStatus {
  return HYPOTHESIS
}
