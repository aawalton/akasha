export function __TS__NumberIsFinite(this: void, value: unknown): value is number {
  return typeof value === "number" && value === value && value !== Infinity && value !== -Infinity
}
