import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnKeeping = {
  id: "01a0e3fa-914f-7ad2-99b7-5d6767c07638",
  type: "page-type/module",
  slug: "turn-keeping",
  definition: "the edits recorders keep beside a played turn until the turn lands them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A written chapter keeps edits beside it as a played turn does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Edits given back leave the turn and are kept beside the caller's page again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kept edit to the turn's own page is lifted into the turn's values.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A kept edit that no longer fits is derived again from the lines it changes, onto the page now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A kept edit whose new lines the page holds already goes rather than landing twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is derived again is kept only once every edit kept beside the turn fits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A kept edit fitting nothing refuses the landing, naming that edit and the call taking it away.",
    },
  ],
} as const satisfies Module
