import {
  ADDON_NAME,
  ADDON_VERSION,
} from "akasha/temper/addon/pages/collections/modules/collections-addon-names/collections-addon-names.module.code.ts"
import { Public } from "akasha/temper/addon/pages/collections/modules/journal-state/journal-state.module.code.ts"
import "akasha/temper/addon/pages/collections/collections-addon-declarations/collections-addon-declarations.type-declaration.d.ts"

function showJournal(this: void): undefined {
  Public.Show(undefined, true)
}

function showItemBrowser(this: void): undefined {
  Public.Show("ItemBrowser", true)
}

globalThis.TemperCollections = {
  ADDON_NAME,
  ADDON_VERSION,
  ShowJournal: showJournal,
  ShowItemBrowser: showItemBrowser,
}
