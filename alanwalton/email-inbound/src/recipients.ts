export function matchAgentChannel(
  channels: ReadonlyMap<string, string>,
  ...headerValues: readonly (string | undefined)[]
): string | undefined {
  const haystack = headerValues
    .filter((value): value is string => value !== undefined && value.length > 0)
    .join(", ")
    .toLowerCase()
  if (haystack.length === 0) return undefined
  for (const [address, handle] of channels) {
    if (haystack.includes(address)) return handle
  }
  return undefined
}
