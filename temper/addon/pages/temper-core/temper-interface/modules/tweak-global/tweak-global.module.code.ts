import { switchBankMenuBarDescriptor } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-bank/tweak-bank.module.code.ts"
import { toggleGroupElectionAutoDecline } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-group/tweak-group.module.code.ts"
import { scrollScrollList } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-inventory-scrollbar/tweak-inventory-scrollbar.module.code.ts"
import { keybinds } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-keybinds/tweak-keybinds.module.code.ts"
import { openLAMAddonSettings } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-mainmenu/tweak-mainmenu.module.code.ts"
import { playerPinPingPong } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-map/tweak-map.module.code.ts"
import { muteSFXSound } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-sounds/tweak-sounds.module.code.ts"
import { togglePromotionalEventTrackerUi } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-ui/tweak-ui.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-interface/tweak-global-declarations/tweak-global-declarations.type-declaration.d.ts"

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
