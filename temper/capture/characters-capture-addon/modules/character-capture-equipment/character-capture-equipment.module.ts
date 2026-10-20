import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureEquipment = {
  id: "01a0616b-69ef-7681-b39d-d35c456d1dc4",
  type: "page-type/module",
  slug: "character-capture-equipment",
  definition: "what the character is wearing, read slot by slot into codec indices",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A worn armor weight is captured at the place the player weight pages state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each worn piece's level is captured from the level and champion points it requires.",
    },
  ],
  createdAt: "2026-09-02T09:20:24.559Z",
  updatedAt: "2026-10-20T17:44:08.462Z",
} as const satisfies Module
