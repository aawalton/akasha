export function entryRowsIn(content: string | null): readonly string[] {
  if (content === null) return []
  return content.split("\n").filter((one) => one.trim() !== "")
}
