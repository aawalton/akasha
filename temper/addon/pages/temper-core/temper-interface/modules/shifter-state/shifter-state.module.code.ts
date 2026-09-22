import {
  asEventIndexable,
  asLib,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/shifter-casts/shifter-casts.module.code.ts"
import {
  EVENT_NAMES,
  LIB_IDENTIFIER,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/shifter-constants/shifter-constants.module.code.ts"
import type {
  CursorTLC,
  Lib,
  ShifterBox,
  ValidateFn,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/shifter-types/shifter-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export const CM = CALLBACK_MANAGER
export const EM = EVENT_MANAGER
export const WM = WINDOW_MANAGER

export const lib: Lib = asLib({
  name: LIB_IDENTIFIER,
  version: "0.7.0",
  doDebug: false,
})

lib.allowedEventNames = EVENT_NAMES

export const allowedShifterBoxEvents = new LuaTable<number, boolean>()
const libEvents = asEventIndexable(lib)
for (const [value, eventName] of ipairs(EVENT_NAMES)) {
  libEvents[eventName] = value
  allowedShifterBoxEvents.set(value, true)
}

export const existingShifterBoxes = new LuaTable<AnyNotNil, LuaTable<AnyNotNil, ShifterBox>>()
lib.existingShifterBoxes = existingShifterBoxes

export const validationTypeToFunc = new LuaTable<string, ValidateFn>()

export const CURSOR_STATE: { tlc: CursorTLC | undefined } = { tlc: undefined }
