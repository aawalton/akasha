import { __TS__ErrorClassing } from "../error-classing/error-classing.lualib.code.ts"

function getErrorStack(): string {
  if (_VERSION === "Lua 5.1") {
    return string.sub(debug.traceback("", 3), 2)
  }
  return debug.traceback(undefined, 3)
}

export const Error: ErrorConstructor = __TS__ErrorClassing.init(
  class implements Error {
    public name = "Error"
    public stack?: string

    constructor(public message = "") {
      this.stack = getErrorStack()
    }

    public toString(): string {
      return this.message !== "" ? `${this.name}: ${this.message}` : this.name
    }
  },
  "Error"
)
