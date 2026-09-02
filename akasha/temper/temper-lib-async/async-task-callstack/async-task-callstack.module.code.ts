import { S } from "../async-state/async-state.module.code.ts"
import { taskProto } from "../async-task-class/async-task-class.module.code.ts"
import type { FuncOfTask, TaskInstance } from "../async-types/async-types.module.code.ts"

taskProto.Call = function (this: TaskInstance, funcOfTask: FuncOfTask): TaskInstance {
  this.lastCallIndex = this.lastCallIndex + 1
  if (S.current === this) {
    this.callstack.splice(this.lastCallIndex - 1, 0, funcOfTask)
  } else {
    this.callstack.unshift(funcOfTask)
  }
  return this.Resume()
}

taskProto.Then = function (this: TaskInstance, funcOfTask: FuncOfTask): TaskInstance {
  if (S.current === this) {
    if (this.lastCallIndex <= S.currentStackIndex) {
      return this.Call(funcOfTask)
    }
    this.callstack.splice(this.lastCallIndex - 1, 0, funcOfTask)
  } else {
    if (this.lastCallIndex === 0) {
      return this.Call(funcOfTask)
    }
    this.callstack.unshift(funcOfTask)
    this.lastCallIndex = this.lastCallIndex + 1
  }
  return this
}
