import { STATE } from "akasha/temper/addon/pages/hud/temper-interface/modules/fco-state/fco-state.module.code.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-03/eso-enums-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-04/eso-enums-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

const CURRENTLY_OWNED_TEXTURE = "/esoui/art/buttons/accept_up.dds"
const CURRENTLY_NOT_OWNED_TEXTURE = "/esoui/art/buttons/cancel_up.dds"

let WAS_COLLECTIBLE_FRAGMENTS_TOOLTIP_HOOKED = false

function hookCollectibleFragmentsTooltip(this: void): undefined {
  if (WAS_COLLECTIBLE_FRAGMENTS_TOOLTIP_HOOKED) {
    return
  }

  ZO_PreHookHandler(ItemTooltip, "OnAddGameData", (_control, gameDataType): undefined => {
    if (gameDataType !== TOOLTIP_GAME_DATA_MYTHIC_OR_STOLEN) {
      return undefined
    }
    if (STATE.settingsVars.settings.collectibleTooltipShowFragmentCombinedItem !== true) {
      return undefined
    }
    const row = moc()
    if (row === undefined || row.dataEntry === undefined || row.dataEntry.data === undefined) {
      return undefined
    }
    let collectibleIdOfFragment: number | undefined
    let referenceId: number | undefined
    const collectibleFragmentAtCollectionsFragmentUI = row.dataEntry.data
    if (collectibleFragmentAtCollectionsFragmentUI === undefined) {
      return undefined
    }
    if (collectibleFragmentAtCollectionsFragmentUI.dataSource === undefined) {
      if (
        collectibleFragmentAtCollectionsFragmentUI.meetsRequirementsToBuy !== undefined &&
        collectibleFragmentAtCollectionsFragmentUI.slotIndex !== undefined
      ) {
        const storeItemLink = GetStoreItemLink(
          collectibleFragmentAtCollectionsFragmentUI.slotIndex,
          LINK_STYLE_DEFAULT
        )
        collectibleIdOfFragment = GetCollectibleIdFromLink(storeItemLink)
        if (collectibleIdOfFragment !== undefined) {
          referenceId = GetCollectibleReferenceId(collectibleIdOfFragment)
        }
      } else {
        return undefined
      }
    } else {
      const dataSource = collectibleFragmentAtCollectionsFragmentUI.dataSource
      collectibleIdOfFragment = dataSource.collectibleId
      referenceId = dataSource.referenceId
    }
    if (collectibleIdOfFragment === undefined) {
      return undefined
    }
    if (
      ZO_COLLECTIBLE_DATA_MANAGER.GetCollectibleDataById(collectibleIdOfFragment).IsCategoryType(
        COLLECTIBLE_CATEGORY_TYPE_COMBINATION_FRAGMENT
      )
    ) {
      if (referenceId === undefined) {
        return undefined
      }
      const unlockedCollectibleId = GetCombinationUnlockedCollectible(referenceId)
      if (unlockedCollectibleId !== undefined && unlockedCollectibleId !== 0) {
        const collectibleCategoryName = ZO_CachedStrFormat(
          SI_COLLECTIBLE_NAME_FORMATTER,
          GetCollectibleCategoryNameByCollectibleId(unlockedCollectibleId)
        )
        const [name, , icon, , unlocked] = GetCollectibleInfo(unlockedCollectibleId)
        const inheritColor = unlocked !== true
        let collectibleNameClean = ZO_CachedStrFormat(SI_COLLECTIBLE_NAME_FORMATTER, name)
        const nameColorPrefix = unlocked === true ? "|c00FF00" : "|cFF0000"
        collectibleNameClean = nameColorPrefix + collectibleNameClean + "|r"
        const textureColorDummy = unlocked === true ? "" : "|c000000|r"
        const textureColorDummyOwned = unlocked === true ? "|c00FF00:     |r" : "|cFF0000:     |r"
        const collectibleNameWithTextureClean =
          zo_iconTextFormatNoSpace(icon, 48, 48, textureColorDummy, inheritColor) +
          collectibleNameClean
        const unlockStateTexturePath =
          unlocked === true ? CURRENTLY_OWNED_TEXTURE : CURRENTLY_NOT_OWNED_TEXTURE
        const collectibleUnlockedStateTexture = zo_iconTextFormatNoSpace(
          unlockStateTexturePath,
          24,
          24,
          textureColorDummyOwned,
          true
        )
        const knownText =
          unlocked === true
            ? GetString(SI_COLLECTIBLEUNLOCKSTATE2)
            : GetString(SI_COLLECTIBLE_ACTION_COMBINE)
        const [selR, selG, selB] = ZO_SELECTED_TEXT.UnpackRGB()
        const [hiR, hiG, hiB] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
        ItemTooltip.AddLine(
          knownText + collectibleUnlockedStateTexture,
          "ZoFontWinH3",
          selR,
          selG,
          selB
        )
        ItemTooltip.AddLine(
          "[" + collectibleCategoryName + "] " + collectibleNameWithTextureClean,
          "ZoFontGameMedium",
          hiR,
          hiG,
          hiB
        )
      }
    }
    return undefined
  })

  WAS_COLLECTIBLE_FRAGMENTS_TOOLTIP_HOOKED = true
}

export function collectibleChanges(this: void): undefined {
  if (STATE.settingsVars.settings.collectibleTooltipShowFragmentCombinedItem === true) {
    hookCollectibleFragmentsTooltip()
  }
}
