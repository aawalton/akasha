import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pithkaControls = {
  id: "01a0de89-fe6f-787c-9253-df980fda7cdb",
  type: "page-type/module",
  slug: "pithka-controls",
  definition: "the achievement tracker window's size, title, toggle and the controls it makes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The tracker is framed by the shared window frame, its screen named in plain text.",
    },
  ],
  createdAt: "2026-09-26T16:26:20.655Z",
  updatedAt: "2026-10-18T20:08:18.328Z",
} as const satisfies Module
