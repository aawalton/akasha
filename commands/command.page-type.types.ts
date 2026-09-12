import type { Module } from "akasha/code/modules/module.page-type.types.ts"
import type { CommandArguments } from "akasha/commands/properties/command-arguments.record-property.types.ts"
import type { LevelName } from "akasha/commands/properties/level-name.text-property.types.ts"
import type { Timeout } from "akasha/commands/properties/timeout.number-property.types.ts"

export type Command = Module & {
  timeout?: Timeout
  name?: LevelName
  arguments?: CommandArguments
}
