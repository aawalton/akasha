import { asPresent } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { SETS_SETTYPE_CRAFTED } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-settype-ids/sets-const-settype-ids.module.code.ts"
import type { SetTextFields } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-set-text-set-text-fields/sets-set-text-set-text-fields.module.code.ts"
import {
  dropLocationZonesStr,
  dropMechanicStr,
  droppedByStr,
  neededTraitsStr,
  reconstructionCostsStr,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-header/sets-tip-header.module.code.ts"
import { buildTextLinesFromTable } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-helpers/sets-tip-helpers.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-state/sets-tip-state.module.code.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

export function applyDefaultLayout(this: void, fields: SetTextFields): undefined {
  const {
    isReconstructableSet,
    forTooltipResolved,
    setType,
    setTypeText,
    setTypeTexture,
    setNeededTraitsText,
    setNeededTraitsTextClean,
    setDropLocationsText,
    setDropLocationsTextClean,
    reconstructionCostText,
    reconstructionCostTextClean,
    runDropMechanic,
    setDropOverallTextsPerZone,
    setDropOverallTextsPerZoneClean,
    setDLCText,
    setDLCTextClean,
    setSearchFavoritesText,
    setSearchFavoritesTextClean,
  } = fields
  let setInfoText = fields.setInfoText
  let setInfoTextNoTextures = fields.setInfoTextNoTextures

  function addSetInfoText(this: void, textToAdd: string | undefined): undefined {
    if (textToAdd !== undefined && textToAdd !== "") {
      setInfoText =
        setInfoText !== undefined && setInfoText !== "" ? setInfoText + "\n" + textToAdd : textToAdd
    }
  }
  function addSetInfoTextClean(this: void, cleanTextToAdd: string | undefined): undefined {
    if (cleanTextToAdd !== undefined && cleanTextToAdd !== "") {
      setInfoTextNoTextures =
        setInfoTextNoTextures !== undefined && setInfoTextNoTextures !== ""
          ? setInfoTextNoTextures + "\n" + cleanTextToAdd
          : cleanTextToAdd
    }
  }

  if (!forTooltipResolved || STATE.addSetType) {
    if (STATE.tooltipTextures === true || !forTooltipResolved) {
      setInfoText = zo_iconTextFormat(
        asPresent(setTypeTexture),
        24,
        24,
        asPresent(setTypeText),
        undefined
      )
      setInfoTextNoTextures = setTypeText
    } else {
      setInfoText = setTypeText
      setInfoTextNoTextures = setTypeText
    }
  }
  if (setDropLocationsText !== undefined && setDropLocationsText !== "") {
    setInfoText =
      setInfoText !== undefined ? setInfoText + " " + setDropLocationsText : setDropLocationsText
    setInfoTextNoTextures =
      setInfoTextNoTextures !== undefined
        ? setInfoTextNoTextures + " " + asPresent(setDropLocationsTextClean)
        : setDropLocationsTextClean
  }
  if (
    !isReconstructableSet &&
    (!forTooltipResolved || STATE.addNeededTraits) &&
    setType !== undefined &&
    setType === SETS_SETTYPE_CRAFTED
  ) {
    if (!forTooltipResolved || STATE.addSetType) {
      if (setInfoText !== undefined) {
        setInfoText = setInfoText + " (" + asPresent(setNeededTraitsText) + ")"
      }
      if (setInfoTextNoTextures !== undefined) {
        setInfoTextNoTextures =
          setInfoTextNoTextures + " (" + asPresent(setNeededTraitsTextClean) + ")"
      }
    } else {
      setInfoText =
        setInfoText !== undefined
          ? setInfoText + " " + neededTraitsStr + ": " + asPresent(setNeededTraitsText)
          : neededTraitsStr + ": " + asPresent(setNeededTraitsText)
      setInfoTextNoTextures =
        setInfoTextNoTextures !== undefined
          ? setInfoTextNoTextures +
            " " +
            neededTraitsStr +
            ": " +
            asPresent(setNeededTraitsTextClean)
          : neededTraitsStr + ": " + asPresent(setNeededTraitsTextClean)
    }
  }
  if (
    isReconstructableSet &&
    (!forTooltipResolved || STATE.addReconstructionCost) &&
    reconstructionCostText !== undefined &&
    reconstructionCostText !== ""
  ) {
    if (STATE.addSetType) {
      if (setInfoText !== undefined) {
        setInfoText = setInfoText + " (" + reconstructionCostText + ")"
      }
      if (setInfoTextNoTextures !== undefined) {
        setInfoTextNoTextures =
          setInfoTextNoTextures + " (" + asPresent(reconstructionCostTextClean) + ")"
      }
    } else {
      setInfoText =
        setInfoText !== undefined
          ? setInfoText + " " + reconstructionCostsStr + ": " + reconstructionCostText
          : reconstructionCostsStr + ": " + reconstructionCostText
      setInfoTextNoTextures =
        setInfoTextNoTextures !== undefined
          ? setInfoTextNoTextures +
            " " +
            reconstructionCostsStr +
            ": " +
            asPresent(reconstructionCostTextClean)
          : reconstructionCostsStr + ": " + asPresent(reconstructionCostTextClean)
    }
  }
  if (runDropMechanic) {
    const setDropMechanicDropLocationsText = buildTextLinesFromTable(
      asPresent(setDropOverallTextsPerZone),
      undefined,
      true,
      false
    )
    const setDropMechanicDropLocationsTextClean = buildTextLinesFromTable(
      asPresent(setDropOverallTextsPerZoneClean),
      undefined,
      true,
      false
    )
    if (setDropMechanicDropLocationsText !== undefined && setDropMechanicDropLocationsText !== "") {
      let prefix = ""
      if (forTooltipResolved) {
        if (STATE.addBossName && !STATE.addDropLocation && !STATE.addDropMechanic) {
          prefix = "|c7ABDE6" + droppedByStr + "|r: "
        } else if (!STATE.addBossName && !STATE.addDropLocation && STATE.addDropMechanic) {
          prefix = "|c7ABDE6" + dropMechanicStr + "|r: "
        } else if (!STATE.addBossName && STATE.addDropLocation && !STATE.addDropMechanic) {
          prefix = "|c7ABDE6" + dropLocationZonesStr + "|r: "
        }
      } else {
        prefix = "|c7ABDE6" + droppedByStr + "|r: "
      }
      addSetInfoText(prefix + setDropMechanicDropLocationsText)
      addSetInfoTextClean(prefix + setDropMechanicDropLocationsTextClean)
    }
  }
  if (!forTooltipResolved || STATE.addDLC) {
    addSetInfoText(setDLCText)
    addSetInfoTextClean(setDLCTextClean)
  }
  if (!forTooltipResolved || STATE.addFavorites) {
    addSetInfoText(setSearchFavoritesText)
    addSetInfoTextClean(setSearchFavoritesTextClean)
  }

  fields.setInfoText = setInfoText
  fields.setInfoTextNoTextures = setInfoTextNoTextures
}
