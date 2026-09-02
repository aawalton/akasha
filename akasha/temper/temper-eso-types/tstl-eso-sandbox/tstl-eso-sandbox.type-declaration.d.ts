type LuaThread = { readonly __internal__: unique symbol }
interface LuaMetatable<
  T,
  TIndex extends object | ((this: T, key: unknown) => unknown) | undefined =
    | object
    | ((this: T, key: unknown) => unknown)
    | undefined,
> {
  __add?: (this: T, operand: unknown) => unknown
  __sub?: (this: T, operand: unknown) => unknown
  __mul?: (this: T, operand: unknown) => unknown
  __div?: (this: T, operand: unknown) => unknown
  __mod?: (this: T, operand: unknown) => unknown
  __pow?: (this: T, operand: unknown) => unknown
  __unm?: (this: T, operand: unknown) => unknown
  __concat?: (this: T, operand: unknown) => unknown
  __len?: (this: T) => unknown
  __eq?: (this: T, operand: unknown) => boolean
  __lt?: (this: T, operand: unknown) => boolean
  __le?: (this: T, operand: unknown) => boolean
  __index?: TIndex
  __newindex?: object | ((this: T, key: unknown, value: unknown) => void)
  __call?: (this: T, ...args: unknown[]) => unknown
  __tostring?: (this: T) => string
  __mode?: "k" | "v" | "kv"
  __metatable?: unknown
  __gc?: (this: T) => void
}

interface EsoLuaDateInfo {
  year: number
  month: number
  day: number
  hour?: number
  min?: number
  sec?: number
  isdst?: boolean
}

interface EsoLuaDateInfoResult {
  year: number
  month: number
  day: number
  hour: number
  min: number
  sec: number
  isdst: boolean
  yday: number
  wday: number
}

declare const _G: typeof globalThis & Record<string, unknown>

declare const _VERSION: "Lua 5.1"

declare function assert<V>(this: void, v: V): Exclude<V, undefined | null | false>
declare function assert<V, A extends unknown[]>(
  this: void,
  v: V,
  ...args: A
): LuaMultiReturn<[Exclude<V, undefined | null | false>, ...A]>

declare const collectgarbage: ((this: void, opt?: "collect") => void) &
  ((this: void, opt: "stop") => void) &
  ((this: void, opt: "restart") => void) &
  ((this: void, opt: "count") => number) &
  ((this: void, opt: "setpause", arg: number) => number) &
  ((this: void, opt: "setstepmul", arg: number) => number) &
  ((this: void, opt: "step", arg: number) => boolean)

declare function error(this: void, message: unknown, level?: number): never

declare const expat: unknown

declare function getfenv(
  this: void,
  f?: ((this: void, ...args: unknown[]) => unknown) | number
): unknown

declare function getmetatable<T>(this: void, object: T): LuaMetatable<T> | undefined

declare function hpairs<T>(this: void, t: T): LuaIterable<LuaMultiReturn<[unknown, unknown]>>

declare function ipairs<T>(
  this: void,
  t: Record<number, T>
): LuaIterable<LuaMultiReturn<[number, NonNullable<T>]>>

declare function istable(this: void, v: unknown): v is Record<string, unknown>

declare function loadstring(
  this: void,
  s: string,
  chunkname?: string
): LuaMultiReturn<[() => unknown] | [undefined, string]>

declare function newproxy(this: void, addMetatable?: boolean): object

declare function next(
  this: void,
  table: object,
  index?: unknown
): LuaMultiReturn<[unknown, unknown] | []>

declare function pairs<TKey extends AnyNotNil, TValue>(
  this: void,
  t: LuaTable<TKey, TValue>
): LuaIterable<LuaMultiReturn<[TKey, NonNullable<TValue>]>>
declare function pairs<T>(
  this: void,
  t: T
): LuaIterable<LuaMultiReturn<[keyof T, NonNullable<T[keyof T]>]>>

declare function pcall<This, Args extends unknown[], R>(
  this: void,
  f: (this: This, ...args: Args) => R,
  context: This,
  ...args: Args
): LuaMultiReturn<[true, R] | [false, string]>
declare function pcall<A extends unknown[], R>(
  this: void,
  f: (this: void, ...args: A) => R,
  ...args: A
): LuaMultiReturn<[true, R] | [false, string]>

declare const print: (this: void, ...args: unknown[]) => void
declare function rawequal<T>(this: void, v1: T, v2: T): boolean
declare function rawget<T extends object, K extends keyof T>(this: void, table: T, index: K): T[K]
declare function rawset<T extends object, K extends keyof T>(
  this: void,
  table: T,
  index: K,
  value: T[K]
): T

declare function select<T>(this: void, index: number, ...args: T[]): LuaMultiReturn<T[]>
declare function select<T>(this: void, index: "#", ...args: T[]): number

declare const setfenv: (<T extends (this: void, ...args: unknown[]) => unknown>(
  this: void,
  f: T,
  table: object
) => T) &
  ((this: void, f: 0, table: object) => (this: void, ...args: unknown[]) => unknown) &
  ((this: void, f: number, table: object) => void)

declare function setmetatable<
  T extends object,
  TIndex extends object | ((this: T, key: unknown) => unknown) | undefined = undefined,
>(
  this: void,
  table: T,
  metatable?: LuaMetatable<T, TIndex> | null
): TIndex extends (this: T, key: infer TKey) => infer TValue
  ? T & { [K in TKey & string]: TValue }
  : TIndex extends object
    ? T & TIndex
    : T

declare function tonumber(this: void, e: unknown, base?: number): number | undefined
declare function tostring(this: void, v: unknown): string
declare function type(
  this: void,
  v: unknown
): "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata"

declare function unpack<T extends unknown[]>(this: void, list: T): LuaMultiReturn<T>
declare function unpack<T>(this: void, list: T[], i: number, j?: number): LuaMultiReturn<T[]>

declare function xpcall<R, E>(
  this: void,
  f: () => R,
  err: (err: unknown) => E
): LuaMultiReturn<[true, R] | [false, E]>

declare const coroutine: {
  create: (this: void, f: (...args: unknown[]) => unknown) => LuaThread
  getname: (this: void, co: LuaThread) => string
  resume: (
    this: void,
    co: LuaThread,
    ...val: unknown[]
  ) => LuaMultiReturn<[true, ...unknown[]] | [false, string]>
  running: (this: void) => LuaThread | undefined
  setname: (this: void, co: LuaThread, name: string) => void
  status: (this: void, co: LuaThread) => "running" | "suspended" | "normal" | "dead"
  wrap: (
    this: void,
    f: (...args: unknown[]) => unknown
  ) => (...args: unknown[]) => LuaMultiReturn<unknown[]>
  yield: (this: void, ...args: unknown[]) => LuaMultiReturn<unknown[]>
}

declare const debug: {
  traceback: ((this: void, message?: string | null, level?: number | null) => string) &
    ((this: void, thread?: LuaThread, message?: string | null, level?: number | null) => string) &
    (<T>(this: void, message: T) => T) &
    (<T>(this: void, thread: LuaThread, message: T) => T)
}

declare const math: {
  abs: (this: void, x: number) => number
  acos: (this: void, x: number) => number
  asin: (this: void, x: number) => number
  atan: (this: void, x: number) => number
  atan2: (this: void, y: number, x: number) => number
  ceil: (this: void, x: number) => number
  cos: (this: void, x: number) => number
  cosh: (this: void, x: number) => number
  deg: (this: void, x: number) => number
  exp: (this: void, x: number) => number
  floor: (this: void, x: number) => number
  fmod: (this: void, x: number, y: number) => number
  frexp: (this: void, x: number) => LuaMultiReturn<[number, number]>
  huge: number
  ldexp: (this: void, m: number, e: number) => number
  log: (this: void, x: number) => number
  log10: (this: void, x: number) => number
  max: (this: void, x: number, ...numbers: number[]) => number
  min: (this: void, x: number, ...numbers: number[]) => number
  modf: (this: void, x: number) => LuaMultiReturn<[number, number]>
  pi: number
  pow: (this: void, x: number, y: number) => number
  rad: (this: void, x: number) => number
  random: ((this: void) => number) &
    ((this: void, m: number) => number) &
    ((this: void, m: number, n: number) => number)
  randomseed: (this: void, x: number) => void
  sin: (this: void, x: number) => number
  sinh: (this: void, x: number) => number
  sqrt: (this: void, x: number) => number
  tan: (this: void, x: number) => number
  tanh: (this: void, x: number) => number
}

declare const os: {
  clock: (this: void) => number
  clockpersecond: (this: void) => number
  date: ((this: void, format?: string, time?: number) => string) &
    ((this: void, format: "*t", time?: number) => EsoLuaDateInfoResult)
  difftime: (this: void, t2: number, t1: number) => number
  rawclock: (this: void) => number
  time: ((this: void) => number) & ((this: void, table: EsoLuaDateInfo) => number)
}

declare const string: {
  byte: ((this: void, s: string, i?: number) => number) &
    ((this: void, s: string, i?: number, j?: number) => LuaMultiReturn<number[]>)
  char: (this: void, ...args: number[]) => string
  find: (
    this: void,
    s: string,
    pattern: string,
    init?: number,
    plain?: boolean
  ) => LuaMultiReturn<[number, number, ...string[]] | []>
  format: (this: void, formatstring: string, ...args: unknown[]) => string
  gmatch: (this: void, s: string, pattern: string) => LuaIterable<LuaMultiReturn<string[]>>
  gsub: (
    this: void,
    s: string,
    pattern: string,
    repl: string | Record<string, string> | ((...matches: string[]) => string),
    n?: number
  ) => LuaMultiReturn<[string, number]>
  len: (this: void, s: string) => number
  lower: (this: void, s: string) => string
  match: (this: void, s: string, pattern: string, init?: number) => LuaMultiReturn<string[]>
  rep: (this: void, s: string, n: number) => string
  reverse: (this: void, s: string) => string
  sub: (this: void, s: string, i: number, j?: number) => string
  upper: (this: void, s: string) => string
}

declare const table: {
  concat: (this: void, list: (string | number)[], sep?: string, i?: number, j?: number) => string
  insert: (<T>(this: void, list: T[], value: T) => void) &
    (<T>(this: void, list: T[], pos: number, value: T) => void)
  maxn: (this: void, table: object) => number
  remove: <T>(this: void, list: T[], pos?: number) => T | undefined
  sort: <T>(this: void, list: T[], comp?: (a: T, b: T) => boolean) => void
  unpack: (<T extends unknown[]>(this: void, list: T) => LuaMultiReturn<T>) &
    (<T>(this: void, list: T[], i: number, j?: number) => LuaMultiReturn<T[]>)
}

declare const utf8: {
  char: (this: void, ...codepoints: number[]) => string
  charpattern: string
  codes: (this: void, s: string) => LuaIterable<LuaMultiReturn<[number, number]>>
  codepoint: (this: void, s: string, i?: number, j?: number) => LuaMultiReturn<number[]>
  len: (
    this: void,
    s: string,
    i?: number,
    j?: number
  ) => LuaMultiReturn<[number] | [undefined, number]>
  offset: (this: void, s: string, n: number, i?: number) => number | undefined
}
