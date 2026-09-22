import { asPresent } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-casts/lib-sets-casts.module.code.ts"
import { asDungeonFinderKeyboard } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-debug-casts/lib-sets-debug-casts.module.code.ts"
import {
  clientLang,
  libPrefix,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-debug-debug-state/lib-sets-debug-debug-state.module.code.ts"
import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-lib/lib-sets-lib.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/crafting/modules/crafting-constants/crafting-constants.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import { LIBSETS_TABLEKEY_DUNGEONFINDER_DATA } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-const-base/lib-sets-const-base.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-ui/eso-lib-sets-ui.type-declaration.d.ts"

export let preventEndlessCallDungeonFinderData = false

export let retTableDungeons: string[] | undefined

export const getDungeonFinderDataFromChildNodes = lib.GetDungeonFinderDataFromChildNodes

export const openDungeonFinder = lib.OpenDungeonFinder

export function freshDungeonTable(this: void): string[] | undefined {
  return undefined
}

export function debugGetDungeonFinderData(
  this: void,
  dungeonFinderIndex?: number,
  noReloadInfo?: boolean
): undefined {
  const noReload = noReloadInfo ?? false
  d(libPrefix + "Start to load all dungeon data from the keyboard dungeon finder...")
  const dfIndex = dungeonFinderIndex ?? 3

  retTableDungeons = freshDungeonTable()
  let dungeonsAddedNormal = 0
  let dungeonsAddedVet = 0
  let dungeonsAdded = 0
  let openDungeonFinderNow = false

  const dungeonFinder = asDungeonFinderKeyboard(DUNGEON_FINDER_KEYBOARD)
  if (
    dungeonFinder !== undefined &&
    dungeonFinder.navigationTree !== undefined &&
    dungeonFinder.navigationTree.rootNode !== undefined
  ) {
    const dfRootNode = dungeonFinder.navigationTree.rootNode
    if (dfRootNode.children !== undefined) {
      if (dfIndex === 3) {
        let dungeonsData = dfRootNode.children[1]
        if (dungeonsData !== undefined) {
          dungeonsAddedNormal = getDungeonFinderDataFromChildNodes(
            dungeonsData,
            retTableDungeons,
            undefined
          )
        }
        dungeonsData = dfRootNode.children[2]
        if (dungeonsData !== undefined) {
          dungeonsAddedVet = getDungeonFinderDataFromChildNodes(
            dungeonsData,
            retTableDungeons,
            undefined
          )
        }
        dungeonsAdded = dungeonsAddedNormal + dungeonsAddedVet
      } else {
        const dungeonsData = dfRootNode.children[dfIndex]
        dungeonsAdded = getDungeonFinderDataFromChildNodes(
          dungeonsData,
          retTableDungeons,
          undefined
        )
      }
    } else {
      if (preventEndlessCallDungeonFinderData === true) {
        d(
          "<Please open the dungeon finder and choose the 'Specific dungeon' entry from the dropdown box at the top-right edge! Then try this function again."
        )
        preventEndlessCallDungeonFinderData = false
        return
      } else {
        preventEndlessCallDungeonFinderData = true
        openDungeonFinderNow = true
      }
    }
  }
  if (
    !openDungeonFinderNow &&
    retTableDungeons !== undefined &&
    retTableDungeons.length > 0 &&
    dungeonsAdded > 0
  ) {
    lib.LoadSavedVariables()
    const sv = asPresent(lib.svDebugData)
    sv[LIBSETS_TABLEKEY_DUNGEONFINDER_DATA] = retTableDungeons
    d(
      "->Stored " +
        tostring(dungeonsAdded) +
        " entries in SaveVariables file '" +
        ADDON_NAME +
        ".lua', in the table '" +
        LIBSETS_TABLEKEY_DUNGEONFINDER_DATA +
        "', language: '" +
        tostring(clientLang) +
        "'"
    )
    if (noReload === true) {
      return
    }
    d(">Please do a /reloadui to update the file properly!")
  } else {
    if (openDungeonFinderNow === true) {
      d("<No dungeon data was found! Opening the dungeon finder now")
      openDungeonFinder(dfIndex, lib.DebugGetDungeonFinderData, noReload)
    }
  }
}
