import { describe, expect, it } from "bun:test"
import { bearerScopedClientOptions } from "./server"

describe("bearerScopedClientOptions — Bearer-scoped RLS client shape", () => {
  it("puts the raw JWT in the Authorization header as a Bearer", () => {
    const opts = bearerScopedClientOptions("jwt-abc")
    expect(opts.global.headers.Authorization).toBe("Bearer jwt-abc")
  })

  it("disables session persistence and refresh (a per-request identity, never stored)", () => {
    const opts = bearerScopedClientOptions("jwt-abc")
    expect(opts.auth.persistSession).toBe(false)
    expect(opts.auth.autoRefreshToken).toBe(false)
    expect(opts.auth.detectSessionInUrl).toBe(false)
  })

  it("carries no service-role key — RLS stays in force (options expose only header + auth)", () => {
    const opts = bearerScopedClientOptions("jwt-abc")
    expect(Object.keys(opts).sort()).toEqual(["auth", "global"])
  })
})
