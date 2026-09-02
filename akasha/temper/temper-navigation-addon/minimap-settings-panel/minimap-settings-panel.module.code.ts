import { header } from "@akasha/temper-settings-panel/header"
import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { asAnyTable, asBoolean, asNumber } from "../minimap-casts/minimap-casts.module.code.ts"
import { holder, type VotansMiniMap } from "../minimap-holder/minimap-holder.module.code.ts"
import { buildAppearanceSettings } from "../minimap-settings-appearance/minimap-settings-appearance.module.code.ts"
import { buildLocationSettings } from "../minimap-settings-location/minimap-settings-location.module.code.ts"

const LAM = LibAddonMenu2

holder.InitSettings = function (this: VotansMiniMap): undefined {
  const panelData: LamPanelData = {
    type: "panel",
    name: "Votan's Mini Map",
    displayName: "Votan's Mini Map",
    author: "votan",
    version: "2.2.0",
    website: "http://www.esoui.com/downloads/info1399-VotansMiniMap.html",
    registerForRefresh: true,
    registerForDefaults: true,
  }

  const optionsTable: LamControlData[] = []

  optionsTable.push({
    type: "checkbox",
    name: GetString(SI_VOTANSMINIMAP_WORLD_MAP_TWEAKS),
    tooltip: GetString(SI_VOTANSMINIMAP_WORLD_MAP_TWEAKS_TOOLTIP),
    default: this.accountDefaults.enableTweaks,
    getFunc: () => this.account.enableTweaks,
    setFunc: (value) => {
      this.account.enableTweaks = asBoolean(value)
    },
  })
  optionsTable.push({
    type: "checkbox",
    name: GetString(SI_KEYBINDINGS_CATEGORY_VOTANS_MINIMAP),
    tooltip: GetString(SI_VOTANSMINIMAP_MINI_MAP_TOOLTIP),
    default: this.accountDefaults.enableMap,
    getFunc: () => this.account.enableMap,
    setFunc: (value) => {
      this.account.enableMap = asBoolean(value)
    },
  })
  optionsTable.push({ type: "description", text: "" })
  optionsTable.push({
    type: "button",
    name: GetString(SI_VOTANSMINIMAP_APPLY_BUTTON),
    func: () => {
      const reloadui = asAnyTable(SLASH_COMMANDS)["/reloadui"]
      if (reloadui != null) {
        reloadui()
      }
    },
  })

  if (this.account.enableMap) {
    optionsTable.push({
      type: "description",
      text: GetString(SI_KEYBINDINGS_CATEGORY_VOTANS_MINIMAP),
    })
    optionsTable.push({
      type: "slider",
      name: GetString(SI_VOTANSMINIMAP_ZOOM),
      tooltip: GetString(SI_VOTANSMINIMAP_ZOOM_TOOLTIP),
      min: 0.0,
      max: 2,
      step: 0.05,
      decimals: 2,
      default: this.accountDefaults.zoom,
      getFunc: () => this.account.zoom,
      setFunc: (value) => {
        this.account.zoom = asNumber(value)
      },
    })
    optionsTable.push({
      type: "slider",
      name: GetString(SI_VOTANSMINIMAP_SUB_ZONE_ZOOM),
      tooltip: GetString(SI_VOTANSMINIMAP_SUB_ZONE_ZOOM_TOOLTIP),
      min: 0.0,
      max: 2,
      step: 0.05,
      decimals: 2,
      default: this.accountDefaults.subZoneZoom,
      getFunc: () => this.account.subZoneZoom,
      setFunc: (value) => {
        this.account.subZoneZoom = asNumber(value)
      },
    })
    optionsTable.push({
      type: "slider",
      name: GetString(SI_VOTANSMINIMAP_DUNGEON_ZOOM),
      tooltip: GetString(SI_VOTANSMINIMAP_DUNGEON_ZOOM_TOOLTIP),
      min: 0.0,
      max: 2,
      step: 0.05,
      decimals: 2,
      default: this.accountDefaults.dungeonZoom,
      getFunc: () => this.account.dungeonZoom,
      setFunc: (value) => {
        this.account.dungeonZoom = asNumber(value)
      },
    })
    optionsTable.push({
      type: "slider",
      name: GetString(SI_VOTANSMINIMAP_MOUNTED_ZOOM),
      tooltip: GetString(SI_VOTANSMINIMAP_MOUNTED_ZOOM_TOOLTIP),
      min: 0.0,
      max: 2,
      step: 0.05,
      decimals: 2,
      default: this.accountDefaults.mountedZoom,
      getFunc: () => this.account.mountedZoom,
      setFunc: (value) => {
        this.account.mountedZoom = asNumber(value)
      },
    })
    optionsTable.push({
      type: "slider",
      name: GetString(SI_VOTANSMINIMAP_BG_ZOOM),
      tooltip: GetString(SI_VOTANSMINIMAP_BG_ZOOM_TOOLTIP),
      min: 0.0,
      max: 2,
      step: 0.05,
      decimals: 2,
      default: this.accountDefaults.battlegroundZoom,
      getFunc: () => this.account.battlegroundZoom,
      setFunc: (value) => {
        this.account.battlegroundZoom = asNumber(value)
      },
    })
    optionsTable.push({
      type: "slider",
      name: GetString(SI_VOTANSMINIMAP_UNIT_PINS_MINIMUM_SIZE),
      tooltip: GetString(SI_VOTANSMINIMAP_UNIT_PINS_MINIMUM_SIZE_TOOLTIP),
      min: 0.65,
      max: 1,
      step: 0.01,
      decimals: 2,
      default: this.accountDefaults.unitPinScaleLimit,
      getFunc: () => this.account.unitPinScaleLimit,
      setFunc: (value) => {
        this.account.unitPinScaleLimit = asNumber(value)
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: GetString(SI_VOTANSMINIMAP_SHOW_MAP),
      tooltip: GetString(SI_VOTANSMINIMAP_SHOW_MAP_TOOLTIP),
      default: this.defaults.showMap,
      getFunc: () => this.player.showMap,
      setFunc: (value) => {
        this.player.showMap = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: " |u12:0::|u" + GetString(SI_VOTANSMINIMAP_SHOW_HUD),
      tooltip: GetString(SI_VOTANSMINIMAP_SHOW_HUD_TOOLTIP),
      default: this.accountDefaults.showHUD,
      getFunc: () => this.account.showHUD,
      setFunc: (value) => {
        this.account.showHUD = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: " |u12:0::|u" + GetString(SI_VOTANSMINIMAP_SHOW_LOOTING),
      tooltip: GetString(SI_VOTANSMINIMAP_SHOW_LOOTING_TOOLTIP),
      default: this.accountDefaults.showLoot,
      getFunc: () => this.account.showLoot,
      setFunc: (value) => {
        this.account.showLoot = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: " |u12:0::|u" + GetString(SI_VOTANSMINIMAP_SHOW_MOUNTED),
      tooltip: GetString(SI_VOTANSMINIMAP_SHOW_MOUNTED_TOOLTIP),
      default: this.accountDefaults.showMounted,
      getFunc: () => this.account.showMounted,
      setFunc: (value) => {
        this.account.showMounted = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: " |u12:0::|u" + GetString(SI_VOTANSMINIMAP_SHOW_COMBAT),
      tooltip: GetString(SI_VOTANSMINIMAP_SHOW_COMBAT_TOOLTIP),
      default: this.accountDefaults.showCombat,
      getFunc: () => this.account.showCombat,
      setFunc: (value) => {
        this.account.showCombat = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: " |u12:0::|u" + GetString(SI_VOTANSMINIMAP_SHOW_SIEGE),
      tooltip: GetString(SI_VOTANSMINIMAP_SHOW_SIEGE_TOOLTIP),
      default: this.accountDefaults.showSiege,
      getFunc: () => this.account.showSiege,
      setFunc: (value) => {
        this.account.showSiege = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: " |u12:0::|u" + GetString(SI_VOTANSMINIMAP_SHOW_IN_HOUSING),
      tooltip: GetString(SI_VOTANSMINIMAP_SHOW_IN_HOUSING_TOOLTIP),
      default: this.accountDefaults.showInHousing,
      getFunc: () => this.account.showInHousing,
      setFunc: (value) => {
        this.account.showInHousing = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: GetString(SI_VOTANSMINIMAP_ASYNC_UPDATE),
      tooltip: GetString(SI_VOTANSMINIMAP_ASYNC_UPDATE_TOOLTIP),
      default: this.accountDefaults.asyncUpdate,
      getFunc: () => this.account.asyncUpdate,
      setFunc: (value) => {
        this.account.asyncUpdate = asBoolean(value)
      },
    })
    optionsTable.push(header(GetString(SI_VOTANSMINIMAP_KEYBINDINGS_ZOOM)))
    optionsTable.push({
      type: "checkbox",
      name: GetString(SI_VOTANSMINIMAP_ZOOM_TO_PLAYER),
      tooltip: GetString(SI_VOTANSMINIMAP_ZOOM_TO_PLAYER_TOOLTIP),
      default: this.accountDefaults.zoomToPlayer,
      getFunc: () => this.account.zoomToPlayer,
      setFunc: (value) => {
        this.account.zoomToPlayer = asBoolean(value)
      },
    })
    optionsTable.push({
      type: "slider",
      name: GetString(SI_VOTANSMINIMAP_ZOOM_OUT),
      tooltip: GetString(SI_VOTANSMINIMAP_ZOOM_OUT_TOOLTIP),
      min: 0.0,
      max: 1,
      step: 0.05,
      decimals: 2,
      default: this.accountDefaults.zoomOut,
      getFunc: () => this.account.zoomOut,
      setFunc: (value) => {
        this.account.zoomOut = asNumber(value)
      },
    })
    optionsTable.push({
      type: "slider",
      name: GetString(SI_VOTANSMINIMAP_ZOOM_IN),
      tooltip: GetString(SI_VOTANSMINIMAP_ZOOM_IN_TOOLTIP),
      min: 1,
      max: 2,
      step: 0.05,
      decimals: 2,
      default: this.accountDefaults.zoomIn,
      getFunc: () => this.account.zoomIn,
      setFunc: (value) => {
        this.account.zoomIn = asNumber(value)
      },
    })
    optionsTable.push(header(GetString(SI_VOTANSMINIMAP_APPEARANCE)))
    optionsTable.push({
      type: "checkbox",
      name: GetString(SI_VOTANSMINIMAP_LOCK_POSITION),
      tooltip: GetString(SI_VOTANSMINIMAP_LOCK_POSITION_TOOLTIP),
      default: this.accountDefaults.lockWindow,
      getFunc: () => this.account.lockWindow,
      setFunc: (value) => {
        this.account.lockWindow = asBoolean(value)
        this.UpdateBorder()
      },
    })

    for (const control of buildLocationSettings(this)) {
      optionsTable.push(control)
    }
    for (const control of buildAppearanceSettings(this)) {
      optionsTable.push(control)
    }
  }

  registerPanel(LAM, "TemperVotansMiniMap_OptionsPanel", panelData, optionsTable)
}
