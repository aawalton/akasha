import { describe, expect, test } from "bun:test"
import { type CutFingerprint, compareCutStatus } from "./cut-fingerprint"

const lastCut: CutFingerprint = {
  buildNumber: 42,
  mainSha: "main-sha-abc",
  shellSha: "shell-sha-abc",
  buildInputTreeHash: "build-input-hash-1",
  cutAt: "2026-07-11T00:00:00.000Z",
}

describe("compareCutStatus", () => {
  test("last null → owed, changed, not predates-basis, no lastCut", () => {
    const status = compareCutStatus(null, {
      mainSha: "main-sha-abc",
      buildInputTreeHash: "build-input-hash-1",
    })
    expect(status.owed).toBe(true)
    expect(status.buildInputChanged).toBe(true)
    expect(status.predatesBasis).toBe(false)
    expect(status.lastCut).toBeNull()
  })

  test("identical hash → not owed, nothing changed, lastCut echoed", () => {
    const status = compareCutStatus(lastCut, {
      mainSha: lastCut.mainSha,
      buildInputTreeHash: "build-input-hash-1",
    })
    expect(status.owed).toBe(false)
    expect(status.buildInputChanged).toBe(false)
    expect(status.predatesBasis).toBe(false)
    expect(status.lastCut).toBe(lastCut)
  })

  test("build-input hash differs → owed, changed", () => {
    const status = compareCutStatus(lastCut, {
      mainSha: lastCut.mainSha,
      buildInputTreeHash: "build-input-hash-2",
    })
    expect(status.owed).toBe(true)
    expect(status.buildInputChanged).toBe(true)
    expect(status.predatesBasis).toBe(false)
    expect(status.lastCut).toBe(lastCut)
  })

  test("legacy row (null hash) → owed, predates-basis, regardless of current hash", () => {
    const legacy: CutFingerprint = { ...lastCut, buildInputTreeHash: null }
    const status = compareCutStatus(legacy, {
      mainSha: legacy.mainSha,
      buildInputTreeHash: "anything",
    })
    expect(status.owed).toBe(true)
    expect(status.predatesBasis).toBe(true)
    expect(status.buildInputChanged).toBe(true)
    expect(status.lastCut).toBe(legacy)
  })
})
