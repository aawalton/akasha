import { describe, expect, it } from "bun:test"
import { type MediaTokenScope, mintMediaToken, verifyMediaToken } from "./media-token"

const SECRET = "media-token-unit-secret-0123456789abcdef"
const SCOPE: MediaTokenScope = {
  pageId: "019ea3a3-a93b-7646-9058-1d4c02ac2e4c",
  medium: "audio",
  variant: "ione",
}

function mustMint(scope: MediaTokenScope, expMs: number): string {
  const token = mintMediaToken(scope, expMs, SECRET)
  if (token == null) throw new Error("mintMediaToken returned null with a non-empty secret")
  return token
}

describe("media capability token", () => {
  it("verifies a freshly minted token for its exact rendition", () => {
    const token = mustMint(SCOPE, Date.now() + 60_000)
    expect(verifyMediaToken(token, SCOPE, SECRET)).toBe(true)
  })

  it("rejects an expired token", () => {
    const token = mustMint(SCOPE, Date.now() - 1)
    expect(verifyMediaToken(token, SCOPE, SECRET)).toBe(false)
  })

  it("rejects a token minted for a different rendition (any triple field)", () => {
    const token = mustMint(SCOPE, Date.now() + 60_000)
    expect(verifyMediaToken(token, { ...SCOPE, variant: "natalie" }, SECRET)).toBe(false)
    expect(verifyMediaToken(token, { ...SCOPE, medium: "video" }, SECRET)).toBe(false)
    expect(
      verifyMediaToken(token, { ...SCOPE, pageId: "019ea3a3-a93b-7646-9058-1d4c02ac2e4d" }, SECRET)
    ).toBe(false)
  })

  it("rejects a token verified under a different secret", () => {
    const token = mustMint(SCOPE, Date.now() + 60_000)
    expect(verifyMediaToken(token, SCOPE, "a-different-secret-000000000000")).toBe(false)
  })

  it("rejects a tampered signature", () => {
    const token = mustMint(SCOPE, Date.now() + 60_000)
    const dot = token.indexOf(".")
    const exp = token.slice(0, dot)
    const sig = token.slice(dot + 1)
    const bytes = Buffer.from(sig, "base64url")
    const mid = Math.floor(bytes.length / 2)
    bytes[mid] = (bytes[mid] ?? 0) ^ 0xff
    const flipped = bytes.toString("base64url")
    expect(
      Buffer.compare(Buffer.from(flipped, "base64url"), Buffer.from(sig, "base64url"))
    ).not.toBe(0)
    expect(verifyMediaToken(`${exp}.${flipped}`, SCOPE, SECRET)).toBe(false)
  })

  it("rejects a forged exp that extends a real signature's lifetime", () => {
    const token = mustMint(SCOPE, Date.now() + 1_000)
    const sig = token.slice(token.indexOf(".") + 1)
    const forgedExp = Date.now() + 3_600_000
    expect(verifyMediaToken(`${forgedExp}.${sig}`, SCOPE, SECRET)).toBe(false)
  })

  it("rejects malformed tokens", () => {
    const future = Date.now() + 60_000
    expect(verifyMediaToken("", SCOPE, SECRET)).toBe(false)
    expect(verifyMediaToken("nodot", SCOPE, SECRET)).toBe(false)
    expect(verifyMediaToken(".", SCOPE, SECRET)).toBe(false)
    expect(verifyMediaToken("abc.def", SCOPE, SECRET)).toBe(false)
    expect(verifyMediaToken(`${future}.`, SCOPE, SECRET)).toBe(false)
  })

  it("mints null and verifies false when the secret is empty (unconfigured)", () => {
    expect(mintMediaToken(SCOPE, Date.now() + 60_000, "")).toBeNull()
    const token = mustMint(SCOPE, Date.now() + 60_000)
    expect(verifyMediaToken(token, SCOPE, "")).toBe(false)
  })
})
