import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { HelpArgAliasOfFlag } from "./help-arg-alias-of-flag.text-property.ts"
import type { HelpArgName } from "./help-arg-name.text-property.ts"
import type { HelpArgNote } from "./help-arg-note.text-property.ts"
import type { HelpArgRequired } from "./help-arg-required.boolean-property.ts"
import type { HelpArgVariadic } from "./help-arg-variadic.boolean-property.ts"

export type HelpPositional = {
  name: HelpArgName
  description: HelpArgNote
  required?: HelpArgRequired
  variadic?: HelpArgVariadic
  aliasOfFlag?: HelpArgAliasOfFlag
}

export type HelpPositionals = List<HelpPositional>

export const helpPositionals = {
  id: "01a06958-32a4-7769-8220-06fb6aba8bc1",
  pageTypeSlug: "record-property",
  slug: "help-positionals",
  propertySlug: "positionals",
  definition: "the arguments a command takes in order, with no flag naming them",
  properties: [
    { pagePropertySlug: "help-arg-name", required: true, many: false },
    { pagePropertySlug: "help-arg-note", required: true, many: false },
    { pagePropertySlug: "help-arg-required", required: false, many: false },
    { pagePropertySlug: "help-arg-variadic", required: false, many: false },
    { pagePropertySlug: "help-arg-alias-of-flag", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The entries are read in the order the entries are written.",
    },
    {
      invariantKind: "departure",
      statement: "Only the last entry takes every remaining word.",
    },
  ],
} as const satisfies RecordProperty
