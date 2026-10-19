import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sandboxLibraryReading = {
  id: "01a0d8b3-a671-7c01-8350-dea07853dd82", type: "page-type/module",
  slug: "sandbox-library-reading",
  definition: "the reading of the game's Lua sandbox out of the sandbox library catalog's capture",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sandbox is read out of the capture landed beside its catalog domain page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Names and members are sorted, so one capture writes the same body twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value of the wrong kind is passed over rather than coerced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No capture reads as nothing.",
    },
  ],
  createdAt: "2026-09-25T13:14:07.345Z",
  updatedAt: "2026-10-19T17:45:09.577Z",
} as const satisfies Module
