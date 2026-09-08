import { describe, expect, test } from "bun:test"
import { decideStaleness } from "./sim-www-stage.module.code.ts"

const WWW = "/repo/native-shell/alanwalton/www"
const SRC = "/repo/packages/alanwalton/web"

describe("decideStaleness", () => {
  test("absent staged www ⇒ stale, naming the directory it looked in", () => {
    const d = decideStaleness({
      stagedWwwMtimeMs: null,
      newestSourceMtimeMs: 1_000,
      wwwDir: WWW,
      sourceRoot: SRC,
    })
    expect(d.stale).toBe(true)
    expect(d.message).toContain("no staged www")
    expect(d.message).toContain(WWW)
  })

  test("unreadable source tree ⇒ stale (safe bias)", () => {
    const d = decideStaleness({
      stagedWwwMtimeMs: 2_000,
      newestSourceMtimeMs: null,
      wwwDir: WWW,
      sourceRoot: SRC,
    })
    expect(d.stale).toBe(true)
    expect(d.message).toContain(SRC)
  })

  test("source newer than staged www ⇒ stale, names BOTH timestamps", () => {
    const wwwMs = Date.parse("2026-07-17T00:56:00.000Z")
    const srcMs = Date.parse("2026-07-17T04:00:00.000Z")
    const d = decideStaleness({
      stagedWwwMtimeMs: wwwMs,
      newestSourceMtimeMs: srcMs,
      wwwDir: WWW,
      sourceRoot: SRC,
    })
    expect(d.stale).toBe(true)
    expect(d.message).toContain("2026-07-17T00:56:00.000Z")
    expect(d.message).toContain("2026-07-17T04:00:00.000Z")
    expect(d.message).toContain("STALE")
  })

  test("staged www newer than source ⇒ fresh", () => {
    const d = decideStaleness({
      stagedWwwMtimeMs: 5_000,
      newestSourceMtimeMs: 4_000,
      wwwDir: WWW,
      sourceRoot: SRC,
    })
    expect(d.stale).toBe(false)
  })

  test("equal mtimes ⇒ fresh (not strictly older)", () => {
    const d = decideStaleness({
      stagedWwwMtimeMs: 4_000,
      newestSourceMtimeMs: 4_000,
      wwwDir: WWW,
      sourceRoot: SRC,
    })
    expect(d.stale).toBe(false)
  })
})
