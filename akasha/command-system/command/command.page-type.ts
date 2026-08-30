import type { Module } from "../../code-system/module/module.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { HelpNotes } from "./properties/help-notes.text-property.ts"
import type { Mechanical } from "./properties/mechanical.boolean-property.ts"
import type { Taking } from "./properties/taking.record-property.ts"

export type Command = Module & {
  mechanical?: Mechanical
  taking?: Taking
  helpNotes?: readonly HelpNotes[]
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
    "text-property/help-notes",
    "text-property/said",
    "text-property/takes",
  ],
  extendsSlug: "page-type/module",
  loadedBySlug: "module/calling",
  properties: [
    { pagePropertySlug: "mechanical", required: false, many: false },
    { pagePropertySlug: "taking", required: false, many: true, max: null },
    { pagePropertySlug: "help-notes", required: false, many: true, max: null },
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
