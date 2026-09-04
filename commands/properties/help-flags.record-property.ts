import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { HelpArgAliases } from "./help-arg-aliases.text-property.ts"
import type { HelpArgChoices } from "./help-arg-choices.text-property.ts"
import type { HelpArgDefault } from "./help-arg-default.text-property.ts"
import type { HelpArgLabel } from "./help-arg-label.text-property.ts"
import type { HelpArgName } from "./help-arg-name.text-property.ts"
import type { HelpArgNote } from "./help-arg-note.text-property.ts"
import type { HelpArgPath } from "./help-arg-path.boolean-property.ts"
import type { HelpArgRepeat } from "./help-arg-repeat.boolean-property.ts"
import type { HelpArgRequired } from "./help-arg-required.boolean-property.ts"
import type { HelpArgShape } from "./help-arg-shape.text-property.ts"
import type { HelpArgStdin } from "./help-arg-stdin.boolean-property.ts"

export type HelpFlag = {
  name: HelpArgName
  description: HelpArgNote
  argLabel?: HelpArgLabel
  valueShape?: HelpArgShape
  required?: HelpArgRequired
  default?: HelpArgDefault
  choices?: readonly HelpArgChoices[]
  repeat?: HelpArgRepeat
  acceptsStdin?: HelpArgStdin
  path?: HelpArgPath
  aliases?: readonly HelpArgAliases[]
}

export type HelpFlags = List<HelpFlag>

export const helpFlags = {
  id: "01a06958-32a5-70e4-bf56-8195caa58df4",
  pageTypeSlug: "record-property",
  slug: "help-flags",
  propertySlug: "flags",
  definition: "the arguments a command takes by name, each with how it is spelled",
  properties: [
    { pagePropertySlug: "help-arg-name", required: true, many: false },
    { pagePropertySlug: "help-arg-note", required: true, many: false },
    { pagePropertySlug: "help-arg-label", required: false, many: false },
    { pagePropertySlug: "help-arg-shape", required: false, many: false },
    { pagePropertySlug: "help-arg-required", required: false, many: false },
    { pagePropertySlug: "help-arg-default", required: false, many: false },
    { pagePropertySlug: "help-arg-choices", required: false, many: true, max: null },
    { pagePropertySlug: "help-arg-repeat", required: false, many: false },
    { pagePropertySlug: "help-arg-stdin", required: false, many: false },
    { pagePropertySlug: "help-arg-path", required: false, many: false },
    { pagePropertySlug: "help-arg-aliases", required: false, many: true, max: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag naming a value label carries a value.",
    },
    {
      invariantKind: "departure",
      statement: "A flag naming no value label carries no value.",
    },
    {
      invariantKind: "departure",
      statement: "A flag carrying a value says which of the three shapes the value has.",
    },
  ],
} as const satisfies RecordProperty
