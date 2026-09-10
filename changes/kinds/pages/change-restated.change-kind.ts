import type { ChangeKind } from "../change-kind.page-type.types.ts"

export const changeRestated = {
  id: "01a07245-0dbf-7539-b0dc-ce6281aa96e8",
  pageTypeSlug: "change-kind",
  type: "change-kind",
  slug: "change-restated",
  definition: "a change saying what a page already said in other words",
  pluralSlug: "change-restated",
  runsChecks: true,
  writerOwesReading: true,
  readersOweReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A restated change owes the reading an authored change owes.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every reading of a page a restatement changes answers for the page the restatement leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A restated change is composed by an agent rather than by a program.",
    },
    {
      invariantKind: "departure",
      statement: "A restated change leaves a page's meaning unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "Only the words a page states are changed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rewrite narrowing the claim a statement binds is authored rather than restated.",
    },
    {
      invariantKind: "departure",
      statement: "Every check an authored change is judged by judges a restated change.",
    },
    {
      invariantKind: "departure",
      statement: "A restated change moving more than the words a page states is refused.",
    },
  ],
} as const satisfies ChangeKind
