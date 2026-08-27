import { describe, expect, test } from "bun:test"
import type { GmContext } from "../gm-context-schema"
import { buildDoctrinePackUpdate, type GmDoctrinePack, withDoctrinePack } from "../gm-doctrine-pack"
import { FIXTURE_PACK } from "./fixtures"

describe("withDoctrinePack — tally catalog (#15278)", () => {
  const PACK_WITH_CATALOG: GmDoctrinePack = {
    ...FIXTURE_PACK,
    doctrineVersion: 19,
    tallyCatalog: {
      catalogVersion: 19,
      patterns: [
        {
          id: "unhurried",
          family: "template",
          regex: "\\bunhurried\\b",
          flags: "gi",
          provenance: "p",
        },
      ],
    },
  }

  test("the pack's tallyCatalog is copied wholesale into the seeded context", () => {
    const seeded = withDoctrinePack(undefined, PACK_WITH_CATALOG)
    expect(seeded.tallyCatalog).toEqual(PACK_WITH_CATALOG.tallyCatalog)
  })

  test("refresh REPLACES a stale catalog wholesale", () => {
    const stale: GmContext = {
      policies: [],
      tallyCatalog: {
        catalogVersion: 1,
        patterns: [{ id: "retired", family: "template", regex: "x", provenance: "old" }],
      },
    }
    const refreshed = withDoctrinePack(stale, PACK_WITH_CATALOG)
    expect(refreshed.tallyCatalog).toEqual(PACK_WITH_CATALOG.tallyCatalog)
  })

  test("a pack WITHOUT a catalog leaves the gmContext key off entirely (opt-in, byte-identical)", () => {
    const seeded = withDoctrinePack(undefined, FIXTURE_PACK)
    expect("tallyCatalog" in seeded).toBe(false)
  })

  test("a tallyCatalog change WITHOUT a version bump is rejected by the gate", () => {
    const r = buildDoctrinePackUpdate(PACK_WITH_CATALOG, {
      tallyCatalog: {
        catalogVersion: 19,
        patterns: [{ id: "new", family: "template", regex: "y", provenance: "p" }],
      },
    })
    expect(r.ok).toBe(false)
  })

  test("a tallyCatalog change WITH a version bump is accepted and flags contentChanged", () => {
    const r = buildDoctrinePackUpdate(PACK_WITH_CATALOG, {
      doctrineVersion: 20,
      tallyCatalog: {
        catalogVersion: 20,
        patterns: [{ id: "new", family: "template", regex: "y", provenance: "p" }],
      },
    })
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.contentChanged).toBe(true)
      expect(r.pack.tallyCatalog?.catalogVersion).toBe(20)
    }
  })
})
