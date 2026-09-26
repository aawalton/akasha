import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-trials-c-declarations/combat-alerts-trials-c-declarations.type-declaration.d.ts"
import {
  effectSettings,
  prominentSettings,
} from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/state/combat-alerts-settings-state.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function cloudrestSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Cloudrest",
      controls: prominentSettings(
        1051,
        effectSettings(1051, [
          {
            type: "checkbox",
            name: "Show spears indicator",
            tooltip: "Show an indicator for how many spears are revealed, sent, and orbs dunked",
            default: true,
            getFunc: () => CRUTCH.savedOptions.cloudrest.showSpears,
            setFunc: (value) => {
              CRUTCH.savedOptions.cloudrest.showSpears = value
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Play spears sound",
            tooltip: "Plays the champion point committed sound when a spear is revealed",
            default: true,
            getFunc: () => CRUTCH.savedOptions.cloudrest.spearsSound,
            setFunc: (value) => {
              CRUTCH.savedOptions.cloudrest.spearsSound = value
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show Voltaic Current timer",
            tooltip:
              "Plays sounds and shows the time until you will receive Voltaic Overload, so you should swap to your less important bar during this time",
            default: true,
            getFunc: () => CRUTCH.savedOptions.cloudrest.showVoltaicAlert,
            setFunc: (value) => {
              CRUTCH.savedOptions.cloudrest.showVoltaicAlert = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show Hoarfrost timer",
            tooltip:
              "Shows a timer for when you can drop Hoarfrost, and a timer after that for when Overwhelming Hoarfrost would kill you (on veteran)",
            default: true,
            getFunc: () => CRUTCH.savedOptions.cloudrest.showFrostAlert,
            setFunc: (value) => {
              CRUTCH.savedOptions.cloudrest.showFrostAlert = value
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Alert drop Hoarfrost",
            tooltip: "Displays a prominent alert and ding sound when you can drop Hoarfrost",
            default: true,
            getFunc: () => CRUTCH.savedOptions.cloudrest.dropFrostProminent,
            setFunc: (value) => {
              CRUTCH.savedOptions.cloudrest.dropFrostProminent = value
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show Hoarfrost icon",
            tooltip: "Shows icons above players who currently have Hoarfrost",
            default: false,
            getFunc: () => CRUTCH.savedOptions.cloudrest.showFrostIcons,
            setFunc: (value) => {
              CRUTCH.savedOptions.cloudrest.showFrostIcons = value
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show flare sides",
            tooltip:
              "On Z'Maja during execute with +Siroria, show which side each of the two people with Roaring Flares can go to (will be same sides as RaidNotifier)",
            default: true,
            getFunc: () => CRUTCH.savedOptions.cloudrest.showFlaresSides,
            setFunc: (value) => {
              CRUTCH.savedOptions.cloudrest.showFlaresSides = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show flare icon",
            tooltip: "Shows icons above players who are targeted by Roaring Flare",
            default: true,
            getFunc: () => CRUTCH.savedOptions.cloudrest.showFlareIcon,
            setFunc: (value) => {
              CRUTCH.savedOptions.cloudrest.showFlareIcon = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Color Ody death icon",
            tooltip:
              "Colors the OdySupportIcons death icon purple if a player's shade is still up. This is only a hook for OdySupportIcons; the built-in Crutch death icons are already colored purple when the shade is active",
            default: true,
            getFunc: () => CRUTCH.savedOptions.cloudrest.deathIconColor,
            setFunc: (value) => {
              CRUTCH.savedOptions.cloudrest.deathIconColor = value
            },
            width: "full",
            disabled: () =>
              OSI === undefined ||
              OSI.UnitErrorCheck === undefined ||
              OSI.GetIconDataForPlayer === undefined,
          },
          {
            type: "description",
            title: "|c08BD1DInfo Panel|r",
            text: "Shows timers or other info in a consolidated panel. Unlock the UI or |c99FF99/crutch unlock|r to reposition the info panel.",
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show portal timer",
            tooltip:
              "Shows in the info panel a countdown until the next portal, and a timer for portal wipe",
            default: true,
            getFunc: () => CRUTCH.savedOptions.cloudrest.infoPanel.showPortal,
            setFunc: (value) => {
              CRUTCH.savedOptions.cloudrest.infoPanel.showPortal = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show Malicious Sphere tracker",
            tooltip:
              "Shows in the info panel a countdown until the next Malicious Spheres (orbs, grapes, whatever) will be summoned, a timer for when they will charge, and a visual for how many have been killed or collided",
            default: true,
            getFunc: () => CRUTCH.savedOptions.cloudrest.infoPanel.showGrapes,
            setFunc: (value) => {
              CRUTCH.savedOptions.cloudrest.infoPanel.showGrapes = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
        ])
      ),
    },
  ]
}
