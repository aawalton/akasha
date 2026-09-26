import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { optionSection } from "akasha/temper/addon/pages/combat/modules/combat-alerts-options/combat-alerts-options.module.code.ts"

export function generalSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "General",
      controls: [
        {
          type: "checkbox",
          name: "Show begin casts",
          tooltip:
            "Show alerts when you are targeted by the beginning of a cast (ACTION_RESULT_BEGIN)",
          default: true,
          getFunc: () => CRUTCH.savedOptions.general.showBegin,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.showBegin = value
            if (value) {
              CRUTCH.RegisterBegin()
            } else {
              CRUTCH.UnregisterBegin()
            }
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "      Show non-enemy casts",
          tooltip:
            "Show alerts for beginning of a cast if it is not from an enemy, e.g. player-sourced",
          default: true,
          getFunc: () => !CRUTCH.savedOptions.general.beginHideSelf,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.beginHideSelf = !value
            CRUTCH.UnregisterBegin()
            CRUTCH.RegisterBegin()
          },
          width: "full",
          disabled: () => !CRUTCH.savedOptions.general.showBegin,
        },
        {
          type: "checkbox",
          name: "Show gained casts",
          tooltip:
            'Show alerts when you "Gain" a cast from an enemy (ACTION_RESULT_EFFECT_GAINED or manually curated ACTION_RESULT_EFFECT_GAINED_DURATION)',
          default: true,
          getFunc: () => CRUTCH.savedOptions.general.showGained,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.showGained = value
            if (value) {
              CRUTCH.RegisterGained()
            } else {
              CRUTCH.UnregisterGained()
            }
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show AOE / important casts",
          tooltip:
            "Show alerts when someone else in your group is targeted by a specific ability, or in some cases, when the enemy casts something on themselves. This is a manually curated list of abilities that are important enough to affect you, for example the Llothis cone (Defiling Dye Blast) or Rakkhat's kite (Darkness Falls)",
          default: true,
          getFunc: () => CRUTCH.savedOptions.general.showOthers,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.showOthers = value
            CRUTCH.RegisterOthers()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "    Include True Shot on others",
          tooltip:
            "\"True Shot\" from archers in Sanity's Edge and Ossein Cage can appear spammy when targeted on other players, because they won't show as interrupted, so this is a convenience setting to ignore them",
          default: true,
          getFunc: () => CRUTCH.savedOptions.general.showOthersTrueShot,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.showOthersTrueShot = value
            CRUTCH.RegisterOthers()
          },
          disabled: () => !CRUTCH.savedOptions.general.showOthers,
          width: "full",
        },
        {
          type: "slider",
          name: "Alert size",
          tooltip: "The size to display the general alerts specified above",
          min: 5,
          max: 120,
          step: 1,
          default: 36,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.general.alertScale,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.alertScale = value
            CRUTCH.DisplayNotification(47898, "Example Alert", 5000, 0, 0, 0, 0, 0, 0, 0, false)
          },
        },
        {
          type: "checkbox",
          name: "Show damageable timers",
          tooltip:
            "For certain encounters, show a countdown to when the boss or important adds will become damageable, tauntable, return to the arena, etc. This works best on English client, with some support for other languages.",
          default: true,
          getFunc: () => CRUTCH.savedOptions.general.showDamageable,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.showDamageable = value
            if (value) {
              CRUTCH.DisplayDamageable(10)
            }
          },
          width: "full",
        },
        {
          type: "slider",
          name: "    Damageable size",
          tooltip: "The size to display the damageable timers",
          min: 5,
          max: 120,
          step: 1,
          default: CRUTCH.defaultOptions.general.damageableSize,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.general.damageableSize,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.damageableSize = value
            CRUTCH.DisplayDamageable(10)
          },
          disabled: () => !CRUTCH.savedOptions.general.showDamageable,
        },
        {
          type: "checkbox",
          name: "    Consolidate damageable to info panel",
          tooltip:
            "Shows the damageable timers in the info panel, instead of as its own UI element",
          default: false,
          getFunc: () => CRUTCH.savedOptions.general.consolidateDamageableInInfoPanel,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.consolidateDamageableInInfoPanel = value
            CRUTCH.DisplayDamageable(10)
          },
          width: "full",
          disabled: () => !CRUTCH.savedOptions.general.showDamageable,
        },
        {
          type: "checkbox",
          name: "    Fire the nailguns!",
          tooltip:
            "Shows text for 1 second after the damageable timer expires, instead of instantly disappearing",
          default: !CRUTCH.defaultOptions.general.hideNailguns,
          getFunc: () => !CRUTCH.savedOptions.general.hideNailguns,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.hideNailguns = !value
          },
          width: "full",
          disabled: () => !CRUTCH.savedOptions.general.showDamageable,
        },
        {
          type: "divider",
        },
        {
          type: "checkbox",
          name: "Show arcanist timers",
          tooltip:
            'Show "alert" timers for arcanist-specific channeled abilities that you cast, i.e. Fatecarver and Remedy Cascade',
          default: true,
          getFunc: () => !CRUTCH.savedOptions.general.beginHideArcanist,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.beginHideArcanist = !value
            CRUTCH.UnregisterChannels()
            CRUTCH.RegisterChannels()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show dragonknight Magma Shell",
          tooltip: 'Show an "alert" timer for Magma Shell',
          default: true,
          getFunc: () => optionSection(CRUTCH.savedOptions, "general").effectMagmaShell as boolean,
          setFunc: (value) => {
            optionSection(CRUTCH.savedOptions, "general").effectMagmaShell = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show dragonknight Engulfing Dragonfire",
          tooltip: 'Show an "alert" timer for your Engulfing Dragonfire channeled cast',
          default: true,
          getFunc: () => CRUTCH.savedOptions.general.showEngulfing,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.showEngulfing = value
            CRUTCH.UnregisterChannels()
            CRUTCH.RegisterChannels()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show templar Radiant Destruction",
          tooltip: 'Show "alert" timers for Radiant Destruction and morphs',
          default: true,
          getFunc: () => CRUTCH.savedOptions.general.showJBeam,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.showJBeam = value
            CRUTCH.UnregisterChannels()
            CRUTCH.RegisterChannels()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show werewolf Claw Fury",
          tooltip: 'Show an "alert" timer for your Claw Fury channeled cast',
          default: true,
          getFunc: () => CRUTCH.savedOptions.general.showClawFury,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.showClawFury = value
            CRUTCH.UnregisterChannels()
            CRUTCH.RegisterChannels()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show werewolf Insatiable Hunger",
          tooltip: 'Show an "alert" timer when you devour a corpse',
          default: false,
          getFunc: () => CRUTCH.savedOptions.general.showInsatiableHunger,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.showInsatiableHunger = value
            CRUTCH.UnregisterChannels()
            CRUTCH.RegisterChannels()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Fencer's Parry",
          tooltip:
            'Show an "alert" timer for the duration of Fencer\'s Parry from scribing, along with when it is removed',
          default: true,
          getFunc: () => optionSection(CRUTCH.savedOptions, "general").effectParry as boolean,
          setFunc: (value) => {
            optionSection(CRUTCH.savedOptions, "general").effectParry = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "submenu",
          name: "Advanced IDs",
          controls: [
            {
              type: "description",
              text: "You can adjust the abilities that are shown in the general alerts here. This includes the casts on yourself and important casts as listed above. To find IDs, you can turn on |c99FF99CrutchAlerts > Debug > Show debug on alert|r, and the ID is the first number shown on the small gray text under the alert (ignore fake IDs starting with 888). Alternatively, you can find IDs from online sources such as ESOLogs, player-maintained spreadsheets, or UESP.",
              width: "full",
            },
            {
              type: "editbox",
              name: "Blacklist IDs, separated by commas",
              tooltip:
                'IDs added to this blacklist will no longer be shown in "begin casts," "gained casts," and "AOE / important casts." For example, to suppress Bahsei HM portal direction alerts, add 153517,153518',
              default: "",
              getFunc: () => {
                let str = ""
                for (const [id] of pairs(CRUTCH.savedOptions.general.blacklist)) {
                  str = string.format("%s%d, ", str, id)
                }
                return str
              },
              setFunc: (value) => {
                const ids: Record<number, boolean> = {}
                for (const idText of [...zo_strsplit(",", value)]) {
                  const id = tonumber(idText)
                  if (id !== undefined) {
                    ids[id] = true
                  }
                }
                CRUTCH.savedOptions.general.blacklist = ids
              },
              isExtraWide: true,
              isMultiline: true,
              width: "full",
            },
            {
              type: "description",
              text: () => {
                let str = "Current blacklist: "
                for (const [id] of pairs(CRUTCH.savedOptions.general.blacklist)) {
                  str = string.format("%s%s (%d), ", str, GetAbilityName(id) ?? "INVALID", id)
                }
                return str
              },
              width: "full",
            },
          ],
        },
      ],
    },
  ]
}
