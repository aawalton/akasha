import { __TS__CountVarargs } from "akasha/language-design/lua-compiler/lualibs/count-varargs/count-varargs.lualib.code.ts"
import { __TS__Unpack } from "akasha/language-design/lua-compiler/lualibs/unpack/unpack.lualib.code.ts"

export interface GeneratorIterator {
  ____coroutine: LuaThread
  [Symbol.iterator]: (this: GeneratorIterator) => GeneratorIterator
  next: (this: GeneratorIterator, ...args: any[]) => { value?: any; done: boolean }
}

function generatorIterator(this: GeneratorIterator) {
  return this
}

function generatorNext(this: GeneratorIterator, ...args: any[]) {
  const co = this.____coroutine
  if (coroutine.status(co) === "dead") return { done: true }

  const [status, value] = coroutine.resume(co, ...args)
  if (!status) throw value

  return { value, done: coroutine.status(co) === "dead" }
}

export function __TS__Generator(this: void, fn: (this: void, ...args: any[]) => any) {
  return function (this: void, ...args: any[]): GeneratorIterator {
    const argsLength = __TS__CountVarargs(...args)
    return {
      ____coroutine: coroutine.create(() => fn(...__TS__Unpack(args, 1, argsLength))),
      [Symbol.iterator]: generatorIterator,
      next: generatorNext,
    }
  }
}
