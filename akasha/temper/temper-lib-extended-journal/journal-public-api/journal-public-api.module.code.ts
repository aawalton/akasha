import { asGlobalTable } from "../journal-casts/journal-casts.module.code.ts"
import { ExtendedJournalSortFilterList } from "../journal-sort-filter-list/journal-sort-filter-list.module.code.ts"
import { Internal, Public } from "../journal-state/journal-state.module.code.ts"
import { ExtendedJournalTooltipExtension } from "../journal-tooltip-extension/journal-tooltip-extension.module.code.ts"

const globals = asGlobalTable(_G)

globals.LibExtendedJournal = Public
globals.LibExtendedJournalInternal = Internal
globals.ExtendedJournalSortFilterList = ExtendedJournalSortFilterList
globals.ExtendedJournalTooltipExtension = ExtendedJournalTooltipExtension
