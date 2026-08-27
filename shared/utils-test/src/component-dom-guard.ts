export function componentTestMissingDom(argv: readonly string[], hasDocument: boolean): boolean {
  if (hasDocument) return false
  return argv.some((arg) => arg.includes(".component.test."))
}
