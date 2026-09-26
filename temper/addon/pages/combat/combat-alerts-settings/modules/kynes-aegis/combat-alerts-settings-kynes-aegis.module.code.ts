import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import { prominentSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/state/combat-alerts-settings-state.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function hallsKynesSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Halls of Fabrication",
      controls: prominentSettings(975, [
        {
          type: "checkbox",
          name: "Show Shock Field for triplets",
          tooltip:
            "In the triplets fight, shows the approximate outline of Shock Field even when it's not active",
          default: true,
          getFunc: () => CRUTCH.savedOptions.hallsoffabrication.showTripletsIcon,
          setFunc: (value) => {
            CRUTCH.savedOptions.hallsoffabrication.showTripletsIcon = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Assembly General icons",
          tooltip: "Shows icons in the world for execute positions",
          default: true,
          getFunc: () => CRUTCH.savedOptions.hallsoffabrication.showAGIcons,
          setFunc: (value) => {
            CRUTCH.savedOptions.hallsoffabrication.showAGIcons = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "slider",
          name: "    Assembly General icons size",
          min: 20,
          max: 300,
          step: 10,
          default: 150,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.hallsoffabrication.agIconsSize,
          setFunc: (value) => {
            CRUTCH.savedOptions.hallsoffabrication.agIconsSize = value
            CRUTCH.OnPlayerActivated()
          },
          disabled: () => !CRUTCH.savedOptions.hallsoffabrication.showAGIcons,
        },
      ]),
    },
    {
      type: "submenu",
      name: "Hel Ra Citadel",
      controls: [
        {
          type: "checkbox",
          name: "Show circles on Stone Form",
          tooltip:
            "On the Warrior hardmode, shows faint circles around players who have Stone Form. The circle approximates the area of the oneshot if the player synergizes to break out of it",
          default: true,
          getFunc: () => CRUTCH.savedOptions.helracitadel.showStoneFormCircle,
          setFunc: (value) => {
            CRUTCH.savedOptions.helracitadel.showStoneFormCircle = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
      ],
    },
    {
      type: "submenu",
      name: "Kyne's Aegis",
      controls: prominentSettings(1196, [
        {
          type: "checkbox",
          name: "Show Exploding Spear landing spot",
          tooltip:
            "On trash packs with Half-Giant Raiders, shows circles at the approximate locations where Exploding Spears will land (may vary due to latency)",
          default: true,
          getFunc: () => CRUTCH.savedOptions.kynesaegis.showSpearIcon,
          setFunc: (value) => {
            CRUTCH.savedOptions.kynesaegis.showSpearIcon = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Blood Prison icon",
          tooltip:
            "Shows icon above player who is targeted by Blood Prison, slightly before the bubble even shows up",
          default: true,
          getFunc: () => CRUTCH.savedOptions.kynesaegis.showPrisonIcon,
          setFunc: (value) => {
            CRUTCH.savedOptions.kynesaegis.showPrisonIcon = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Falgravn 2nd floor icons",
          tooltip:
            "In the Falgravn fight, shows 1~4 DPS in the world for stacks and tank spot suggestions",
          default: true,
          getFunc: () => CRUTCH.savedOptions.kynesaegis.showFalgravnIcons,
          setFunc: (value) => {
            CRUTCH.savedOptions.kynesaegis.showFalgravnIcons = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "slider",
          name: "    Falgravn icon size",
          min: 20,
          max: 300,
          step: 10,
          default: 150,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.kynesaegis.falgravnIconsSize,
          setFunc: (value) => {
            CRUTCH.savedOptions.kynesaegis.falgravnIconsSize = value
            CRUTCH.OnPlayerActivated()
          },
          disabled: () => !CRUTCH.savedOptions.kynesaegis.showFalgravnIcons,
        },
      ]),
    },
  ]
}
