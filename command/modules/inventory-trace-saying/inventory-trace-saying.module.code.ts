export function numSaid(value: number | undefined): string {
  return value === undefined ? "nil" : `${value}`
}
