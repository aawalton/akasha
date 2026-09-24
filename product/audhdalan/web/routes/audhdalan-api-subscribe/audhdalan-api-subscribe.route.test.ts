import { afterEach, expect, mock, spyOn, test } from "bun:test"
import {
  answered,
  type Road,
  slugsFor,
} from "akasha/product/audhdalan/web/routes/audhdalan-api-subscribe/audhdalan-api-subscribe.route.code.ts"

const AT = "0123456789abcdef0123456789abcdef01234567"

const FOLDER = "product/audhdalan/subscriber/pages"

type Written = { readonly slug: string; readonly values: Readonly<Record<string, unknown>> }

function bodyFor(email: string): string {
  return `export const x = {\n  email: ${JSON.stringify(email)},\n}\n`
}

function roadOver(held: Readonly<Record<string, string>>, wrote: Written[]): Road {
  return {
    read: async (pages) => ({
      ok: true,
      at: AT,
      bodies: pages
        .filter((one) => one.slug in held)
        .map((one) => ({
          path: `${FOLDER}/${one.slug}.${one.pageTypeSlug}.ts`,
          content: held[one.slug] ?? null,
        })),
      unplaced: pages
        .filter((one) => !(one.slug in held))
        .map((one) => `${one.pageTypeSlug}/${one.slug}`),
    }),
    write: async (pages) => {
      for (const one of pages) wrote.push({ slug: one.slug, values: one.values })
      return { ok: true, at: AT }
    },
  }
}

function posted(body: unknown, method = "POST"): Request {
  return new Request("https://audhdalan.com/api/subscribe", {
    method,
    headers: { "content-type": "application/json" },
    ...(method === "POST" ? { body: JSON.stringify(body) } : {}),
  })
}

afterEach(() => {
  mock.restore()
})

test("an address given for the first time is kept as a subscriber page", async () => {
  const wrote: Written[] = []
  const said = await answered(
    posted({ email: " aawalton+akasha-test@gmail.com " }),
    roadOver({}, wrote)
  )
  expect(said.status).toBe(200)
  expect(await said.json()).toEqual({ ok: true })
  expect(wrote).toEqual([
    {
      slug: "aawalton-akasha-test-gmail-com",
      values: { email: "aawalton+akasha-test@gmail.com" },
    },
  ])
})

test("an address given again is answered as kept and writes no second page", async () => {
  const wrote: Written[] = []
  const held = { "aawalton-gmail-com": bodyFor("aawalton@gmail.com") }
  const said = await answered(posted({ email: "AAWalton@Gmail.com" }), roadOver(held, wrote))
  expect(said.status).toBe(200)
  expect(wrote).toEqual([])
})

test("an address whose slug another address holds is filed under a hashed slug", async () => {
  const wrote: Written[] = []
  const held = { "a-b-x-com": bodyFor("a-b@x.com") }
  const said = await answered(posted({ email: "a.b@x.com" }), roadOver(held, wrote))
  expect(said.status).toBe(200)
  const [, hashed] = await slugsFor("a.b@x.com")
  expect(wrote.map((one) => one.slug)).toEqual([hashed ?? ""])
  expect(hashed).toMatch(/^subscriber-[0-9a-f]{16}$/)
})

test("an address whose fold names no page is filed under a hashed slug alone", async () => {
  expect(await slugsFor("1abc@x.com")).toEqual([expect.stringMatching(/^subscriber-/)])
  const wrote: Written[] = []
  const said = await answered(posted({ email: "1abc@x.com" }), roadOver({}, wrote))
  expect(said.status).toBe(200)
  expect(wrote).toHaveLength(1)
})

test("an address refused is told apart from an address unkept", async () => {
  const wrote: Written[] = []
  const said = await answered(posted({ email: "not an address" }), roadOver({}, wrote))
  expect(said.status).toBe(400)
  expect(wrote).toEqual([])
})

test("a store that cannot be reached is answered 503, and the log names no address", async () => {
  const logged = spyOn(console, "error").mockImplementation(() => undefined)
  const road: Road = {
    read: async (pages) => ({
      ok: false,
      why: `\`a read of ${pages.map((one) => `${one.pageTypeSlug}/${one.slug}`).join(", ")}\` went unanswered`,
    }),
    write: async () => ({ ok: true, at: AT }),
  }
  const said = await answered(posted({ email: "someone@example.com" }), road)
  expect(said.status).toBe(503)
  const line = String(logged.mock.calls[0]?.[0])
  expect(line).toContain("went unanswered")
  expect(line).not.toContain("someone")
  expect(line).not.toContain("example")
})

test("a write the store refuses is answered 503", async () => {
  spyOn(console, "error").mockImplementation(() => undefined)
  const road: Road = {
    ...roadOver({}, []),
    write: async () => ({ ok: false, why: "refused" }),
  }
  expect((await answered(posted({ email: "someone@example.com" }), road)).status).toBe(503)
})

test("a call other than a POST is refused", async () => {
  expect((await answered(posted(null, "GET"), roadOver({}, []))).status).toBe(405)
})
