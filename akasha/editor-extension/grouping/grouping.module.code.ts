export function gather(into: Map<string, string[]>, key: string, value: string): void {
  const at = into.get(key)
  if (at === undefined) into.set(key, [value])
  else at.push(value)
}
