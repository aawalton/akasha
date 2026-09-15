import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const composeNotices = {
  id: "01a06938-eca5-74c0-8f2c-68975c8da6f1",
  type: "module",
  slug: "compose-notices",
  definition: "every notice page rendered as one JSON object of notice slug to text",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller asking for the notices imports this module and calls rather than runs that module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notice is named by its file stem.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page renamed here is a notice gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The lines of a paragraph join with a space.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A blank line between two paragraphs stays.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notice page with nothing is answered an empty text rather than left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notice page is reached by the index rather than by listing one folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notice's words are read from the file beside that notice's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A checkout the index files no notice for is answered nothing rather than refused.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing checks that the notices asked for by slug are the notices rendered here.",
    },
  ],
} as const satisfies Module
