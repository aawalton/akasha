import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { HelpArgDefault } from "./help-arg-default.text-property.ts"
import type { HelpArgName } from "./help-arg-name.text-property.ts"
import type { HelpArgNote } from "./help-arg-note.text-property.ts"
import type { HelpArgPath } from "./help-arg-path.boolean-property.ts"
import type { HelpArgRequired } from "./help-arg-required.boolean-property.ts"

export type HelpEnvVar = {
  name: HelpArgName
  description: HelpArgNote
  required?: HelpArgRequired
  default?: HelpArgDefault
  path?: HelpArgPath
}

export type HelpEnvVars = List<HelpEnvVar>

export const helpEnvVars = {
  id: "01a06958-32a6-72b1-94f1-ff16d9318ced",
  pageTypeSlug: "record-property",
  slug: "help-env-vars",
  propertySlug: "env-vars",
  definition: "the environment variables a command reads",
  properties: [
    { pagePropertySlug: "help-arg-name", required: true, many: false },
    { pagePropertySlug: "help-arg-note", required: true, many: false },
    { pagePropertySlug: "help-arg-required", required: false, many: false },
    { pagePropertySlug: "help-arg-default", required: false, many: false },
    { pagePropertySlug: "help-arg-path", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A variable a command only forwards to a child is named here too.",
    },
  ],
} as const satisfies RecordProperty
