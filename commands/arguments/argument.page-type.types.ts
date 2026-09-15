import type { ArgumentDefault } from "akasha/command/arguments/properties/argument-default.text-property.types.ts"
import type { ArgumentValue } from "akasha/command/arguments/properties/argument-value.select-property.types.ts"
import type { Placeholder } from "akasha/command/arguments/properties/placeholder.text-property.types.ts"
import type { Said } from "akasha/command/properties/said.text-property.types.ts"
import type { Takes } from "akasha/command/properties/takes.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type Argument = Page & {
  said: Said
  takes: Takes
  value: ArgumentValue
  placeholder?: Placeholder
  default?: ArgumentDefault
}
