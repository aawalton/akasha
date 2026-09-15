import type { Module } from "akasha/code/module/module.page-type.types.ts"
import type { CommandArguments } from "akasha/command/properties/command-arguments.record-property.types.ts"
import type { CommandMaxWallSeconds } from "akasha/command/properties/command-max-wall-seconds.number-property.types.ts"
import type { LevelName } from "akasha/command/properties/level-name.text-property.types.ts"

export type Command = Module & {
  maxWallSeconds?: CommandMaxWallSeconds
  name?: LevelName
  arguments?: CommandArguments
}
