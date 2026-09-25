import { afterEach, expect, test } from "bun:test"
import {
  boostedBy,
  proposedBy,
} from "akasha/product/kofi/feature-request/modules/writing/feature-request-writing.module.code.ts"
import { z } from "zod"

const HELD_FETCH = globalThis.fetch

const SENT_BODY = z.record(z.string(), z.unknown())

type Sent = { readonly at: string; readonly body: Record<string, unknown> }

function answering(rows: (asked: Record<string, unknown>) => unknown[]): Sent[] {
  const sent: Sent[] = []
  let asks = 0
  globalThis.fetch = ((url: string, init: RequestInit) => {
    const body = SENT_BODY.parse(JSON.parse(String(init.body)))
    const at = new URL(url).pathname
    sent.push({ at, body })
    if (at.endsWith("/write")) return Promise.resolve(Response.json({ commit: null, wrote: [] }))
    asks += 1
    const found = rows(body)
    return Promise.resolve(Response.json({ rows: found, n: found.length, at: `commit-${asks}` }))
  }) as typeof fetch
  return sent
}

afterEach(() => {
  globalThis.fetch = HELD_FETCH
})

const RICH = { slug: "contributor-a", transactions: [{ at: "2026-09-01", points: 500 }] }

function written(sent: readonly Sent[]): Record<string, unknown> {
  return sent.find((one) => one.at.endsWith("/write"))?.body ?? {}
}

test("a proposal sends the commit the contributor was read at, and opens its request as new", async () => {
  const sent = answering((asked) => (asked.pageTypeSlug === "contributor" ? [RICH] : []))
  const said = await proposedBy({ product: "kofi", contributor: "contributor-a", ask: "a thing" })
  expect("slug" in said).toBe(true)
  const body = written(sent)
  expect(body.read).toBe("commit-1")
  const pages = body.pages as Record<string, unknown>[]
  expect(pages[0]?.fresh).toBe(true)
  expect(pages[1]?.fresh).toBe(undefined)
})

test("a boost sends the commit its first read was answered at", async () => {
  const sent = answering((asked) =>
    asked.pageTypeSlug === "contributor"
      ? [RICH]
      : [{ slug: "a-thing", standing: "published", boosts: [] }]
  )
  const said = await boostedBy({
    product: "kofi",
    contributor: "contributor-a",
    request: "a-thing",
    points: 5,
  })
  expect(said).toEqual({ slug: "a-thing" })
  expect(written(sent).read).toBe("commit-1")
})
