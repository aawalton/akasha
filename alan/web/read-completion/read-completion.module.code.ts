export function isCompletionAlreadySet(value: unknown): boolean {
  if (typeof value === "number") return Number.isFinite(value) && value > 0
  if (typeof value === "string") return value.trim() !== ""
  return false
}

export function selectCompletionWriteMode(isNativeShell: boolean): "offline" | "online" {
  return isNativeShell ? "offline" : "online"
}
