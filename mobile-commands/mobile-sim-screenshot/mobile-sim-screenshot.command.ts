import type { Command } from "@akasha/command-system/command"

export const mobileSimScreenshot = {
  id: "01a0685d-ceae-700b-913b-dbf3c509a388",
  pageTypeSlug: "command",
  slug: "mobile-sim-screenshot",
  definition: "the command taking a picture of the simulator screen and saying where it was put",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--out <path>",
      takes:
        "where to put the picture, a file named for this moment in the temp folder where none is said",
    },
  ],
  helpNotes: [
    "the path is answered so that whatever called this can read the picture itself.",
    "the session already standing is what is pictured, so `mobile sim open-url` comes first.",
    "the picture is of the whole screen rather than of the webview alone.",
    "a path said is taken as it stands, and a folder that is not there is not made here.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A picture is taken of the session already standing rather than of one opened here.",
    },
    {
      invariantKind: "departure",
      statement: "The path the picture was put at is the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no path names one for the moment it was called at.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the picture back.",
    },
  ],
} as const satisfies Command
