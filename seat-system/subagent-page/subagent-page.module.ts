import type { Module } from "@akasha/code/module"

export const subagentPage = {
  id: "01a06983-278f-74cd-aa22-89b32f80e5e4",
  pageTypeSlug: "module",
  slug: "subagent-page",
  definition: "the subagents standing under a seat, and their pages removed with it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "Which repositories are cloned here is asked once and held for the life of the process.",
    },
    {
      invariantKind: "departure",
      statement: "A root named by the environment is read in a process that has asked nothing yet.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is found by its id and is a seat by the page type its file name says.",
    },
  ],
} as const satisfies Module
