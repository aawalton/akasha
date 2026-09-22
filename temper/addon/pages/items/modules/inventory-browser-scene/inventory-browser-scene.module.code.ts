import type { BrowserWindowHandle } from "akasha/temper/addon/pages/items/modules/inventory-browser-window/inventory-browser-window.module.code.ts"
import "akasha/temper/addon/pages/hud/temper-addon-menu/addon-menu-eso-window/addon-menu-eso-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const DOCKED_SCENES: readonly string[] = [
  "inventory",
  "bank",
  "guildBank",
  "tradinghouse",
  "smithing",
  "alchemy",
  "stables",
  "trade",
]

export function registerBrowserScene(
  handle: BrowserWindowHandle,
  refresh: () => undefined
): undefined {
  for (const sceneName of DOCKED_SCENES) {
    const scene: Scene | undefined = SCENE_MANAGER.GetScene(sceneName)
    if (scene === undefined) {
      continue
    }
    scene.RegisterCallback("StateChange", (_oldState: number, newState: number): undefined => {
      if (newState === SCENE_SHOWN) {
        handle.showDocked()
        refresh()
      } else if (newState === SCENE_HIDDEN) {
        handle.hide()
      }
    })
  }
}
