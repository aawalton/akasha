import { describe, expect, test } from "bun:test"
import { DEFAULT_VOICE_INFER_URL } from "./infer-endpoint"

describe("DEFAULT_VOICE_INFER_URL", () => {
  test("is the in-cluster voice-infer service DNS URL", () => {
    expect(DEFAULT_VOICE_INFER_URL).toBe("http://voice-infer.voice.svc.cluster.local:8080")
  })
})
