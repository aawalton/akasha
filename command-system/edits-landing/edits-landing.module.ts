import type { Module } from "@akasha/code/module"

export const editsLanding = {
  id: "01a08132-ea7c-7ba6-972a-e1a6c95b5b76",
  pageTypeSlug: "module",
  slug: "edits-landing",
  definition: "the edits a program's changes answer landed onto the tree as one commit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A program names the changes it wants run rather than composing the edits itself.",
    },
    {
      invariantKind: "departure",
      statement: "A change is named by the address that change is filed under.",
    },
    {
      invariantKind: "departure",
      statement: "The arguments a change is handed are the arguments that change's own map binds.",
    },
    {
      invariantKind: "departure",
      statement: "The changes named are run in the order the caller named them.",
    },
    {
      invariantKind: "departure",
      statement: "Each change reads the world as every change before it had already landed.",
    },
    {
      invariantKind: "departure",
      statement: "The edits every change answered land together as one commit.",
    },
    {
      invariantKind: "departure",
      statement: "A change that refuses stops the fold, so no change after that change runs.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal anywhere in the fold lands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no change lands nothing and says so.",
    },
    {
      invariantKind: "departure",
      statement: "A mechanical change runs no check, as the kind of change it is declares.",
    },
    {
      invariantKind: "departure",
      statement: "The guards a change's page names run over that change's answer.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text refuses the landing rather than being decoded.",
    },
    {
      invariantKind: "departure",
      statement: "An agent id is carried only where the caller has one.",
    },
    {
      invariantKind: "absence",
      statement: "No page is named here, as a landing keeps nothing beside a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the tree, as the landing this reaches writes the tree.",
    },
    {
      invariantKind: "gap",
      statement: "The changes folded here are proved apart from the landing they are handed to.",
    },
  ],
} as const satisfies Module
