interface ChatTextEntry {
  GetText: () => string
  editControl: {
    HasFocus: () => boolean
    InsertText: (text: string) => void
  }
}
interface ChatNotificationTimeline {
  Stop: () => void
  PlayFromStart: () => void
}
interface SharedChatSystem {
  textEntry: ChatTextEntry
  AddMessage: (message: string) => void
  currentChannel?: number
  currentNumNotifications?: number
  notificationPulseTimeline: ChatNotificationTimeline
}
declare const CHAT_SYSTEM: SharedChatSystem

interface ChatRouter {
  AddSystemMessage: (message: string) => void
  FormatAndAddChatMessage: (eventName: number, ...args: unknown[]) => void
}
declare const CHAT_ROUTER: ChatRouter

declare const StartChatInput: (text?: string, channel?: number, target?: string) => void
