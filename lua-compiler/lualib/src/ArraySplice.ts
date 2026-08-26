import { __TS__CountVarargs } from "./CountVarargs"

type LuaTableView<T> = LuaTable<number, T | undefined>
function LuaTableView<T>(arr: unknown): LuaTableView<T> {
  return arr as LuaTableView<T>
}

function asNumber(x: unknown): number {
  return x as number
}

export function __TS__ArraySplice<T>(this: T[], ...args: any[]): T[] {
  const len = this.length
  const items = LuaTableView<T>(this)

  const actualArgumentCount = __TS__CountVarargs(...args)
  let start = asNumber(args[0])
  const deleteCount = asNumber(args[1])

  if (start < 0) {
    start = len + start
    if (start < 0) {
      start = 0
    }
  } else if (start > len) {
    start = len
  }

  let itemCount = actualArgumentCount - 2
  if (itemCount < 0) {
    itemCount = 0
  }

  let actualDeleteCount: number

  if (actualArgumentCount === 0) {
    actualDeleteCount = 0
  } else if (actualArgumentCount === 1) {
    actualDeleteCount = len - start
  } else {
    actualDeleteCount = deleteCount ?? 0
    if (actualDeleteCount < 0) {
      actualDeleteCount = 0
    }
    if (actualDeleteCount > len - start) {
      actualDeleteCount = len - start
    }
  }

  const out: T[] = []

  for (const k of $range(1, actualDeleteCount)) {
    const from = start + k

    if (this[from - 1] !== undefined) {
      out[k - 1] = this[from - 1]
    }
  }

  if (itemCount < actualDeleteCount) {
    for (const k of $range(start + 1, len - actualDeleteCount)) {
      const from = k + actualDeleteCount
      const to = k + itemCount

      if (this[from - 1]) {
        this[to - 1] = this[from - 1]
      } else {
        items.set(to, undefined)
      }
    }
    for (const k of $range(len - actualDeleteCount + itemCount + 1, len)) {
      items.set(k, undefined)
    }
  } else if (itemCount > actualDeleteCount) {
    for (const k of $range(len - actualDeleteCount, start + 1, -1)) {
      const from = k + actualDeleteCount
      const to = k + itemCount

      if (this[from - 1]) {
        this[to - 1] = this[from - 1]
      } else {
        items.set(to, undefined)
      }
    }
  }

  let j = start + 1
  for (const i of $range(3, actualArgumentCount)) {
    this[j - 1] = args[i - 1]
    j++
  }

  for (const k of $range(this.length, len - actualDeleteCount + itemCount + 1, -1)) {
    items.set(k, undefined)
  }

  return out
}
