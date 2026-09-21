import { switchBankMenuBarDescriptor } from "akasha/temper/addon/interface-addon/modules/fco-bank/fco-bank.module.code.ts"
import { toggleGroupElectionAutoDecline } from "akasha/temper/addon/interface-addon/modules/fco-group/fco-group.module.code.ts"
import { scrollScrollList } from "akasha/temper/addon/interface-addon/modules/fco-inventory-scrollbar/fco-inventory-scrollbar.module.code.ts"
import { keybinds } from "akasha/temper/addon/interface-addon/modules/fco-keybinds/fco-keybinds.module.code.ts"
import { openLAMAddonSettings } from "akasha/temper/addon/interface-addon/modules/fco-mainmenu/fco-mainmenu.module.code.ts"
import { playerPinPingPong } from "akasha/temper/addon/interface-addon/modules/fco-map/fco-map.module.code.ts"
import { muteSFXSound } from "akasha/temper/addon/interface-addon/modules/fco-sounds/fco-sounds.module.code.ts"
import { togglePromotionalEventTrackerUi } from "akasha/temper/addon/interface-addon/modules/fco-ui/fco-ui.module.code.ts"
import "akasha/temper/addon/interface-addon/fco-global-declarations/fco-global-declarations.type-declaration.d.ts"

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
