import type { ChangeKind } from "akasha/change/kind/change-kind.page-type.types.ts"

export const changeRestated = {
  id: "01a07245-0dbf-7539-b0dc-ce6281aa96e8",
  type: "page-type/change-kind",
  slug: "change-restated",
  definition: "a change saying what a page already said in other words",
  runsChecks: true,
  writerOwesReading: true,
  readersOweReading: false,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restated change owes the reading an authored change owes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every reading of a page a restatement changes answers for the page the restatement leaves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restated change is composed by an agent rather than by a program.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restated change leaves a page's meaning unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the words a page states are changed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rewrite narrowing the claim a statement binds is authored rather than restated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every check an authored change is judged by judges a restated change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restated change moving more than the words a page states is refused.",
    },
  ],
} as const satisfies ChangeKind
