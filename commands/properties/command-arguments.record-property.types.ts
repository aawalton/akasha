import type { Argument } from "akasha/commands/arguments/properties/argument.relation-property.types.ts"
import type { Repeats } from "akasha/commands/arguments/properties/repeats.boolean-property.types.ts"
import type { NotWith } from "akasha/commands/properties/not-with.relation-property.types.ts"
import type { SaidAs } from "akasha/commands/properties/said-as.select-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { Required } from "akasha/pages/types/properties/required.boolean-property.types.ts"

export type CommandArguments = List<{
  argument: Argument
  required?: Required
  saidAs?: SaidAs
  notWith?: NotWith
  repeats?: Repeats
}>
