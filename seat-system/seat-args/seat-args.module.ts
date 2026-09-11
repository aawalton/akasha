import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const seatArgs = {
  id: "01a069c3-5533-7b9b-9290-2484a84d93c7",
  type: "module",
  slug: "seat-args",
  definition: "every flag and token `bun tools/seat.ts` takes, read into one stated shape",
  code: "ts",
} as const satisfies Module
