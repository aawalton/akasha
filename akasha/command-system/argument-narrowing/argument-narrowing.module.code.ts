import { fail } from "../command-failing/command-failing.module.code.ts"

export type Narrow<T> = (value: unknown, path: string) => T

export function obj(value: unknown, path: string): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`\`${path}\` is not an object`)
  }
  return value as Record<string, unknown>
}

export function arr(value: unknown, path: string): readonly unknown[] {
  if (!Array.isArray(value)) fail(`\`${path}\` is not an array`)
  return value
}

export function num(value: unknown, path: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) fail(`\`${path}\` is not a number`)
  return value
}

export function bool(value: unknown, path: string): boolean {
  if (typeof value !== "boolean") fail(`\`${path}\` is not a boolean`)
  return value
}

export function str(value: unknown, path: string): string {
  if (typeof value !== "string") fail(`\`${path}\` is not a string`)
  return value
}

export function oneOf<T extends string>(value: unknown, path: string, allowed: readonly T[]): T {
  const text = str(value, path)
  if (!(allowed as readonly string[]).includes(text)) {
    fail(`\`${path}\` is \`${text}\`, which is none of ${allowed.join(", ")}`)
  }
  return text as T
}

export function maybe<T>(value: unknown, path: string, parse: Narrow<T>): T | null {
  return value === undefined || value === null ? null : parse(value, path)
}
