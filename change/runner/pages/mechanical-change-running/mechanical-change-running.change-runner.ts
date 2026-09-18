import type { ChangeRunner } from "akasha/change/runner/change-runner.page-type.types.ts"

export const mechanicalChangeRunning = {
  id: "01a08165-1d8f-730e-ad94-1bd3d2d9513b",
  type: "page-type/change-runner",
  slug: "mechanical-change-running",
  definition: "the changes a program names run in order and landed as one commit",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  addressed: "ts",
  reached: "page-type/change-mechanical",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A program names the changes that program wants run rather than composing the edits itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change is named by the address that change is filed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The arguments a change is handed are the arguments the map beside this binds.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No agent change is named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The changes named are run in the order the caller named those changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each change reads the world as every change before that change had already landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The edits every change answered land together as a single commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change that refuses stops the fold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal anywhere in the fold lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing another landing's hold refused answers a refusal rather than throwing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no change lands nothing and says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no change is refused as a fault of the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change that refused the fold is refused as a fault of the data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Changes that all state no edit land nothing and commit nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Naming no change and naming changes that write nothing are two answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mechanical change runs no check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that is not text refuses the landing rather than being decoded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent id is carried only where the caller has an agent id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer a caller names is the commit's author rather than the default author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that moved after the read a caller states refuses the landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller naming neither reads the tree as the commit at HEAD leaves the tree.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page is named here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller wanting what landed named in its own refusal hands in the list the landing threads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller wanting the commit itself hands in the slot the landing writes it into.",
    },
  ],
} as const satisfies ChangeRunner
