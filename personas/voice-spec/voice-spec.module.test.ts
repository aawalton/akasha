import { describe, expect, test } from "bun:test"
import { ECAPA_CENTROID_DIM, VoiceSpecSchema } from "./voice-spec.module.code.ts"

const CENTROID = {
  kind: "inline" as const,
  values: Array.from({ length: ECAPA_CENTROID_DIM }, () => 0),
}

const SHARED = {
  slug: "aria",
  value: "warmth",
  archetype: "warm" as const,
  clonerModel: "cloner-1",
  refText: "She speaks.",
  reference: { wavPath: "voices/aria.wav", sha256: "a".repeat(64) },
  centroid: CENTROID,
}

const REAL_SPEC = { sourceKind: "real" as const, lane: "R" as const, ...SHARED }
const DESIGNED_SPEC = {
  sourceKind: "designed" as const,
  lane: "V" as const,
  instruct: "Warm and low.",
  ...SHARED,
}

describe("VoiceSpecSchema", () => {
  test("takes a real voice in lane R", () => {
    expect(VoiceSpecSchema.safeParse(REAL_SPEC).success).toBe(true)
  })

  test("takes a designed voice in lane V", () => {
    expect(VoiceSpecSchema.safeParse(DESIGNED_SPEC).success).toBe(true)
  })

  test("refuses a real voice in any lane but R", () => {
    expect(VoiceSpecSchema.safeParse({ ...REAL_SPEC, lane: "V" }).success).toBe(false)
  })

  test("refuses a designed voice in lane R", () => {
    expect(VoiceSpecSchema.safeParse({ ...DESIGNED_SPEC, lane: "R" }).success).toBe(false)
  })

  test("refuses a designed voice carrying no instruction", () => {
    const { instruct, ...withoutInstruct } = DESIGNED_SPEC
    expect(instruct.length).toBeGreaterThan(0)
    expect(VoiceSpecSchema.safeParse(withoutInstruct).success).toBe(false)
  })

  test("refuses a reference path leaving the repo", () => {
    const spec = { ...REAL_SPEC, reference: { ...SHARED.reference, wavPath: "/etc/aria.wav" } }
    expect(VoiceSpecSchema.safeParse(spec).success).toBe(false)
  })

  test("refuses a reference path climbing out of the repo", () => {
    const spec = { ...REAL_SPEC, reference: { ...SHARED.reference, wavPath: "../aria.wav" } }
    expect(VoiceSpecSchema.safeParse(spec).success).toBe(false)
  })

  test("refuses a reference clip that is not a wav", () => {
    const spec = { ...REAL_SPEC, reference: { ...SHARED.reference, wavPath: "voices/aria.mp3" } }
    expect(VoiceSpecSchema.safeParse(spec).success).toBe(false)
  })

  test("refuses a centroid of the wrong width", () => {
    const spec = { ...REAL_SPEC, centroid: { kind: "inline" as const, values: [0, 1] } }
    expect(VoiceSpecSchema.safeParse(spec).success).toBe(false)
  })

  test("takes a centroid held in a json sidecar", () => {
    const spec = { ...REAL_SPEC, centroid: { kind: "path" as const, path: "voices/aria.json" } }
    expect(VoiceSpecSchema.safeParse(spec).success).toBe(true)
  })

  test("refuses a field the shape does not name", () => {
    expect(VoiceSpecSchema.safeParse({ ...REAL_SPEC, mood: "bright" }).success).toBe(false)
  })
})
