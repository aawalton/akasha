import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const ioProbe = {
  id: "01a0695a-d2ea-7a83-ac29-18a8a68f3c6d",
  type: "module",
  slug: "io-probe",
  definition: "the moment an agent's transcript last changed, and the closing bytes of it",
  code: "ts",
} as const satisfies Module
