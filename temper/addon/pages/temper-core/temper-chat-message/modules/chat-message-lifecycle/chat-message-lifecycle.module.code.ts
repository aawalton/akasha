import { ADDON_NAME } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-names/hud-addon-names.module.code.ts"
import { CHAT_MESSAGE_API } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-api/chat-message-api.module.code.ts"
import type { StringRecord } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-casts/chat-message-casts.module.code.ts"
import {
  asChatEventKey,
  asHistoryArray,
  asSettings,
} from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-casts/chat-message-casts.module.code.ts"
import {
  CHAT_MESSAGE_GLOBAL,
  UNKNOWN_LINK_TYPE,
} from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-constants/chat-message-constants.module.code.ts"
import { registerSlashCommand } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-slash-command/chat-message-slash-command.module.code.ts"
import type { HistoryEntry } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-types/chat-message-types.module.code.ts"
import { createChatProxy } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-proxy/chat-proxy.module.code.ts"
import { readFromSavedVariable } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-saved-data/chat-saved-data.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-chat-message/chat-message-declarations/chat-message-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-link-handler/eso-link-handler.type-declaration.d.ts"

export function registerLifecycle(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent(
    CHAT_MESSAGE_GLOBAL,
    EVENT_ADD_ON_LOADED,
    function (this: void, _eventCode: number, name: string): undefined {
      if (name !== ADDON_NAME) {
        return
      }

      const saveDataKey = GetWorldName() + GetDisplayName()
      CHAT_MESSAGE_API.saveDataKey = saveDataKey

      const chat = createChatProxy("TemperChatMessage", "TCM")
      registerSlashCommand(chat)

      const settingsStore = LibChatMessageSettings ?? ({} as StringRecord)
      LibChatMessageSettings = settingsStore
      const historyStore = LibChatMessageHistory ?? ({} as StringRecord)
      LibChatMessageHistory = historyStore

      const settings = asSettings(
        settingsStore[saveDataKey] ?? ZO_ShallowTableCopy(CHAT_MESSAGE_API.defaultSettings)
      )
      settingsStore[saveDataKey] = settings
      CHAT_MESSAGE_API.settings = settings

      const held: unknown = settings
      const settingsRecord = held as StringRecord
      const defaults: unknown = CHAT_MESSAGE_API.defaultSettings
      const defaultsRecord = defaults as StringRecord
      for (const [key, value] of pairs(defaultsRecord)) {
        if (settingsRecord[key] === undefined) {
          settingsRecord[key] = value
        }
      }
      for (const [key] of pairs(settingsRecord)) {
        if (defaultsRecord[key] === undefined) {
          settingsRecord[key] = undefined
        }
      }

      CHAT_MESSAGE_API.chatHistoryActive = settings.historyEnabled

      function restoreChatHistoryEntry(this: void, entry: HistoryEntry): undefined {
        CHAT_MESSAGE_API.nextEventTimeStamp = entry[0] as number
        const eventKey = asChatEventKey(readFromSavedVariable(entry[1]))
        const args: unknown[] = []
        for (let i = 2; i < entry.length; i += 1) {
          args[args.length] = readFromSavedVariable(entry[i])
        }
        CHAT_ROUTER.FormatAndAddChatMessage(eventKey, ...args)
      }

      function restoreChatHistory(this: void): undefined {
        if (!CHAT_MESSAGE_API.chatHistoryActive) {
          return
        }
        CHAT_MESSAGE_API.ClearChat()

        const newHistory: HistoryEntry[] = []
        const oldHistory =
          historyStore[saveDataKey] !== undefined
            ? asHistoryArray(historyStore[saveDataKey])
            : undefined
        const tempHistory = CHAT_MESSAGE_API.chatHistory

        if (oldHistory !== undefined) {
          const ageThreshold = GetTimeStamp() - settings.historyMaxAge
          for (let i = 0; i < oldHistory.length; i += 1) {
            const item = oldHistory[i]
            if (item !== undefined && (item[0] as number) > ageThreshold) {
              restoreChatHistoryEntry(item)
            }
          }
        }

        if (CHAT_MESSAGE_API.nextEventTimeStamp !== undefined) {
          CHAT_MESSAGE_API.nextEventTimeStamp = GetTimeStamp()
          chat.Print("End of restored chat history")
        }

        for (let i = 0; i < tempHistory.length; i += 1) {
          const item = tempHistory[i]
          if (item !== undefined) {
            restoreChatHistoryEntry(item)
          }
        }

        CHAT_MESSAGE_API.nextEventTimeStamp = undefined
        CHAT_MESSAGE_API.chatHistory = newHistory
        historyStore[saveDataKey] = newHistory
      }

      EVENT_MANAGER.RegisterForEvent(
        CHAT_MESSAGE_GLOBAL,
        EVENT_PLAYER_ACTIVATED,
        function (this: void): undefined {
          EVENT_MANAGER.UnregisterForEvent(CHAT_MESSAGE_GLOBAL, EVENT_PLAYER_ACTIVATED)
          zo_callLater(restoreChatHistory, 0)
        }
      )

      if (!CHAT_MESSAGE_API.chatHistoryActive) {
        CHAT_MESSAGE_API.ClearHistory()
      }

      function onLinkClicked(
        this: void,
        _link: string,
        button: number,
        _text: string,
        _color: unknown,
        linkType: string,
        ...rest: unknown[]
      ): boolean | undefined {
        if (linkType !== UNKNOWN_LINK_TYPE) {
          return undefined
        }
        if (button === MOUSE_BUTTON_INDEX_LEFT) {
          const unknownType = rest[0]
          ZO_Alert(
            EVENT_UI_ERROR,
            SOUNDS.NEGATIVE_CLICK as string,
            zo_strformat(TEMPER_CHATMESSAGE_UNKNOWN_DESCRIPTION, unknownType)
          )
          return true
        }
        return undefined
      }
      LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_CLICKED_EVENT, onLinkClicked)
      LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_MOUSE_UP_EVENT, onLinkClicked)
      if (IsKeyboardUISupported()) {
        KEYBOARD_CHAT_SYSTEM.GetEditControl().SetAllowMarkupType(ALLOW_MARKUP_TYPE_ALL)
      }
    }
  )
}
