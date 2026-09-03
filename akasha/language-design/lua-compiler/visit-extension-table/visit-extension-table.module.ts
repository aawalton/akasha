import type { Module } from "@akasha/code-system/module"

export const visitExtensionTable = {
  id: "01a06758-8eba-7000-a39a-bcf4e6fc9db9",
  pageTypeSlug: "module",
  slug: "visit-extension-table",
  definition:
    "the raw table Lua a get, set, has, delete, addKey, or isEmpty extension call becomes",
  code: "ts",
} as const satisfies Module
