import { isInitialized } from "akasha/temper/addon/pages/combat/modules/combat-addon-state/combat-addon-state.module.code.ts"
import { isDamageCategory } from "akasha/temper/addon/pages/combat/modules/combat-core-types/combat-core-types.module.code.ts"
import { getDb } from "akasha/temper/addon/pages/combat/modules/combat-saved-variables/combat-saved-variables.module.code.ts"
import { exportBuild } from "akasha/temper/addon/pages/combat/modules/combat-ui-build-export/combat-ui-build-export.module.code.ts"
import { setLabelColor } from "akasha/temper/addon/pages/combat/modules/combat-ui-helpers/combat-ui-helpers.module.code.ts"
import type { ActivePanelControl } from "akasha/temper/addon/pages/combat/modules/combat-ui-main-panel/combat-ui-main-panel.module.code.ts"
import { reportUpdate } from "akasha/temper/addon/pages/combat/modules/combat-ui-nav/combat-ui-nav.module.code.ts"
import {
  getCurrentFight,
  getFightData,
  type UpdatableControl,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-state/combat-ui-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-controls-report/combat-controls-report.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-public-api-declarations/combat-public-api-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-public-api/combat-public-api.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-ui-main-panel-declarations/combat-ui-main-panel-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-ui-state-declarations/combat-ui-state-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

interface SelectorButtonMeta extends Control {
  isMainCategory?: boolean
  isSecondaryCategory?: boolean
  isExportButton?: boolean
  category?: string
}

type SelectorButton = SelectorButtonMeta & TextureControl

function selectCategory(this: void, button: SelectorButton): undefined {
  const selectControl = button.GetParent()
  if (selectControl == null) {
    return undefined
  }

  for (let i = 1; i <= selectControl.GetNumChildren(); i++) {
    const child = selectControl.GetChild<SelectorButton>(i)

    if (child != null && child.isMainCategory === true) {
      const [r, g, b] = child.GetColor()
      const a = child === button ? 1 : 0.2

      child.SetColor(r, g, b, a)
    }
  }

  if (button.category != null && isDamageCategory(button.category)) {
    getDb().FightReport.category = button.category
  }

  if (isInitialized()) {
    reportUpdate(getCurrentFight())
  }
  return undefined
}

function selectMainPanel(this: void, button: SelectorButton): undefined {
  const selectControl = button.GetParent()
  if (selectControl == null) {
    return undefined
  }
  const category = button.category

  for (let i = 1; i <= selectControl.GetNumChildren(); i++) {
    const child = selectControl.GetChild<SelectorButton>(i)

    if (child != null && child.isSecondaryCategory === true) {
      const a = child === button ? 1 : 0.2

      child.SetColor(1, 1, 1, a)
    }
  }

  const mainPanel = TemperCombat_Report_MainPanel
  const rightPanel = TemperCombat_Report_RightPanel
  const unitPanel = TemperCombat_Report_UnitPanel
  const abilityPanel = TemperCombat_Report_AbilityPanel
  const infoPanel = TemperCombat_Report_InfoPanel
  const graphPanel = TemperCombat_Report_MainPanelGraph

  const isInfo = category === "Info"

  mainPanel.SetHidden(isInfo)
  rightPanel.SetHidden(isInfo)
  unitPanel.SetHidden(isInfo)
  abilityPanel.SetHidden(isInfo)
  infoPanel.SetHidden(!isInfo)

  const isGraph = category === "Graph"

  graphPanel.SetHidden(!isGraph)

  if (!isInfo) {
    const selected =
      category != null ? mainPanel.GetNamedChild<UpdatableControl>(category) : undefined
    mainPanel.active = selected

    for (let i = 2; i <= mainPanel.GetNumChildren(); i++) {
      const child = mainPanel.GetChild(i)

      child?.SetHidden(child !== selected)
    }

    selected?.Update?.(selected)
  } else {
    infoPanel.Update?.(infoPanel)
  }
  return undefined
}

const VALID_RAIDS: Record<number, boolean | undefined> = {
  [7]: true,
  [8]: true,
  [9]: true,
  [12]: true,
}

const NOTIFICATION_VERSION = 1

const NOTIFICATION_FIRST_DATE = 20200417

const NOTIFICATION_LAST_DATE = 20200423

const EXPORT_DISABLED_ALPHA = 0.2

export function updateSelectorButtons(this: void, selectorButtons: Control): undefined {
  const db = getDb()
  db.currentNotificationVersion = NOTIFICATION_VERSION

  const date = GetDate()

  const isMe = GetDisplayName() === "@Solinur"
  const isGerman = GetCVar("Language.2") === "de"
  const isEUServer = GetWorldName() === "EU Megaserver"
  const isNotificationAllowed =
    db.NotificationAllowed && db.currentNotificationVersion > db.NotificationRead
  const isVeteranRaid = VALID_RAIDS[GetCurrentParticipatingRaidId()] === true
  const isWithinAllowedTime = date >= NOTIFICATION_FIRST_DATE && date <= NOTIFICATION_LAST_DATE

  const show =
    db.ForceNotification ||
    ((isGerman || isMe) &&
      isEUServer &&
      isNotificationAllowed &&
      isVeteranRaid &&
      isWithinAllowedTime)

  selectorButtons.GetNamedChild("NotificationButton")?.SetHidden(!show)

  const exportBtn = selectorButtons.GetNamedChild("ExportBuildButton")
  if (exportBtn != null) {
    const fightData = getFightData()
    const enabled = fightData != null && fightData.calculated != null
    exportBtn.SetAlpha(enabled ? 1 : EXPORT_DISABLED_ALPHA)
    exportBtn.SetMouseEnabled(enabled)
  }
  return undefined
}

export function initSelectorButtons(this: void, selectorButtons: Control): undefined {
  for (let i = 1; i <= selectorButtons.GetNumChildren(); i++) {
    const child = selectorButtons.GetChild<SelectorButton>(i)

    if (child != null && child.isMainCategory === true) {
      child.SetHandler("OnMouseUp", () => selectCategory(child))
      if (child.category === getDb().FightReport.category) {
        selectCategory(child)
      }
    } else if (child != null && child.isSecondaryCategory === true) {
      child.SetHandler("OnMouseUp", () => selectMainPanel(child))
    } else if (child != null && child.isExportButton === true) {
      child.SetHandler("OnMouseUp", (_control: Control, _button: number, upInside: boolean) => {
        if (upInside) {
          exportBuild()
        }
      })
    }

    const fightStatsButton = selectorButtons.GetNamedChild<SelectorButton>("FightStatsButton")
    if (fightStatsButton != null) {
      selectMainPanel(fightStatsButton)
    }
  }
  return undefined
}

interface AttackStatsButton extends Control {
  powerType?: number
}

interface ResourceLineControl extends TextureControl {
  color?: ZoColor
}

export function updateAttackStatsSelector(this: void, control: AttackStatsButton): undefined {
  const selector = control.GetParent()
  if (selector == null) {
    return undefined
  }

  for (const [, powerType] of ipairs(["Magicka", "Stamina", "Health"])) {
    const button = selector.GetNamedChild(powerType)

    button?.GetNamedChild<TextureControl>("Line")?.SetColor(0.53, 0.53, 0.53, 1)
    button?.GetNamedChild("Icon")?.SetAlpha(0.5)
  }

  const line = control.GetNamedChild<ResourceLineControl>("Line")
  const color = line?.color
  if (line == null || color == null) {
    return undefined
  }

  line.SetColor(color.r, color.g, color.b, color.a)
  control.GetNamedChild("Icon")?.SetAlpha(1)

  const mainPanelRight = selector.GetParent<UpdatableControl>()
  const labels = mainPanelRight?.GetNamedChild("AttackStats")

  if (labels != null) {
    setLabelColor(labels, color)
  }

  if (control.powerType != null) {
    getDb().FightReport.fightstatspanel = control.powerType
  }

  mainPanelRight?.Update?.(mainPanelRight)
  return undefined
}

interface RightPanelButton extends Control {
  menukey?: string
}

export function selectRightPanel(this: void, control: RightPanelButton): undefined {
  const rightpanel = control.menukey
  if (rightpanel != null) {
    getDb().FightReport.rightpanel = rightpanel
  }

  const menubar = control.GetParent()
  if (menubar == null) {
    return undefined
  }

  for (let i = 1; i <= menubar.GetNumChildren(); i++) {
    const child = menubar.GetChild(i)

    if (child != null && child.GetType() === CT_CONTROL) {
      child.GetNamedChild("Overlay")?.SetHidden(child === control)
    }
  }

  const isbuffpanel = rightpanel === "buffs" || rightpanel === "buffsout"

  const panel = menubar.GetParent<ActivePanelControl>()
  if (panel == null) {
    return undefined
  }

  const buffList = panel.GetNamedChild<UpdatableControl>("BuffList")
  buffList?.SetHidden(!isbuffpanel)

  const resourceList = panel.GetNamedChild<UpdatableControl>("ResourceList")
  resourceList?.SetHidden(isbuffpanel)

  panel.active = isbuffpanel ? buffList : resourceList

  panel.Update?.(panel)
  const graphPanel = TemperCombat_Report_MainPanelGraph
  graphPanel.Update?.(graphPanel)
  return undefined
}

TemperCombat.UpdateAttackStatsSelector = updateAttackStatsSelector
TemperCombat.SelectRightPanel = selectRightPanel
