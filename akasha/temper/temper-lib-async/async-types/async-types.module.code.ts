export type FuncOfTask = (this: void, task: TaskInstance) => unknown

export type LoopBodyFunc = (this: void, ...args: unknown[]) => unknown

export type ConditionFunc = (this: void) => unknown

export type PairsIter = (
  this: void,
  list: unknown,
  key: unknown
) => LuaMultiReturn<[unknown, unknown]>

export type WaitFunc = (this: void, task: TaskInstance) => unknown

export type CompareFunc = (this: void, a: unknown, b: unknown) => boolean

export type LogFunc = (this: void, message: string, ...args: unknown[]) => void

export type JobsTable = Record<string, TaskInstance | undefined>

export interface TaskMethods {
  Initialize: (this: TaskInstance) => void
  Resume: (this: TaskInstance) => TaskInstance
  Suspend: (this: TaskInstance) => TaskInstance
  Cancel: (this: TaskInstance) => TaskInstance
  Call: (this: TaskInstance, funcOfTask: FuncOfTask) => TaskInstance
  Then: (this: TaskInstance, funcOfTask: FuncOfTask) => TaskInstance
  For: (this: TaskInstance, p1: unknown, p2?: unknown, p3?: unknown) => TaskInstance
  While: (this: TaskInstance, func: ConditionFunc) => TaskInstance
  Do: (this: TaskInstance, func: LoopBodyFunc) => TaskInstance
  Delay: (this: TaskInstance, delay: number, funcOfTask: FuncOfTask) => TaskInstance
  ThenDelay: (this: TaskInstance, delay: number, funcOfTask: FuncOfTask) => TaskInstance
  WaitUntil: (this: TaskInstance, funcOfTask: WaitFunc) => TaskInstance
  StopTimer: (this: TaskInstance) => TaskInstance
  Finally: (this: TaskInstance, funcOfTask: FuncOfTask) => TaskInstance
  OnError: (this: TaskInstance, funcOfTask: FuncOfTask) => TaskInstance
  Sort: (this: TaskInstance, array: unknown[], compare?: CompareFunc) => TaskInstance
}

export interface TaskInstance extends TaskMethods {
  name: string
  callstack: FuncOfTask[]
  lastCallIndex: number
  oncePerFrame?: boolean
  currentCallLaterId?: string
  finally?: FuncOfTask
  onError?: FuncOfTask
  Error?: unknown
}

export interface TaskClass extends TaskMethods {
  New: (this: TaskClass, name?: string) => TaskInstance
}

export interface AsyncLib {
  jobs: JobsTable
  task: TaskClass
  BREAK: true
  log?: unknown
  Debug: LogFunc
  Warn: LogFunc
  frameTimeSeconds?: number
  Scheduler: (this: void) => void
  GetDebug: (this: AsyncLib) => boolean
  SetDebug: (this: AsyncLib, enabled: boolean) => void
  GetCpuLoad: (this: AsyncLib) => number
  SetLogToChat: (this: AsyncLib, enabled: boolean) => void
  GetLogToChat: (this: AsyncLib) => boolean
  GetCurrent: (this: AsyncLib) => TaskInstance | undefined
  Create: (this: AsyncLib, name?: string) => TaskInstance
  Call: (this: AsyncLib, funcOfTask: FuncOfTask) => TaskInstance
  For: (this: AsyncLib, p1: unknown, p2?: unknown, p3?: unknown) => TaskInstance
  While: (this: AsyncLib, func: ConditionFunc) => TaskInstance
  WaitUntil: (this: AsyncLib, func: WaitFunc) => TaskInstance
  Sort: (this: AsyncLib, array: unknown[], compare?: CompareFunc) => TaskInstance
  Slash: (this: void, ...args: unknown[]) => void
}

export interface AsyncSavedVarsTable {
  ASYNC_STALL_THRESHOLD?: number
}
