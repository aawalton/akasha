import { asAsyncLib } from "akasha/temper/addon/pages/hud/temper-async/modules/async-casts/async-casts.module.code.ts"
import {
  ASYNC_DEFAULT_STALL_THRESHOLD,
  ASYNC_GLOBAL,
  VSYNC_FRAME_TIME_MS,
} from "akasha/temper/addon/pages/hud/temper-async/modules/async-constants/async-constants.module.code.ts"
import type {
  FuncOfTask,
  JobsTable,
  LogFunc,
  TaskInstance,
} from "akasha/temper/addon/pages/hud/temper-async/modules/async-types/async-types.module.code.ts"
import { LIB as DEBUG_LOGGER_API } from "akasha/temper/addon/pages/hud/temper-debug-logger/modules/debug-logger-state/debug-logger-state.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

export const EM = EVENT_MANAGER

const log = DEBUG_LOGGER_API.Create(ASYNC_GLOBAL)
const Debug: LogFunc = log !== undefined ? (message, ...args) => log.Debug(message, ...args) : df
export const Warn: LogFunc =
  log !== undefined ? (message, ...args) => log.Warn(message, ...args) : df

export const JOBS: JobsTable = {}

export const lib = asAsyncLib({
  jobs: JOBS,
  task: undefined,
  BREAK: true,
  log,
  Debug,
  Warn,
})

interface SchedulerState {
  current: TaskInstance | undefined
  call: FuncOfTask | undefined
  currentStackIndex: number
  running: boolean
  jobsDone: boolean
  debug: boolean
  logToChat: boolean
  frameTimeTarget: number
  spendTime: number
  nextFrameReduce: number
  lastStart: number
  cpuLoad: number
  asyncStallThreshold: number
}

export const S: SchedulerState = {
  current: undefined,
  call: undefined,
  currentStackIndex: 0,
  running: false,
  jobsDone: false,
  debug: false,
  logToChat: false,
  frameTimeTarget: VSYNC_FRAME_TIME_MS,
  spendTime: VSYNC_FRAME_TIME_MS,
  nextFrameReduce: 0,
  lastStart: GetFrameTimeSeconds(),
  cpuLoad: 0,
  asyncStallThreshold: ASYNC_DEFAULT_STALL_THRESHOLD,
}
