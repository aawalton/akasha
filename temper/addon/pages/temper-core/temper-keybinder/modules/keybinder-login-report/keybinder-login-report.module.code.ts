import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"

const REPORT_NAMESPACE = "TemperKeybinderReport"

interface Report {
  playerActive: boolean
  held: number | undefined
}

const REPORT: Report = { playerActive: false, held: undefined }

export function appliedLine(this: void, count: number): string {
  const noun = count === 1 ? "key binding" : "key bindings"
  return `Temper: ${count} ${noun} set from your keybinding pages`
}

function post(this: void, count: number): undefined {
  CHAT_ROUTER.AddSystemMessage(appliedLine(count))
}

export function watchForPlayerActive(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent(REPORT_NAMESPACE, EVENT_PLAYER_ACTIVATED, () => {
    EVENT_MANAGER.UnregisterForEvent(REPORT_NAMESPACE, EVENT_PLAYER_ACTIVATED)
    REPORT.playerActive = true
    if (REPORT.held !== undefined) post(REPORT.held)
    REPORT.held = undefined
  })
}

export function reportApplied(this: void, count: number): undefined {
  if (REPORT.playerActive) post(count)
  else REPORT.held = count
}
