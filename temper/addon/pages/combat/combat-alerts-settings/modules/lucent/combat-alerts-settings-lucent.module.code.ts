import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import {
  effectSettings,
  prominentSettings,
} from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/state/combat-alerts-settings-state.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function lucentMawSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Lucent Citadel",
      controls: prominentSettings(
        1478,
        effectSettings(1478, [
          {
            type: "checkbox",
            name: "Show Cavot Agnan spawn spot",
            tooltip: "Shows icon for where Cavot Agnan will spawn",
            default: true,
            getFunc: () => CRUTCH.savedOptions.lucentcitadel.showCavotIcon,
            setFunc: (value) => {
              CRUTCH.savedOptions.lucentcitadel.showCavotIcon = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "slider",
            name: "    Cavot Agnan icon size",
            tooltip: "The size of the icon for Cavot Agnan spawn",
            min: 20,
            max: 300,
            step: 10,
            default: 100,
            width: "full",
            getFunc: () => CRUTCH.savedOptions.lucentcitadel.cavotIconSize,
            setFunc: (value) => {
              CRUTCH.savedOptions.lucentcitadel.cavotIconSize = value
              CRUTCH.OnPlayerActivated()
            },
            disabled: () => !CRUTCH.savedOptions.lucentcitadel.showCavotIcon,
          },
          {
            type: "checkbox",
            name: "Show Orphic Shattered Shard mirror icons",
            tooltip: "Shows icons for each mirror on the Orphic Shattered Shard fight",
            default: true,
            getFunc: () => CRUTCH.savedOptions.lucentcitadel.showOrphicIcons,
            setFunc: (value) => {
              CRUTCH.savedOptions.lucentcitadel.showOrphicIcons = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "    Orphic numbered icons",
            tooltip:
              "Uses numbers 1~8 instead of cardinal directions N/SW/etc. for the mirror icons",
            default: false,
            getFunc: () => CRUTCH.savedOptions.lucentcitadel.orphicIconsNumbers,
            setFunc: (value) => {
              CRUTCH.savedOptions.lucentcitadel.orphicIconsNumbers = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
            disabled: () => !CRUTCH.savedOptions.lucentcitadel.showOrphicIcons,
          },
          {
            type: "slider",
            name: "    Orphic icons size",
            tooltip: "The size of the mirror icons",
            min: 20,
            max: 300,
            step: 10,
            default: 150,
            width: "full",
            getFunc: () => CRUTCH.savedOptions.lucentcitadel.orphicIconSize,
            setFunc: (value) => {
              CRUTCH.savedOptions.lucentcitadel.orphicIconSize = value
              CRUTCH.OnPlayerActivated()
            },
            disabled: () => !CRUTCH.savedOptions.lucentcitadel.showOrphicIcons,
          },
          {
            type: "checkbox",
            name: "Show Arcane Conveyance tether",
            tooltip:
              "Shows a line connecting group members who are about to (or have already received) the Arcane Conveyance tether from Dariel Lemonds",
            default: true,
            getFunc: () => CRUTCH.savedOptions.lucentcitadel.showArcaneConveyance,
            setFunc: (value) => {
              CRUTCH.savedOptions.lucentcitadel.showArcaneConveyance = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "dropdown",
            name: "Show Weakening Charge timer",
            tooltip:
              'Shows an "alert" timer for Weakening Charge. If set to "Tank Only" it will display only if your LFG role is tank',
            choices: ["Never", "Tank Only", "Always"],
            choicesValues: ["NEVER", "TANK", "ALWAYS"],
            getFunc: () => {
              return CRUTCH.savedOptions.lucentcitadel.showWeakeningCharge
            },
            setFunc: (value) => {
              CRUTCH.savedOptions.lucentcitadel.showWeakeningCharge = value as string
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show Xoryn Tempest position icons",
            tooltip:
              "Shows icons for group member positions on the Xoryn fight for Tempest (and at the beginning of the trial, for practice purposes)",
            default: true,
            getFunc: () => CRUTCH.savedOptions.lucentcitadel.showTempestIcons,
            setFunc: (value) => {
              CRUTCH.savedOptions.lucentcitadel.showTempestIcons = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "slider",
            name: "    Tempest icons size",
            tooltip: "The size of the Tempest icons",
            min: 20,
            max: 300,
            step: 10,
            default: 150,
            width: "full",
            getFunc: () => CRUTCH.savedOptions.lucentcitadel.tempestIconsSize,
            setFunc: (value) => {
              CRUTCH.savedOptions.lucentcitadel.tempestIconsSize = value
              CRUTCH.OnPlayerActivated()
            },
            disabled: () => !CRUTCH.savedOptions.lucentcitadel.showTempestIcons,
          },
        ])
      ),
    },
    {
      type: "submenu",
      name: "Maw of Lorkhaj",
      controls: prominentSettings(
        725,
        effectSettings(725, [
          {
            type: "checkbox",
            name: "Show Zhaj'hassa cleanse pad cooldowns",
            tooltip:
              "In the Zhaj'hassa fight, shows tiles with cooldown timers for 25 seconds (veteran)",
            default: true,
            getFunc: () => CRUTCH.savedOptions.mawoflorkhaj.showPads,
            setFunc: (value) => {
              CRUTCH.savedOptions.mawoflorkhaj.showPads = value
              CRUTCH.OnPlayerActivated()
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show Twins Aspect icons",
            tooltip:
              "In the Vashai + S'kinrai fight, shows icons above players' heads with their Shadow or Lunar Aspect",
            default: true,
            getFunc: () => CRUTCH.savedOptions.mawoflorkhaj.showTwinsIcons,
            setFunc: (value) => {
              CRUTCH.savedOptions.mawoflorkhaj.showTwinsIcons = value
            },
            width: "full",
          },
          {
            type: "checkbox",
            name: "Show Twins color swap",
            tooltip:
              "In the twins fight, shows a prominent alert when you receive Shadow/Lunar Conversion",
            default: true,
            getFunc: () => CRUTCH.savedOptions.mawoflorkhaj.prominentColorSwap,
            setFunc: (value) => {
              CRUTCH.savedOptions.mawoflorkhaj.prominentColorSwap = value
            },
            width: "full",
          },
        ])
      ),
    },
  ]
}
