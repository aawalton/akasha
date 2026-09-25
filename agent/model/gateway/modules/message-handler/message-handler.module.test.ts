import { expect, test } from "bun:test"
import {
  answeredHere,
  BAD_GATEWAY,
  badGatewayResponse,
  buildMessageHandler,
  ClientNamedError,
  fallthroughLine,
  type HandlerDoors,
  handlerErrorSaid,
  type MessageTurn,
} from "akasha/agent/model/gateway/modules/message-handler/message-handler.module.code.ts"
import { emptySlot } from "akasha/agent/model/gateway/modules/observer-slot/observer-slot.module.test-fixtures.ts"

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

function bodyText(turn: MessageTurn | undefined): string | null {
  const held = turn?.originalBody
  return held === null || held === undefined ? null : new TextDecoder().decode(held)
}

test("the response the queue answered with is the very response handed back", async () => {
  const answer = new Response("answered-by-the-queue", { status: 201 })
  const rig = rigged(answering(answer))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const res = await handle(new Request(AT, { method: "POST", body: "{}" }), emptySlot())
  expect(res).toBe(answer)
  expect(res.status).toBe(201)
  expect(await res.text()).toBe("answered-by-the-queue")
  expect(rig.lines).toEqual([])
  expect(rig.thrown).toEqual([])
})

test("a POST is read into one buffer before the queue is reached", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(AT, { method: "POST", body: '{"stream":true}' }), emptySlot())
  expect(bodyText(rig.turns[0])).toBe('{"stream":true}')
})

test("a POST carrying an empty body is handed on a buffer of no bytes", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(AT, { method: "POST", body: "" }), emptySlot())
  expect(rig.turns[0]?.originalBody?.byteLength).toBe(0)
})

test("a request that is no POST is handed on carrying no body", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  for (const method of ["GET", "HEAD", "DELETE"]) {
    await handle(new Request(AT, { method }), emptySlot())
  }
  expect(rig.turns.map((turn) => turn.originalBody)).toEqual([null, null, null])
  expect(rig.turns.map((turn) => turn.method)).toEqual(["GET", "HEAD", "DELETE"])
})

test("the path handed on is the path the request arrived on without its query", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(`${AT}/count_tokens?beta=true`, { method: "GET" }), emptySlot())
  expect(rig.turns[0]?.pathname).toBe("/v1/messages/count_tokens")
})

test("the slot and the request the caller handed in are handed on to the queue", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const slot = emptySlot()
  const req = new Request(AT, { method: "POST", body: "{}" })
  await handle(req, slot)
  expect(rig.turns[0]?.observerSlot).toBe(slot)
  expect(rig.turns[0]?.req).toBe(req)
})

test("the queue is asked once for one request", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(AT, { method: "POST", body: "{}" }), emptySlot())
  expect(rig.turns.length).toBe(1)
})

test("a queue that throws is answered 502", async () => {
  const rig = rigged(() => {
    throw new Error("the pipeline is refused")
  })
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const res = await handle(new Request(AT, { method: "POST", body: "{}" }), emptySlot())
  expect(res.status).toBe(BAD_GATEWAY)
  expect(res.statusText).toBe("Bad Gateway")
})

test("a 502 answer is an Anthropic error envelope of type `api_error` sent as JSON", async () => {
  const rig = rigged(() => Promise.reject(new TypeError("the pipeline is refused")))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const res = await handle(new Request(AT, { method: "POST", body: "{}" }), emptySlot())
  expect(res.status).toBe(BAD_GATEWAY)
  expect(res.headers.get("content-type")).toBe("application/json")
  expect(await res.json()).toEqual({
    type: "error",
    error: { type: "api_error", message: "the gateway failed on this request with TypeError" },
  })
})

test("a 502 answer names the kind of error thrown and never its message", async () => {
  const rig = rigged(() => Promise.reject(new Error("Bearer sk-ant-secret-token")))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const res = await handle(new Request(AT, { method: "POST", body: "{}" }), emptySlot())
  const text = await res.text()
  expect(text).toContain("the gateway failed on this request with Error")
  expect(text).not.toContain("sk-ant")
})

test("a 502 answer names a thrown value that is no error by its type", () => {
  expect(handlerErrorSaid("a string nobody wrapped")).toBe(
    "the gateway failed on this request with string"
  )
})

test("a 502 answer carries the message of an error made to be named to the client", async () => {
  const rig = rigged(() => Promise.reject(new ClientNamedError("the queue ran out of turns")))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const res = await handle(new Request(AT, { method: "GET" }), emptySlot())
  expect(res.status).toBe(BAD_GATEWAY)
  expect(await res.json()).toEqual({
    type: "error",
    error: { type: "api_error", message: "the queue ran out of turns" },
  })
})

test("a body that will not read is answered with an envelope as well", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const req = new Request(AT, { method: "POST", body: "{}" })
  await req.arrayBuffer()
  const res = await handle(req, emptySlot())
  expect(res.headers.get("content-type")).toBe("application/json")
  expect(await res.text()).toContain('"type":"api_error"')
})

test("a 502 answered here is told apart from a response the queue answered", async () => {
  const answer = new Response("answered-by-the-queue", { status: 502 })
  const handle = buildMessageHandler(PREFIX, rigged(answering(answer)).doors)
  const fromQueue = await handle(new Request(AT, { method: "GET" }), emptySlot())
  const failing = buildMessageHandler(PREFIX, rigged(() => Promise.reject(new Error("x"))).doors)
  const fromHere = await failing(new Request(AT, { method: "GET" }), emptySlot())
  expect(answeredHere(fromQueue)).toBe(false)
  expect(answeredHere(fromHere)).toBe(true)
})

test("a 502 answer is built the same for every thrown value of one kind", async () => {
  const one = await badGatewayResponse(new RangeError("first")).text()
  const two = await badGatewayResponse(new RangeError("second")).text()
  expect(one).toBe(two)
})

test("a queue that rejects is answered 502", async () => {
  const rig = rigged(() => Promise.reject(new Error("upstream is gone")))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const res = await handle(new Request(AT, { method: "GET" }), emptySlot())
  expect(res.status).toBe(BAD_GATEWAY)
})

test("what was thrown is written about beside the line naming the fallthrough", async () => {
  const wrong = new Error("the pipeline is refused")
  const rig = rigged(() => Promise.reject(wrong))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(AT, { method: "POST", body: "{}" }), emptySlot())
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
  const res = await handle(req, emptySlot())
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
  await handle(new Request(`${AT}?beta=1`, { method: "GET" }), emptySlot())
  expect(rig.lines[0]).toContain("account=-")
  expect(rig.lines[0]).toContain("GET /v1/messages")
})

test("a handler answers each request apart from the request before", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(AT, { method: "POST", body: "one" }), emptySlot())
  await handle(new Request(AT, { method: "POST", body: "two" }), emptySlot())
  expect(rig.turns.map(bodyText)).toEqual(["one", "two"])
})

test("nothing thrown by the queue reaches the caller", async () => {
  const rig = rigged(() => Promise.reject(new Error("boom")))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const res = await handle(new Request(AT, { method: "POST", body: "{}" }), emptySlot())
  expect(res.status).toBe(BAD_GATEWAY)
})

test("a thrown value that is no error is written about as handed", async () => {
  const rig = rigged(() => Promise.reject("a string nobody wrapped"))
  const handle = buildMessageHandler(PREFIX, rig.doors)
  await handle(new Request(AT, { method: "GET" }), emptySlot())
  expect(rig.thrown[0]?.error).toBe("a string nobody wrapped")
})

test("the slot handed on is left holding what the caller put in it", async () => {
  const rig = rigged(served)
  const handle = buildMessageHandler(PREFIX, rig.doors)
  const slot = emptySlot()
  await handle(new Request(AT, { method: "POST", body: "{}" }), slot)
  expect(slot.current).toBeNull()
})
