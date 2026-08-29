import type { Module } from "../../code-system/module/module.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Mechanical } from "./properties/mechanical.boolean-property.ts"

export type Command = Module & {
  mechanical?: Mechanical
}

export const command = {
  id: "01a04bdd-596d-7b81-9204-1a882f474a5f",
  pageTypeSlug: "page-type",
  slug: "command",
  definition: "a module reached by name from the command line",
  partSlugs: [
    "boolean-property/mechanical",
    "command/edit",
    "command/index",
    "command/move",
    "command/read",
    "command/remove",
    "command/test",
    "command/write",
  ],
  extendsSlug: "page-type/module",
  properties: [{ pagePropertySlug: "mechanical", required: false, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command's slug is what it is invoked by.",
    },
  ],
} as const satisfies PageType
