import type { Command } from "@akasha/command-system/command"

export const mobileSimType = {
  id: "01a0685d-ceae-700f-89c3-712a8a6e7252",
  pageTypeSlug: "command",
  slug: "mobile-sim-type",
  definition: "the command typing text into the simulator's webview",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--text <text>", takes: "the text to type" },
    { said: "--text -", takes: "the text to type, read from what is piped in" },
    {
      said: "--selector <css>",
      takes: "the element to put the cursor in first, the one already focused where none is said",
    },
  ],
  helpNotes: [
    "the element is tapped before the text goes in, since typing into an element nothing focused reaches nothing.",
    "a call naming no element types into whatever the session already has focused.",
    "the session already standing is what is typed into, so `mobile sim open-url` comes first.",
    "text too long to sit on a call is piped in and named `-`.",
    "how many characters went in is the answer, rather than the text itself.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An element named is tapped before anything is typed into it.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no element types into the one already focused.",
    },
    {
      invariantKind: "departure",
      statement: "How many characters went in is the answer rather than the text.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a session.",
    },
  ],
} as const satisfies Command
