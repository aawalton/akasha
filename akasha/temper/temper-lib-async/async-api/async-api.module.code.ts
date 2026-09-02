import type { GlobalTable } from "../async-casts/async-casts.module.code.ts"

import {
  ASYNC_DEFAULT_STALL_THRESHOLD,
  ASYNC_MIN_STALL_THRESHOLD,
  UPPER_FPS_BOUND,
} from "../async-constants/async-constants.module.code.ts"
import { lib, S } from "../async-state/async-state.module.code.ts"
import { taskProto } from "../async-task-class/async-task-class.module.code.ts"
import type {
  CompareFunc,
  ConditionFunc,
  FuncOfTask,
  TaskInstance,
  WaitFunc,
} from "../async-types/async-types.module.code.ts"

lib.GetDebug = function (this: typeof lib): boolean {
  return S.debug
}
lib.SetDebug = function (this: typeof lib, enabled: boolean): undefined {
  S.debug = enabled
}
lib.GetCpuLoad = function (this: typeof lib): number {
  return zo_floor(S.cpuLoad * S.asyncStallThreshold * 100)
}
lib.SetLogToChat = function (this: typeof lib, enabled: boolean): undefined {
  S.logToChat = enabled
}
lib.GetLogToChat = function (this: typeof lib): boolean {
  return S.logToChat
}

lib.GetCurrent = function (this: typeof lib): TaskInstance | undefined {
  return S.current
}

lib.Create = function (this: typeof lib, name?: string): TaskInstance {
  return taskProto.New(name)
}

const Default = taskProto.New("*Default Task*")

function defaultTaskSentinel(this: void): never {
  error(
    "Not allowed on default task. Use your_lib_var:Create(optional_name) for an interruptible task context.",
    2
  )
}
Default.Cancel = defaultTaskSentinel
Default.Finally = defaultTaskSentinel
Default.OnError = defaultTaskSentinel

lib.Call = function (this: typeof lib, funcOfTask: FuncOfTask): TaskInstance {
  return (lib.GetCurrent() ?? Default).Call(funcOfTask)
}
lib.For = function (this: typeof lib, p1: unknown, p2?: unknown, p3?: unknown): TaskInstance {
  return (lib.GetCurrent() ?? Default).For(p1, p2, p3)
}
lib.While = function (this: typeof lib, func: ConditionFunc): TaskInstance {
  return (lib.GetCurrent() ?? Default).While(func)
}
lib.WaitUntil = function (this: typeof lib, func: WaitFunc): TaskInstance {
  return (lib.GetCurrent() ?? Default).WaitUntil(func)
}
lib.Sort = function (this: typeof lib, array: unknown[], compare?: CompareFunc): TaskInstance {
  return (lib.GetCurrent() ?? Default).Sort(array, compare)
}

lib.Slash = function (this: void, ...args: unknown[]): undefined {
  let allArgs = ""

  if (args.length > 0) {
    for (const value of args) {
      if (type(value) === "string") {
        allArgs = `${allArgs} ${value as string}`
      } else if (type(value) === "number") {
        allArgs = `${allArgs} ${tostring(value)}`
      }
    }
    allArgs = zo_strtrim(allArgs)
  }

  let command = ""
  let argValue: unknown
  for (const [word] of zo_strgmatch(allArgs, "%w+")) {
    if (command === "") {
      command = word
    } else {
      argValue = tonumber(word) ?? zo_strlower(word)
    }
  }
  command = zo_strlower(command)

  const sv = (globalThis as GlobalTable).AsyncSavedVars

  function d(this: void, text: string): undefined {
    CHAT_ROUTER.AddSystemMessage(text)
  }

  if (command !== "stall") {
    d("[LibAsync] Unknown command. Use /async stall <number> or /async stall default.")
    return
  }

  if (type(argValue) === "number") {
    const fps = argValue as number
    if (fps < ASYNC_MIN_STALL_THRESHOLD) {
      d(
        string.format(
          "[LibAsync] Invalid FPS value. The stall threshold must be at least %d FPS. Use /async stall <number>.",
          ASYNC_MIN_STALL_THRESHOLD
        )
      )
      return
    }
    if (fps > UPPER_FPS_BOUND) {
      d(
        string.format(
          "[LibAsync] Invalid FPS value. The stall threshold must be no greater than %d FPS. Use /async stall <number>.",
          UPPER_FPS_BOUND
        )
      )
      return
    }
    const adjustedFps = zo_min(UPPER_FPS_BOUND, zo_max(ASYNC_MIN_STALL_THRESHOLD, fps))
    if (sv !== undefined) {
      sv.ASYNC_STALL_THRESHOLD = adjustedFps
    }
    S.asyncStallThreshold = adjustedFps
    d(string.format("[LibAsync] Stall threshold set to %d FPS.", adjustedFps))
  } else if (type(argValue) === "string" && (argValue as string) === "default") {
    if (sv !== undefined) {
      sv.ASYNC_STALL_THRESHOLD = ASYNC_DEFAULT_STALL_THRESHOLD
    }
    S.asyncStallThreshold = ASYNC_DEFAULT_STALL_THRESHOLD
    d(
      string.format(
        "[LibAsync] Stall threshold reset to the default value of %d FPS.",
        ASYNC_DEFAULT_STALL_THRESHOLD
      )
    )
  } else {
    d("[LibAsync] Invalid argument. Use /async stall <number> or /async stall default.")
  }
}
