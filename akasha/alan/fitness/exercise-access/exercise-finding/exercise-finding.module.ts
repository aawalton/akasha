import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const exerciseFinding = {
  id: "01a0685c-7d81-7f18-87a1-21b38630ecee",
  pageTypeSlug: "module",
  slug: "exercise-finding",
  definition: "reaching the one exercise or the one session a caller named in a few words",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is named by its id, by its slug, by its whole title or by part of one.",
    },
    {
      invariantKind: "departure",
      statement: "The id is looked for first and the part of a title last.",
    },
    {
      invariantKind: "departure",
      statement: "A name matching more than one page is refused with the candidates said.",
    },
    {
      invariantKind: "departure",
      statement: "The session a call falls to is the open one when the caller names none.",
    },
    {
      invariantKind: "departure",
      statement: "An open session left over from an earlier day is refused rather than written to.",
    },
    {
      invariantKind: "departure",
      statement: "The day a session is judged against is the ESO day.",
    },
  ],
} as const satisfies Module
