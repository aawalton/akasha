import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { uncommittedIn } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import {
  beating,
  beatKept,
  beatOn,
  keepBeat,
  WORKED_AT,
  windowMsIn,
} from "./service-beating.module.code.ts"

const PAGE = "pages/held-service.workstation-service.ts"

const AT = "2026-09-10T18:00:00.000Z"

const NOW = new Date("2026-09-10T18:10:00.000Z")

function rooted(): string {
  const root = mkdtempSync("/var/tmp/service-beating-")
  mkdirSync(join(root, "pages"), { recursive: true })
  writeFileSync(join(root, PAGE), 'export const held = { slug: "held" } as const\n')
  return root
}

test("the key a moment is kept under is named here alone", () => {
  expect(WORKED_AT).toBe("workedAt")
  expect(beatOn({ [WORKED_AT]: AT })).toBe(AT)
  expect(beatOn({ [WORKED_AT]: 7 })).toBe(null)
})

test("a service that has landed no round at all carries no moment", () => {
  expect(beatOn(null)).toBe(null)
  expect(beatOn({})).toBe(null)
  expect(beating(null, NOW, 60_000)).toEqual({ beat: "none" })
})

test("a moment inside the window is kept", () => {
  expect(beating(AT, NOW, 15 * 60_000)).toEqual({ beat: "kept", at: AT, agedMs: 600_000 })
})

test("a moment older than the window is behind", () => {
  expect(beating(AT, NOW, 5 * 60_000)).toEqual({ beat: "behind", at: AT, agedMs: 600_000 })
})

test("a moment as old as the window is behind rather than kept", () => {
  expect(beating(AT, NOW, 600_000).beat).toBe("behind")
})

test("a moment that is no instant is read as no moment rather than as a recent one", () => {
  expect(beating("lately", NOW, 60_000)).toEqual({ beat: "unreadable", at: "lately" })
})

test("a window is the seconds a service states, and nothing else is a window", () => {
  expect(windowMsIn(900)).toBe(900_000)
  expect(windowMsIn(undefined)).toBe(null)
  expect(windowMsIn(0)).toBe(null)
  expect(windowMsIn(-1)).toBe(null)
  expect(windowMsIn(Number.NaN)).toBe(null)
  expect(windowMsIn("900")).toBe(null)
})

test("a moment written beside a service page is read back off that page", () => {
  const root = rooted()
  try {
    expect(beatKept(root, PAGE)).toBe(null)
    keepBeat(root, PAGE, new Date(AT))
    expect(uncommittedIn(root, PAGE)).toEqual({ [WORKED_AT]: AT })
    expect(beatKept(root, PAGE)).toBe(AT)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a moment replaces the moment before it and leaves the rest of the values", () => {
  const root = rooted()
  try {
    keepBeat(root, PAGE, new Date(AT))
    keepBeat(root, PAGE, new Date("2026-09-10T18:05:00.000Z"))
    expect(beatKept(root, PAGE)).toBe("2026-09-10T18:05:00.000Z")
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
