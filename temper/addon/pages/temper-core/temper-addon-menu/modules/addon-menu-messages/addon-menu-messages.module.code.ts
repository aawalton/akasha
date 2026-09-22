import "akasha/temper/addon/type/temper-debug-logger-global/temper-debug-logger-global.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/addon-menu-logger/addon-menu-logger.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const MESSAGE_PREFIX = "[TemperAddonMenu] "
let messages: string[] = []

export function printLater(this: void, msg: string): undefined {
  if (CHAT_SYSTEM.primaryContainer !== undefined) {
    d(MESSAGE_PREFIX + msg)
  } else {
    messages.push(msg)
  }
}

export function flushMessages(this: void): undefined {
  for (const msg of messages) {
    d(MESSAGE_PREFIX + msg)
  }
  messages = []
}

function noop(this: void): undefined {}

function createNoopLogger(this: void): LamLogger {
  return { Warn: noop, Error: noop, Info: noop, Debug: noop, Verbose: noop }
}

export const logger: LamLogger =
  TemperDebugLogger !== undefined ? TemperDebugLogger("LibAddonMenu-2.0") : createNoopLogger()
