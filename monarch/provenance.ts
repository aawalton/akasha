export type DecidedSource =
  | "programmatic-categorization"
  | "semantic-categorization"
  | "manual-categorization"

export interface CategoryDecision {
  readonly source: DecidedSource
  readonly decidedBy: string
}

export interface RecordedDecision {
  readonly "category-source": DecidedSource
  readonly "category-decided-by": string
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
  return { "category-source": decision.source, "category-decided-by": decidedBy }
}
