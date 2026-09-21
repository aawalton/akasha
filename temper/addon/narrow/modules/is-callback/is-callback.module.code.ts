export function isCallback<T>(
  value: T | ((this: void, ...args: unknown[]) => T)
): value is (this: void, ...args: unknown[]) => T {
  return type(value) === "function"
}
