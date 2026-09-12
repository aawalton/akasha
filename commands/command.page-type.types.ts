import type { Module } from "akasha/code/modules/module.page-type.types.ts"
import type { ChangeKind } from "akasha/commands/properties/change-kind.relation-property.types.ts"
import type { HelpNotes } from "akasha/commands/properties/help-notes.text-property.types.ts"
import type { LevelName } from "akasha/commands/properties/level-name.text-property.types.ts"
import type { Taking } from "akasha/commands/properties/taking.record-property.types.ts"
import type { Timeout } from "akasha/commands/properties/timeout.number-property.types.ts"

export type Command = Module & {
  changeKind: ChangeKind
  taking?: Taking
  helpNotes?: HelpNotes
  timeout?: Timeout
  name?: LevelName
}
