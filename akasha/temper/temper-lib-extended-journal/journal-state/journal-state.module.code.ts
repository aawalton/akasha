import { asInternalTable, asPublicTable } from "../journal-casts/journal-casts.module.code.ts"
import type { InternalTable, PublicTable } from "../journal-shape/journal-shape.module.code.ts"

const Public: PublicTable = asPublicTable({
  Used: false,
})

const Internal: InternalTable = asInternalTable({
  name: "LibExtendedJournal",
  SCENE_NAME: "ExtendedJournalScene",
  initialized: false,
  controls: {},
  tabs: {},
  activeTab: undefined,
  settingsVisible: false,
})

export { Internal, Public }
