import { expect, test } from "bun:test"
import {
  BotChecked,
  botChecking,
  checkedText,
  passing,
  steadily,
} from "akasha/alan/collection/royal-road/modules/pages/royal-road-pages.module.code.ts"

const FOLLOWS = "https://www.royalroad.com/my/follows?page=1"

const CLOUDFLARE_BODY =
  '<!DOCTYPE html><html lang="en-US"><head><title>Just a moment...</title>' +
  '<meta name="robots" content="noindex,nofollow"></head><body></body></html>'

const ANUBIS_BODY =
  '<!doctype html><html lang="en"><head><title>One moment — Royal Road is checking your ' +
  'connection</title><script id="anubis_challenge" type="application/json">' +
  '{"rules":{"algorithm":"fast","difficulty":4}}</script></head><body id="top"></body></html>'

const FOLLOW_BODY = '<div id="result"><div class="fiction-list-item row"></div></div>'

const WAITS = [1, 2, 3]

function answering(...steps: readonly (number | Error)[]): {
  readonly send: () => Promise<Response>
  readonly sent: () => number
} {
  let at = 0
  return {
    send: () => {
      const step = steps[Math.min(at, steps.length - 1)]
      at += 1
      if (step instanceof Error) return Promise.reject(step)
      return Promise.resolve(new Response("body", { status: step }))
    },
    sent: () => at,
  }
}

function waited(): { readonly wait: (ms: number) => Promise<void>; readonly waits: number[] } {
  const waits: number[] = []
  return {
    wait: (ms) => {
      waits.push(ms)
      return Promise.resolve()
    },
    waits,
  }
}

test("a challenge, a throttle and a server fault are each passing", () => {
  expect([403, 429, 500, 502, 503].map(passing)).toEqual([true, true, true, true, true])
})

test("a success and any other refusal are not passing", () => {
  expect([200, 302, 400, 401, 404].map(passing)).toEqual([false, false, false, false, false])
})

test("an answer that is not passing is taken at once", async () => {
  const { send, sent } = answering(200)
  const { wait, waits } = waited()
  expect((await steadily(send, wait, WAITS)).status).toBe(200)
  expect(sent()).toBe(1)
  expect(waits).toEqual([])
})

test("a passing answer is sent again until one is not", async () => {
  const { send, sent } = answering(403, 500, 200)
  const { wait, waits } = waited()
  expect((await steadily(send, wait, WAITS)).status).toBe(200)
  expect(sent()).toBe(3)
  expect(waits).toEqual([1, 2])
})

test("a failed connection is sent again", async () => {
  const { send } = answering(new Error("curl exited 28"), 200)
  const { wait } = waited()
  expect((await steadily(send, wait, WAITS)).status).toBe(200)
})

test("a refusal that is not passing is not sent again", async () => {
  const { send, sent } = answering(404, 200)
  const { wait } = waited()
  expect((await steadily(send, wait, WAITS)).status).toBe(404)
  expect(sent()).toBe(1)
})

test("an answer still passing on the last sending is handed back", async () => {
  const { send, sent } = answering(503)
  const { wait, waits } = waited()
  expect((await steadily(send, wait, WAITS)).status).toBe(503)
  expect(sent()).toBe(4)
  expect(waits).toEqual(WAITS)
})

test("a connection still failing on the last sending throws", async () => {
  const { send } = answering(new Error("curl exited 7"))
  const { wait } = waited()
  await expect(steadily(send, wait, WAITS)).rejects.toThrow("curl exited 7")
})

test("a Cloudflare challenge is a bot check by its header", () => {
  const headers = new Headers({ "cf-mitigated": "challenge" })
  expect(botChecking(headers, CLOUDFLARE_BODY)).toBe(true)
})

test("a Cloudflare challenge page is a bot check by its body alone", () => {
  expect(botChecking(new Headers(), CLOUDFLARE_BODY)).toBe(true)
})

test("an Anubis challenge answered 200 is a bot check", () => {
  expect(botChecking(new Headers(), ANUBIS_BODY)).toBe(true)
})

test("a follow list is no bot check", () => {
  expect(botChecking(new Headers(), FOLLOW_BODY)).toBe(false)
})

test("a bot check fails the read and names the page Royal Road answered with it", async () => {
  const answer = new Response(ANUBIS_BODY, { status: 200 })
  const read = checkedText(FOLLOWS, answer)
  await expect(read).rejects.toBeInstanceOf(BotChecked)
  await expect(checkedText(FOLLOWS, new Response(ANUBIS_BODY))).rejects.toThrow(
    `Royal Road answered ${FOLLOWS} with a bot check`
  )
})

test("a page that is no bot check is handed back whole", async () => {
  expect(await checkedText(FOLLOWS, new Response(FOLLOW_BODY))).toBe(FOLLOW_BODY)
})
