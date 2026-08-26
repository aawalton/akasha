/** @noSelfInFile */
type StringCaptures = string[]
function StringCaptures(c: unknown[]): StringCaptures {
  return c as StringCaptures
}

export function __TS__Match(s: string, pattern: string, init?: number): LuaMultiReturn<string[]> {
  const [start, end, ...captures] = string.find(s, pattern, init)
  if (start === undefined || end === undefined) {
    return $multi()
  } else if (captures.length <= 0) {
    return $multi(s.slice(start - 1, end))
  } else {
    return $multi(...StringCaptures(captures))
  }
}
