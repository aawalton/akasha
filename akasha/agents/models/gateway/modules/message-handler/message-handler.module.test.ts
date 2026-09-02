import { expect, test } from "bun:test"
import type { ObserverSlot } from "../observer-slot/observer-slot.module.code.ts"
import {
  BAD_GATEWAY,
  buildMessageHandler,
  fallthroughLine,
  type HandlerDoors,
  type MessageTurn,
} from "./message-handler.module.code.ts"

const PREFIX = "[gw]"

const AT = "https://localhost:4321/v1/messages"

type Rig = {
  readonly doors: HandlerDoors
  readonly turns: MessageTurn[]
  readonly lines: string[]
  readonly thrown: { line: string; error: unknown }[]
}

function rigged(answer: () => Promise<Response>): Rig {
  const turns: MessageTurn[] = []
  const lines: string[] = []
  const thrown: { line: string; error: unknown }[] = []
  return {
    turns,
    lines,
    thrown,
    doors: {
      queued: async (turn) => {
        turns.push(turn)
        return answer()
      },
      said: (line) => {
        lines.push(line)
      },
      threw: (line, error) => {
        thrown.push({ line, error })
      },
    },
  }
}

function served(): Promise<Response> {
  return Promise.resolve(new Response("served", { status: 200 }))
}

function answering(answer: Response): () => Promise<Response> {
  return () => Promise.resolve(answer)
}

function slotMade(): ObserverSlot {
  return { current: null }
}

function bodyText(turn: MessageTurn | undefined): string | null {
  const held = turn?.originalBody
  return held === null || held === undefined ? null : new TextDecoder().decode(held)
}

test("the response the queue answered with is the very response handed back", async () => {
  const answer = new Response("answered-by-the-queue", { status: 201 })
  const rig = rigged(answering(answer))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const res = await handle(new Request(AT, { method: "POST", body: "{}" }), slotMade())
  expect(res).toBe(answer)
  expect(res.status).toBe(201)
  expect(await res.text()).toBe("answered-by-the-queue")
  expect(rig.lines).toEqual([])
  expect(rig.thrown).toEqual([])
})

test("a POST is read into one buffer before the queue is reached", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(AT, { method: "POST", body: '{"stream":true}' }), slotMade())
  expect(bodyText(rig.turns[0])).toBe('{"stream":true}')
})

test("a POST carrying an empty body is handed on a buffer of no bytes", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(AT, { method: "POST", body: "" }), slotMade())
  expect(rig.turns[0]?.originalBody?.byteLength).toBe(0)
})

test("a request that is no POST is handed on carrying no body", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  for (const method of ["GET", "HEAD", "DELETE"]) {
    await handle(new Request(AT, { method }), slotMade())
  }
  expect(rig.turns.map((turn) => turn.originalBody)).toEqual([null, null, null])
  expect(rig.turns.map((turn) => turn.method)).toEqual(["GET", "HEAD", "DELETE"])
})

test("the path handed on is the path the request arrived on without its query", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(`${AT}/count_tokens?beta=true`, { method: "GET" }), slotMade())
  expect(rig.turns[0]?.pathname).toBe("/v1/messages/count_tokens")
})

test("the slot and the request the caller handed in are handed on to the queue", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const slot = slotMade()
  const req = new Request(AT, { method: "POST", body: "{}" })
  await handle(req, slot)
  expect(rig.turns[0]?.observerSlot).toBe(slot)
  expect(rig.turns[0]?.req).toBe(req)
})

test("the queue is asked once for one request", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(AT, { method: "POST", body: "{}" }), slotMade())
  expect(rig.turns.length).toBe(1)
})

test("a queue that throws is answered 502", async () => {
  const rig = rigged(() => {
    throw new Error("the pipeline is refused")
  })
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const res = await handle(new Request(AT, { method: "POST", body: "{}" }), slotMade())
  expect(res.status).toBe(BAD_GATEWAY)
  expect(res.statusText).toBe("Bad Gateway")
  expect(res.body).toBeNull()
})

test("a queue that rejects is answered 502", async () => {
  const rig = rigged(() => Promise.reject(new Error("upstream is gone")))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const res = await handle(new Request(AT, { method: "GET" }), slotMade())
  expect(res.status).toBe(BAD_GATEWAY)
})

test("what was thrown is written about beside the line naming the fallthrough", async () => {
  const wrong = new Error("the pipeline is refused")
  const rig = rigged(() => Promise.reject(wrong))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(AT, { method: "POST", body: "{}" }), slotMade())
  expect(rig.thrown).toEqual([{ line: `${PREFIX} handler error:`, error: wrong }])
  expect(rig.lines).toEqual([
    `${PREFIX} res POST /v1/messages account=- status=502 fallthrough=handler-error`,
  ])
})

test("a body that will not read is answered 502", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const req = new Request(AT, { method: "POST", body: "{}" })
  await req.arrayBuffer()
  const res = await handle(req, slotMade())
  expect(res.status).toBe(BAD_GATEWAY)
  expect(rig.turns).toEqual([])
  expect(rig.thrown.length).toBe(1)
})

test("the fallthrough line names the method, the path and a hyphen for the account", () => {
  expect(fallthroughLine(PREFIX, "POST", "/v1/messages")).toBe(
    `${PREFIX} res POST /v1/messages account=- status=502 fallthrough=handler-error`
  )
  expect(fallthroughLine("[other]", "GET", "/healthz")).toBe(
    "[other] res GET /healthz account=- status=502 fallthrough=handler-error"
  )
})

test("the fallthrough line names the account as a hyphen rather than as an account", async () => {
  const rig = rigged(() => Promise.reject(new Error("no account")))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(`${AT}?beta=1`, { method: "GET" }), slotMade())
  expect(rig.lines[0]).toContain("account=-")
  expect(rig.lines[0]).toContain("GET /v1/messages")
})

test("a handler answers each request apart from the request before", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(AT, { method: "POST", body: "one" }), slotMade())
  await handle(new Request(AT, { method: "POST", body: "two" }), slotMade())
  expect(rig.turns.map(bodyText)).toEqual(["one", "two"])
})

test("nothing thrown by the queue reaches the caller", async () => {
  const rig = rigged(() => Promise.reject(new Error("boom")))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const res = await handle(new Request(AT, { method: "POST", body: "{}" }), slotMade())
  expect(res.status).toBe(BAD_GATEWAY)
})

test("a thrown value that is no error is written about as handed", async () => {
  const rig = rigged(() => Promise.reject("a string nobody wrapped"))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(AT, { method: "GET" }), slotMade())
  expect(rig.thrown[0]?.error).toBe("a string nobody wrapped")
})

test("the slot handed on is left holding what the caller put in it", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const slot = slotMade()
  await handle(new Request(AT, { method: "POST", body: "{}" }), slot)
  expect(slot.current).toBeNull()
})
