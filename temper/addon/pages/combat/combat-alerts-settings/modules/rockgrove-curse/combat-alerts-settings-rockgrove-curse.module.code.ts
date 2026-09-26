import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-group-broadcast/lib-group-broadcast.type-declaration.d.ts"
import {
  colorDef,
  unpackColor,
  updateAbilitiesToReplace,
} from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/state/combat-alerts-settings-state.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function rockgroveCurseSettings(this: void): LamControlData[] {
  return [
    {
      type: "description",
      title: "|c08BD1D[BETA] Curse Lines|r",
      text: "Shows lines for potential curse AoE trajectories after Death Touch expires. All 4 possible directions are shown, but only 2 directions will have real AoEs.",
      width: "full",
    },
    {
      type: "checkbox",
      name: "Show your curse preview lines",
      tooltip:
        "Shows lines when you have Death Touch, so you can try to position them away from the group",
      default: CRUTCH.defaultOptions.rockgrove.showCursePreview,
      getFunc: () => CRUTCH.savedOptions.rockgrove.showCursePreview,
      setFunc: (value) => {
        CRUTCH.savedOptions.rockgrove.showCursePreview = value
      },
      width: "half",
    },
    {
      type: "colorpicker",
      name: "Preview lines color",
      tooltip: "Color of the preview lines for yourself",
      default: colorDef(CRUTCH.defaultOptions.rockgrove.cursePreviewColor),
      getFunc: () => {
        return unpackColor(CRUTCH.savedOptions.rockgrove.cursePreviewColor)
      },
      setFunc: (r, g, b, a) => {
        CRUTCH.savedOptions.rockgrove.cursePreviewColor = [r, g, b, a] as number[]
      },
      width: "half",
      disabled: () => !CRUTCH.savedOptions.rockgrove.showCursePreview,
    },
    {
      type: "slider",
      name: "Preview line duration",
      tooltip:
        "How long before Death Touch expiration to show the preview lines, in milliseconds. Death Touch lasts for 9 seconds, so setting this to 9000 means you will see the lines as soon as you're cursed",
      min: 0,
      max: 9000,
      step: 500,
      default: 9000 - CRUTCH.defaultOptions.rockgrove.curseLineDelay,
      width: "full",
      getFunc: () => 9000 - CRUTCH.savedOptions.rockgrove.curseLineDelay,
      setFunc: (value) => {
        CRUTCH.savedOptions.rockgrove.curseLineDelay = 9000 - value
      },
      disabled: () => !CRUTCH.savedOptions.rockgrove.showCursePreview,
    },
    {
      type: "checkbox",
      name: "Show your curse lines",
      tooltip:
        "Shows lines when your Death Touch expires. The trajectory could be slightly inaccurate due to desync, especially if you're moving fast",
      default: CRUTCH.defaultOptions.rockgrove.showCurseLines,
      getFunc: () => CRUTCH.savedOptions.rockgrove.showCurseLines,
      setFunc: (value) => {
        CRUTCH.savedOptions.rockgrove.showCurseLines = value
      },
      width: "half",
    },
    {
      type: "colorpicker",
      name: "Curse lines color",
      tooltip: "Color of the curse lines for yourself",
      default: colorDef(CRUTCH.defaultOptions.rockgrove.curseLineColor),
      getFunc: () => {
        return unpackColor(CRUTCH.savedOptions.rockgrove.curseLineColor)
      },
      setFunc: (r, g, b, a) => {
        CRUTCH.savedOptions.rockgrove.curseLineColor = [r, g, b, a] as number[]
      },
      width: "half",
      disabled: () => !CRUTCH.savedOptions.rockgrove.showCurseLines,
    },
    {
      type: "checkbox",
      name: "Show group members' curse lines",
      tooltip:
        "Shows lines when another player's Death Touch expires. The trajectory could be inaccurate due to desync, especially if the player is moving fast. Requires LibGroupBroadcast, and the other players must also have this version of CrutchAlerts with LibGroupBroadcast (they do not need to have curse lines on)",
      default: CRUTCH.defaultOptions.rockgrove.showOthersCurseLines,
      getFunc: () => CRUTCH.savedOptions.rockgrove.showOthersCurseLines,
      setFunc: (value) => {
        CRUTCH.savedOptions.rockgrove.showOthersCurseLines = value
      },
      width: "half",
      disabled: () => LibGroupBroadcast === undefined,
    },
    {
      type: "colorpicker",
      name: "Group curse lines color",
      tooltip: "Color of the curse lines for other group members",
      default: colorDef(CRUTCH.defaultOptions.rockgrove.othersCurseLineColor),
      getFunc: () => {
        return unpackColor(CRUTCH.savedOptions.rockgrove.othersCurseLineColor)
      },
      setFunc: (r, g, b, a) => {
        CRUTCH.savedOptions.rockgrove.othersCurseLineColor = [r, g, b, a] as number[]
      },
      width: "half",
      disabled: () =>
        LibGroupBroadcast === undefined || !CRUTCH.savedOptions.rockgrove.showOthersCurseLines,
    },
    {
      type: "description",
      title: "|c08BD1DMark Dangerous Abilities|r",
      text: "Some AOE abilities are dangerous to have active when in Bahsei HM portals, because they may kill multiple ghosts at once. This feature can be configured to show a warning icon on the ability when it's almost time for your portal. For example, Solar Barrage lasts for 20s, and the margin (configure below) is 4s, so Solar Barrage's icon will have a warning at 16s before your portal spawns.",
      width: "full",
    },
    {
      type: "dropdown",
      name: "Portal number",
      tooltip: "The portal number you are assigned to",
      choices: ["None", "Portal 1", "Portal 2"],
      choicesValues: [0, 1, 2],
      getFunc: () => {
        return CRUTCH.savedOptions.rockgrove.portalNumber
      },
      setFunc: (value) => {
        CRUTCH.savedOptions.rockgrove.portalNumber = value as number
      },
      width: "full",
    },
    {
      type: "editbox",
      name: "Add dangerous ability",
      tooltip:
        "The ID of the ability to add to the list.\nUse |c99FF99/crutch printskills|r to see your currently equipped skill IDs",
      default: "",
      getFunc: () => "",
      setFunc: (value) => {
        if (value === "") {
          return
        }
        const num = tonumber(value)
        if (num === undefined) {
          CRUTCH.msg("Ability ID must be a number")
          return
        }
        CRUTCH.savedOptions.rockgrove.abilitiesToReplace[num] = true
        CRUTCH.msg(
          string.format("Added %s (%d) to abilities to replace.", GetAbilityName(num), num)
        )
      },
      width: "full",
    },
    {
      type: "dropdown",
      name: "Remove ability",
      tooltip: "Select an ability from this dropdown to remove it from the list",
      choices: [],
      choicesValues: [],
      getFunc: () => {
        updateAbilitiesToReplace()
        return undefined
      },
      setFunc: (value) => {
        delete CRUTCH.savedOptions.rockgrove.abilitiesToReplace[value as number]
        CRUTCH.msg(
          string.format(
            "Removed %s(%d) from abilities to replace.",
            GetAbilityName(value as number),
            value
          )
        )
        updateAbilitiesToReplace()
      },
      width: "full",
      reference: "TemperCombatAlerts_AbilitiesToReplace",
    },
    {
      type: "slider",
      name: "Portal time margin",
      tooltip:
        "The target number of milliseconds after portal spawns, for which you want the dangerous abilities to expire by. For example, setting it to 4000 means your Solar Barrage will be changed at 16 seconds before your portal, because the margin is 4 seconds and Solar Barrage lasts for 20 seconds",
      min: 0,
      max: 60000,
      step: 500,
      default: 4000,
      width: "full",
      getFunc: () => CRUTCH.savedOptions.rockgrove.portalTimeMargin,
      setFunc: (value) => {
        CRUTCH.savedOptions.rockgrove.portalTimeMargin = value
      },
    },
  ]
}
