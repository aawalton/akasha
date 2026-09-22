import { asTaskInstance } from "akasha/temper/addon/pages/temper-core/temper-async/modules/async-casts/async-casts.module.code.ts"
import {
  JOBS,
  lib,
  S,
} from "akasha/temper/addon/pages/temper-core/temper-async/modules/async-state/async-state.module.code.ts"
import type {
  FuncOfTask,
  TaskClass,
  TaskInstance,
} from "akasha/temper/addon/pages/temper-core/temper-async/modules/async-types/async-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

export const taskProto: TaskClass = ZO_InitializingCallbackObject.Subclass<TaskClass>()
lib.task = taskProto

taskProto.New = function (this: TaskClass, name?: string): TaskInstance {
  const instance = asTaskInstance(ZO_InitializingCallbackObject.New<TaskInstance>(this))
  instance.name = name ?? tostring(instance)
  instance.Initialize()
  return instance
}

taskProto.Initialize = function (this: TaskInstance): undefined {
  this.callstack = []
  this.lastCallIndex = 0
}

taskProto.Resume = function (this: TaskInstance): TaskInstance {
  S.running = true
  JOBS[this.name] = this
  return this
}

taskProto.Suspend = function (this: TaskInstance): TaskInstance {
  JOBS[this.name] = undefined
  return this
}

taskProto.Cancel = function (this: TaskInstance): TaskInstance {
  ZO_ClearNumericallyIndexedTable(this.callstack)
  this.lastCallIndex = 0
  if (JOBS[this.name] !== undefined) {
    if (this.finally === undefined) {
      JOBS[this.name] = undefined
    }
  }
  return this
}

taskProto.Finally = function (this: TaskInstance, funcOfTask: FuncOfTask): TaskInstance {
  this.finally = funcOfTask
  return this
}

taskProto.OnError = function (this: TaskInstance, funcOfTask: FuncOfTask): TaskInstance {
  this.onError = funcOfTask
  return this
}
