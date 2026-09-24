import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import { CALLSTACK_MAX_LEN } from "akasha/temper/addon/pages/temper-core/temper-errors/modules/errors-addon-limits/errors-addon-limits.module.code.ts"
import { parseLuaCapture } from "akasha/temper/addon/shared/narrow/modules/parse-lua-capture/parse-lua-capture.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

function sanitizeTraceback(traceback: string): string {
  const [stripped] = string.gsub(traceback, "%s*<Locals>.-</Locals>", "")
  if (stripped.length <= CALLSTACK_MAX_LEN) {
    return stripped
  }
  return `${stripped.slice(0, CALLSTACK_MAX_LEN)}…`
}

function splitTraceback(errorString: string): { message: string; traceback: string } {
  const [messagePart, tracebackBody] = string.match(errorString, "(.+)\nstack traceback:(.+)")
  const message = parseLuaCapture(messagePart)
  const traceback = parseLuaCapture(tracebackBody)
  if (message !== undefined && traceback !== undefined) {
    return { message, traceback: sanitizeTraceback(`stack traceback:${traceback}`) }
  }
  return { message: errorString, traceback: sanitizeTraceback(errorString) }
}

function hasVisibleContent(text: string): boolean {
  const [visibleAt] = string.find(text, "%S")
  return visibleAt !== undefined
}

function handlerSideStack(): string {
  if (typeof debug === "object" && typeof debug.traceback === "function") {
    return `\nhandler-side stack (not the error origin):\n${debug.traceback()}`
  }
  return ""
}

export function classifyError(
  errorString: unknown,
  eventCode: number,
  errorCode: number | undefined
): { message: string; traceback: string } {
  if (typeof errorString === "string" && hasVisibleContent(errorString)) {
    return splitTraceback(errorString)
  }
  const ctx = `eventCode=${eventCode} errorCode=${errorCode ?? "nil"}`
  const sentinel =
    typeof errorString === "string"
      ? `<empty or whitespace lua error> ${ctx}`
      : `<non-string lua error type=${typeof errorString} value=${tostring(errorString)}> ${ctx}`
  return {
    message: sanitizeTraceback(`${sentinel}${handlerSideStack()}`),
    traceback: sanitizeTraceback(`<no-lua-traceback> ${ctx}`),
  }
}
