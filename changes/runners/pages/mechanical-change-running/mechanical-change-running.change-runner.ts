import type { ChangeRunner } from "../../change-runner.page-type.ts"

export const mechanicalChangeRunning = {
  id: "01a08165-1d8f-730e-ad94-1bd3d2d9513b",
  pageTypeSlug: "change-runner",
  slug: "mechanical-change-running",
  definition: "the changes a program names run in order and landed as one commit",
  code: "ts",
  test: "ts",
  addressed: "ts",
  reached: "page-type/change-mechanical",
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
      statement: "The arguments a change is handed are the arguments the map beside this binds.",
    },
    {
      invariantKind: "absence",
      statement: "No agent change is named here, as the map beside this has none.",
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
      statement: "The guards the changes named reach run once over the answer the fold gathered.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change to a generated file's content is refused whatever guards the changes name.",
    },
    {
      invariantKind: "departure",
      statement: "The world a guard judges is read before the first change in the fold runs.",
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
      statement: "Changes that all state no edit land nothing and commit nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Naming no change and naming changes that write nothing are two answers.",
    },
    {
      invariantKind: "departure",
      statement: "A mechanical change runs no check, as the kind of change it is declares.",
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
      invariantKind: "departure",
      statement: "The writer a caller names is the commit's author rather than the default author.",
    },
    {
      invariantKind: "departure",
      statement: "A body that moved since the read a caller states refuses the landing.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming neither reads the tree as the commit at HEAD leaves it.",
    },
    {
      invariantKind: "absence",
      statement: "No page is named here, as a landing keeps nothing beside a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the tree, as the landing this reaches writes the tree.",
    },
  ],
} as const satisfies ChangeRunner
