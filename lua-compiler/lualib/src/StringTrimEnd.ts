export function __TS__StringTrimEnd(this: string): string {
  const [result] = string.gsub(this, "[%s\xA0\uFEFF]*$", "")
  return result
}
