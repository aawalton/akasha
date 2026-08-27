import { describe, expect, test } from "bun:test"
import { buildDoctrinePackUpdate } from "../gm-doctrine-pack"
import { FIXTURE_PACK } from "./fixtures"

describe("buildDoctrinePackUpdate — merge + version-bump gate", () => {
  test("an empty patch is a no-op: ok, no content change, pack unchanged", () => {
    const r = buildDoctrinePackUpdate(FIXTURE_PACK, {})
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.contentChanged).toBe(false)
      expect(r.pack).toEqual(FIXTURE_PACK)
    }
  })

  test("a version-only bump (no content change) is allowed", () => {
    const r = buildDoctrinePackUpdate(FIXTURE_PACK, { doctrineVersion: 7 })
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.contentChanged).toBe(false)
      expect(r.pack.doctrineVersion).toBe(7)
    }
  })

  test("a policies change WITH a version bump is accepted and flags contentChanged", () => {
    const r = buildDoctrinePackUpdate(FIXTURE_PACK, {
      doctrineVersion: 7,
      policies: [{ id: "doctrine:alpha", title: "Alpha v2", bands: ["new"] }],
    })
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.contentChanged).toBe(true)
      expect(r.pack.policies[0]?.title).toBe("Alpha v2")
    }
  })

  test("a policies change WITHOUT a version bump is rejected by the gate", () => {
    const r = buildDoctrinePackUpdate(FIXTURE_PACK, {
      policies: [{ id: "doctrine:alpha", title: "Alpha v2", bands: ["new"] }],
    })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.error).toContain("doctrineVersion")
  })

  test("a content change with a LOWER version is rejected", () => {
    const r = buildDoctrinePackUpdate(FIXTURE_PACK, {
      doctrineVersion: 5,
      sheetTemplate: { standards: [] },
    })
    expect(r.ok).toBe(false)
  })

  test("a sheetTemplate change without a version bump is rejected", () => {
    const r = buildDoctrinePackUpdate(FIXTURE_PACK, { sheetTemplate: { standards: [] } })
    expect(r.ok).toBe(false)
  })

  test("an unknown patch key fails loud (invalid patch, not silent no-op)", () => {
    const r = buildDoctrinePackUpdate(FIXTURE_PACK, { policiez: [] })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.error).toContain("invalid patch")
  })

  test("policy key-order does not spoof a content change (canonical compare)", () => {
    const reordered = {
      bands: ["a1", "a2"],
      title: "Alpha",
      id: "doctrine:alpha",
      description: "a",
    }
    const r = buildDoctrinePackUpdate(FIXTURE_PACK, {
      policies: [reordered, { id: "doctrine:beta", title: "Beta", bands: [] }],
    })
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.contentChanged).toBe(false)
  })
})
