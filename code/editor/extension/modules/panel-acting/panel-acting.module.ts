import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const panelActing = {
  id: "01a0d580-0e69-7818-baed-910e0b3678b7",
  type: "page-type/module",
  slug: "panel-acting",
  definition: "the editor and the harness call an editor panel's act is handed",
  code: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every panel act takes the editor and the harness call it is handed from here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The editor is the part of the editor's window some panel act reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every panel act is handed that whole part, even where the act reaches less.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The harness call is typed as the harness's own call rather than spelled again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
