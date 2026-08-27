import { describe, expect, it } from "bun:test"
import { signS3Request } from "../sigv4"

describe("signS3Request", () => {
  it("emits a deterministic SigV4 Authorization header", () => {
    const headers = signS3Request({
      method: "GET",
      url: "http://s3.local:8333/agent-sessions/sessions/abc.jsonl",
      body: "",
      accessKey: "AK",
      secretKey: "SK",
      region: "us-east-1",
      now: new Date("2025-01-01T00:00:00Z"),
    })
    expect(headers.Authorization).toMatch(/^AWS4-HMAC-SHA256 Credential=AK\//)
    expect(headers.Authorization).toContain("SignedHeaders=host;x-amz-content-sha256;x-amz-date")
    expect(headers["x-amz-date"]).toBe("20250101T000000Z")
    expect(headers["x-amz-content-sha256"]).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    )
  })
})
