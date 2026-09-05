import type { Module } from "@akasha/code-system/module"

export const composeNotices = {
  id: "01a06938-eca5-74c0-8f2c-68975c8da6f1",
  pageTypeSlug: "module",
  slug: "compose-notices",
  definition: "every notice page rendered as one JSON object of notice slug to text",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A caller asking for the notices imports this module and calls rather than runs that module.",
    },
    {
      invariantKind: "departure",
      statement: "A notice is named by its file stem, so a page renamed here is a notice gone.",
    },
    {
      invariantKind: "departure",
      statement: "The lines of a paragraph join with a space, and a blank line between two stays.",
    },
    {
      invariantKind: "departure",
      statement: "A notice page holding nothing is answered an empty text rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "A folder that is not there, or holds no notice, is refused rather than empty.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing checks that the notices asked for by slug are the notices rendered here.",
    },
  ],
} as const satisfies Module
