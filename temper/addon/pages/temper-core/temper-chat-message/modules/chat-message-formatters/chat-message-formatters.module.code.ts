import {
  getFormattedTime,
  getTimeStampForEvent,
  storeChatEvent,
} from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-history/chat-history.module.code.ts"
import { customLinkFormatter } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-links/chat-links.module.code.ts"
import { CHAT_MESSAGE_API } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-api/chat-message-api.module.code.ts"
import type { GlobalTable } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-casts/chat-message-casts.module.code.ts"
import {
  CHAT_MESSAGE_GLOBAL,
  MESSAGE_TEMPLATE,
  SYSTEM_TAG,
  TAG_PREFIX_OFF,
} from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-constants/chat-message-constants.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-chat-message/chat-message-declarations/chat-message-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-16/eso-enums-16.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

type PostHook = (
  this: void,
  formattedEventText: unknown,
  targetChannel: unknown,
  fromDisplayName: unknown,
  rawMessageText: unknown,
  timeStamp: number
) => LuaMultiReturn<unknown[]>

type PreHook = (this: void, ...args: unknown[]) => unknown[]

const messageFormatters = CHAT_ROUTER.GetRegisteredMessageFormatters()

const NEW_FORMATTER: ChatFormatterTable = {}

function applyTimeAndTagPrefix(
  this: void,
  formattedEventText: unknown,
  targetChannel: unknown,
  fromDisplayName: unknown,
  rawMessageText: unknown,
  timeStamp: number
): LuaMultiReturn<unknown[]> {
  let text = formattedEventText
  if (text !== undefined) {
    const tagMode = CHAT_MESSAGE_API.settings?.tagPrefixMode
    if (tagMode !== undefined && tagMode !== TAG_PREFIX_OFF) {
      text = string.format(MESSAGE_TEMPLATE, SYSTEM_TAG, text as string)
    }
    if (CHAT_MESSAGE_API.settings?.timePrefixEnabled === true) {
      text = string.format(MESSAGE_TEMPLATE, getFormattedTime(timeStamp), text as string)
    }
  }
  return $multi(text, targetChannel, fromDisplayName, rawMessageText)
}

function dummyPreHook(this: void, ...args: unknown[]): unknown[] {
  return args
}

function postHookFormatter(
  this: void,
  eventType: string | number,
  postHook: PostHook,
  preHook?: PreHook
): undefined {
  const pre = preHook ?? dummyPreHook
  NEW_FORMATTER[eventType] = (...args: unknown[]): LuaMultiReturn<unknown[]> => {
    const [timeStamp, isRestoring] = getTimeStampForEvent()
    if (!isRestoring) {
      storeChatEvent(timeStamp, eventType, ...args)
    }
    const originalFormatter = messageFormatters[eventType]
    if (originalFormatter === undefined) {
      error(string.format("No formatter registered for chat event %s", tostring(eventType)))
    }
    const [formattedEventText, targetChannel, fromDisplayName, rawMessageText] = originalFormatter(
      ...pre(...args)
    )
    return postHook(formattedEventText, targetChannel, fromDisplayName, rawMessageText, timeStamp)
  }
}

export function installFormatters(this: void): undefined {
  setmetatable(NEW_FORMATTER, {
    __index: (_table: ChatFormatterTable, key: string | number): ChatMessageFormatter | undefined =>
      messageFormatters[key],
  })

  ZO_PreHook(
    CHAT_ROUTER,
    "FormatAndAddChatMessage",
    function (this: void, self: unknown): undefined {
      if (IsChatSystemAvailableForCurrentPlatform()) {
        ;(self as GlobalTable).registeredMessageFormatters = NEW_FORMATTER
      }
      return undefined
    }
  )
  SecurePostHook(
    CHAT_ROUTER,
    "FormatAndAddChatMessage",
    function (this: void, self: ChatRouter): undefined {
      self.registeredMessageFormatters = messageFormatters
    }
  )

  postHookFormatter(
    EVENT_CHAT_MESSAGE_CHANNEL,
    function (
      this: void,
      formattedEventText: unknown,
      targetChannel: unknown,
      fromDisplayName: unknown,
      rawMessageText: unknown,
      timeStamp: number
    ): LuaMultiReturn<unknown[]> {
      let text = formattedEventText
      const settings = CHAT_MESSAGE_API.settings
      if (
        text !== undefined &&
        settings?.timePrefixEnabled === true &&
        settings.timePrefixOnRegularChat
      ) {
        text = string.format(MESSAGE_TEMPLATE, getFormattedTime(timeStamp), text as string)
      }
      return $multi(text, targetChannel, fromDisplayName, rawMessageText)
    },
    customLinkFormatter
  )

  postHookFormatter(
    EVENT_BROADCAST,
    function (
      this: void,
      formattedEventText: unknown,
      targetChannel: unknown,
      fromDisplayName: unknown,
      rawMessageText: unknown,
      timeStamp: number
    ): LuaMultiReturn<unknown[]> {
      let text = formattedEventText
      const settings = CHAT_MESSAGE_API.settings
      if (text !== undefined && settings?.timePrefixEnabled === true) {
        if (settings.tagPrefixMode === TAG_PREFIX_OFF) {
          const [stripped] = string.gsub(text as string, "%[.-%] ", "")
          text = stripped
        }
        text = string.format(MESSAGE_TEMPLATE, getFormattedTime(timeStamp), text as string)
      }
      return $multi(text, targetChannel, fromDisplayName, rawMessageText)
    }
  )

  postHookFormatter(EVENT_FRIEND_PLAYER_STATUS_CHANGED, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_IGNORE_ADDED, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_IGNORE_REMOVED, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_GROUP_TYPE_CHANGED, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_GROUP_INVITE_RESPONSE, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_SOCIAL_ERROR, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_TRIAL_FEATURE_RESTRICTED, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_GROUP_MEMBER_LEFT, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_BATTLEGROUND_INACTIVITY_WARNING, applyTimeAndTagPrefix)

  const [, simpleEventToCategoryMappings] = ZO_ChatSystem_GetEventCategoryMappings()
  simpleEventToCategoryMappings[CHAT_MESSAGE_GLOBAL] = CHAT_CATEGORY_SYSTEM
  CHAT_ROUTER.RegisterMessageFormatter(
    CHAT_MESSAGE_GLOBAL,
    function (this: void, ...args: unknown[]): LuaMultiReturn<unknown[]> {
      const tag = args[0]
      const rawMessageText = args[1]
      const [timeStamp, isRestoring] = getTimeStampForEvent()
      if (!isRestoring) {
        storeChatEvent(timeStamp, CHAT_MESSAGE_GLOBAL, tag, rawMessageText)
      }

      let formattedEventText: unknown = rawMessageText
      const tagMode = CHAT_MESSAGE_API.settings?.tagPrefixMode
      if (tagMode !== undefined && tagMode !== TAG_PREFIX_OFF) {
        formattedEventText = string.format(
          MESSAGE_TEMPLATE,
          tag as string,
          formattedEventText as string
        )
      }
      if (CHAT_MESSAGE_API.settings?.timePrefixEnabled === true) {
        formattedEventText = string.format(
          MESSAGE_TEMPLATE,
          getFormattedTime(timeStamp),
          formattedEventText as string
        )
      }
      return $multi(formattedEventText, undefined, tag, rawMessageText)
    }
  )
}
