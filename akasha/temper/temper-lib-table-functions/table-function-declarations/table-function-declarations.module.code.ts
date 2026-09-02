declare global {
  type AnyNotNil = {}

  interface LuaMetatable<T, TIndex = object | ((this: T, key: unknown) => unknown) | undefined> {
    __index?: TIndex
    __newindex?: object | ((this: T, key: unknown, value: unknown) => undefined)
    __len?: (this: T) => number
    __call?: (this: T, ...args: unknown[]) => unknown
    __tostring?: (this: T) => string
  }

  interface LuaTable<TKey extends AnyNotNil = AnyNotNil, TValue = unknown>
    extends Iterable<[TKey, TValue]> {
    length: () => number
    get: (key: TKey) => TValue
    set: (key: TKey, value: TValue) => undefined
    has: (key: TKey) => boolean
    delete: (key: TKey) => boolean
    isEmpty: () => boolean
  }

  const LuaTable: new <TKey extends AnyNotNil = AnyNotNil, TValue = unknown>() => LuaTable<
    TKey,
    TValue
  >

  function pairs<TKey extends AnyNotNil, TValue>(
    this: void,
    t: LuaTable<TKey, TValue>
  ): Iterable<[TKey, NonNullable<TValue>]>
  function pairs<T>(this: void, t: T): Iterable<[keyof T, NonNullable<T[keyof T]>]>

  function type(
    this: void,
    v: unknown
  ): "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata"

  function tostring(this: void, v: unknown): string

  function getmetatable<T>(this: void, object: T): LuaMetatable<T> | undefined

  function setmetatable<T extends object>(
    this: void,
    table: T,
    metatable?: LuaMetatable<T> | null
  ): T

  function d(this: void, ...args: unknown[]): undefined
}

export {}
