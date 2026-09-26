import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import { prominentSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/state/combat-alerts-settings-state.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function sanitySettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Sanity's Edge",
      controls: prominentSettings(1427, [
        {
          type: "checkbox",
          name: "Show Chimera puzzle numbers",
          tooltip: "In the Twelvane + Chimera fight, shows numbers on the puzzle glyphics",
          default: true,
          getFunc: () => CRUTCH.savedOptions.sanitysedge.showChimeraIcons,
          setFunc: (value) => {
            CRUTCH.savedOptions.sanitysedge.showChimeraIcons = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "slider",
          name: "    Chimera icons size",
          min: 20,
          max: 300,
          step: 10,
          default: 150,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.sanitysedge.chimeraIconsSize,
          setFunc: (value) => {
            CRUTCH.savedOptions.sanitysedge.chimeraIconsSize = value
            CRUTCH.OnPlayerActivated()
          },
          disabled: () => !CRUTCH.savedOptions.sanitysedge.showChimeraIcons,
        },
        {
          type: "checkbox",
          name: "Show center of Ansuul arena",
          tooltip: "In the Ansuul fight, shows an icon in the world on the center of the arena",
          default: true,
          getFunc: () => CRUTCH.savedOptions.sanitysedge.showAnsuulIcon,
          setFunc: (value) => {
            CRUTCH.savedOptions.sanitysedge.showAnsuulIcon = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "slider",
          name: "    Ansuul icon size",
          min: 20,
          max: 300,
          step: 10,
          default: 150,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.sanitysedge.ansuulIconSize,
          setFunc: (value) => {
            CRUTCH.savedOptions.sanitysedge.ansuulIconSize = value
            CRUTCH.OnPlayerActivated()
          },
          disabled: () => !CRUTCH.savedOptions.sanitysedge.showAnsuulIcon,
        },
        {
          type: "checkbox",
          name: "Show Poisoned Mind icons",
          tooltip: "In the Ansuul fight, shows icons above players who have Poisoned Mind",
          default: true,
          getFunc: () => CRUTCH.savedOptions.sanitysedge.showPoisonedMindIcons,
          setFunc: (value) => {
            CRUTCH.savedOptions.sanitysedge.showPoisonedMindIcons = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "slider",
          name: "    Poisoned Mind icons size",
          min: 20,
          max: 300,
          step: 10,
          default: 150,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.sanitysedge.poisonedMindIconsSize,
          setFunc: (value) => {
            CRUTCH.savedOptions.sanitysedge.poisonedMindIconsSize = value
            CRUTCH.OnPlayerActivated()
          },
          disabled: () => !CRUTCH.savedOptions.sanitysedge.showPoisonedMindIcons,
        },
        {
          type: "checkbox",
          name: "Show Breakdown health bars",
          tooltip:
            "Shows the health of the clones during the split phase of the Ansuul fight, using the vertical boss health bars",
          default: true,
          getFunc: () => CRUTCH.savedOptions.sanitysedge.showSplitHp,
          setFunc: (value) => {
            CRUTCH.savedOptions.sanitysedge.showSplitHp = value
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
          type: "checkbox",
          name: "Show Frost Bomb timer",
          tooltip:
            "In the Yaseyla fight, shows approximate time until Frost Bombs in the info panel",
          default: true,
          getFunc: () => CRUTCH.savedOptions.sanitysedge.infoPanel.showFrostBomb,
          setFunc: (value) => {
            CRUTCH.savedOptions.sanitysedge.infoPanel.showFrostBomb = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Arctic Shred timer",
          tooltip:
            "In the Twelvane + Chimera fight, shows approximate time until Arctic Shred in the info panel",
          default: true,
          getFunc: () => CRUTCH.savedOptions.sanitysedge.showArcticShred,
          setFunc: (value) => {
            CRUTCH.savedOptions.sanitysedge.showArcticShred = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Wrathstorm timer",
          tooltip: "In the Ansuul fight, shows approximate time until Wrathstorm in the info panel",
          default: true,
          getFunc: () => CRUTCH.savedOptions.sanitysedge.infoPanel.showWrathstorm,
          setFunc: (value) => {
            CRUTCH.savedOptions.sanitysedge.infoPanel.showWrathstorm = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Calamity timer",
          tooltip: "In the Ansuul fight, shows approximate time until Calamity in the info panel",
          default: true,
          getFunc: () => CRUTCH.savedOptions.sanitysedge.infoPanel.showCalamity,
          setFunc: (value) => {
            CRUTCH.savedOptions.sanitysedge.infoPanel.showCalamity = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
      ]),
    },
  ]
}
