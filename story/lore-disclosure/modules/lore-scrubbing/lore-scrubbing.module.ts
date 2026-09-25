import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreScrubbing = {
  id: "01a0da6b-b93f-789a-a8cd-4da980b5664a",
  type: "page-type/module",
  slug: "lore-scrubbing",
  definition:
    "what an akasha call prints a game master's seat, with the world builder's lore left out",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game master's call runs as a child whose every printed line is judged here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every command is judged alike, whatever it prints and however it prints it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose a withheld page states is what is looked for, and no id, type or slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every copy of a withheld page in any tree lends its prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line carrying five words of that prose in a row is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Prose shorter than five words is left out only where it is whole on the line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Words are compared without case or punctuation, so an escaped copy is left out too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call that left a line out says how many, and names nothing from the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call by any other seat is printed as though this module were not there.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A file or image a call writes is not judged here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A sentence a call breaks across two lines is judged as two lines.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Prose a withheld page held before its latest body lends nothing.",
    },
  ],
} as const satisfies Module
