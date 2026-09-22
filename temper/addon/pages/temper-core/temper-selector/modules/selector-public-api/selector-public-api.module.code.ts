import "akasha/temper/addon/type/temper-addons-global/temper-addons-global.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-ui-settings-menu/selector-ui-settings-menu.module.code.ts"

import {
  assignPackToKeybind,
  loadPackByKeybind,
  removePackFromKeybind,
} from "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-keybinds/selector-keybinds.module.code.ts"
import {
  selectAddons,
  toggleCurrentAddonState,
} from "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-packs/selector-packs.module.code.ts"
import {
  showActivePackInChat,
  startAddonSearch,
} from "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-search/selector-search.module.code.ts"
import { reloadUI } from "akasha/temper/addon/shared/modules/reload-ui/reload-ui.module.code.ts"

globalThis.TemperAddons = {
  ReloadTheUI: reloadUI,
  ShowActivePackInChat: showActivePackInChat,
  LoadPackByKeybind: loadPackByKeybind,
  SelectAddons: selectAddons,
  ToggleCurrentAddonState: toggleCurrentAddonState,
  StartAddonSearch: startAddonSearch,
  assignPackToKeybind,
  removePackFromKeybind,
}
