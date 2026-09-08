import { RUNNING } from "./code-tests.module.code.ts"

export const PASSES =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(1) })\n'

export const FAILS =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(2) })\n'

export const MARKED =
  'import { expect, test } from "bun:test"\n' +
  `test("one", () => { expect(process.env["${RUNNING}"]).toBe("1") })\n`

export const BURNS =
  'import { test } from "bun:test"\n' +
  'test("one", () => { const until = Bun.nanoseconds() + 4e9\n' +
  "  while (Bun.nanoseconds() < until) {} })\n"

export const SETS = "globalThis.held = true\n"

export const NEEDS =
  'import { expect, test } from "bun:test"\n' +
  'test("one", () => { expect(globalThis.held).toBe(true) })\n'

export const UNDER = "/var/tmp/"

export function handing(held: Record<string, string>): (path: string) => Uint8Array | null {
  return (path: string): Uint8Array | null => {
    const body = held[path]
    return body === undefined ? null : new TextEncoder().encode(body)
  }
}
