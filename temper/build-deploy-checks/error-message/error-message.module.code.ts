export function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === "string") return err
  try {
    return String(err)
  } catch {
    return "<unrenderable error>"
  }
}

export function errnoCode(err: unknown): string | undefined {
  if (err === null || typeof err !== "object" || !("code" in err)) return undefined
  const { code } = err
  return typeof code === "string" ? code : undefined
}
