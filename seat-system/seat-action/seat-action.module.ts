import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const seatAction = {
  id: "01a069bd-bdc4-7370-ba29-d4c25882427e",
  type: "module",
  slug: "seat-action",
  definition: "the action asked of a seat's supervisor, set and then waited on until it clears",
  code: "ts",
} as const satisfies Module
