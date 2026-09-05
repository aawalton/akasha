import type { ChangeKind } from "../change-kind.page-type.ts"

export const changeRestated = {
  id: "01a07245-0dbf-7539-b0dc-ce6281aa96e8",
  pageTypeSlug: "change-kind",
  slug: "change-restated",
  definition: "a change saying what a page already said in other words",
  runsChecks: true,
  runsWarrants: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A restated change is composed by an agent rather than by a program.",
    },
    {
      invariantKind: "departure",
      statement: "A restated change leaves what a page means unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "Only the words a page states are changed.",
    },
    {
      invariantKind: "departure",
      statement: "A rewrite narrowing what a statement binds is authored rather than restated.",
    },
    {
      invariantKind: "departure",
      statement: "Every check an authored change is judged by judges a restated change.",
    },
    {
      invariantKind: "gap",
      statement: "A restated change moving more than the words a page states is refused.",
    },
  ],
} as const satisfies ChangeKind
