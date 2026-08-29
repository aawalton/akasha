import type { Module } from "../../code-system/module/module.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

export type Command = Module

export const command = {
  id: "01a04a32-495b-78c7-9568-d77260d14428",
  pageTypeSlug: "page-type",
  slug: "command",
  definition: "a module reached by name from the command line",
  extendsSlug: "page-type/module",
  partSlugs: ["command/read", "command/write", "command/edit"],
  design: [
    "A command's slug is what it is invoked by, so nothing states an invocation twice.",
  ],
} as const satisfies PageType
