import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import { rockgroveCurseSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/rockgrove-curse/combat-alerts-settings-rockgrove-curse.module.code.ts"
import {
  effectSettings,
  prominentSettings,
} from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/state/combat-alerts-settings-state.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function rockgroveSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Rockgrove",
      controls: prominentSettings(
        1263,
        effectSettings(1263, [
          {
            type: "checkbox",
            name: "Show Noxious Sludge sides",
            tooltip:
              "Displays who should go left and who should go right for Noxious Sludge, matching Qcell's Rockgrove Helper",
            default: true,
            getFunc: () => CRUTCH.savedOptions.rockgrove.sludgeSides,
            setFunc: (value) => {
              CRUTCH.savedOptions.rockgrove.sludgeSides = value
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show Noxious Sludge icons",
            tooltip: "Shows icons above players who receive Noxious Sludge from Oaxiltso",
            default: CRUTCH.defaultOptions.rockgrove.showSludgeIcons,
            getFunc: () => CRUTCH.savedOptions.rockgrove.showSludgeIcons,
            setFunc: (value) => {
              CRUTCH.savedOptions.rockgrove.showSludgeIcons = value
            },
            width: "full",
          },
          {
            type: "dropdown",
            name: "Show Bleeding timer",
            tooltip:
              'Shows an "alert" timer for Bleeding from Flesh Abominations\' Hemorrhaging Smack. If set to "Self/Heal Only" it will display only if your LFG role is healer or if the bleed is on yourself',
            choices: ["Never", "Self/Heal Only", "Always"],
            choicesValues: ["NEVER", "HEAL", "ALWAYS"],
            default: "HEAL",
            getFunc: () => {
              return CRUTCH.savedOptions.rockgrove.showBleeding
            },
            setFunc: (value) => {
              CRUTCH.savedOptions.rockgrove.showBleeding = value as string
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show Death Touch icons",
            tooltip:
              "Shows icons above group members' heads when they have Death Touch (Bahsei curse), counting down to when they would explode",
            default: true,
            getFunc: () => CRUTCH.savedOptions.rockgrove.showCurseIcons,
            setFunc: (value) => {
              CRUTCH.savedOptions.rockgrove.showCurseIcons = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "description",
            title: "|c08BD1DInfo Panel|r",
            text: "Shows timers or other info in a consolidated panel. Unlock the UI or |c99FF99/crutch unlock|r to reposition the info panel.",
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show time until Noxious Sludge",
            tooltip: "Shows the time until Oaxiltso may cast the next Noxious Sludge",
            default: CRUTCH.defaultOptions.rockgrove.panel.showSludge,
            getFunc: () => CRUTCH.savedOptions.rockgrove.panel.showSludge,
            setFunc: (value) => {
              CRUTCH.savedOptions.rockgrove.panel.showSludge = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show time until Savage Blitz",
            tooltip: "Shows the time until Oaxiltso may make you flat. Hee hee.",
            default: CRUTCH.defaultOptions.rockgrove.panel.showBlitz,
            getFunc: () => CRUTCH.savedOptions.rockgrove.panel.showBlitz,
            setFunc: (value) => {
              CRUTCH.savedOptions.rockgrove.panel.showBlitz = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show time until portal",
            tooltip: "Shows portal number and time until Bahsei can spawn the next portal on HM",
            default: CRUTCH.defaultOptions.rockgrove.panel.showTimeToPortal,
            getFunc: () => CRUTCH.savedOptions.rockgrove.panel.showTimeToPortal,
            setFunc: (value) => {
              CRUTCH.savedOptions.rockgrove.panel.showTimeToPortal = value
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show portal direction",
            tooltip: "Shows the direction of the current portal on Bahsei HM",
            default: CRUTCH.defaultOptions.rockgrove.panel.showPortalDirection,
            getFunc: () => CRUTCH.savedOptions.rockgrove.panel.showPortalDirection,
            setFunc: (value) => {
              CRUTCH.savedOptions.rockgrove.panel.showPortalDirection = value
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show number of players in portal",
            tooltip: "Shows the current number of players in portal on Bahsei HM",
            default: CRUTCH.defaultOptions.rockgrove.panel.showNumInPortal,
            getFunc: () => CRUTCH.savedOptions.rockgrove.panel.showNumInPortal,
            setFunc: (value) => {
              CRUTCH.savedOptions.rockgrove.panel.showNumInPortal = value
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show time until Sickle Strike",
            tooltip: "Shows the time until Bahsei may cast scythe",
            default: CRUTCH.defaultOptions.rockgrove.panel.showScythe,
            getFunc: () => CRUTCH.savedOptions.rockgrove.panel.showScythe,
            setFunc: (value) => {
              CRUTCH.savedOptions.rockgrove.panel.showScythe = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show time until Cursed Ground",
            tooltip: "Shows the time until Bahsei may cast Cursed Ground",
            default: CRUTCH.defaultOptions.rockgrove.panel.showCursedGround,
            getFunc: () => CRUTCH.savedOptions.rockgrove.panel.showCursedGround,
            setFunc: (value) => {
              CRUTCH.savedOptions.rockgrove.panel.showCursedGround = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          ...rockgroveCurseSettings(),
        ])
      ),
    },
  ]
}
