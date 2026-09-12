import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimScreenshot = {
  id: "01a0685d-ceae-700b-913b-dbf3c509a388",
  type: "command",
  slug: "mobile-sim-screenshot",
  definition: "the command taking a picture of the simulator screen and saying where it was put",
  code: "ts",
  taking: [
    {
      said: "--output <path>",
      takes:
        "where to put the picture, a file named for this moment in the temp folder where none is said",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A picture is of the whole screen rather than of the webview alone.",
    },
    {
      invariantKind: "absence",
      statement: "No folder a path names is made here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A picture is taken of the session already there rather than of a session opened here.",
    },
    {
      invariantKind: "departure",
      statement: "The path the picture was put at is the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no path names one for the moment that call was called at.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the picture back.",
    },
  ],
  name: "screenshot",
} as const satisfies Command
