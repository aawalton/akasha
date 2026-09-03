export function __TS__StructuredClone(this: void, value: any): any {
  return cloneInternal(value, new Map())
}

function cloneInternal(this: void, value: any, memo: Map<any, any>): any {
  const t = type(value)
  if (t === "nil" || t === "boolean" || t === "number" || t === "string") return value
  if (t === "function") throw "structuredClone: functions cannot be cloned"
  if (t === "thread" || t === "userdata") {
    throw `structuredClone: ${t} values cannot be cloned`
  }

  const seen = memo.get(value)
  if (seen !== undefined) return seen

  if (value instanceof Date) {
    const cloned = new Date(value.getTime())
    memo.set(value, cloned)
    return cloned
  }
  if (value instanceof Map) {
    const cloned = new Map()
    memo.set(value, cloned)
    for (const [k, v] of value) {
      cloned.set(cloneInternal(k, memo), cloneInternal(v, memo))
    }
    return cloned
  }
  if (value instanceof Set) {
    const cloned = new Set()
    memo.set(value, cloned)
    for (const v of value) {
      cloned.add(cloneInternal(v, memo))
    }
    return cloned
  }

  if (getmetatable(value) !== undefined) {
    throw "structuredClone: instances of classes are not cloneable"
  }

  const cloned: any = {}
  memo.set(value, cloned)
  for (const [k, v] of pairs(value)) {
    cloned[k] = cloneInternal(v, memo)
  }
  return cloned
}
