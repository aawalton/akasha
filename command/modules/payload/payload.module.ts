import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const payload = {
  id: "01a06984-c896-7000-ada1-908266f4c9b0",
  type: "page-type/module",
  slug: "payload",
  definition: "the body a call carries, taken as JSON and checked for the keys it owes",
  code: "ts",
} as const satisfies Module
