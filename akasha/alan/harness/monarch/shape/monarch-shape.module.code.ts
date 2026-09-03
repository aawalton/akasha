export type Shape = Record<string, unknown>

function bad(path: string, expected: string, got: unknown): never {
  const seen = got === null ? "null" : Array.isArray(got) ? "an array" : typeof got
  throw new Error(`${path}: expected ${expected}, got ${seen}`)
}

export function object(value: unknown, path: string): Shape {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    bad(path, "an object", value)
  }
  return value as Shape
}

export function array(value: unknown, path: string): readonly unknown[] {
  if (!Array.isArray(value)) bad(path, "an array", value)
  return value
}

export function str(value: unknown, path: string): string {
  if (typeof value !== "string") bad(path, "a string", value)
  return value
}

export function num(value: unknown, path: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) bad(path, "a number", value)
  return value
}

export function bool(value: unknown, path: string): boolean {
  if (typeof value !== "boolean") bad(path, "a boolean", value)
  return value
}

export function optional<T>(
  value: unknown,
  path: string,
  read: (v: unknown, p: string) => T
): T | null {
  return value === undefined || value === null ? null : read(value, path)
}
