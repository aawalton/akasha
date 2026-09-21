export function luaTruthy(this: void, value: unknown): boolean {
  return value !== undefined && value !== false
}
