import type { Command } from "akasha/command/command.page-type.types.ts"

export const mobileSimScreenshot = {
  id: "01a0685d-ceae-700b-913b-dbf3c509a388",
  type: "page-type/command",
  slug: "mobile-sim-screenshot",
  definition: "the command taking a picture of the simulator screen and saying where it was put",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture is of the whole screen rather than of the webview alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No folder a path names is made here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A picture is taken of the session already there rather than of a session opened here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The path the picture was put at is the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no path names one for the moment that call was called at.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the picture back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the context switch attaching to the webview already made.",
    },
  ],
  name: "screenshot",
  arguments: [{ argument: "argument/output" }],
} as const satisfies Command
