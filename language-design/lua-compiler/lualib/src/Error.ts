interface ErrorType {
  name: string
  new (...args: any[]): Error
}

function getErrorStack(): string {
  if (_VERSION === "Lua 5.1") {
    return string.sub(debug.traceback("", 3), 2)
  }
  return debug.traceback(undefined, 3)
}

function initErrorClass(Type: ErrorType, name: string): any {
  Type.name = name
  return setmetatable(Type, {
    __call: (_self: any, message: string) => new Type(message),
  })
}

export const Error: ErrorConstructor = initErrorClass(
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

function createErrorClass(name: string) {
  return initErrorClass(
    class extends Error {
      public name = name
    },
    name
  )
}

export const RangeError = createErrorClass("RangeError")
export const ReferenceError = createErrorClass("ReferenceError")
export const SyntaxError = createErrorClass("SyntaxError")
export const TypeError = createErrorClass("TypeError")
export const URIError = createErrorClass("URIError")
