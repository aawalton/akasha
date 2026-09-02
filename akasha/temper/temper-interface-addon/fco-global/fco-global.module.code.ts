import { switchBankMenuBarDescriptor } from "../fco-bank/fco-bank.module.code.ts"
import { toggleGroupElectionAutoDecline } from "../fco-group/fco-group.module.code.ts"
import { scrollScrollList } from "../fco-inventory-scrollbar/fco-inventory-scrollbar.module.code.ts"
import { keybinds } from "../fco-keybinds/fco-keybinds.module.code.ts"
import { openLAMAddonSettings } from "../fco-mainmenu/fco-mainmenu.module.code.ts"
import { playerPinPingPong } from "../fco-map/fco-map.module.code.ts"
import { muteSFXSound } from "../fco-sounds/fco-sounds.module.code.ts"
import { togglePromotionalEventTrackerUi } from "../fco-ui/fco-ui.module.code.ts"

export interface TemperFCOChangeStuffGlobal extends Record<string, unknown> {
  openLAMAddonSettings: typeof openLAMAddonSettings
  playerPinPingPong: typeof playerPinPingPong
  keybinds: typeof keybinds
  muteSFXSound: typeof muteSFXSound
  toggleGroupElectionAutoDecline: typeof toggleGroupElectionAutoDecline
  switchBankMenuBarDescriptor: typeof switchBankMenuBarDescriptor
  TogglePromotionalEventTrackerUI: typeof togglePromotionalEventTrackerUi
  ScrollScrollList: typeof scrollScrollList
}

declare global {
  var TemperFCOChangeStuff: TemperFCOChangeStuffGlobal
}

globalThis.TemperFCOChangeStuff = {
  openLAMAddonSettings,
  playerPinPingPong,
  keybinds,
  muteSFXSound,
  toggleGroupElectionAutoDecline,
  switchBankMenuBarDescriptor,
  TogglePromotionalEventTrackerUI: togglePromotionalEventTrackerUi,
  ScrollScrollList: scrollScrollList,
}
