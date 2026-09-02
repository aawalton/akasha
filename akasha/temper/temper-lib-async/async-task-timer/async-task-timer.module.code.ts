import { MIN_DELAY_FOR_ASYNC } from "../async-constants/async-constants.module.code.ts"
import { luaTruthy } from "../async-lua-truthy/async-lua-truthy.module.code.ts"
import { EM } from "../async-state/async-state.module.code.ts"
import { taskProto } from "../async-task-class/async-task-class.module.code.ts"
import type { FuncOfTask, TaskInstance, WaitFunc } from "../async-types/async-types.module.code.ts"

taskProto.Delay = function (
  this: TaskInstance,
  delay: number,
  funcOfTask: FuncOfTask
): TaskInstance {
  this.StopTimer()
  if (delay < MIN_DELAY_FOR_ASYNC) {
    return this.Call(funcOfTask)
  }
  this.Suspend()

  const id = `AsyncDelay${tostring(this)}`
  this.currentCallLaterId = id

  EM.RegisterForUpdate(id, delay, (): undefined => {
    EM.UnregisterForUpdate(id)
    this.currentCallLaterId = undefined
    this.Call(funcOfTask)
  })
  return this
}

taskProto.ThenDelay = function (
  this: TaskInstance,
  delay: number,
  funcOfTask: FuncOfTask
): TaskInstance {
  this.Then((innerTask: TaskInstance): undefined => {
    innerTask.Delay(delay, funcOfTask)
  })
  return this
}

taskProto.WaitUntil = function (this: TaskInstance, funcOfTask: WaitFunc): TaskInstance {
  this.Then((innerTask: TaskInstance): boolean => {
    innerTask.oncePerFrame = !luaTruthy(funcOfTask(innerTask))
    return innerTask.oncePerFrame
  })
  return this.Resume()
}

taskProto.StopTimer = function (this: TaskInstance): TaskInstance {
  if (this.currentCallLaterId !== undefined) {
    EM.UnregisterForUpdate(this.currentCallLaterId)
    this.currentCallLaterId = undefined
  }
  return this
}
