import type { Module } from "@akasha/code/module"

export const composeNotices = {
  id: "01a06938-eca5-74c0-8f2c-68975c8da6f1",
  pageTypeSlug: "module",
  type: "module",
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
      statement: "A notice is named by its file stem.",
    },
    {
      invariantKind: "departure",
      statement: "A page renamed here is a notice gone.",
    },
    {
      invariantKind: "departure",
      statement: "The lines of a paragraph join with a space.",
    },
    {
      invariantKind: "departure",
      statement: "A blank line between two paragraphs stays.",
    },
    {
      invariantKind: "departure",
      statement: "A notice page with nothing is answered an empty text rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "A notice page is reached by the index rather than by listing one folder.",
    },
    {
      invariantKind: "departure",
      statement: "A notice's words are read from the file beside that notice's page.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout the index files no notice for is refused rather than answered empty.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing checks that the notices asked for by slug are the notices rendered here.",
    },
  ],
} as const satisfies Module
