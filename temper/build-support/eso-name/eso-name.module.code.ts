export function stripEsoNameSuffix(name: string): string {
  return name.replace(/\^[A-Za-z]+$/, "")
}
