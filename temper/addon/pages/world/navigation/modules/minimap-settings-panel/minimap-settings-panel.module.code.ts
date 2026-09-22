import {
  asAnyTable,
  asBoolean,
  asNumber,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-casts/minimap-casts.module.code.ts"
import {
  holder,
  type TemperMiniMap,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-holder/minimap-holder.module.code.ts"
import { buildAppearanceSettings } from "akasha/temper/addon/pages/world/navigation/modules/minimap-settings-appearance/minimap-settings-appearance.module.code.ts"
import { buildLocationSettings } from "akasha/temper/addon/pages/world/navigation/modules/minimap-settings-location/minimap-settings-location.module.code.ts"
import { header } from "akasha/temper/addon/shared/settings-panel/modules/header/header.module.code.ts"
import { registerPanel } from "akasha/temper/addon/shared/settings-panel/modules/register-panel/register-panel.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/navigation/minimap-string-ids/minimap-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const LAM = TemperAddonMenu

holder.InitSettings = function (this: TemperMiniMap): undefined {
  const panelData: LamPanelData = {
    type: "panel",
    name: "Temper Mini Map",
    displayName: "Temper Mini Map",
    author: "AlanGaming",
    version: "1.0.0",
    registerForRefresh: true,
    registerForDefaults: true,
  }

  const optionsTable: LamControlData[] = []

  optionsTable.push({
    type: "checkbox",
    name: GetString(SI_TEMPERMINIMAP_WORLD_MAP_TWEAKS),
    tooltip: GetString(SI_TEMPERMINIMAP_WORLD_MAP_TWEAKS_TOOLTIP),
    default: this.accountDefaults.enableTweaks,
    getFunc: () => this.account.enableTweaks,
    setFunc: (value) => {
      this.account.enableTweaks = asBoolean(value)
    },
  })
  optionsTable.push({
    type: "checkbox",
    name: GetString(SI_KEYBINDINGS_CATEGORY_TEMPER_MINIMAP),
    tooltip: GetString(SI_TEMPERMINIMAP_MINI_MAP_TOOLTIP),
    default: this.accountDefaults.enableMap,
    getFunc: () => this.account.enableMap,
    setFunc: (value) => {
      this.account.enableMap = asBoolean(value)
    },
  })
  optionsTable.push({ type: "description", text: "" })
  optionsTable.push({
    type: "button",
    name: GetString(SI_TEMPERMINIMAP_APPLY_BUTTON),
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
      text: GetString(SI_KEYBINDINGS_CATEGORY_TEMPER_MINIMAP),
    })
    optionsTable.push({
      type: "slider",
      name: GetString(SI_TEMPERMINIMAP_ZOOM),
      tooltip: GetString(SI_TEMPERMINIMAP_ZOOM_TOOLTIP),
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
      name: GetString(SI_TEMPERMINIMAP_SUB_ZONE_ZOOM),
      tooltip: GetString(SI_TEMPERMINIMAP_SUB_ZONE_ZOOM_TOOLTIP),
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
      name: GetString(SI_TEMPERMINIMAP_DUNGEON_ZOOM),
      tooltip: GetString(SI_TEMPERMINIMAP_DUNGEON_ZOOM_TOOLTIP),
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
      name: GetString(SI_TEMPERMINIMAP_MOUNTED_ZOOM),
      tooltip: GetString(SI_TEMPERMINIMAP_MOUNTED_ZOOM_TOOLTIP),
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
      name: GetString(SI_TEMPERMINIMAP_BG_ZOOM),
      tooltip: GetString(SI_TEMPERMINIMAP_BG_ZOOM_TOOLTIP),
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
      name: GetString(SI_TEMPERMINIMAP_UNIT_PINS_MINIMUM_SIZE),
      tooltip: GetString(SI_TEMPERMINIMAP_UNIT_PINS_MINIMUM_SIZE_TOOLTIP),
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
      name: GetString(SI_TEMPERMINIMAP_SHOW_MAP),
      tooltip: GetString(SI_TEMPERMINIMAP_SHOW_MAP_TOOLTIP),
      default: this.defaults.showMap,
      getFunc: () => this.player.showMap,
      setFunc: (value) => {
        this.player.showMap = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: " |u12:0::|u" + GetString(SI_TEMPERMINIMAP_SHOW_HUD),
      tooltip: GetString(SI_TEMPERMINIMAP_SHOW_HUD_TOOLTIP),
      default: this.accountDefaults.showHUD,
      getFunc: () => this.account.showHUD,
      setFunc: (value) => {
        this.account.showHUD = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: " |u12:0::|u" + GetString(SI_TEMPERMINIMAP_SHOW_LOOTING),
      tooltip: GetString(SI_TEMPERMINIMAP_SHOW_LOOTING_TOOLTIP),
      default: this.accountDefaults.showLoot,
      getFunc: () => this.account.showLoot,
      setFunc: (value) => {
        this.account.showLoot = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: " |u12:0::|u" + GetString(SI_TEMPERMINIMAP_SHOW_MOUNTED),
      tooltip: GetString(SI_TEMPERMINIMAP_SHOW_MOUNTED_TOOLTIP),
      default: this.accountDefaults.showMounted,
      getFunc: () => this.account.showMounted,
      setFunc: (value) => {
        this.account.showMounted = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: " |u12:0::|u" + GetString(SI_TEMPERMINIMAP_SHOW_COMBAT),
      tooltip: GetString(SI_TEMPERMINIMAP_SHOW_COMBAT_TOOLTIP),
      default: this.accountDefaults.showCombat,
      getFunc: () => this.account.showCombat,
      setFunc: (value) => {
        this.account.showCombat = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: " |u12:0::|u" + GetString(SI_TEMPERMINIMAP_SHOW_SIEGE),
      tooltip: GetString(SI_TEMPERMINIMAP_SHOW_SIEGE_TOOLTIP),
      default: this.accountDefaults.showSiege,
      getFunc: () => this.account.showSiege,
      setFunc: (value) => {
        this.account.showSiege = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: " |u12:0::|u" + GetString(SI_TEMPERMINIMAP_SHOW_IN_HOUSING),
      tooltip: GetString(SI_TEMPERMINIMAP_SHOW_IN_HOUSING_TOOLTIP),
      default: this.accountDefaults.showInHousing,
      getFunc: () => this.account.showInHousing,
      setFunc: (value) => {
        this.account.showInHousing = asBoolean(value)
        this.UpdateVisibility()
      },
    })
    optionsTable.push({
      type: "checkbox",
      name: GetString(SI_TEMPERMINIMAP_ASYNC_UPDATE),
      tooltip: GetString(SI_TEMPERMINIMAP_ASYNC_UPDATE_TOOLTIP),
      default: this.accountDefaults.asyncUpdate,
      getFunc: () => this.account.asyncUpdate,
      setFunc: (value) => {
        this.account.asyncUpdate = asBoolean(value)
      },
    })
    optionsTable.push(header(GetString(SI_TEMPERMINIMAP_KEYBINDINGS_ZOOM)))
    optionsTable.push({
      type: "checkbox",
      name: GetString(SI_TEMPERMINIMAP_ZOOM_TO_PLAYER),
      tooltip: GetString(SI_TEMPERMINIMAP_ZOOM_TO_PLAYER_TOOLTIP),
      default: this.accountDefaults.zoomToPlayer,
      getFunc: () => this.account.zoomToPlayer,
      setFunc: (value) => {
        this.account.zoomToPlayer = asBoolean(value)
      },
    })
    optionsTable.push({
      type: "slider",
      name: GetString(SI_TEMPERMINIMAP_ZOOM_OUT),
      tooltip: GetString(SI_TEMPERMINIMAP_ZOOM_OUT_TOOLTIP),
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
      name: GetString(SI_TEMPERMINIMAP_ZOOM_IN),
      tooltip: GetString(SI_TEMPERMINIMAP_ZOOM_IN_TOOLTIP),
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
    optionsTable.push(header(GetString(SI_TEMPERMINIMAP_APPEARANCE)))
    optionsTable.push({
      type: "checkbox",
      name: GetString(SI_TEMPERMINIMAP_LOCK_POSITION),
      tooltip: GetString(SI_TEMPERMINIMAP_LOCK_POSITION_TOOLTIP),
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

  registerPanel(LAM, "TemperMiniMap_OptionsPanel", panelData, optionsTable)
}
