import {
  asNumberOpt,
  asPresent,
  asStringArray,
  asStringOpt,
  asUnknownArray,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { asStrTab } from "../lib-sets-tip-casts/lib-sets-tip-casts.module.code.ts"
import { condenseZoneScratch } from "../lib-sets-tip-condense-zone-rows/lib-sets-tip-condense-zone-rows.module.code.ts"
import { getSetDropMechanicInfo } from "../lib-sets-tip-drop-mechanic-collect/lib-sets-tip-drop-mechanic-collect.module.code.ts"
import { buildSetDropMechanicInfo } from "../lib-sets-tip-drop-mechanic-render/lib-sets-tip-drop-mechanic-render.module.code.ts"
import {
  buildReconstructionCostInfo,
  buildSetDLCInfo,
  buildSetNeededTraitsInfo,
  buildSetSearchFavoritesInfo,
  buildTextLinesFromTable,
} from "../lib-sets-tip-helpers/lib-sets-tip-helpers.module.code.ts"
import type { CustomTooltipCtx } from "../lib-sets-tip-set-data-text-custom/lib-sets-tip-set-data-text-custom.module.code.ts"
import { STATE } from "../lib-sets-tip-state/lib-sets-tip-state.module.code.ts"

const lib = LibSets

export interface SetTextFields extends CustomTooltipCtx {
  setType: number | undefined
  setDropOverallTextsPerZone: unknown[] | undefined
  setDropOverallTextsPerZoneClean: unknown[] | undefined
  runDropMechanic: boolean | undefined
}

export function collectSetTextFields(
  this: void,
  setData: { [key: string]: unknown },
  itemLink: string | undefined,
  forTooltipResolved: boolean
): SetTextFields {
  let reconstructionCostText: string | undefined
  let reconstructionCostTextClean: string | undefined
  let setTypeText: string | undefined
  let setTypeTexture: string | undefined
  let setTypeTextClean: string | undefined
  let setNeededTraitsText: string | undefined
  let setNeededTraitsTextClean: string | undefined
  let setDropZoneStr: string | undefined
  let setDropZoneStrClean: string | undefined
  let setDropMechanicText: string | undefined
  let setDropMechanicTextClean: string | undefined
  let setDropLocationsText: string | undefined
  let setDropLocationsTextClean: string | undefined
  let setDropOverallTextsPerZone: unknown[] | undefined
  let setDropOverallTextsPerZoneClean: unknown[] | undefined
  let setDLCText: string | undefined
  let setDLCTextClean: string | undefined
  let setSearchFavoritesText: string | undefined
  let setSearchFavoritesTextClean: string | undefined

  const setType = asNumberOpt(setData["setType"])

  const isReconstructableSet = IsItemLinkSetCollectionPiece(asPresent(itemLink))
  if (
    isReconstructableSet === true &&
    (!forTooltipResolved ||
      (STATE.useCustomTooltip && STATE.setReconstructionCostPlaceholder) ||
      (!STATE.useCustomTooltip && STATE.addReconstructionCost))
  ) {
    ;[reconstructionCostText, reconstructionCostTextClean] = buildReconstructionCostInfo(
      setData,
      itemLink,
      !forTooltipResolved
    )
  }

  if (
    !forTooltipResolved ||
    (STATE.useCustomTooltip && STATE.setTypePlaceholder) ||
    (!STATE.useCustomTooltip && STATE.addSetType)
  ) {
    ;[setTypeText, setTypeTexture] = lib.buildSetTypeInfo(setData, !forTooltipResolved)
    setTypeTextClean = setTypeText
  }

  if (
    !isReconstructableSet &&
    (!forTooltipResolved ||
      (STATE.useCustomTooltip && STATE.neededTraitsPlaceholder) ||
      (!STATE.useCustomTooltip && STATE.addNeededTraits))
  ) {
    setNeededTraitsText = buildSetNeededTraitsInfo(setData)
    setNeededTraitsTextClean = setNeededTraitsText
  }

  if (
    !forTooltipResolved ||
    (STATE.useCustomTooltip && STATE.dlcNamePlaceHolder) ||
    (!STATE.useCustomTooltip && STATE.addDLC)
  ) {
    setDLCText = buildSetDLCInfo(setData)
    setDLCTextClean = setDLCText
  }

  if (
    !forTooltipResolved ||
    (STATE.useCustomTooltip && STATE.setSearchFavoritesPlaceHolder) ||
    (!STATE.useCustomTooltip && STATE.addFavorites)
  ) {
    setSearchFavoritesText = buildSetSearchFavoritesInfo(setData)
    setSearchFavoritesTextClean = ""
  }

  const runDropMechanic =
    !forTooltipResolved ||
    (STATE.useCustomTooltip &&
      (STATE.dropMechanicPlaceholder || STATE.bossNamePlaceholder || STATE.dropZonesPlaceholder)) ||
    (!STATE.useCustomTooltip &&
      (STATE.addDropMechanic || STATE.addBossName || STATE.addDropLocation))
  if (runDropMechanic === true) {
    getSetDropMechanicInfo(setData, !forTooltipResolved)

    if (STATE.useCustomTooltip === true) {
      const scratch = STATE.scratch
      condenseZoneScratch(scratch)

      const dropZoneNames = asStrTab(scratch.dropZoneNames)
      if (asUnknownArray(dropZoneNames).length > 0) {
        let dropZoneNamesAndParentNames = dropZoneNames
        const parentDropZoneNames = asStrTab(scratch.parentDropZoneNames)
        if (parentDropZoneNames !== undefined && !ZO_IsTableEmpty(parentDropZoneNames)) {
          dropZoneNamesAndParentNames = {}
          for (const [idx, dropZoneName] of ipairs(asStringArray(dropZoneNames))) {
            const parentZoneName = asStringOpt(parentDropZoneNames[idx])
            if (parentZoneName !== undefined) {
              dropZoneNamesAndParentNames[idx] = parentZoneName + " [" + dropZoneName + "]"
            } else {
              dropZoneNamesAndParentNames[idx] = dropZoneName
            }
          }
        }
        setDropZoneStr = buildTextLinesFromTable(
          dropZoneNamesAndParentNames,
          undefined,
          false,
          false
        )
        setDropZoneStrClean = setDropZoneStr
      } else {
        setDropZoneStr = ""
        setDropZoneStrClean = ""
      }
      setDropMechanicText = buildTextLinesFromTable(
        scratch.dropMechanicNames,
        undefined,
        false,
        false
      )
      setDropMechanicTextClean = buildTextLinesFromTable(
        scratch.dropMechanicNamesClean,
        undefined,
        false,
        false
      )
      setDropLocationsText = buildTextLinesFromTable(
        scratch.dropLocationNames,
        undefined,
        false,
        false
      )
      setDropLocationsTextClean = setDropLocationsText

      ;[, , , setDropOverallTextsPerZone, , , , setDropOverallTextsPerZoneClean] =
        buildSetDropMechanicInfo(setData, itemLink, forTooltipResolved)
    } else {
      let builtLocationsText: unknown
      let builtLocationsTextClean: unknown
      ;[
        setDropZoneStr,
        setDropMechanicText,
        builtLocationsText,
        setDropOverallTextsPerZone,
        setDropZoneStrClean,
        setDropMechanicTextClean,
        builtLocationsTextClean,
        setDropOverallTextsPerZoneClean,
      ] = buildSetDropMechanicInfo(setData, itemLink, forTooltipResolved)
      setDropLocationsText = asStringOpt(builtLocationsText)
      setDropLocationsTextClean = asStringOpt(builtLocationsTextClean)
    }
  }

  if (setDropLocationsText !== undefined && setDropLocationsText !== "") {
    if (setTypeText !== undefined && setTypeText !== "") {
      if (setTypeText === setDropLocationsText) {
        setDropLocationsText = ""
        setDropLocationsTextClean = ""
      }
    }
  }

  return {
    isReconstructableSet,
    forTooltipResolved,
    reconstructionCostText,
    reconstructionCostTextClean,
    setTypeText,
    setTypeTexture,
    setTypeTextClean,
    setNeededTraitsText,
    setNeededTraitsTextClean,
    setDropZoneStr,
    setDropZoneStrClean,
    setDropMechanicText,
    setDropMechanicTextClean,
    setDropLocationsText,
    setDropLocationsTextClean,
    setDLCText,
    setDLCTextClean,
    setSearchFavoritesText,
    setSearchFavoritesTextClean,
    setInfoText: undefined,
    setInfoTextNoTextures: undefined,
    setType,
    setDropOverallTextsPerZone,
    setDropOverallTextsPerZoneClean,
    runDropMechanic,
  }
}
