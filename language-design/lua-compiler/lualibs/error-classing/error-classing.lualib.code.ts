interface ErrorType {
  name: string
  new (...args: any[]): Error
}

type ErrorBase = new (...args: any[]) => any

function initErrorClass(Type: ErrorType, name: string): any {
  Type.name = name
  return setmetatable(Type, {
    __call: (_self: any, message: string) => new Type(message),
  })
}

function createErrorClass(base: ErrorBase, name: string): any {
  return initErrorClass(
    class extends base {
      public name = name
    },
    name
  )
}

export const __TS__ErrorClassing = {
  init: initErrorClass,
  create: createErrorClass,
}
