import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const collectionsEntry = {
  id: "01a0624c-a660-733f-be75-ba33c296eec3",
  type: "page-type/module",
  slug: "collections-entry",
  definition: "the modules the collections feature runs as the bundle loads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "No tracker starts before the game says the add-on has loaded.",
    },
  ],
  createdAt: "2026-09-02T13:26:25.632Z",
  updatedAt: "2026-09-22T02:53:52.000Z",
} as const satisfies Module
