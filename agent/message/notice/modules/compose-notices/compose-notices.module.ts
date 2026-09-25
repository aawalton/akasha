import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const composeNotices = {
  id: "01a06938-eca5-74c0-8f2c-68975c8da6f1",
  type: "page-type/module",
  slug: "compose-notices",
  definition: "how code reads the words of every notice with the notice's name",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller asking for the notices imports this module and calls rather than runs that module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice is named by its file stem.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page renamed here is a notice gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lines of a paragraph join with a space.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blank line between two paragraphs stays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice page with nothing is answered an empty text rather than left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice page is reached by the index rather than by listing one folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice's words are read from the file beside that notice's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A checkout the index files no notice for is answered nothing rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice asked for by a slug no page has is refused rather than sent empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Code asks for a notice by the slug of the page it imports, so a notice renamed fails the typecheck.",
    },
  ],
} as const satisfies Module
