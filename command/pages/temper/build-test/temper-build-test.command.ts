import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperBuildTest = {
  id: "01a13be0-99cc-767e-aaa4-e90e397d6fd1",
  type: "page-type/command",
  slug: "temper-build-test",
  definition: "the command running the tests of what a character build is worked out from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tests run are every test under the folder holding character builds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder named narrows the run to the tests under that folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder outside the one holding character builds is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tests run the way a landing runs them, each file on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that failed is named with what its run printed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lands a change.",
    },
  ],
  name: "build-test",
  arguments: [{ argument: "argument/within" }, { argument: "argument/json" }],
  createdAt: "2026-10-14T19:25:37.611Z",
  updatedAt: "2026-10-14T19:25:37.611Z",
} as const satisfies Command
