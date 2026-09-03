export type DecidedSource =
  | "programmatic-categorization"
  | "semantic-categorization"
  | "manual-categorization"

export interface CategoryDecision {
  readonly source: DecidedSource
  readonly decidedBy: string
}

export interface RecordedDecision {
  readonly categorySource: DecidedSource
  readonly categoryDecidedBy: string
}

export function recordDecision(decision: CategoryDecision): RecordedDecision {
  const decidedBy = decision.decidedBy.trim()
  if (decidedBy === "") {
    throw new Error(
      `a ${decision.source} decision named nothing that decided it. Provenance carrying only a ` +
        "class records that something automatic happened and loses the one thing anyone can " +
        "take issue with, which is the whole reason this is written down."
    )
  }
  return { categorySource: decision.source, categoryDecidedBy: decidedBy }
}
