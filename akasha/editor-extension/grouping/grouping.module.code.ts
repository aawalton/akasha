export function gather(into: Map<string, string[]>, key: string, value: string): undefined {
  const at = into.get(key)
  if (at === undefined) into.set(key, [value])
  else at.push(value)
}
