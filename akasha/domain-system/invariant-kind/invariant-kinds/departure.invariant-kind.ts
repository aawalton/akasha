import type { InvariantKind } from "../invariant-kind.page-type.ts"

export const departure = {
  id: "01a04e11-9f98-742c-ba51-d96396b9ea5f",
  pageTypeSlug: "invariant-kind",
  slug: "departure",
  definition: "a decision a reader would not guess right",
  invariantGroupSlug: "invariant-group/design",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Knowing a departure stops a reader undoing it.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Guess It First",
      act: "Delete a departure the domain's definition already implies.",
      warrant:
        "A departure is what a reader would not guess, so one that is guessed was never one.",
      aids: [
        "Ask what a reader might have chosen instead, never whether this one is obvious.",
        "An absurd alternative every time is slop, a plausible one a departure, the rest Alan's.",
      ],
    },
  ],
} as const satisfies InvariantKind
