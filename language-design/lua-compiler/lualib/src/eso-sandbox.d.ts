/** @noSelfInFile */

/// <reference path="../../language-extensions/index.d.ts" />
type LuaThread = { readonly __internal__: unique symbol }
interface LuaMetatable<
  T,
  TIndex extends object | ((this: T, key: any) => any) | undefined =
    | object
    | ((this: T, key: any) => any)
    | undefined,
> {
  __add?(this: T, operand: any): any
  __sub?(this: T, operand: any): any
  __mul?(this: T, operand: any): any
  __div?(this: T, operand: any): any
  __mod?(this: T, operand: any): any
  __pow?(this: T, operand: any): any
  __unm?(this: T, operand: any): any
  __concat?(this: T, operand: any): any
  __len?(this: T): any
  __eq?(this: T, operand: any): boolean
  __lt?(this: T, operand: any): boolean
  __le?(this: T, operand: any): boolean
  __index?: TIndex
  __newindex?: object | ((this: T, key: any, value: any) => void)
  __call?(this: T, ...args: any[]): any
  __tostring?(this: T): string
  __mode?: "k" | "v" | "kv"
  __metatable?: any
  __gc?(this: T): void
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

declare const _G: typeof globalThis

declare const _VERSION: "Lua 5.1"

declare function assert<V>(this: void, v: V): Exclude<V, undefined | null | false>
declare function assert<V, A extends unknown[]>(
  this: void,
  v: V,
  ...args: A
): LuaMultiReturn<[Exclude<V, undefined | null | false>, ...A]>

declare function collectgarbage(this: void, opt?: "collect"): void
declare function collectgarbage(this: void, opt: "stop"): void
declare function collectgarbage(this: void, opt: "restart"): void
declare function collectgarbage(this: void, opt: "count"): number
declare function collectgarbage(this: void, opt: "setpause", arg: number): number
declare function collectgarbage(this: void, opt: "setstepmul", arg: number): number
declare function collectgarbage(this: void, opt: "step", arg: number): boolean

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

declare function print(this: void, ...args: unknown[]): void
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

declare function setfenv<T extends (this: void, ...args: unknown[]) => unknown>(
  this: void,
  f: T,
  table: object
): T
declare function setfenv(
  this: void,
  f: 0,
  table: object
): (this: void, ...args: unknown[]) => unknown
declare function setfenv(this: void, f: number, table: object): void

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

declare namespace coroutine {
  function create(this: void, f: (...args: unknown[]) => unknown): LuaThread
  function getname(this: void, co: LuaThread): string
  function resume(
    this: void,
    co: LuaThread,
    ...val: unknown[]
  ): LuaMultiReturn<[true, ...unknown[]] | [false, string]>
  function running(this: void): LuaThread | undefined
  function setname(this: void, co: LuaThread, name: string): void
  function status(this: void, co: LuaThread): "running" | "suspended" | "normal" | "dead"
  function wrap(
    this: void,
    f: (...args: unknown[]) => unknown
  ): (...args: unknown[]) => LuaMultiReturn<unknown[]>
  function yield(this: void, ...args: unknown[]): LuaMultiReturn<unknown[]>
}

declare namespace debug {
  function traceback(this: void, message?: string | null, level?: number | null): string
  function traceback(
    this: void,
    thread?: LuaThread,
    message?: string | null,
    level?: number | null
  ): string
  function traceback<T>(this: void, message: T): T
  function traceback<T>(this: void, thread: LuaThread, message: T): T
}

declare namespace math {
  function abs(this: void, x: number): number
  function acos(this: void, x: number): number
  function asin(this: void, x: number): number
  function atan(this: void, x: number): number
  function atan2(this: void, y: number, x: number): number
  function ceil(this: void, x: number): number
  function cos(this: void, x: number): number
  function cosh(this: void, x: number): number
  function deg(this: void, x: number): number
  function exp(this: void, x: number): number
  function floor(this: void, x: number): number
  function fmod(this: void, x: number, y: number): number
  function frexp(this: void, x: number): LuaMultiReturn<[number, number]>
  const huge: number
  function ldexp(this: void, m: number, e: number): number
  function log(this: void, x: number): number
  function log10(this: void, x: number): number
  function max(this: void, x: number, ...numbers: number[]): number
  function min(this: void, x: number, ...numbers: number[]): number
  function modf(this: void, x: number): LuaMultiReturn<[number, number]>
  const pi: number
  function pow(this: void, x: number, y: number): number
  function rad(this: void, x: number): number
  function random(this: void): number
  function random(this: void, m: number): number
  function random(this: void, m: number, n: number): number
  function randomseed(this: void, x: number): void
  function sin(this: void, x: number): number
  function sinh(this: void, x: number): number
  function sqrt(this: void, x: number): number
  function tan(this: void, x: number): number
  function tanh(this: void, x: number): number
}

declare namespace os {
  function clock(this: void): number
  function clockpersecond(this: void): number
  function date(this: void, format?: string, time?: number): string
  function date(this: void, format: "*t", time?: number): EsoLuaDateInfoResult
  function difftime(this: void, t2: number, t1: number): number
  function rawclock(this: void): number
  function time(this: void): number
  function time(this: void, table: EsoLuaDateInfo): number
}

declare namespace string {
  function byte(this: void, s: string, i?: number): number
  function byte(this: void, s: string, i?: number, j?: number): LuaMultiReturn<number[]>
  function char(this: void, ...args: number[]): string
  function find(
    this: void,
    s: string,
    pattern: string,
    init?: number,
    plain?: boolean
  ): LuaMultiReturn<[number, number, ...string[]] | []>
  function format(this: void, formatstring: string, ...args: unknown[]): string
  function gmatch(this: void, s: string, pattern: string): LuaIterable<LuaMultiReturn<string[]>>
  function gsub(
    this: void,
    s: string,
    pattern: string,
    repl: string | Record<string, string> | ((...matches: string[]) => string),
    n?: number
  ): LuaMultiReturn<[string, number]>
  function len(this: void, s: string): number
  function lower(this: void, s: string): string
  function match(this: void, s: string, pattern: string, init?: number): LuaMultiReturn<string[]>
  function rep(this: void, s: string, n: number): string
  function reverse(this: void, s: string): string
  function sub(this: void, s: string, i: number, j?: number): string
  function upper(this: void, s: string): string
}

declare namespace table {
  function concat(
    this: void,
    list: (string | number)[],
    sep?: string,
    i?: number,
    j?: number
  ): string
  function insert<T>(this: void, list: T[], value: T): void
  function insert<T>(this: void, list: T[], pos: number, value: T): void
  function maxn(this: void, table: object): number
  function remove<T>(this: void, list: T[], pos?: number): T | undefined
  function sort<T>(this: void, list: T[], comp?: (a: T, b: T) => boolean): void
  function unpack<T extends unknown[]>(this: void, list: T): LuaMultiReturn<T>
  function unpack<T>(this: void, list: T[], i: number, j?: number): LuaMultiReturn<T[]>
}

declare namespace utf8 {
  function char(this: void, ...codepoints: number[]): string
  const charpattern: string
  function codes(this: void, s: string): LuaIterable<LuaMultiReturn<[number, number]>>
  function codepoint(this: void, s: string, i?: number, j?: number): LuaMultiReturn<number[]>
  function len(
    this: void,
    s: string,
    i?: number,
    j?: number
  ): LuaMultiReturn<[number] | [undefined, number]>
  function offset(this: void, s: string, n: number, i?: number): number | undefined
}
