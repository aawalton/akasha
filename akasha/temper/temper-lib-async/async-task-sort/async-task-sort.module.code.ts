import { luaTruthy } from "../async-lua-truthy/async-lua-truthy.module.code.ts"
import { taskProto } from "../async-task-class/async-task-class.module.code.ts"
import type { CompareFunc, TaskInstance } from "../async-types/async-types.module.code.ts"

function simpleCompare(this: void, a: unknown, b: unknown): boolean {
  return (a as number) < (b as number)
}

function get(array: unknown[], index: number): unknown {
  return rawget(array, index)
}

function swap(array: unknown[], i: number, j: number): undefined {
  const tmp = rawget(array, i)
  rawset(array, i, rawget(array, j))
  rawset(array, j, tmp)
}

function sort(
  this: void,
  innerTask: TaskInstance,
  array: unknown[],
  compare: CompareFunc
): undefined {
  function quicksort(this: void, left: number, right: number): undefined {
    if (right <= left) {
      return
    }
    if (right - left === 1) {
      if (!luaTruthy(compare(get(array, left), get(array, right)))) {
        swap(array, left, right)
      }
      return
    }

    const mid = zo_floor((left + right) / 2)
    if (luaTruthy(compare(get(array, right), get(array, left)))) {
      swap(array, left, right)
    }
    if (luaTruthy(compare(get(array, mid), get(array, left)))) {
      swap(array, left, mid)
    } else {
      if (luaTruthy(compare(get(array, right), get(array, mid)))) {
        swap(array, mid, right)
      }
    }

    if (right - left === 2) {
      return
    }

    const pivot = get(array, mid)
    swap(array, mid, right - 1)

    let i = left
    let j = right - 1
    innerTask.Call((): boolean | undefined => {
      do {
        i = i + 1
        if (i > right) {
          error("invalid order function for sorting")
        }
      } while (luaTruthy(compare(get(array, i), pivot)))

      do {
        j = j - 1
        if (j < left) {
          error("invalid order function for sorting")
        }
      } while (luaTruthy(compare(pivot, get(array, j))))

      if (j < i) {
        return undefined
      }
      swap(array, i, j)
      return true
    })

    innerTask.Then((innerTask2: TaskInstance): undefined => {
      swap(array, i, right - 1)

      if (i - left < right - i) {
        if (left < i - 1) {
          innerTask2
            .Call((): undefined => {
              quicksort(left, i - 1)
            })
            .Then((): undefined => {
              if (i + 1 < right) {
                innerTask2.Call((): undefined => {
                  quicksort(i + 1, right)
                })
              }
            })
        } else {
          if (i + 1 < right) {
            innerTask2.Call((): undefined => {
              quicksort(i + 1, right)
            })
          }
        }
      } else {
        if (i + 1 < right) {
          innerTask2
            .Call((): undefined => {
              quicksort(i + 1, right)
            })
            .Then((): undefined => {
              if (left < i - 1) {
                innerTask2.Call((): undefined => {
                  quicksort(left, i - 1)
                })
              }
            })
        } else {
          if (left < i - 1) {
            innerTask2.Call((): undefined => {
              quicksort(left, i - 1)
            })
          }
        }
      }
    })
  }

  quicksort(1, array.length)
}

taskProto.Sort = function (
  this: TaskInstance,
  array: unknown[],
  compare?: CompareFunc
): TaskInstance {
  return this.Then((innerTask: TaskInstance): undefined => {
    sort(innerTask, array, compare ?? simpleCompare)
  })
}
