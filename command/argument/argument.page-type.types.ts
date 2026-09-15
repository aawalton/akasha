import type { ArgumentDefault } from "akasha/command/argument/properties/argument-default.text-property.types.ts"
import type { ArgumentValue } from "akasha/command/argument/properties/argument-value.select-property.types.ts"
import type { Placeholder } from "akasha/command/argument/properties/placeholder.text-property.types.ts"
import type { Said } from "akasha/command/argument/properties/said.text-property.types.ts"
import type { Takes } from "akasha/command/argument/properties/takes.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Argument = Page & {
  said: Said
  takes: Takes
  value: ArgumentValue
  placeholder?: Placeholder
  default?: ArgumentDefault
}
