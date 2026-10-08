import type { CurrentData } from "akasha/temper/addon/pages/combat/modules/combat-core-types/combat-core-types.module.code.ts"
import {
  noteLiveFigures,
  registerLiveHudFields,
} from "akasha/temper/addon/pages/combat/modules/combat-hud-fields/combat-hud-fields.module.code.ts"
import {
  hasFightFigures,
  type LiveFigureTexts,
} from "akasha/temper/addon/pages/combat/modules/combat-live-figures/combat-live-figures.module.code.ts"
import { getDb } from "akasha/temper/addon/pages/combat/modules/combat-saved-variables/combat-saved-variables.module.code.ts"
import type {
  LayoutControl,
  TooltipCarrier,
  TooltipSpec,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-helpers/combat-ui-helpers.module.code.ts"
import {
  isNonNullObject,
  namedChild,
  storeOrigLayout,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-helpers/combat-ui-helpers.module.code.ts"
import {
  refreshLiveReport,
  resizeLiveReport,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-live-refresh/combat-ui-live-refresh.module.code.ts"

import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-controls-panels/combat-controls-panels.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-ui-live-report-declarations/combat-ui-live-report-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export interface LiveReportControl extends LayoutControl, TopLevelWindow {
  Toggle?: (this: void, control: Control, value?: boolean) => undefined
}

export function maxStat(): string {
  const [, magicka] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_MAGICKA)
  const [, stamina] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_STAMINA)
  const [, health] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_HEALTH)

  let maxPower = "Magicka"
  if (stamina > magicka) {
    maxPower = "Stamina"
  }
  if (health > magicka && health > stamina) {
    maxPower = "Health"
  }
  return maxPower
}

let fragment: HUDFadeSceneFragment | undefined

export function toggleLiveReport(value?: boolean): undefined {
  const liveReport = TemperCombat_LiveReport
  const resolved = value ?? liveReport.IsHidden()

  const frag = assert(fragment)

  if (resolved === true) {
    SCENE_MANAGER.GetScene("hud").AddFragment(frag)
    SCENE_MANAGER.GetScene("hudui").AddFragment(frag)
    SCENE_MANAGER.GetScene("siegeBar").AddFragment(frag)

    const currentScene = SCENE_MANAGER.currentScene != null ? SCENE_MANAGER.currentScene.name : ""
    const isShownForCurrentScene =
      currentScene === "hud" || currentScene === "hudui" || currentScene === "siegeBar"

    liveReport.SetHidden(!isShownForCurrentScene)
  } else {
    SCENE_MANAGER.GetScene("hud").RemoveFragment(frag)
    SCENE_MANAGER.GetScene("hudui").RemoveFragment(frag)
    SCENE_MANAGER.GetScene("siegeBar").RemoveFragment(frag)

    liveReport.SetHidden(true)
  }
  return undefined
}

export function setLiveReportLocked(locked: boolean): undefined {
  const liveReport = TemperCombat_LiveReport
  namedChild(liveReport, "ResizeFrame").SetMouseEnabled(!locked)
  liveReport.SetMovable(!locked)
  return undefined
}

export function setLiveReportBgAlpha(alpha: number): undefined {
  namedChild(TemperCombat_LiveReport, "BG").SetAlpha(alpha)
  return undefined
}

function liveFigureTexts(data: CurrentData): LiveFigureTexts {
  const db = getDb()
  const groupDPSOut = data.groupDPSOut
  const groupDPSIn = data.groupDPSIn
  const groupHPSOut = data.groupHPSOut

  const maxtime = zo_roundToNearest(zo_max(data.dpstime, data.hpstime), 0.1)
  const timeString = string.format("%d:%04.1f", maxtime / 60, maxtime % 60)

  const withGroup = db.recordgrp === true && (groupDPSOut > 0 || groupDPSIn > 0 || groupHPSOut > 0)

  const figure = (mine: number, group: number): string => {
    if (!withGroup) return tostring(mine)
    const ratio = group > 0 ? zo_floor((mine / group) * 1000) / 10 : 0
    return zo_strformat(GetString(SI_TEMPER_COMBAT_SHOW_XPS), mine, group, ratio)
  }

  return {
    damageOutSingle: figure(data.bossDPSOut ?? 0, data.bossDPSOutGroup ?? 0),
    damageOut: figure(data.DPSOut, groupDPSOut),
    healOut: figure(data.HPSOut, groupHPSOut),
    healOutAbsolute: tostring(data.OHPSOut ?? 0),
    damageIn: figure(data.DPSIn, groupDPSIn),
    healIn: tostring(data.HPSIn),
    time: timeString,
  }
}

export function updateLiveReport(data?: CurrentData): undefined {
  if (data == null) {
    refreshLiveReport()
    return undefined
  }

  if (!hasFightFigures(data.DPSOut, data.HPSOut, data.DPSIn)) {
    return undefined
  }

  const texts = liveFigureTexts(data)
  noteLiveFigures(texts)

  const livereport = TemperCombat_LiveReport
  if (livereport.IsHidden()) {
    return undefined
  }

  if (getDb().liveReport.damageOutSingle) {
    const block = namedChild(livereport, "DamageOutSingle")
    const iconControl = namedChild<TextureControl>(block, "Icon")
    const tooltipControl = namedChild<TooltipCarrier>(block, "Tooltip")
    const texture = "/esoui/art/icons/mapkey/mapkey_fightersguild.dds"
    let tooltip: number = SI_TEMPER_COMBAT_LIVEREPORT_DPSSINGLE_TOOLTIP

    if (data.bossfight === true) {
      iconControl.SetTexture("esoui/art/tutorial/poi_groupboss_complete.dds")
      tooltip = SI_TEMPER_COMBAT_LIVEREPORT_DPSBOSS_TOOLTIP
    }

    iconControl.SetTexture(texture)
    const tooltipLines = tooltipControl.tooltip
    if (isNonNullObject<(TooltipSpec | undefined)[]>(tooltipLines)) {
      tooltipLines[0] = tooltip
    }
  }

  const setLabel = (blockName: string, text: string): undefined => {
    namedChild<LabelControl>(namedChild(livereport, blockName), "Label").SetText(text)
    return undefined
  }

  setLabel("DamageOutSingle", texts.damageOutSingle)
  setLabel("DamageOut", texts.damageOut)
  setLabel("HealOut", texts.healOut)
  setLabel("HealOutAbsolute", texts.healOutAbsolute)
  setLabel("DamageIn", texts.damageIn)
  setLabel("HealIn", texts.healIn)
  setLabel("Time", texts.time)
  return undefined
}

export function initLiveReport(): undefined {
  registerLiveHudFields()

  const setLR = getDb().liveReport
  const liveReport = TemperCombat_LiveReport

  const bg = namedChild(liveReport, "BG")

  storeOrigLayout(liveReport)

  const pos = getDb().TemperCombat_LiveReport

  liveReport.ClearAnchors()
  liveReport.SetAnchor(CENTER, undefined, TOPLEFT, pos.x, pos.y)

  fragment = ZO_HUDFadeSceneFragment.New(liveReport)

  liveReport.Toggle = (_control, value) => toggleLiveReport(value)

  toggleLiveReport(setLR.showPanel)
  resizeLiveReport(setLR.scale)
  namedChild(liveReport, "ResizeFrame").SetMouseEnabled(!setLR.locked)
  liveReport.SetMovable(!setLR.locked)

  bg.SetAlpha(setLR.bgalpha / 100)
  return undefined
}
