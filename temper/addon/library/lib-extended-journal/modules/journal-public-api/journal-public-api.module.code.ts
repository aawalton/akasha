import { asGlobalTable } from "akasha/temper/addon/library/lib-extended-journal/modules/journal-casts/journal-casts.module.code.ts"
import { ExtendedJournalSortFilterList } from "akasha/temper/addon/library/lib-extended-journal/modules/journal-sort-filter-list/journal-sort-filter-list.module.code.ts"
import {
  Internal,
  Public,
} from "akasha/temper/addon/library/lib-extended-journal/modules/journal-state/journal-state.module.code.ts"
import { ExtendedJournalTooltipExtension } from "akasha/temper/addon/library/lib-extended-journal/modules/journal-tooltip-extension/journal-tooltip-extension.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const globals = asGlobalTable(_G)

globals.LibExtendedJournal = Public
globals.LibExtendedJournalInternal = Internal
globals.ExtendedJournalSortFilterList = ExtendedJournalSortFilterList
globals.ExtendedJournalTooltipExtension = ExtendedJournalTooltipExtension
