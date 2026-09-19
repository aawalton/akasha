interface ErrorType {
  name: string
  new (...args: any[]): Error
}

type ErrorBase = new (...args: any[]) => any

function initErrorClass(errorClass: ErrorType, name: string): any {
  errorClass.name = name
  return setmetatable(errorClass, {
    __call: (_self: any, message: string) => new errorClass(message),
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
