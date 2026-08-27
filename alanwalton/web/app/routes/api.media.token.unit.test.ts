import { describe, expect, it } from "bun:test"
import { verifyMediaToken } from "@shared/pages-ui/media/media-token"
import { z } from "zod"
import { buildMediaTokenResponse } from "./api.media.token"

const SECRET = "api-media-token-route-secret-0123456789"
const PAGE_ID = "019ea3a3-a93b-7646-9058-1d4c02ac2e4c"
const tokenSchema = z.object({ token: z.string().min(1) }).strict()

const build = (over: Partial<Parameters<typeof buildMediaTokenResponse>[0]> = {}): Response =>
  buildMediaTokenResponse({
    user: { id: "user-1" },
    pageId: PAGE_ID,
    medium: "audio",
    variant: "ione",
    pageAccessible: true,
    secret: SECRET,
    nowMs: Date.now(),
    headers: new Headers(),
    ...over,
  })

describe("buildMediaTokenResponse — mint route core (#15686)", () => {
  it("issues a token an authed user can verify for the EXACT rendition", async () => {
    const res = build()
    expect(res.status).toBe(200)
    const { token } = tokenSchema.parse(await res.json())
    expect(
      verifyMediaToken(token, { pageId: PAGE_ID, medium: "audio", variant: "ione" }, SECRET)
    ).toBe(true)
    expect(
      verifyMediaToken(token, { pageId: PAGE_ID, medium: "audio", variant: "natalie" }, SECRET)
    ).toBe(false)
  })

  it("401s an unauthenticated request", () => {
    expect(build({ user: null }).status).toBe(401)
  })

  it("404s a malformed rendition triple", () => {
    expect(build({ pageId: "not-a-uuid" }).status).toBe(404)
    expect(build({ medium: "bogus" }).status).toBe(404)
    expect(build({ variant: "" }).status).toBe(404)
  })

  it("404s when the caller cannot access the page (owner-gate)", () => {
    expect(build({ pageAccessible: false }).status).toBe(404)
  })

  it("503s when the signing secret is unconfigured", () => {
    expect(build({ secret: "" }).status).toBe(503)
  })
})
