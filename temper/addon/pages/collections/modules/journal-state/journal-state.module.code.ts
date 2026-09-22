import { ADDON_NAME } from "akasha/temper/addon/pages/collections/modules/collections-addon-names/collections-addon-names.module.code.ts"
import {
  asInternalTable,
  asPublicTable,
} from "akasha/temper/addon/pages/collections/modules/journal-casts/journal-casts.module.code.ts"
import type {
  InternalTable,
  PublicTable,
} from "akasha/temper/addon/pages/collections/modules/journal-shape/journal-shape.module.code.ts"

const Public: PublicTable = asPublicTable({
  Used: false,
})

const Internal: InternalTable = asInternalTable({
  name: ADDON_NAME,
  SCENE_NAME: "ExtendedJournalScene",
  initialized: false,
  controls: {},
  tabs: {},
  activeTab: undefined,
  settingsVisible: false,
})

export { Internal, Public }
