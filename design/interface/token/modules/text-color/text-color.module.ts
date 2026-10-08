import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const textColor = {
  id: "01a05c97-5302-71a3-b9f8-f3bbd1c59f22",
  type: "page-type/module",
  slug: "text-color",
  definition: "the greys text is drawn in, by how much of the reader's attention it is owed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Text falls towards its surface as the text matters less.",
    },
  ],
  createdAt: "2026-09-01T10:50:16.194Z",
  updatedAt: "2026-09-15T18:34:11.000Z",
} as const satisfies Module
