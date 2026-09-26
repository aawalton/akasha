import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import {
  type CrutchOptions,
  createDefaultOptions,
  fillAllDefaults,
  type OptionSection,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-options/combat-alerts-options.module.code.ts"
import {
  ZONE_REGISTERS,
  ZONE_UNREGISTERS,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

const defaultOptions = createDefaultOptions() as CrutchOptions
CRUTCH.defaultOptions = defaultOptions

let crutchLFCPFilter: LibFilteredChatPanelFilter | undefined

CRUTCH.SavePosition = function (this: void) {
  let [x, y] = TemperCombatAlertsContainer.GetCenter()
  const [oX, oY] = GuiRoot.GetCenter()
  CRUTCH.savedOptions.display.x = x - oX
  CRUTCH.savedOptions.display.y = y
  ;[x, y] = TemperCombatAlertsDamageable.GetCenter()
  CRUTCH.savedOptions.damageableDisplay.x = x - oX
  CRUTCH.savedOptions.damageableDisplay.y = y - oY
  ;[x, y] = TemperCombatAlertsCloudrest.GetCenter()
  CRUTCH.savedOptions.spearsDisplay.x = x - oX
  CRUTCH.savedOptions.spearsDisplay.y = y - oY
  ;[x, y] = TemperCombatAlertsMawOfLorkhaj.GetCenter()
  CRUTCH.savedOptions.cursePadsDisplay.x = x - oX
  CRUTCH.savedOptions.cursePadsDisplay.y = y - oY

  x = TemperCombatAlertsBossHealthBarContainer.GetLeft()
  y = TemperCombatAlertsBossHealthBarContainer.GetTop()
  CRUTCH.savedOptions.bossHealthBarDisplay.x = x - oX
  CRUTCH.savedOptions.bossHealthBarDisplay.y = y - oY

  x = TemperCombatAlertsCausticCarrion.GetLeft()
  y = TemperCombatAlertsCausticCarrion.GetTop()
  CRUTCH.savedOptions.carrionDisplay.x = x - oX
  CRUTCH.savedOptions.carrionDisplay.y = y - oY

  x = TemperCombatAlertsInfoPanel.GetLeft()
  y = TemperCombatAlertsInfoPanel.GetTop()
  CRUTCH.savedOptions.infoPanelDisplay.x = x - oX
  CRUTCH.savedOptions.infoPanelDisplay.y = y - oY
  ;[x, y] = TemperCombatAlertsCCUIMin.GetCenter()
  CRUTCH.savedOptions.cc.visualPositionX = x - oX
  CRUTCH.savedOptions.cc.visualPositionY = y - oY
  ;[x, y] = TemperCombatAlertsCCUIObnoxious.GetCenter()
  CRUTCH.savedOptions.cc.obnoxiousPositionX = x - oX
  CRUTCH.savedOptions.cc.obnoxiousPositionY = y - oY
}

CRUTCH.dbgOther = function (this: void, text) {
  if (CRUTCH.savedOptions.debugOther) {
    d("|c88FFFF[CO]|r " + tostring(text))
  }
}

CRUTCH.dbgSpam = function (this: void, text) {
  if (CRUTCH.savedOptions.debugChatSpam) {
    if (crutchLFCPFilter !== undefined) {
      crutchLFCPFilter.AddMessage(tostring(text))
    } else {
      d(text)
    }
  }
}

CRUTCH.OnPlayerActivated = function (this: void) {
  CRUTCH.groupIdToTag = {}
  CRUTCH.groupTagToId = {}
  CRUTCH.majorCowardiceUnitIds = {}

  if (CRUTCH.unlock) {
    CRUTCH.UnlockUI(false)
  }

  const zoneId = GetZoneId(GetUnitZoneIndex("player"))
  const previous = CRUTCH.zoneId

  CRUTCH.dbgSpam(
    string.format(
      "|c00FF00zoneId: %s (%d) -> %s (%d); mapId %s (%d)|r",
      (previous !== undefined ? GetZoneNameById(previous) : undefined) ?? "??",
      previous ?? 0,
      GetZoneNameById(zoneId) ?? "??",
      zoneId ?? 0,
      GetMapNameById(GetCurrentMapId()) ?? "??",
      GetCurrentMapId() ?? 0
    )
  )

  const unregister = previous !== undefined ? ZONE_UNREGISTERS[previous] : undefined
  if (unregister !== undefined) {
    unregister(zoneId === previous)
  }
  CRUTCH.UnregisterProminents(previous)
  CRUTCH.UnregisterEffects(previous)

  const register = ZONE_REGISTERS[zoneId]
  if (register !== undefined) {
    register(zoneId === previous)
  }
  CRUTCH.RegisterProminents(zoneId)
  CRUTCH.RegisterEffects(zoneId)
  CRUTCH.RegisterOthers()

  CRUTCH.zoneId = zoneId

  if (!CRUTCH.savedOptions.general.showGeneralAlerts) {
    if (
      IsPlayerInRaid() ||
      (IsUnitInDungeon("player") && GetCurrentZoneDungeonDifficulty() !== DUNGEON_DIFFICULTY_NONE)
    ) {
      if (ZO_IsConsoleOrGameCoreUI()) {
        CRUTCH.msg(
          "Warning: general alerts are currently |cFF0000OFF|r|cAAAAAA. You can toggle them using |c00FFFF/crutch toggle general"
        )
      } else {
        CRUTCH.msg(
          "Warning: general alerts are currently |cFF0000OFF|r|cAAAAAA. You can toggle them using the keybind or |c00FFFF/crutch toggle general"
        )
      }
    }
  }

  if (!CRUTCH.IsValidRole(GetSelectedLFGRole())) {
    CRUTCH.Warn(
      "You have no LFG role selected (a rare ZOS bug). Some icons or settings may not apply properly; try toggling your role in the group menu."
    )
  }
}

let lastTime: number | undefined
const QUEUED_MESSAGES: string[] = []

function printTime(this: void, reason: string): undefined {
  if (lastTime === undefined) {
    lastTime = GetGameTimeMilliseconds()
    return
  }

  const now = GetGameTimeMilliseconds()
  QUEUED_MESSAGES.push(string.format("%d - %s", now - lastTime, reason))
  lastTime = now
}

function onPlayerActivatedFirstTime(this: void): undefined {
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "ActivatedFirstTime", EVENT_PLAYER_ACTIVATED)

  for (const queued of QUEUED_MESSAGES) {
    CRUTCH.dbgOther(queued)
  }

  CRUTCH.ShowQueuedMessages()
}

function seedAbilities(
  this: void,
  abilities: Record<number, boolean>,
  ids: readonly number[]
): undefined {
  for (const id of ids) {
    abilities[id] = true
  }
}

export function initializeAlerts(this: void): undefined {
  printTime("init")
  CRUTCH.AddProminentDefaults()
  CRUTCH.AddEffectDefaults()
  printTime("defaults done")

  CRUTCH.accountSVs = ZO_SavedVars.NewAccountWide(
    "TemperCombatAlertsSavedVariables",
    1,
    "Options",
    defaultOptions
  )
  if (CRUTCH.accountSVs.installationWide) {
    let isNew = false
    if (
      TemperCombatAlertsInstallationWide === undefined ||
      ZO_IsTableEmpty(TemperCombatAlertsInstallationWide)
    ) {
      isNew = true
      const proxy = getmetatable(CRUTCH.accountSVs) as { __index: OptionSection }
      TemperCombatAlertsInstallationWide = ZO_DeepTableCopy(proxy.__index)
    }

    fillAllDefaults(TemperCombatAlertsInstallationWide, defaultOptions)

    CRUTCH.savedOptions = TemperCombatAlertsInstallationWide as CrutchOptions
    if (isNew) {
      CRUTCH.dbgOther(
        "Copied settings from " + GetUnitDisplayName("player") + " to installation-wide"
      )
    }
    CRUTCH.dbgOther("Using installation-wide settings")
  } else {
    CRUTCH.savedOptions = CRUTCH.accountSVs
  }

  if (CRUTCH.savedOptions.rockgrove.spoofAbilitiesFirstTime) {
    seedAbilities(
      CRUTCH.savedOptions.rockgrove.abilitiesToReplace,
      [38901, 22095, 32853, 23231, 118680, 118726]
    )
    CRUTCH.savedOptions.rockgrove.spoofAbilitiesFirstTime = false
  }

  if (CRUTCH.savedOptions.osseincage.abilityOverlayFirstTime) {
    seedAbilities(
      CRUTCH.savedOptions.osseincage.abilitiesToReplace,
      [38901, 22095, 32853, 23231, 39011, 39012, 39018, 39028, 38788]
    )
    CRUTCH.savedOptions.osseincage.abilityOverlayFirstTime = false
  }

  if (CRUTCH.savedOptions.prominentV2FirstTime) {
    CRUTCH.InitProminentV2Options()
    CRUTCH.savedOptions.prominentV2FirstTime = false
  }
  printTime("savedOptions done")

  CRUTCH.CreateSettingsMenu()
  printTime("settings done")

  ZO_CreateStringId("SI_BINDING_NAME_CRUTCH_TOGGLE_GENERAL", "Toggle General Alerts")

  const options = CRUTCH.savedOptions
  TemperCombatAlertsContainer.SetAnchor(CENTER, GuiRoot, TOP, options.display.x, options.display.y)
  TemperCombatAlertsDamageable.SetAnchor(
    CENTER,
    GuiRoot,
    CENTER,
    options.damageableDisplay.x,
    options.damageableDisplay.y
  )
  TemperCombatAlertsCloudrest.SetAnchor(
    CENTER,
    GuiRoot,
    CENTER,
    options.spearsDisplay.x,
    options.spearsDisplay.y
  )
  TemperCombatAlertsMawOfLorkhaj.SetAnchor(
    CENTER,
    GuiRoot,
    CENTER,
    options.cursePadsDisplay.x,
    options.cursePadsDisplay.y
  )
  TemperCombatAlertsCausticCarrion.SetAnchor(
    TOPLEFT,
    GuiRoot,
    CENTER,
    options.carrionDisplay.x,
    options.carrionDisplay.y
  )
  TemperCombatAlertsInfoPanel.SetAnchor(
    TOPLEFT,
    GuiRoot,
    CENTER,
    options.infoPanelDisplay.x,
    options.infoPanelDisplay.y
  )
  printTime("positioning done")
  if (options.general.showBegin) {
    CRUTCH.RegisterBegin()
  }
  printTime("begin done")
  if (options.general.showGained) {
    CRUTCH.RegisterGained()
  }
  printTime("gained done")
  CRUTCH.RegisterOthers()
  printTime("others done")

  CRUTCH.InitializeStyles()
  printTime("styles done")
  CRUTCH.InitializeDamageable()
  printTime("damageable done")
  CRUTCH.InitializeDamageTaken()
  printTime("damage taken done")
  CRUTCH.RegisterInterrupts()
  printTime("interrupts done")
  CRUTCH.RegisterTest()
  printTime("test done")
  CRUTCH.RegisterStacks()
  printTime("stacks done")
  CRUTCH.RegisterEffectChanged()
  printTime("effect changed done")
  CRUTCH.RegisterChannels()
  printTime("channels done")
  CRUTCH.InitializeCC()
  printTime("cc done")
  CRUTCH.InitializeGlobalEvents()
  printTime("global events done")
  CRUTCH.InitializeLineRenderSpace()
  printTime("line render done")
  CRUTCH.Drawing.InitializeRenderSpace()
  printTime("renderspace done")
  CRUTCH.Drawing.InitializeSpace()
  printTime("space done")
  CRUTCH.Drawing.InitializeAttachedIcons()
  printTime("attached icons done")
  CRUTCH.InitializeAbilityOverlay()
  printTime("ability overlays done")
  CRUTCH.InitializeInfoPanel()
  printTime("info panel done")
  CRUTCH.Drawing.Model.InitializeGrave()
  printTime("grave done")

  CRUTCH.BossHealthBar.Initialize()
  printTime("bhb done")

  CRUTCH.InitializeBroadcast()
  printTime("broadcast done")

  if (LibFilteredChatPanel !== undefined) {
    crutchLFCPFilter = LibFilteredChatPanel.CreateFilter(
      CRUTCH.name,
      "/esoui/art/ava/ava_rankicon64_volunteer.dds",
      [0.7, 0.7, 0.5],
      false
    )
  }

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "ActivatedFirstTime",
    EVENT_PLAYER_ACTIVATED,
    onPlayerActivatedFirstTime
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "Activated",
    EVENT_PLAYER_ACTIVATED,
    function (this: void) {
      CRUTCH.OnPlayerActivated()
    }
  )

  printTime("finished")
  return undefined
}
