export function shouldPersistMedia(
  operation: string,
  persist: boolean | undefined,
  operations: ReadonlySet<string>
): boolean {
  if (persist === false) return false
  return operations.has(operation)
}
