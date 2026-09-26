import { NAV_ICON_SIZE } from "akasha/temper/addon/pages/characters/modules/pithka-constants/pithka-constants.module.code.ts"
import { basicIcon } from "akasha/temper/addon/pages/characters/modules/pithka-icons/pithka-icons.module.code.ts"
import type { Screen } from "akasha/temper/addon/pages/characters/modules/pithka-layout/pithka-layout.module.code.ts"
import {
  registerCallback,
  setValue,
} from "akasha/temper/addon/pages/characters/modules/pithka-saved-vars/pithka-saved-vars.module.code.ts"
import "akasha/temper/addon/pages/characters/pithka-declarations/pithka-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"

export function buildNavBar(this: void, screens: readonly Screen[]): undefined {
  screens.forEach((screen, index) => {
    const control = basicIcon({
      texture: screen.navIconTexture,
      size: NAV_ICON_SIZE,
      tooltipText: screen.title,
      tooltipAnchor: LEFT,
      clickFn: () => setValue("currentScreen", screen.title),
    })
    control.SetAnchor(
      BOTTOMRIGHT,
      TemperCharactersPithka_GUI,
      TOPLEFT,
      -12,
      NAV_ICON_SIZE * (index + 1)
    )
  })
  registerCallback((key, value) => {
    if (key !== "currentScreen") return
    for (const screen of screens) {
      if (screen.title === value) screen.EnsureInitialized()
      screen.setHidden(screen.title !== value)
    }
  })
}
