import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-settings/declarations/combat-alerts-settings-declarations.type-declaration.d.ts"
import { getNoSubtitlesZoneIdsAndNames } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/state/combat-alerts-settings-state.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function miscSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Crowd Control",
      controls: [
        {
          type: "description",
          text: "UI, sound, and chat options for hard crowd control (CC) on yourself. This includes CC types that you can typically break free of, such as stuns, fears, and charms.\nInspired by Miat's CC Tracker.",
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show icon UI",
          tooltip: "Shows a radial progress icon with the stun type, ability, and timer",
          default: true,
          getFunc: () => CRUTCH.savedOptions.cc.showVisual,
          setFunc: (value) => {
            CRUTCH.savedOptions.cc.showVisual = value
            if (value) {
              CRUTCH.ShowCCProgressAll(
                85214,
                ACTION_RESULT_STUNNED,
                10000,
                "Kimbrudhil the Songbird"
              )
            }
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show obnoxious UI",
          tooltip:
            "Shows a radial progress icon with the stun type, ability, and timer. Like the icon UI, but bigger!",
          default: true,
          getFunc: () => CRUTCH.savedOptions.cc.showObnoxious,
          setFunc: (value) => {
            CRUTCH.savedOptions.cc.showObnoxious = value
            if (value) {
              CRUTCH.ShowCCProgressAll(
                85214,
                ACTION_RESULT_STUNNED,
                10000,
                "Kimbrudhil the Songbird"
              )
            }
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Play sound",
          tooltip: "Plays the DeathRecap_KillingBlowShown sound when you get CC'ed",
          default: true,
          getFunc: () => CRUTCH.savedOptions.cc.playSound,
          setFunc: (value) => {
            CRUTCH.savedOptions.cc.playSound = value
          },
          width: "full",
        },
        {
          type: "slider",
          name: "Sound volume",
          tooltip:
            "The volume of the sound (AKA the number of times to play the sound at the same time)",
          min: 1,
          max: 10,
          step: 1,
          default: CRUTCH.defaultOptions.cc.hardVolume,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.cc.hardVolume,
          setFunc: (value) => {
            CRUTCH.savedOptions.cc.hardVolume = value
          },
          disabled: () => !CRUTCH.savedOptions.cc.playSound,
        },
        {
          type: "checkbox",
          name: "Show only in combat",
          tooltip: "If ON, the CC UI and sound will not be played when out of combat",
          default: CRUTCH.defaultOptions.cc.combatOnly,
          getFunc: () => CRUTCH.savedOptions.cc.combatOnly,
          setFunc: (value) => {
            CRUTCH.savedOptions.cc.combatOnly = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show info in chat",
          tooltip:
            "Show information about the CC type, source, ability, and duration in your chat when it happens",
          default: CRUTCH.defaultOptions.cc.showChat,
          getFunc: () => CRUTCH.savedOptions.cc.showChat,
          setFunc: (value) => {
            CRUTCH.savedOptions.cc.showChat = value
          },
          width: "full",
        },
      ],
    },
    {
      type: "submenu",
      name: "Miscellaneous",
      controls: [
        {
          type: "checkbox",
          name: "Show subtitles in chat",
          tooltip:
            "Show NPC dialogue subtitles in chat. The color formatting will be weird if there are multiple lines",
          default: false,
          getFunc: () => CRUTCH.savedOptions.showSubtitles,
          setFunc: (value) => {
            CRUTCH.savedOptions.showSubtitles = value
          },
          width: "full",
        },
        {
          type: "dropdown",
          name: "No-subtitles zones",
          tooltip:
            "Subtitles will not be displayed in chat while in these zones. Select one from this dropdown to remove it",
          choices: [],
          choicesValues: [],
          getFunc: () => {
            const [ids, names] = getNoSubtitlesZoneIdsAndNames()
            TemperCombatAlerts_NoSubtitlesZones.UpdateChoices(names, ids)
            return undefined
          },
          setFunc: (value) => {
            delete CRUTCH.savedOptions.subtitlesIgnoredZones[value as number]
            CHAT_ROUTER.AddSystemMessage(
              string.format(
                "Removed %s(%d) from subtitles ignored zones.",
                GetZoneNameById(value as number),
                value
              )
            )
            const [ids, names] = getNoSubtitlesZoneIdsAndNames()
            TemperCombatAlerts_NoSubtitlesZones.UpdateChoices(names, ids)
          },
          width: "full",
          reference: "TemperCombatAlerts_NoSubtitlesZones",
          disabled: () => !CRUTCH.savedOptions.showSubtitles,
        },
        {
          type: "editbox",
          name: "Add no-subtitles zone ID",
          tooltip: "Enter a zone ID to add to the ignore list",
          getFunc: () => {
            return ""
          },
          setFunc: (value) => {
            const zoneId = tonumber(value)
            const zoneName = GetZoneNameById(zoneId)
            if (zoneId === undefined || zoneName === undefined || zoneName === "") {
              CHAT_ROUTER.AddSystemMessage(value + " is not a valid zone ID!")
              return
            }
            CRUTCH.savedOptions.subtitlesIgnoredZones[zoneId] = true
            CHAT_ROUTER.AddSystemMessage(
              string.format("Added %s(%d) to subtitles ignored zones.", zoneName, zoneId)
            )
          },
          isMultiline: false,
          isExtraWide: false,
          width: "full",
          disabled: () => !CRUTCH.savedOptions.showSubtitles,
        },
        {
          type: "checkbox",
          name: 'Enable "fun" stuff',
          tooltip: "This is where I'd put my Easter eggs... if I had any!",
          default: true,
          getFunc: () => CRUTCH.savedOptions.general.showSpeshul,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.showSpeshul = value
          },
          width: "full",
        },
      ],
    },
    {
      type: "submenu",
      name: "Debug",
      controls: [
        {
          type: "checkbox",
          name: "Show raid lead diagnostics",
          tooltip:
            "Shows possibly spammy info in the text chat when certain important events occur. For example, someone picking up fire dome in DSR",
          default: false,
          getFunc: () => CRUTCH.savedOptions.general.showRaidDiag,
          setFunc: (value) => {
            CRUTCH.savedOptions.general.showRaidDiag = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show debug on alert",
          tooltip: "Add a small line of text on alerts that shows IDs and other debug information",
          default: false,
          getFunc: () => CRUTCH.savedOptions.debugLine,
          setFunc: (value) => {
            CRUTCH.savedOptions.debugLine = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show debug chat spam",
          tooltip:
            "Display a chat message almost every time any enabled combat event is procced -- very spammy!",
          default: false,
          getFunc: () => CRUTCH.savedOptions.debugChatSpam,
          setFunc: (value) => {
            CRUTCH.savedOptions.debugChatSpam = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show other debug",
          tooltip: "Display other debug messages",
          default: false,
          getFunc: () => CRUTCH.savedOptions.debugOther,
          setFunc: (value) => {
            CRUTCH.savedOptions.debugOther = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show line distance",
          tooltip:
            "On mechanics where Crutch draws a line between tethered players, display the distance in meters on the line",
          default: false,
          getFunc: () => CRUTCH.savedOptions.debugLineDistance,
          setFunc: (value) => {
            CRUTCH.savedOptions.debugLineDistance = value
          },
          width: "full",
        },
      ],
    },
  ]
}
