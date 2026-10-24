import { expect, test } from "bun:test"
import { withdrawnBy } from "akasha/alan/web/modules/seat-message-withdrawing/seat-message-withdrawing.module.code.ts"
import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const MESSAGE = "message-0123456789ab"

const PATH = `agent/message/pages/${MESSAGE}.agent-message.ts`

const READ_AT = "c".repeat(40)

type Held = {
  readonly from: string
  readonly to: string
  claimedAt: string | null
  there: boolean
  readonly claimedBeforeWrite?: boolean
}

type Sent = { readonly at: string; readonly body: Readonly<Record<string, unknown>> }

function answer(said: unknown, status = 200): Response {
  return new Response(JSON.stringify(said), { status })
}

function pagesHolding(held: Held, sent: Sent[]): Fetcher {
  return async (url, init) => {
    const at = url.slice(url.lastIndexOf("/"))
    const body = JSON.parse(String(init.body)) as Readonly<Record<string, unknown>>
    sent.push({ at, body })
    if (at === "/ask") {
      const rows = held.there
        ? [{ slug: MESSAGE, from: held.from, to: held.to, claimedAt: held.claimedAt }]
        : []
      return answer({ rows, n: rows.length })
    }
    if (at === "/read") {
      return answer({
        at: READ_AT,
        bodies: [{ path: PATH, content: held.there ? "{}" : null }],
        unplaced: [],
      })
    }
    if (held.claimedBeforeWrite === true) {
      held.claimedAt = "2026-10-24T00:00:00.000Z"
      return answer({ refused: `\`${PATH}\` is claimed under \`claimedAt\` already` }, 409)
    }
    held.there = false
    return answer({ commit: "d".repeat(40), wrote: [], took: [PATH] })
  }
}

const naps = async (): Promise<void> => undefined

test("the person who sent a message untaken takes it back by claiming and taking its page", async () => {
  const sent: Sent[] = []
  const held: Held = { from: "jenny", to: "seat/rhia", claimedAt: null, there: true }
  expect(await withdrawnBy("jenny", "rhia", MESSAGE, pagesHolding(held, sent), naps)).toEqual({
    kind: "withdrawn",
  })
  const wrote = sent.find((one) => one.at === "/write")?.body
  expect(wrote?.removes).toEqual([PATH])
  expect(wrote?.claims).toEqual([{ path: PATH, key: "claimedAt" }])
  expect(wrote?.read).toBe(READ_AT)
})

test("a person who did not send the message is refused and writes nothing", async () => {
  const sent: Sent[] = []
  const held: Held = { from: "alan", to: "seat/rhia", claimedAt: null, there: true }
  const said = await withdrawnBy("jenny", "rhia", MESSAGE, pagesHolding(held, sent), naps)
  expect(said).toMatchObject({ kind: "refused", status: 403 })
  expect(sent.some((one) => one.at === "/write")).toBe(false)
})

test("a message to another seat is refused and writes nothing", async () => {
  const sent: Sent[] = []
  const held: Held = { from: "jenny", to: "seat/elsewhere", claimedAt: null, there: true }
  const said = await withdrawnBy("jenny", "rhia", MESSAGE, pagesHolding(held, sent), naps)
  expect(said).toMatchObject({ kind: "refused", status: 404 })
  expect(sent.some((one) => one.at === "/write")).toBe(false)
})

test("a message its seat has claimed is answered as taken and writes nothing", async () => {
  const sent: Sent[] = []
  const held: Held = {
    from: "alan",
    to: "seat/rhia",
    claimedAt: "2026-10-24T00:00:00.000Z",
    there: true,
  }
  expect(await withdrawnBy("alan", "rhia", MESSAGE, pagesHolding(held, sent), naps)).toEqual({
    kind: "taken",
  })
  expect(sent.some((one) => one.at === "/write")).toBe(false)
})

test("a message whose page is gone is answered as taken", async () => {
  const held: Held = { from: "alan", to: "seat/rhia", claimedAt: null, there: false }
  expect(await withdrawnBy("alan", "rhia", MESSAGE, pagesHolding(held, []), naps)).toEqual({
    kind: "taken",
  })
})

test("a seat claiming the message between the look and the write wins, and the take back is taken", async () => {
  const held: Held = {
    from: "alan",
    to: "seat/rhia",
    claimedAt: null,
    there: true,
    claimedBeforeWrite: true,
  }
  expect(await withdrawnBy("alan", "rhia", MESSAGE, pagesHolding(held, []), naps)).toEqual({
    kind: "taken",
  })
  expect(held.there).toBe(true)
})
