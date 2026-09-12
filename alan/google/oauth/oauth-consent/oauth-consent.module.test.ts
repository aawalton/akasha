import { expect, test } from "bun:test"
import {
  type ConsentRequest,
  type Minting,
  refreshTokenSaved,
  SPENT,
} from "akasha/alan/google/oauth/oauth-consent/oauth-consent.module.code.ts"

const REQUEST: ConsentRequest = {
  scopes: ["one"],
  clientId: "client",
  clientSecret: "secret",
  tokenVar: "GOOGLE_OAUTH_REFRESH_TOKEN",
  callbackUrl: undefined,
}

const AT = "/home/alan/.secrets.env"

function minting(asked: Minting["asked"], saved: Minting["saved"] = () => AT): Minting {
  return { asked, saved }
}

test("an exchange that never reached Google has nothing to say it wrote", async () => {
  const done: string[] = []
  const held = minting(() => Promise.reject(new Error("the name would not resolve")))
  await expect(
    refreshTokenSaved(REQUEST, "http://127.0.0.1/callback", "c", done, held)
  ).rejects.toThrow("the name would not resolve")
  expect(done).toEqual([])
})

test("an exchange Google refused says the code was spent before it says the fault", async () => {
  const done: string[] = []
  const held = minting(() => Promise.resolve(new Response("no", { status: 400 })))
  await expect(
    refreshTokenSaved(REQUEST, "http://127.0.0.1/callback", "c", done, held)
  ).rejects.toThrow("token exchange")
  expect(done).toEqual([SPENT])
})

test("an exchange answering no refresh token still says the code was spent", async () => {
  const done: string[] = []
  const held = minting(() => Promise.resolve(Response.json({ access_token: "a" })))
  await expect(
    refreshTokenSaved(REQUEST, "http://127.0.0.1/callback", "c", done, held)
  ).rejects.toThrow("no refresh token")
  expect(done).toEqual([SPENT])
})

test("an exchange that landed names the code spent and the file written", async () => {
  const done: string[] = []
  const kept: string[] = []
  const held = minting(
    () => Promise.resolve(Response.json({ refresh_token: "r" })),
    (name, value) => {
      kept.push(`${name}=${value}`)
      return AT
    }
  )
  const said = await refreshTokenSaved(REQUEST, "http://127.0.0.1/callback", "c", done, held)
  expect(kept).toEqual(["GOOGLE_OAUTH_REFRESH_TOKEN=r"])
  expect(done).toEqual([SPENT, `wrote GOOGLE_OAUTH_REFRESH_TOKEN into ${AT}`])
  expect(said).toContain(AT)
})

test("the token's value reaches neither what is answered nor what is named as written", async () => {
  const done: string[] = []
  const held = minting(() => Promise.resolve(Response.json({ refresh_token: "r-secret" })))
  const said = await refreshTokenSaved(REQUEST, "http://127.0.0.1/callback", "c", done, held)
  expect(said).not.toContain("r-secret")
  expect(done.join(" ")).not.toContain("r-secret")
})
