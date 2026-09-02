import { asAsyncLib } from "../async-casts/async-casts.module.code.ts"
import {
  ASYNC_DEFAULT_STALL_THRESHOLD,
  MAJOR,
  VSYNC_FRAME_TIME_MS,
} from "../async-constants/async-constants.module.code.ts"
import type {
  FuncOfTask,
  JobsTable,
  LogFunc,
  TaskInstance,
} from "../async-types/async-types.module.code.ts"

export const EM = EVENT_MANAGER

const log = LibDebugLogger !== undefined ? LibDebugLogger(MAJOR) : undefined
export const Debug: LogFunc =
  log !== undefined ? (message, ...args) => log.Debug(message, ...args) : df
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
