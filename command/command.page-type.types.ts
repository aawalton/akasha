import type { Module } from "akasha/code/module/module.page-type.types.ts"
import type { CommandArguments } from "akasha/command/properties/command-arguments.record-property.types.ts"
import type { LevelName } from "akasha/command/properties/level-name.text-property.types.ts"
import type { Timeout } from "akasha/command/properties/timeout.number-property.types.ts"

export type Command = Module & {
  maxWallSeconds?: Timeout
  name?: LevelName
  arguments?: CommandArguments
}
