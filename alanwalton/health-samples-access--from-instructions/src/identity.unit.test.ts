import { describe, expect, test } from "bun:test"
import { instantMs, sampleIdentity } from "./identity"

const PHONE = {
  metric: "activeEnergy",
  sourceName: "Alan's Apple Watch",
  startedAt: "2024-01-13T07:00:00-08:00",
  endedAt: "2024-01-13T07:01:00-08:00",
}

describe("sampleIdentity — the same sample sent in each sender's shape", () => {
  test("collapses one instant spelled with an offset and spelled in UTC", () => {
    const asUtc = {
      ...PHONE,
      startedAt: "2024-01-13T15:00:00Z",
      endedAt: "2024-01-13T15:01:00Z",
    }
    expect(sampleIdentity(asUtc)).toBe(sampleIdentity(PHONE))
  })

  test("collapses an export's space-separated local time against the phone's ISO", () => {
    const asExport = {
      ...PHONE,
      startedAt: "2024-01-13 07:00:00 -0800",
      endedAt: "2024-01-13 07:01:00 -0800",
    }
    expect(sampleIdentity(asExport)).toBe(sampleIdentity(PHONE))
  })

  test("is stable across repeated derivation, which is what makes a replay a no-op", () => {
    expect(sampleIdentity(PHONE)).toBe(sampleIdentity({ ...PHONE }))
  })
})

describe("sampleIdentity — what it holds apart", () => {
  test("a different metric is a different sample", () => {
    expect(sampleIdentity({ ...PHONE, metric: "stepCount" })).not.toBe(sampleIdentity(PHONE))
  })

  test("a different source is a different sample", () => {
    expect(sampleIdentity({ ...PHONE, sourceName: "Alan's iPhone" })).not.toBe(
      sampleIdentity(PHONE)
    )
  })

  test("a different start instant is a different sample", () => {
    expect(sampleIdentity({ ...PHONE, startedAt: "2024-01-13T07:00:01-08:00" })).not.toBe(
      sampleIdentity(PHONE)
    )
  })

  test("a different end instant is a different sample", () => {
    expect(sampleIdentity({ ...PHONE, endedAt: "2024-01-13T07:02:00-08:00" })).not.toBe(
      sampleIdentity(PHONE)
    )
  })

  test("cannot be forged by a source name that swallows a field boundary", () => {
    const a = { ...PHONE, metric: "activeEnergy", sourceName: "Watch A" }
    const b = { ...PHONE, metric: "activeEnergy Watch", sourceName: "A" }
    expect(sampleIdentity(a)).not.toBe(sampleIdentity(b))
  })
})

describe("instantMs — refusing what it cannot place", () => {
  test("throws on an unparseable instant rather than returning a sentinel", () => {
    expect(() => instantMs("not an instant")).toThrow(/unparseable instant/)
  })

  test("reads an offset-bearing instant as the moment it names", () => {
    expect(instantMs("2024-01-13T07:00:00-08:00")).toBe(1_705_158_000_000)
  })
})
