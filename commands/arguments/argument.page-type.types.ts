import type { ArgumentValue } from "akasha/commands/arguments/properties/argument-value.select-property.types.ts"
import type { Placeholder } from "akasha/commands/arguments/properties/placeholder.text-property.types.ts"
import type { Repeats } from "akasha/commands/arguments/properties/repeats.boolean-property.types.ts"
import type { Said } from "akasha/commands/properties/said.text-property.types.ts"
import type { Takes } from "akasha/commands/properties/takes.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type Argument = Page & {
  said: Said
  takes: Takes
  value: ArgumentValue
  placeholder?: Placeholder
  repeats?: Repeats
}
