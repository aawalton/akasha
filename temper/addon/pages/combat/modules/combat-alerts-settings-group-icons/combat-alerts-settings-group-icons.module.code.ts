import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { individualIconSettings } from "akasha/temper/addon/pages/combat/modules/combat-alerts-settings-individual/combat-alerts-settings-individual.module.code.ts"
import {
  colorDef,
  unpackColor,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-settings-state/combat-alerts-settings-state.module.code.ts"

export function groupMemberIconSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Group Member Icons",
      controls: [
        {
          type: "description",
          text: "These are settings for icons attached to group members, which will also apply to icons shown from mechanics, such as MoL twins Aspects.",
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show group icon for self",
          tooltip:
            "Whether to show the role, crown, and death icons for yourself. This setting does not affect icons from mechanics",
          default: CRUTCH.defaultOptions.drawing.attached.showSelfRole,
          getFunc: () => CRUTCH.savedOptions.drawing.attached.showSelfRole,
          setFunc: (value) => {
            CRUTCH.savedOptions.drawing.attached.showSelfRole = value
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "full",
        },
        {
          type: "slider",
          name: "Size",
          tooltip: "General size of icons. Mechanic icons may display different sizes",
          min: 0,
          max: 400,
          step: 10,
          default: CRUTCH.defaultOptions.drawing.attached.size,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.drawing.attached.size,
          setFunc: (value) => {
            CRUTCH.savedOptions.drawing.attached.size = value
            CRUTCH.Drawing.RefreshGroup()
          },
        },
        {
          type: "slider",
          name: "Vertical offset",
          tooltip: "Y coordinate offset for non-death icons",
          min: 0,
          max: 500,
          step: 25,
          default: CRUTCH.defaultOptions.drawing.attached.yOffset,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.drawing.attached.yOffset,
          setFunc: (value) => {
            CRUTCH.savedOptions.drawing.attached.yOffset = value
            CRUTCH.Drawing.RefreshGroup()
          },
        },
        {
          type: "slider",
          name: "Opacity",
          tooltip: "How transparent the icons are. Mechanic icons may display differently",
          min: 0,
          max: 100,
          step: 5,
          default: CRUTCH.defaultOptions.drawing.attached.opacity * 100,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.drawing.attached.opacity * 100,
          setFunc: (value) => {
            CRUTCH.savedOptions.drawing.attached.opacity = value / 100
            CRUTCH.Drawing.RefreshGroup()
          },
        },
        {
          type: "checkbox",
          name: "Hide icons behind objects",
          tooltip:
            'Whether to use depth buffers to have icons be hidden by objects. For example, if this is ON, you won\'t be able to see the icon behind a tree. In order for this setting to work while ON, you must have "SubSampling Quality" set to "High" in your Video settings',
          default: CRUTCH.defaultOptions.drawing.attached.useDepthBuffers,
          getFunc: () => CRUTCH.savedOptions.drawing.attached.useDepthBuffers,
          setFunc: (value) => {
            CRUTCH.savedOptions.drawing.attached.useDepthBuffers = value
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "full",
        },
        {
          type: "divider",
        },
        {
          type: "checkbox",
          name: "Show tanks",
          tooltip: "Whether to show tank icons for group members with LFG role set as tank",
          default: CRUTCH.defaultOptions.drawing.attached.showTank,
          getFunc: () => CRUTCH.savedOptions.drawing.attached.showTank,
          setFunc: (value) => {
            CRUTCH.savedOptions.drawing.attached.showTank = value
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
        },
        {
          type: "colorpicker",
          name: "Tank color",
          tooltip: "Color of the tank icons",
          default: colorDef(CRUTCH.defaultOptions.drawing.attached.tankColor),
          getFunc: () => {
            return unpackColor(CRUTCH.savedOptions.drawing.attached.tankColor)
          },
          setFunc: (r, g, b) => {
            CRUTCH.savedOptions.drawing.attached.tankColor = [r, g, b]
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
          disabled: () => !CRUTCH.savedOptions.drawing.attached.showTank,
        },
        {
          type: "checkbox",
          name: "Show healers",
          tooltip: "Whether to show healer icons for group members with LFG role set as healer",
          default: CRUTCH.defaultOptions.drawing.attached.showHeal,
          getFunc: () => CRUTCH.savedOptions.drawing.attached.showHeal,
          setFunc: (value) => {
            CRUTCH.savedOptions.drawing.attached.showHeal = value
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
        },
        {
          type: "colorpicker",
          name: "Healer color",
          tooltip: "Color of the healer icons",
          default: colorDef(CRUTCH.defaultOptions.drawing.attached.healColor),
          getFunc: () => {
            return unpackColor(CRUTCH.savedOptions.drawing.attached.healColor)
          },
          setFunc: (r, g, b) => {
            CRUTCH.savedOptions.drawing.attached.healColor = [r, g, b]
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
          disabled: () => !CRUTCH.savedOptions.drawing.attached.showHeal,
        },
        {
          type: "checkbox",
          name: "Show DPS",
          tooltip: "Whether to show DPS icons for group members with LFG role set as DPS",
          default: CRUTCH.defaultOptions.drawing.attached.showDps,
          getFunc: () => CRUTCH.savedOptions.drawing.attached.showDps,
          setFunc: (value) => {
            CRUTCH.savedOptions.drawing.attached.showDps = value
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
        },
        {
          type: "colorpicker",
          name: "DPS color",
          tooltip: "Color of the DPS icons",
          default: colorDef(CRUTCH.defaultOptions.drawing.attached.dpsColor),
          getFunc: () => {
            return unpackColor(CRUTCH.savedOptions.drawing.attached.dpsColor)
          },
          setFunc: (r, g, b) => {
            CRUTCH.savedOptions.drawing.attached.dpsColor = [r, g, b]
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
          disabled: () => !CRUTCH.savedOptions.drawing.attached.showDps,
        },
        {
          type: "checkbox",
          name: "Show crown",
          tooltip: "Whether to show a crown icon for the group leader",
          default: CRUTCH.defaultOptions.drawing.attached.showCrown,
          getFunc: () => CRUTCH.savedOptions.drawing.attached.showCrown,
          setFunc: (value) => {
            CRUTCH.savedOptions.drawing.attached.showCrown = value
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
        },
        {
          type: "colorpicker",
          name: "Crown color",
          tooltip: "Color of the crown icon",
          default: colorDef(CRUTCH.defaultOptions.drawing.attached.crownColor),
          getFunc: () => {
            return unpackColor(CRUTCH.savedOptions.drawing.attached.crownColor)
          },
          setFunc: (r, g, b) => {
            CRUTCH.savedOptions.drawing.attached.crownColor = [r, g, b]
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
          disabled: () => !CRUTCH.savedOptions.drawing.attached.showCrown,
        },
        {
          type: "divider",
        },
        {
          type: "checkbox",
          name: "Show dead group members",
          tooltip: "Whether to show skull icons for group members who are deadge",
          default: CRUTCH.defaultOptions.drawing.attached.showDead,
          getFunc: () => CRUTCH.savedOptions.drawing.attached.showDead,
          setFunc: (value) => {
            CRUTCH.savedOptions.drawing.attached.showDead = value
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
        },
        {
          type: "checkbox",
          name: "Use support icons for dead",
          tooltip:
            "When a tank or healer is dead, use the respective role icons instead of the skull icon, to make it easier to prioritize their rezzes",
          default: CRUTCH.defaultOptions.drawing.attached.useSupportIconsForDead,
          getFunc: () => CRUTCH.savedOptions.drawing.attached.useSupportIconsForDead,
          setFunc: (value) => {
            CRUTCH.savedOptions.drawing.attached.useSupportIconsForDead = value
            CRUTCH.Drawing.RefreshGroup()
          },
          disabled: () => !CRUTCH.savedOptions.drawing.attached.showDead,
          width: "half",
        },
        {
          type: "colorpicker",
          name: "Dead color",
          tooltip: "Color of the dead player icons",
          default: colorDef(CRUTCH.defaultOptions.drawing.attached.deadColor),
          getFunc: () => {
            return unpackColor(CRUTCH.savedOptions.drawing.attached.deadColor)
          },
          setFunc: (r, g, b) => {
            CRUTCH.savedOptions.drawing.attached.deadColor = [r, g, b]
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
          disabled: () => !CRUTCH.savedOptions.drawing.attached.showDead,
        },
        {
          type: "colorpicker",
          name: "Resurrecting color",
          tooltip: "Color of the dead player icons while being resurrected",
          default: colorDef(CRUTCH.defaultOptions.drawing.attached.rezzingColor),
          getFunc: () => {
            return unpackColor(CRUTCH.savedOptions.drawing.attached.rezzingColor)
          },
          setFunc: (r, g, b) => {
            CRUTCH.savedOptions.drawing.attached.rezzingColor = [r, g, b]
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
          disabled: () => !CRUTCH.savedOptions.drawing.attached.showDead,
        },
        {
          type: "colorpicker",
          name: "Rez pending color",
          tooltip: "Color of the dead player icons when resurrection is pending",
          default: colorDef(CRUTCH.defaultOptions.drawing.attached.pendingColor),
          getFunc: () => {
            return unpackColor(CRUTCH.savedOptions.drawing.attached.pendingColor)
          },
          setFunc: (r, g, b) => {
            CRUTCH.savedOptions.drawing.attached.pendingColor = [r, g, b]
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
          disabled: () => !CRUTCH.savedOptions.drawing.attached.showDead,
        },
        ...individualIconSettings(),
      ],
    },
  ]
}
