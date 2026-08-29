import type { Module } from "../../code-system/module/module.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

export type Command = Module

export const command = {
  id: "01a04bdd-596d-7b81-9204-1a882f474a5f",
  pageTypeSlug: "page-type",
  slug: "command",
  definition: "a module reached by name from the command line",
  extendsSlug: "page-type/module",
  design: [
    {
      invariantKind: "departure",
      statement: "A command's slug is what it is invoked by.",
    },
    {
      invariantKind: "departure",
      statement: "A command is handed what it needs from outside as one value.",
    },
  ],
} as const satisfies PageType
