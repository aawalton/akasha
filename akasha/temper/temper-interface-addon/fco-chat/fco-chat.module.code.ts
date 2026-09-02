import { asNumber, asString, asStringRecord } from "../fco-casts/fco-casts.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"

let MY_PLAYER_NAME = ""
let MY_PLAYER_NAME_RAW = ""
let MY_ACCOUNT_NAME = ""
let SECONDS_SINCE_MIDNIGHT = 0

const origNewNotificationSound = SOUNDS["NEW_NOTIFICATION"]

const SKIPPED_MESSAGE_TYPES_FOR_BLACKLIST: Record<number, boolean> = {
  [CHAT_CHANNEL_SYSTEM]: true,
  [CHAT_CHANNEL_MONSTER_SAY]: true,
  [CHAT_CHANNEL_MONSTER_YELL]: true,
  [CHAT_CHANNEL_MONSTER_EMOTE]: true,
  [CHAT_CHANNEL_MONSTER_WHISPER]: true,
  [CHAT_CHANNEL_EMOTE]: true,
  [CHAT_CHANNEL_WHISPER_SENT]: true,
}

const CHAT_CHANNEL_TEXTS: Record<number, string> = {
  [CHAT_CHANNEL_GUILD_1]: "Guild 1",
  [CHAT_CHANNEL_GUILD_2]: "Guild 2",
  [CHAT_CHANNEL_GUILD_3]: "Guild 3",
  [CHAT_CHANNEL_GUILD_4]: "Guild 4",
  [CHAT_CHANNEL_GUILD_5]: "Guild 5",
  [CHAT_CHANNEL_OFFICER_1]: "Officer 1",
  [CHAT_CHANNEL_OFFICER_2]: "Officer 2",
  [CHAT_CHANNEL_OFFICER_3]: "Officer 3",
  [CHAT_CHANNEL_OFFICER_4]: "Officer 4",
  [CHAT_CHANNEL_OFFICER_5]: "Officer 5",
  [CHAT_CHANNEL_PARTY]: "Group",
  [CHAT_CHANNEL_SAY]: "Say",
  [CHAT_CHANNEL_USER_CHANNEL_1]: "User channel 1",
  [CHAT_CHANNEL_USER_CHANNEL_2]: "User channel 2",
  [CHAT_CHANNEL_USER_CHANNEL_3]: "User channel 3",
  [CHAT_CHANNEL_USER_CHANNEL_4]: "User channel 4",
  [CHAT_CHANNEL_USER_CHANNEL_5]: "User channel 5",
  [CHAT_CHANNEL_USER_CHANNEL_6]: "User channel 6",
  [CHAT_CHANNEL_USER_CHANNEL_7]: "User channel 7",
  [CHAT_CHANNEL_USER_CHANNEL_8]: "User channel 8",
  [CHAT_CHANNEL_USER_CHANNEL_9]: "User channel 9",
  [CHAT_CHANNEL_WHISPER]: "Whisper",
  [CHAT_CHANNEL_YELL]: "Yell",
  [CHAT_CHANNEL_ZONE]: "Zone",
  [CHAT_CHANNEL_ZONE_LANGUAGE_1]: "ZoneEN",
  [CHAT_CHANNEL_ZONE_LANGUAGE_2]: "ZoneFR",
  [CHAT_CHANNEL_ZONE_LANGUAGE_3]: "ZoneDE",
  [CHAT_CHANNEL_ZONE_LANGUAGE_4]: "ZoneJP",
}

function escapeLuaPattern(this: void, value: string): string {
  const [escaped] = string.gsub(value, "([%[%]%%%(%)%{%}%$%^%+])", "[%%%1]")
  return escaped
}

function parseChatMatch(this: void, captured: string | undefined): string | undefined {
  return captured
}

function fcocsChatMessageChannel(
  this: void,
  messageType: number,
  fromNameFormatted: string,
  msgText: string
): boolean {
  const settings = STATE.settingsVars.settings
  const messageText = escapeLuaPattern(msgText)
  const keyWords =
    STATE.blacklistKeyWords.length > 0
      ? STATE.blacklistKeyWords
      : [...zo_strsplit("\n", asString(settings.chatKeyWords))]
  if (keyWords.length === 0) return false
  let textFound = false
  let keyWordFound = ""
  for (const keyWord of keyWords) {
    const keyWordEscaped = escapeLuaPattern(keyWord)
    const lowerMsgEscaped = string.lower(messageText)
    const lowerKeywordEscaped = string.lower(keyWordEscaped)
    const [rawEscMatch] = string.match(lowerMsgEscaped, lowerKeywordEscaped)
    const escMatch = parseChatMatch(rawEscMatch)
    if (escMatch !== undefined) {
      textFound = true
      keyWordFound = keyWord
      break
    } else {
      const lowerMsg = string.lower(msgText)
      const lowerKeyword = string.lower(keyWord)
      if (lowerMsg !== lowerMsgEscaped && lowerKeyword !== lowerKeywordEscaped) {
        const [rawMatchCapture] = string.match(lowerMsg, lowerKeyword)
        const rawMatch = parseChatMatch(rawMatchCapture)
        if (rawMatch !== undefined) {
          textFound = true
          keyWordFound = keyWord
          break
        }
      }
    }
  }
  if (textFound) {
    if (settings.blacklistedTextToChat === true) {
      const chatChannelText = CHAT_CHANNEL_TEXTS[messageType] ?? "<unknown>"
      const isENClient = GetCVar("Language.2") === "en"
      const lCLOCKFormat = isENClient
        ? TIME_FORMAT_PRECISION_TWELVE_HOUR
        : TIME_FORMAT_PRECISION_TWENTY_FOUR_HOUR
      const lTIMEFormat = isENClient ? TIME_FORMAT_STYLE_CLOCK_TIME : TIME_FORMAT_STYLE_COLONS
      const postingTime = ZO_FormatTime(SECONDS_SINCE_MIDNIGHT, lTIMEFormat, lCLOCKFormat)
      d(
        zo_strformat(
          '<<1>>: [FCOCS]Blacklisted "<<2>>" in message "<<3>>", posted by "<<4>>" in channel "<<5>>"',
          postingTime,
          keyWordFound,
          msgText,
          fromNameFormatted,
          chatChannelText
        )
      )
    }
    return true
  }
  return false
}

function fcocsFilterChatMessage(
  this: void,
  messageType: number,
  fromName: string,
  chatText: string
): boolean {
  const postingPerson = zo_strformat(SI_UNIT_NAME, fromName)
  if (
    fromName === MY_ACCOUNT_NAME ||
    postingPerson === MY_ACCOUNT_NAME ||
    fromName === MY_PLAYER_NAME_RAW ||
    postingPerson === MY_PLAYER_NAME
  ) {
    return false
  }
  const settings = STATE.settingsVars.settings
  if (settings.enableChatBlacklistForWhispers !== true && messageType === CHAT_CHANNEL_WHISPER) {
    return false
  }
  if (settings.enableChatBlacklistForGroup !== true && messageType === CHAT_CHANNEL_PARTY) {
    return false
  }
  if (
    settings.enableChatBlacklistForGuilds !== true &&
    (messageType === CHAT_CHANNEL_GUILD_1 ||
      messageType === CHAT_CHANNEL_GUILD_2 ||
      messageType === CHAT_CHANNEL_GUILD_3 ||
      messageType === CHAT_CHANNEL_GUILD_4 ||
      messageType === CHAT_CHANNEL_GUILD_5 ||
      messageType === CHAT_CHANNEL_OFFICER_1 ||
      messageType === CHAT_CHANNEL_OFFICER_2 ||
      messageType === CHAT_CHANNEL_OFFICER_3 ||
      messageType === CHAT_CHANNEL_OFFICER_4 ||
      messageType === CHAT_CHANNEL_OFFICER_5)
  ) {
    return false
  }
  return fcocsChatMessageChannel(messageType, postingPerson, chatText)
}

function fcocsOnChatMessageChannel(
  this: void,
  messageType: number,
  fromName: string,
  text: string
): boolean {
  const skippedMessageType =
    messageType !== undefined && SKIPPED_MESSAGE_TYPES_FOR_BLACKLIST[messageType] === true
  if (skippedMessageType) return false

  SECONDS_SINCE_MIDNIGHT = 0
  const settings = STATE.settingsVars.settings
  if (
    settings.enableChatBlacklist === true &&
    settings.chatKeyWords !== undefined &&
    settings.chatKeyWords !== ""
  ) {
    if (settings.blacklistedTextToChat === true) {
      SECONDS_SINCE_MIDNIGHT = GetSecondsSinceMidnight()
    }
    const chatMessageWasBlacklisted = fcocsFilterChatMessage(messageType, fromName, text)
    if (chatMessageWasBlacklisted) {
      return true
    }
  }
  return false
}

let CHAT_BLACKLIST_HOOK_DONE = false

export function chatBlacklist(this: void): undefined {
  const settings = STATE.settingsVars.settings
  if (settings.enableChatBlacklist !== true) return
  if (!CHAT_BLACKLIST_HOOK_DONE) {
    MY_PLAYER_NAME = GetUnitName("player")
    MY_PLAYER_NAME_RAW = GetRawUnitName("player")
    MY_ACCOUNT_NAME = GetDisplayName()
    ZO_PreHook(
      asStringRecord(CHAT_ROUTER),
      "FormatAndAddChatMessage",
      function (this: void, _self: unknown, eventName: unknown, ...rest: unknown[]): boolean {
        if (eventName === undefined || eventName !== EVENT_CHAT_MESSAGE_CHANNEL) return false
        const messageType = asNumber(rest[0])
        const fromName = asString(rest[1])
        const text = asString(rest[2])
        return fcocsOnChatMessageChannel(messageType, fromName, text)
      }
    )
    CHAT_BLACKLIST_HOOK_DONE = true
  }
}

function chatWhisperCheck(this: void): undefined {
  const playerStatus = GetPlayerStatus()
  if (playerStatus !== PLAYER_STATUS_OFFLINE) return
  const alertTextWhisperButFlagegdOffline =
    "--- YOUR STATUS IS: 'OFFLINE'! NO INCOMING WHISPERs POSSIBLE! ---"
  const params = CENTER_SCREEN_ANNOUNCE.CreateMessageParams(CSA_CATEGORY_SMALL_TEXT, SOUNDS.NONE)
  params.SetCSAType(CENTER_SCREEN_ANNOUNCE_TYPE_DISPLAY_ANNOUNCEMENT)
  params.SetText(alertTextWhisperButFlagegdOffline)
  CENTER_SCREEN_ANNOUNCE.AddMessageWithParams(params)
}

let CHAT_WHISPER_AS_OFFLINE_HOOK_DONE = false

export function chatWhisperAndFlaggedAsOffline(this: void): undefined {
  if (CHAT_WHISPER_AS_OFFLINE_HOOK_DONE) return
  ZO_PreHook(
    asStringRecord(CHAT_SYSTEM),
    "StartTextEntry",
    function (this: void, _ctrl: unknown, _text: unknown, channel: unknown): boolean {
      const settings = STATE.settingsVars.settings
      if (settings.enableChatWhisperAndFlaggedAsOfflineReminder !== true) return false
      let currentChannel = 0
      if (channel === undefined) {
        if (CHAT_SYSTEM.currentChannel !== undefined) {
          currentChannel = CHAT_SYSTEM.currentChannel
        }
      }
      if (channel === CHAT_CHANNEL_WHISPER || currentChannel === CHAT_CHANNEL_WHISPER) {
        chatWhisperCheck()
      }
      return false
    }
  )
  CHAT_WHISPER_AS_OFFLINE_HOOK_DONE = true
}

export function chatDisableNotificationAnimation(this: void): undefined {
  const settings = STATE.settingsVars.settings
  if (settings.disableChatNotificationAnimation === true) {
    CHAT_SYSTEM.notificationPulseTimeline.Stop()
    ZO_ChatWindowNotificationsEcho.SetHidden(true)
  } else {
    ZO_ChatWindowNotificationsEcho.SetHidden(false)
    if (
      CHAT_SYSTEM.currentNumNotifications !== undefined &&
      CHAT_SYSTEM.currentNumNotifications > 0
    ) {
      CHAT_SYSTEM.notificationPulseTimeline.PlayFromStart()
    }
  }
}

export function chatDisableNotificationSound(this: void): undefined {
  const settings = STATE.settingsVars.settings
  const soundsTable = asStringRecord(SOUNDS)
  if (settings.disableChatNotificationSound === true) {
    soundsTable["NEW_NOTIFICATION"] = SOUNDS["NONE"]
  } else {
    soundsTable["NEW_NOTIFICATION"] = origNewNotificationSound
  }
}

export function chatDisableNotificationStuff(this: void): undefined {
  chatDisableNotificationAnimation()
  chatDisableNotificationSound()
}
