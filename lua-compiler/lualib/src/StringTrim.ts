export function __TS__StringTrim(this: string): string {
  const [result] = string.gsub(this, "^[%s\xA0\uFEFF]*(.-)[%s\xA0\uFEFF]*$", "%1")
  return result
}
