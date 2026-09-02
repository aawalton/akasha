import {
  chatDisableNotificationAnimation,
  chatDisableNotificationSound,
  chatWhisperAndFlaggedAsOffline,
} from "../fco-chat/fco-chat.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"
import type { AddonSettings } from "../fco-types/fco-types.module.code.ts"

export function buildChatControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Chat" },
    {
      type: "checkbox",
      name: "Disable notification animation",
      tooltip:
        "Disable the animation which makes the notifications button glow if new notifications are unread.",
      getFunc: () => settings.disableChatNotificationAnimation === true,
      setFunc: (value) => {
        settings.disableChatNotificationAnimation = value
        chatDisableNotificationAnimation()
      },
      default: defaults.disableChatNotificationAnimation === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Disable new notification sound",
      tooltip: "Disable the sound for new notifications.",
      getFunc: () => settings.disableChatNotificationSound === true,
      setFunc: (value) => {
        settings.disableChatNotificationSound = value
        chatDisableNotificationSound()
      },
      default: defaults.disableChatNotificationSound === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Blacklist chat texts",
      tooltip:
        "Enter chat texts in the edit box below. Each row (split by a carriage return) is one text which will be searched in the incoming chat messages. If the text is found the whole chat message will be not shown to you!\n\nEnabling/Disabling this function needs you to reload the UI!",
      getFunc: () => settings.enableChatBlacklist === true,
      setFunc: (value) => {
        settings.enableChatBlacklist = value
      },
      default: defaults.enableChatBlacklist === true,
      requiresReload: true,
      width: "full",
    },
    {
      type: "editbox",
      name: "Chat blacklist key words/text",
      tooltip:
        "Enter the text messages, or parts/words of the messages here, which should be blacklisted in the chat.\nEach new word/phrase needs to be seperated via the carriage return (line feed/return key)!",
      isMultiline: true,
      getFunc: () => settings.chatKeyWords,
      setFunc: (value) => {
        settings.chatKeyWords = value
        STATE.blacklistKeyWords = [...zo_strsplit("\n", value)]
      },
      default: defaults.chatKeyWords,
      disabled: () => settings.enableChatBlacklist !== true,
    },
    {
      type: "checkbox",
      name: "Blacklist whispers",
      tooltip: "Should incoming whisper messages be checked against your blacklist too?",
      getFunc: () => settings.enableChatBlacklistForWhispers === true,
      setFunc: (value) => {
        settings.enableChatBlacklistForWhispers = value
      },
      default: defaults.enableChatBlacklistForWhispers === true,
      disabled: () => settings.enableChatBlacklist !== true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Blacklist group",
      tooltip: "Should incoming group messages be checked against your blacklist too?",
      getFunc: () => settings.enableChatBlacklistForGroup === true,
      setFunc: (value) => {
        settings.enableChatBlacklistForGroup = value
      },
      default: defaults.enableChatBlacklistForGroup === true,
      disabled: () => settings.enableChatBlacklist !== true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Blacklist guilds",
      tooltip: "Should incoming guild and officer messages be checked against your blacklist too?",
      getFunc: () => settings.enableChatBlacklistForGuilds === true,
      setFunc: (value) => {
        settings.enableChatBlacklistForGuilds = value
      },
      default: defaults.enableChatBlacklistForGuilds === true,
      disabled: () => settings.enableChatBlacklist !== true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Show info in chat",
      tooltip:
        "Show the time, posting person, text and found keyword of the blacklisted text in the system chat (addon output)?",
      getFunc: () => settings.blacklistedTextToChat === true,
      setFunc: (value) => {
        settings.blacklistedTextToChat = value
      },
      default: defaults.blacklistedTextToChat === true,
      disabled: () => settings.enableChatBlacklist !== true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Reminder: Whisper & flagged offline",
      tooltip:
        "Show a reminder message on screen if you are whispering to someone and are flagged as offline",
      getFunc: () => settings.enableChatWhisperAndFlaggedAsOfflineReminder === true,
      setFunc: (value) => {
        settings.enableChatWhisperAndFlaggedAsOfflineReminder = value
        chatWhisperAndFlaggedAsOffline()
      },
      default: defaults.enableChatWhisperAndFlaggedAsOfflineReminder === true,
      width: "full",
    },
  ]
}
