import { initAutocompletion } from "akasha/temper/addon/pages/items/crafting-station/modules/zone-autocompletion/zone-autocompletion.module.code.ts"
import {
  applyZoneNameFallbacks,
  removeNonLiveAPIVersionEntries,
} from "akasha/temper/addon/pages/items/crafting-station/modules/zone-data-init/zone-data-init.module.code.ts"
import { initDungeonStatus } from "akasha/temper/addon/pages/items/crafting-station/modules/zone-dungeon-status/zone-dungeon-status.module.code.ts"
import { initEvents } from "akasha/temper/addon/pages/items/crafting-station/modules/zone-events/zone-events.module.code.ts"
import { initGeoDebug } from "akasha/temper/addon/pages/items/crafting-station/modules/zone-geo-debug/zone-geo-debug.module.code.ts"
import { initGeoParent } from "akasha/temper/addon/pages/items/crafting-station/modules/zone-geo-parent/zone-geo-parent.module.code.ts"
import { initZoneQueries } from "akasha/temper/addon/pages/items/crafting-station/modules/zone-queries/zone-queries.module.code.ts"
import { initZoneScan } from "akasha/temper/addon/pages/items/crafting-station/modules/zone-scan/zone-scan.module.code.ts"

applyZoneNameFallbacks()
removeNonLiveAPIVersionEntries()

initZoneQueries()
initZoneScan()
initDungeonStatus()
initGeoParent()
initGeoDebug()
initAutocompletion()

initEvents()
