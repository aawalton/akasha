import { afterEach, expect, test } from "bun:test"
import { action } from "akasha/alan/web/routes/alan-web-api-stripe-webhook/alan-web-api-stripe-webhook.route.code.ts"

const HELD_FETCH = globalThis.fetch

const SECRET = "whsec_held"

afterEach(() => {
  globalThis.fetch = HELD_FETCH
  delete process.env.STRIPE_WEBHOOK_SECRET
  delete process.env.PAGES_SERVICE_ORIGIN
})

async function signed(body: string): Promise<string> {
  const stamp = String(Math.floor(Date.now() / 1000))
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const made = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${stamp}.${body}`))
  const hex = Array.from(new Uint8Array(made), (one) => one.toString(16).padStart(2, "0"))
  return `t=${stamp},v1=${hex.join("")}`
}

test("a charge writes its contributor sending the commit the question was answered at", async () => {
  process.env.STRIPE_WEBHOOK_SECRET = SECRET
  process.env.PAGES_SERVICE_ORIGIN = "http://pages.held"
  const writes: Record<string, unknown>[] = []
  globalThis.fetch = ((url: string, init: RequestInit) => {
    const body = JSON.parse(String(init.body)) as Record<string, unknown>
    if (new URL(url).pathname.endsWith("/write")) {
      writes.push(body)
      return Promise.resolve(Response.json({ commit: null, wrote: [] }))
    }
    return Promise.resolve(Response.json({ rows: [], n: 0, at: "commit-asked" }))
  }) as typeof fetch
  const body = JSON.stringify({
    type: "charge.succeeded",
    data: { object: { id: "ch_1", amount: 500, receipt_email: "a@b.c" } },
  })
  const answered = await action({
    request: new Request("http://here/api/stripe/webhook", {
      method: "POST",
      body,
      headers: { "stripe-signature": await signed(body) },
    }),
  })
  expect(await answered.json()).toEqual({ ok: true, points: 500, balance: 500 })
  expect(writes.map((one) => one.read)).toEqual(["commit-asked"])
})
