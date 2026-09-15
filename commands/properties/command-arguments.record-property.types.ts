import type { Argument } from "akasha/command/arguments/properties/argument.relation-property.types.ts"
import type { Repeats } from "akasha/command/arguments/properties/repeats.boolean-property.types.ts"
import type { EntryDefault } from "akasha/command/properties/entry-default.text-property.types.ts"
import type { NotWith } from "akasha/command/properties/not-with.relation-property.types.ts"
import type { OneOf } from "akasha/command/properties/one-of.relation-property.types.ts"
import type { SaidAs } from "akasha/command/properties/said-as.select-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { Required } from "akasha/pages/types/properties/required.boolean-property.types.ts"

export type CommandArguments = List<{
  argument: Argument
  required?: Required
  saidAs?: SaidAs
  notWith?: NotWith
  oneOf?: OneOf
  repeats?: Repeats
  default?: EntryDefault
}>
