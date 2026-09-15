import type { Argument } from "akasha/command/argument/properties/argument.relation-property.types.ts"
import type { EntryDefault } from "akasha/command/properties/entry-default.text-property.types.ts"
import type { NotWith } from "akasha/command/properties/not-with.relation-property.types.ts"
import type { OneOf } from "akasha/command/properties/one-of.relation-property.types.ts"
import type { Repeats } from "akasha/command/properties/repeats.boolean-property.types.ts"
import type { SaidAs } from "akasha/command/properties/said-as.select-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { Required } from "akasha/page/type/properties/required.boolean-property.types.ts"

export type CommandArguments = List<{
  argument: Argument
  required?: Required
  saidAs?: SaidAs
  notWith?: NotWith
  oneOf?: OneOf
  repeats?: Repeats
  default?: EntryDefault
}>
