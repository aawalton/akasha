import { describe, expect, test } from "bun:test"
import { CentroidSchema, ECAPA_CENTROID_DIM, VoiceSpecSchema } from "./voice-spec"

const SHA = "9a2bb97bf4897b1e5b2594a43f579bad4f084e6a7654dba1517a2ed330cf9e7d"

const validDesigned = {
  slug: "example",
  value: "Example",
  archetype: "warm",
  lane: "V",
  sourceKind: "designed",
  instruct: "warm, composed",
  clonerModel: "moss",
  refText: "a transcript",
  reference: { wavPath: "packages/x/ref.wav", sha256: SHA },
  centroid: { kind: "path", path: "packages/x/c.json" },
} as const

const validReal = {
  slug: "example-real",
  value: "Example",
  archetype: "young",
  lane: "R",
  sourceKind: "real",
  clonerModel: "moss",
  refText: "a transcript",
  reference: { wavPath: "packages/x/ref.wav", sha256: SHA },
  centroid: { kind: "inline", values: Array.from({ length: ECAPA_CENTROID_DIM }, () => 0) },
} as const

describe("VoiceSpecSchema", () => {
  test("accepts a valid designed spec (lane V)", () => {
    expect(VoiceSpecSchema.parse(validDesigned).slug).toBe("example")
  })

  test("accepts a valid real spec (lane R, inline centroid)", () => {
    expect(VoiceSpecSchema.parse(validReal).sourceKind).toBe("real")
  })

  test("rejects a designed spec missing instruct", () => {
    const { instruct, ...rest } = validDesigned
    expect(() => VoiceSpecSchema.parse(rest)).toThrow()
  })

  test("rejects lane R paired with sourceKind designed", () => {
    expect(() => VoiceSpecSchema.parse({ ...validDesigned, lane: "R" })).toThrow()
  })

  test("rejects lane V paired with sourceKind real", () => {
    expect(() => VoiceSpecSchema.parse({ ...validReal, lane: "V" })).toThrow()
  })

  test("rejects an unknown extra key (strict)", () => {
    expect(() => VoiceSpecSchema.parse({ ...validDesigned, extra: 1 })).toThrow()
  })

  test("rejects a malformed sha256", () => {
    const bad = { ...validDesigned, reference: { wavPath: "packages/x/ref.wav", sha256: "nope" } }
    expect(() => VoiceSpecSchema.parse(bad)).toThrow()
  })

  test("rejects an absolute reference path", () => {
    const bad = { ...validDesigned, reference: { wavPath: "/abs/ref.wav", sha256: SHA } }
    expect(() => VoiceSpecSchema.parse(bad)).toThrow()
  })

  test("rejects a reference path that is not a .wav", () => {
    const bad = { ...validDesigned, reference: { wavPath: "packages/x/ref.mp3", sha256: SHA } }
    expect(() => VoiceSpecSchema.parse(bad)).toThrow()
  })

  test("accepts an optional postProduction stage", () => {
    const ok = {
      ...validDesigned,
      postProduction: { filterComplex: "[0:a]volume=1.0[out]", outLabel: "[out]" },
    }
    expect(VoiceSpecSchema.parse(ok).postProduction?.outLabel).toBe("[out]")
  })

  test("omitting postProduction is valid (most personas)", () => {
    expect(VoiceSpecSchema.parse(validDesigned).postProduction).toBeUndefined()
  })

  test("rejects a postProduction outLabel that is not a pad label", () => {
    const bad = {
      ...validDesigned,
      postProduction: { filterComplex: "[0:a]volume=1.0[out]", outLabel: "out" },
    }
    expect(() => VoiceSpecSchema.parse(bad)).toThrow()
  })

  test("rejects an unknown extra key inside postProduction (strict)", () => {
    const bad = {
      ...validDesigned,
      postProduction: { filterComplex: "[0:a]volume=1.0[out]", outLabel: "[out]", extra: 1 },
    }
    expect(() => VoiceSpecSchema.parse(bad)).toThrow()
  })
})

describe("CentroidSchema", () => {
  test("rejects an inline centroid of the wrong dimensionality", () => {
    const bad = { kind: "inline", values: Array.from({ length: 191 }, () => 0) }
    expect(() => CentroidSchema.parse(bad)).toThrow()
  })

  test("accepts an inline centroid of exactly the ECAPA dimensionality", () => {
    const ok = { kind: "inline", values: Array.from({ length: ECAPA_CENTROID_DIM }, () => 0) }
    expect(CentroidSchema.parse(ok).kind).toBe("inline")
  })
})
