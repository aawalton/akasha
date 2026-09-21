import { initDungeonChampions } from "akasha/temper/dungeon-champion/modules/dungeon-champion-start/dungeon-champion-start.module.code.ts"
import { initLoreBooks } from "akasha/temper/lorebook/modules/lorebooks-init/lorebooks-init.module.code.ts"
import { initLostTreasure } from "akasha/temper/lost-treasure/modules/lost-treasure-start/lost-treasure-start.module.code.ts"
import { initSkyShards } from "akasha/temper/skyshard/modules/skyshards-start/skyshards-start.module.code.ts"
import { initItemBrowser } from "akasha/temper/web/item-browser/modules/item-browser-start/item-browser-start.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initSkyShards()
  initLoreBooks()
  initLostTreasure()
  initDungeonChampions()
  initItemBrowser()
  return undefined
}
