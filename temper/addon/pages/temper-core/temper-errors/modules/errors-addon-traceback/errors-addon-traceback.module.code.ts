import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { CALLSTACK_MAX_LEN } from "akasha/temper/addon/pages/temper-core/temper-errors/modules/errors-addon-limits/errors-addon-limits.module.code.ts"
import "akasha/code/editor/extension/vscode-api/vscode-api.type-declaration.d.ts"
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
  const message = stringIn(messagePart)
  const traceback = stringIn(tracebackBody)
  if (message !== null && traceback !== null) {
    return { message, traceback: sanitizeTraceback(`stack traceback:${traceback}`) }
  }
  return { message: errorString, traceback: sanitizeTraceback(errorString) }
}

function hasVisibleContent(text: string): boolean {
  const [visible] = string.match(text, "%S")
  return stringIn(visible) !== null
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
