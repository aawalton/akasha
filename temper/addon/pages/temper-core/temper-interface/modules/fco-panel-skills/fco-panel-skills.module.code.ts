import type { AddonSettings } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/fco-types/fco-types.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"

export function buildSkillsControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Skills" },
    {
      type: "checkbox",
      name: "Enable skill line context menu",
      tooltip: 'Enables the context menu at skill line headers (e.g. "Bow").',
      getFunc: () => settings.enableSkillLineContextMenu === true,
      setFunc: (value) => {
        settings.enableSkillLineContextMenu = value
      },
      default: defaults.enableSkillLineContextMenu === true,
      width: "full",
    },
  ]
}
