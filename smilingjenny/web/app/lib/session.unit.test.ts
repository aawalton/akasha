import { describe, expect, test } from "bun:test"
import { JENNY_USER_ID, requireApiJenny, requireJenny, SIGN_IN_PATH } from "./session.server"

const JENNY = { id: JENNY_USER_ID, email: "smilingjenny@gmail.com" }

const SOMEBODY_ELSE = { id: "4ee54543-cb30-4f47-a8d0-9269b4b7df76", email: "someone@example.com" }

function request(): Request {
  return new Request("https://smilingjenny.me/categories")
}

function reads(user: typeof JENNY | null, headers: Headers = new Headers()) {
  return () => Promise.resolve({ user, headers })
}

async function responseThrownBy(run: () => Promise<unknown>): Promise<Response> {
  try {
    await run()
  } catch (error) {
    if (error instanceof Response) return error
    throw error
  }
  throw new Error("nothing was thrown, where a Response was owed")
}

describe("requireJenny", () => {
  test("sends a visitor with no session to the sign-in screen", async () => {
    const response = await responseThrownBy(() => requireJenny(request(), reads(null)))
    expect(response.status).toBe(302)
    expect(response.headers.get("location")).toBe(SIGN_IN_PATH)
  })

  test("sends away a signed-in visitor who is not Jenny, since every app on this Supabase shares its accounts and three of them take sign-ups", async () => {
    const response = await responseThrownBy(() => requireJenny(request(), reads(SOMEBODY_ELSE)))
    expect(response.status).toBe(302)
    expect(response.headers.get("location")).toBe(SIGN_IN_PATH)
  })

  test("carries a refreshed session cookie onto that redirect", async () => {
    const refreshed = new Headers({ "set-cookie": "sb-auth-token=refreshed; Path=/" })
    const response = await responseThrownBy(() => requireJenny(request(), reads(null, refreshed)))
    expect(response.headers.get("set-cookie")).toContain("sb-auth-token=refreshed")
  })

  test("hands Jenny her user and the headers to pass on", async () => {
    const refreshed = new Headers({ "set-cookie": "sb-auth-token=refreshed; Path=/" })
    const { user, headers } = await requireJenny(request(), reads(JENNY, refreshed))
    expect(user.id).toBe(JENNY_USER_ID)
    expect(headers).toBe(refreshed)
  })
})

describe("requireApiJenny", () => {
  test("answers 401 rather than a redirect, which fetch would follow and a caller reading res.ok would take for a success", async () => {
    const response = await responseThrownBy(() => requireApiJenny(request(), reads(null)))
    expect(response.status).toBe(401)
    expect(response.headers.get("location")).toBeNull()
  })

  test("answers 401 to a signed-in caller who is not Jenny", async () => {
    const response = await responseThrownBy(() => requireApiJenny(request(), reads(SOMEBODY_ELSE)))
    expect(response.status).toBe(401)
  })

  test("lets Jenny through", async () => {
    const { user } = await requireApiJenny(request(), reads(JENNY))
    expect(user.id).toBe(JENNY_USER_ID)
  })
})
