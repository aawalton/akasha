import {
  addMassHandlingNotificationsButton,
  cameraSpinChanges,
} from "../fco-mainmenu/fco-mainmenu.module.code.ts"
import { mapStuff } from "../fco-map/fco-map.module.code.ts"
import { overallSetDoNotInterruptInWorldOnMenuOpen } from "../fco-overall/fco-overall.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"
import type { AddonSettings } from "../fco-types/fco-types.module.code.ts"

export function buildKeybindControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Keybinds",
      controls: [
        {
          type: "checkbox",
          name: "Compass quest givers",
          tooltip: "Enable/Disable keybind to toggle the setings for compass quest givers",
          getFunc: () => settings.enableKeybindCompassQuestGivers === true,
          setFunc: (value) => {
            settings.enableKeybindCompassQuestGivers = value
          },
          default: defaults.enableKeybindCompassQuestGivers === true,
          width: "full",
        },
        {
          type: "checkbox",
          name: "Innocent attack",
          tooltip: "Enable/Disable keybind to toggle the setings for combat innocent attack",
          getFunc: () => settings.enableKeybindInnocentAttack === true,
          setFunc: (value) => {
            settings.enableKeybindInnocentAttack = value
          },
          default: defaults.enableKeybindInnocentAttack === true,
          width: "full",
        },
      ],
    },
  ]
}

export function buildOverallControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Overall" },
    {
      type: "checkbox",
      name: "Do not interrupt in world interaction on menu open",
      tooltip:
        'If enabled the in world interactions (harvest, etc.) will not be interrupted if you open the menu/inventory.\n\nThis will also disable the character spinning around towards you if you open the inventory.\n\nAttention: This setting will be disabled if you already got the addon "NoThankYou" enabled as it provides the same settings with more details! Please use the other addon to control the settings then.',
      getFunc: () => settings.doNotInterruptInWorldOnMenuOpen === true,
      setFunc: (value) => {
        settings.doNotInterruptInWorldOnMenuOpen = value
        overallSetDoNotInterruptInWorldOnMenuOpen(value)
      },
      default: defaults.doNotInterruptInWorldOnMenuOpen === true,
      disabled: () => NO_THANK_YOU_VARS !== undefined || STATE.otherAddons.NoThankYou === true,
      width: "full",
    },
  ]
}

export function buildMainMenuControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  const spinStopAtScenes = settings.spinStopAtScenes
  const spinStopAtScenesDefaults = defaults.spinStopAtScenes
  return [
    { type: "header", name: "Main menu" },
    {
      type: "checkbox",
      name: "Hide crown store button",
      tooltip: "Hide the crown store button in the main menu",
      getFunc: () => settings.hideCrownStoreButtonInMainMenu === true,
      setFunc: (value) => {
        settings.hideCrownStoreButtonInMainMenu = value
      },
      default: defaults.hideCrownStoreButtonInMainMenu === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Hide crown store points",
      tooltip: "Hide your crown store points info in the main menu",
      getFunc: () => settings.hideCrownStorePointsInMainMenu === true,
      setFunc: (value) => {
        settings.hideCrownStorePointsInMainMenu = value
      },
      default: defaults.hideCrownStorePointsInMainMenu === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Hide crown crates button",
      tooltip: "Hide the crown crates button in the main menu",
      getFunc: () => settings.hideCrownCratesButtonInMainMenu === true,
      setFunc: (value) => {
        settings.hideCrownCratesButtonInMainMenu = value
      },
      default: defaults.hideCrownCratesButtonInMainMenu === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Hide 'ESO Plus' membership info",
      tooltip: "Hide the 'ESO Plus' membership info in the main menu",
      getFunc: () => settings.hideCrownStoreMembershipInMainMenu === true,
      setFunc: (value) => {
        settings.hideCrownStoreMembershipInMainMenu = value
      },
      default: defaults.hideCrownStoreMembershipInMainMenu === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Show addon settings button",
      tooltip:
        "Show a button at the main menu which directly opens the lam addon settings.\n\nThis button won't be shown if you got \"Votan's settings menu\" addon enabled!",
      getFunc: () => settings.showAddonSettingsMainMenuButton === true,
      setFunc: (value) => {
        settings.showAddonSettingsMainMenuButton = value
      },
      default: defaults.showAddonSettingsMainMenuButton === true,
      width: "full",
      disabled: () =>
        VOTANS_MENU_SETTINGS !== undefined && VOTANS_MENU_SETTINGS.IsMenuButtonEnabled() === true,
      requiresReload: true,
    },
    {
      type: "checkbox",
      name: "Stop player spinning",
      tooltip:
        "Stop the player from spinning around if you open a menu. This will allow you to go on harvesting while opening a menu.",
      getFunc: () => settings.spinStop === true,
      setFunc: (value) => {
        settings.spinStop = value
        cameraSpinChanges()
      },
      default: defaults.spinStop === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Collections",
      tooltip: "Stop the player from spinning around if you open the collections book.",
      getFunc: () => spinStopAtScenes.collectionsBook === true,
      setFunc: (value) => {
        spinStopAtScenes.collectionsBook = value
        cameraSpinChanges()
      },
      default: spinStopAtScenesDefaults.collectionsBook === true,
      disabled: () => settings.spinStop !== true,
      width: "half",
    },
    {
      type: "checkbox",
      name: "Inventory/Character",
      tooltip: "Stop the player from spinning around if you open the inventory/character.",
      getFunc: () => spinStopAtScenes.inventory === true,
      setFunc: (value) => {
        spinStopAtScenes.inventory = value
        cameraSpinChanges()
      },
      default: spinStopAtScenesDefaults.inventory === true,
      disabled: () => settings.spinStop !== true,
      width: "half",
    },
    {
      type: "checkbox",
      name: "Stats",
      tooltip: "Stop the player from spinning around if you open the stats.",
      getFunc: () => spinStopAtScenes.stats === true,
      setFunc: (value) => {
        spinStopAtScenes.stats = value
        cameraSpinChanges()
      },
      default: spinStopAtScenesDefaults.stats === true,
      disabled: () => settings.spinStop !== true,
      width: "half",
    },
    {
      type: "checkbox",
      name: "All others",
      tooltip: "Stop the player from spinning around if you open any other scene.",
      getFunc: () => spinStopAtScenes.allOthers === true,
      setFunc: (value) => {
        spinStopAtScenes.allOthers = value
        cameraSpinChanges()
      },
      default: spinStopAtScenesDefaults.allOthers === true,
      disabled: () => settings.spinStop !== true,
      width: "half",
    },
  ]
}

export function buildNotificationsControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Notifications" },
    {
      type: "checkbox",
      name: 'Add "Mass-handling" button',
      tooltip:
        'Add an "Mass handling" context menu button at the notifications top right, where you can "Accept all" or "Decline all" notifications',
      getFunc: () => settings.addMassHandlingNotificationsButton === true,
      setFunc: (value) => {
        settings.addMassHandlingNotificationsButton = value
        addMassHandlingNotificationsButton()
      },
      default: defaults.addMassHandlingNotificationsButton === true,
      width: "full",
      requiresReload: true,
    },
  ]
}

export function buildMapControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Map" },
    {
      type: "checkbox",
      name: "Reopen map upon mounting",
      tooltip:
        "If you mount the map will be closed. This option will reopen the map if you were looking at it, as you started to mount.",
      getFunc: () => settings.reOpenMapOnMounting === true,
      setFunc: (value) => {
        settings.reOpenMapOnMounting = value
        mapStuff("mount")
      },
      default: defaults.reOpenMapOnMounting === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "En-/Disable all filters button",
      tooltip: "Show two buttons at the worldmap filters: Enable all/Disable all",
      getFunc: () => settings.showEnDisableAllFilterButtons === true,
      setFunc: (value) => {
        settings.showEnDisableAllFilterButtons = value
        mapStuff("filter")
      },
      default: defaults.showEnDisableAllFilterButtons === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Player pin: Ping pong effect",
      tooltip:
        "If you open the map the player pin will ping pong in it's size between big and small. This will work with a keybind (check the controls) as well, even on 'Votans Minimap'",
      getFunc: () => settings.pingPongPlayerPinOnMapOpen === true,
      setFunc: (value) => {
        settings.pingPongPlayerPinOnMapOpen = value
        mapStuff("playerpinpingpong")
      },
      default: defaults.pingPongPlayerPinOnMapOpen === true,
      width: "half",
    },
    {
      type: "slider",
      name: "Ping pong scaling",
      tooltip: "Set the scaling of the ping pong effect's pin",
      min: 1,
      max: 100,
      decimals: 0,
      autoSelect: true,
      getFunc: () => settings.pingPongPlayerPinOnMapOpenScaling,
      setFunc: (volumeLevel) => {
        settings.pingPongPlayerPinOnMapOpenScaling = volumeLevel
      },
      default: defaults.pingPongPlayerPinOnMapOpenScaling,
      width: "half",
      disabled: () => settings.pingPongPlayerPinOnMapOpen !== true,
    },
    {
      type: "checkbox",
      name: "Hide zone story",
      tooltip: "Hides the zone story window at the map",
      getFunc: () => settings.hideMapZoneStory === true,
      setFunc: (value) => {
        settings.hideMapZoneStory = value
        mapStuff("hidezonestory")
      },
      default: defaults.hideMapZoneStory === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "BeamMeUp addon can show zone guide",
      tooltip: "Allows the addon BeamMeUp to show the zone guid via it's toggle again",
      getFunc: () => settings.hideMapZoneStoryBeamMeUpAllowedToShow === true,
      setFunc: (value) => {
        settings.hideMapZoneStoryBeamMeUpAllowedToShow = value
      },
      default: defaults.hideMapZoneStoryBeamMeUpAllowedToShow === true,
      disabled: () => settings.hideMapZoneStory !== true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Hide POIs in cities",
      tooltip:
        "Will hide all kind of POI textures within subzones like cities.\nIf you currently are in a city while changing this option: Right click the map to show it's parent, else the city POI textures won't update!\n\nIf you want to remove the default POIs like wayshrine or house icon for the city name, use the default map filters please!",
      getFunc: () => settings.hidePOIsInCities === true,
      setFunc: (value) => {
        settings.hidePOIsInCities = value
        mapStuff("cityPOIs")
      },
      default: defaults.hidePOIsInCities === true,
      width: "full",
    },
  ]
}
