import type { Module } from "../../code-system/module/module.page-type.ts"
import type { Notes } from "../../domain-system/initiative/properties/notes.text-property.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Mechanical } from "./properties/mechanical.boolean-property.ts"
import type { Taking } from "./properties/taking.record-property.ts"

export type Command = Module & {
  mechanical?: Mechanical
  taking?: Taking
  notes?: readonly Notes[]
}

export const command = {
  id: "01a04bdd-596d-7b81-9204-1a882f474a5f",
  pageTypeSlug: "page-type",
  slug: "command",
  definition: "a module reached by name from the command line",
  pluralSlug: "commands",
  partSlugs: [
    "boolean-property/mechanical",
    "command/audit",
    "command/edit",
    "command/index",
    "command/lint",
    "command/move",
    "command/read",
    "command/remove",
    "command/test",
    "command/write",
    "record-property/taking",
    "text-property/said",
    "text-property/takes",
  ],
  extendsSlug: "page-type/module",
  properties: [
    { pagePropertySlug: "mechanical", required: false, many: false },
    { pagePropertySlug: "taking", required: false, many: true, max: null },
    { pagePropertySlug: "notes", required: false, many: true, max: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command's slug is what it is invoked by.",
    },
    {
      invariantKind: "departure",
      statement: "A command's page states what it takes and what is worth knowing about taking it.",
    },
  ],
} as const satisfies PageType
