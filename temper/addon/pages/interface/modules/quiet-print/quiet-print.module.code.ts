import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

let IS_QUEUED = false
const STORED_MESSAGES: string[] = []

export function safePrint(this: void, message: string): undefined {
  if (IsPlayerActivated()) {
    CHAT_SYSTEM.AddMessage(message)
  } else {
    STORED_MESSAGES.push(message)
    if (!IS_QUEUED) {
      IS_QUEUED = true
      EVENT_MANAGER.RegisterForEvent(
        "NOTY_Print",
        EVENT_PLAYER_ACTIVATED,
        function (this: void, event: number): undefined {
          EVENT_MANAGER.UnregisterForEvent("NOTY_Print", event)
          for (const message of STORED_MESSAGES) {
            CHAT_SYSTEM.AddMessage(message)
          }
          ZO_ClearNumericallyIndexedTable(STORED_MESSAGES)
          IS_QUEUED = false
        }
      )
    }
  }
}
