import type { Module } from "@akasha/code-system/module"

export const savedVarsProtected = {
  id: "01a06177-abfb-7cce-951b-33a950d4c7a3",
  pageTypeSlug: "module",
  slug: "saved-vars-protected",
  definition:
    "the path into a saved variable table, and the copy a migration makes along that path",
  code: "ts",
} as const satisfies Module
