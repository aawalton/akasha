import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const singleton = {
  id: "01a05b69-455a-7d6e-96f9-f114dbc25c52",
  type: "module",
  slug: "singleton",
  definition: "the one page store a browser tab holds",
  code: "ts",
} as const satisfies Module
