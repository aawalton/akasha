import {
  placeIcon,
  placeQuickMenuIcon,
  placeQuickMenuIconAtCursor,
  removeClosestIcon,
  removeIconAtCursor,
  toggleQuickMenu,
} from "akasha/temper/addon/pages/world/markers/modules/markers-placing/markers-placing.module.code.ts"
import { HIGHLIGHT_ANIMATION } from "akasha/temper/addon/pages/world/markers/modules/markers-profile-dialogs/markers-profile-dialogs.module.code.ts"
import { sendTempMarker } from "akasha/temper/addon/pages/world/markers/modules/markers-sharing/markers-sharing.module.code.ts"
import "akasha/temper/addon/pages/world/markers/markers-declarations/markers-declarations.type-declaration.d.ts"

export const MARKERS_API: TemperWorldMarkersApi = {
  highlightAnimationProvider: HIGHLIGHT_ANIMATION,
  toggleQuickMenu,
  placeIcon,
  placeQuickMenuIcon,
  placeQuickMenuIconAtCursor: () => placeQuickMenuIconAtCursor(),
  removeClosestIcon: () => removeClosestIcon(),
  removeIconAtCursor,
  sendTempMarker,
}
