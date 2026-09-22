import { toggleLeadsWindow } from "akasha/temper/addon/pages/world/antiquities/modules/leads-toggle/leads-toggle.module.code.ts"
import { Public } from "akasha/temper/addon/pages/world/collections/modules/journal-state/journal-state.module.code.ts"
import {
  ADDON_NAME,
  ADDON_VERSION,
} from "akasha/temper/addon/pages/world/modules/world-names/world-names.module.code.ts"
import "akasha/temper/addon/pages/world/world-declarations/world-declarations.type-declaration.d.ts"

function showJournal(this: void): undefined {
  Public.Show(undefined, true)
}

function showItemBrowser(this: void): undefined {
  Public.Show("ItemBrowser", true)
}

globalThis.TemperWorld = {
  ADDON_NAME,
  ADDON_VERSION,
  toggleRDL: toggleLeadsWindow,
  ShowJournal: showJournal,
  ShowItemBrowser: showItemBrowser,
}
