import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

interface ErrorType {
  name: string
  new (...args: any[]): Error
}

type ErrorBase = new (...args: any[]) => Error

function initErrorClass(errorClass: ErrorType, name: string): any {
  errorClass.name = name
  return setmetatable(errorClass, {
    __call: (_self: any, message: unknown) => new errorClass(message),
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
