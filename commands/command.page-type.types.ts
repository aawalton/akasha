import type { Entries } from "../checks/code-checks/properties/entries.file-property.ts"
import type { Module } from "../code-system/modules/module.page-type.ts"
import type { ChangeKind } from "./properties/change-kind.relation-property.ts"
import type { HelpNotes } from "./properties/help-notes.text-property.ts"
import type { Taking } from "./properties/taking.record-property.ts"
import type { Timeout } from "./properties/timeout.number-property.ts"

export type Command = Module & {
  changeKind: ChangeKind
  taking?: Taking
  helpNotes?: HelpNotes
  timeout?: Timeout
  entries?: Entries
}
