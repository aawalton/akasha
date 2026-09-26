import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function asylumSettings(this: void): LamControlData[] {
  return [
    {
      type: "description",
      title: "Trials",
      text: "Below are settings for special mechanics in specific trials.",
      width: "full",
    },
    {
      type: "submenu",
      name: "Asylum Sanctorium",
      controls: [
        {
          type: "checkbox",
          name: "Play sound for cone on self",
          tooltip: "Play a ding sound when Llothis' Defiling Dye Blast targets you",
          default: true,
          getFunc: () => CRUTCH.savedOptions.asylumsanctorium.dingSelfCone,
          setFunc: (value) => {
            CRUTCH.savedOptions.asylumsanctorium.dingSelfCone = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Play sound for cone on others",
          tooltip: "Play a ding sound when Llothis' Defiling Dye Blast targets other players",
          default: false,
          getFunc: () => CRUTCH.savedOptions.asylumsanctorium.dingOthersCone,
          setFunc: (value) => {
            CRUTCH.savedOptions.asylumsanctorium.dingOthersCone = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show minis' health bars",
          tooltip: "Shows Felms' and Llothis' health using the vertical boss health bars",
          default: true,
          getFunc: () => CRUTCH.savedOptions.asylumsanctorium.showMinisHp,
          setFunc: (value) => {
            CRUTCH.savedOptions.asylumsanctorium.showMinisHp = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
          disabled: () => !CRUTCH.savedOptions.bossHealthBar.enabled,
        },
        {
          type: "description",
          title: "|c08BD1DInfo Panel|r",
          text: "Shows timers or other info in a consolidated panel. Unlock the UI or |c99FF99/crutch unlock|r to reposition the info panel.",
          width: "full",
        },
        {
          type: "dropdown",
          multiSelect: true,
          name: "Show Llothis name and enrage / respawn",
          tooltip: "Shows a header line for time until Llothis enrages or when he will respawn",
          choices: ["Tank", "Healer", "DPS"],
          default: ["Tank", "Healer", "DPS"],
          getFunc: () => {
            return CRUTCH.ConvertRoleValueToStrings(
              CRUTCH.savedOptions.asylumsanctorium.panel.showLlothisHeader
            )
          },
          setFunc: (tab) => {
            CRUTCH.savedOptions.asylumsanctorium.panel.showLlothisHeader =
              CRUTCH.ConvertRoleStringsToValue(tab as string[])
          },
          width: "full",
        },
        {
          type: "dropdown",
          multiSelect: true,
          name: "Show Llothis bolts timer",
          tooltip:
            "Shows a line for time until Llothis can cast Soul Stained Corruption (the damage it does is Oppressive Bolts)",
          choices: ["Tank", "Healer", "DPS"],
          default: ["Tank", "Healer", "DPS"],
          getFunc: () => {
            return CRUTCH.ConvertRoleValueToStrings(
              CRUTCH.savedOptions.asylumsanctorium.panel.showLlothisBolts
            )
          },
          setFunc: (tab) => {
            CRUTCH.savedOptions.asylumsanctorium.panel.showLlothisBolts =
              CRUTCH.ConvertRoleStringsToValue(tab as string[])
          },
          width: "full",
        },
        {
          type: "dropdown",
          multiSelect: true,
          name: "Show Llothis cone timer",
          tooltip: "Shows a line for time until Llothis can cast Defiling Dye Blast",
          choices: ["Tank", "Healer", "DPS"],
          default: ["Tank", "Healer", "DPS"],
          getFunc: () => {
            return CRUTCH.ConvertRoleValueToStrings(
              CRUTCH.savedOptions.asylumsanctorium.panel.showLlothisCone
            )
          },
          setFunc: (tab) => {
            CRUTCH.savedOptions.asylumsanctorium.panel.showLlothisCone =
              CRUTCH.ConvertRoleStringsToValue(tab as string[])
          },
          width: "full",
        },
        {
          type: "dropdown",
          multiSelect: true,
          name: "Show Llothis teleport timer",
          tooltip:
            "Shows a line for time until Llothis can cast Pernicious Transmission, which is his teleport and fart puddle (Noxious Gas)",
          choices: ["Tank", "Healer", "DPS"],
          default: ["Tank", "Healer", "DPS"],
          getFunc: () => {
            return CRUTCH.ConvertRoleValueToStrings(
              CRUTCH.savedOptions.asylumsanctorium.panel.showLlothisTeleport
            )
          },
          setFunc: (tab) => {
            CRUTCH.savedOptions.asylumsanctorium.panel.showLlothisTeleport =
              CRUTCH.ConvertRoleStringsToValue(tab as string[])
          },
          width: "full",
        },
        {
          type: "dropdown",
          multiSelect: true,
          name: "Show Felms name and enrage / respawn",
          tooltip: "Shows a header line for time until Felms enrages or when he will respawn",
          choices: ["Tank", "Healer", "DPS"],
          default: ["Tank", "Healer", "DPS"],
          getFunc: () => {
            return CRUTCH.ConvertRoleValueToStrings(
              CRUTCH.savedOptions.asylumsanctorium.panel.showFelmsHeader
            )
          },
          setFunc: (tab) => {
            CRUTCH.savedOptions.asylumsanctorium.panel.showFelmsHeader =
              CRUTCH.ConvertRoleStringsToValue(tab as string[])
          },
          width: "full",
        },
        {
          type: "dropdown",
          multiSelect: true,
          name: "Show Felms teleport timer",
          tooltip: "Shows a line for time until Felms can cast Teleport Strike",
          choices: ["Tank", "Healer", "DPS"],
          default: ["Tank", "Healer", "DPS"],
          getFunc: () => {
            return CRUTCH.ConvertRoleValueToStrings(
              CRUTCH.savedOptions.asylumsanctorium.panel.showFelmsTeleport
            )
          },
          setFunc: (tab) => {
            CRUTCH.savedOptions.asylumsanctorium.panel.showFelmsTeleport =
              CRUTCH.ConvertRoleStringsToValue(tab as string[])
          },
          width: "full",
        },
      ],
    },
  ]
}
