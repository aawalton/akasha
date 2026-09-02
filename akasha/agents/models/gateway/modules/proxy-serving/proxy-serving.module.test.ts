import { expect, test } from "bun:test"
import { startOAuthProxy } from "./proxy-serving.module.code.ts"
import {
  gated,
  heldObserver,
  inFlightOf,
  optionsOf,
  PORT,
  rcOf,
  requested,
  rigged,
  SOCKET_PATH,
  STUB_OAUTH,
  snapshotOf,
  startedProxy,
  streamedUpstream,
  ticked,
} from "./proxy-serving.module.test-fixtures.ts"

const POSTED: RequestInit = { method: "POST", body: "{}" }

test("a HEAD of the root path is answered 200 with no body", async () => {
  const rig = startedProxy()
  const res = await rig.answering(0)(requested("/", { method: "HEAD" }), rig.listening(0))
  expect(res.status).toBe(200)
  expect(res.body).toBeNull()
})

test("a GET of the health path is answered 200 with the body ok", async () => {
  const rig = startedProxy()
  const res = await rig.answering(0)(requested("/healthz"), rig.listening(0))
  expect(res.status).toBe(200)
  expect(await res.text()).toBe("ok")
})

test("the in-flight path names the count and what the hold registry counts", async () => {
  const rig = startedProxy()
  expect(await snapshotOf(rig)).toEqual({ inFlight: 0, heldCount: 0, oldestHeldMs: null })
})

test("the remote-control status path names the connection count", async () => {
  const rig = startedProxy()
  expect(await rcOf(rig)).toBe(0)
})

test("a POST of the messages path is handed to the pipeline", async () => {
  const rig = startedProxy()
  await rig.answering(0)(requested("/v1/messages", POSTED), rig.listening(0))
  expect(rig.turns.length).toBe(1)
  expect(rig.turns[0]?.pathname).toBe("/v1/messages")
})

test("a POST of the count-tokens path is handed to the pipeline", async () => {
  const rig = startedProxy()
  await rig.answering(0)(requested("/v1/messages/count_tokens", POSTED), rig.listening(0))
  expect(rig.turns[0]?.pathname).toBe("/v1/messages/count_tokens")
})

test("a path no route here names is forwarded upstream", async () => {
  const rig = startedProxy()
  const res = await rig.answering(0)(requested("/v1/models"), rig.listening(0))
  expect(res.status).toBe(200)
  expect(rig.sent[0]?.url).toBe("https://api.anthropic.com/v1/models")
  expect(rig.turns).toEqual([])
})

test("a method a route does not name is forwarded upstream", async () => {
  const rig = startedProxy()
  await rig.answering(0)(requested("/healthz", { method: "POST", body: "x" }), rig.listening(0))
  expect(rig.sent[0]?.url).toBe("https://api.anthropic.com/healthz")
})

test("every request is written about before a route is chosen", async () => {
  const rig = startedProxy()
  await rig.answering(0)(requested("/healthz"), rig.listening(0))
  await rig.answering(0)(requested("/rc-status"), rig.listening(0))
  expect(rig.lines).toEqual([
    "[oauth-proxy] req GET /healthz auth=no",
    "[oauth-proxy] req GET /rc-status auth=no",
  ])
})

test("the line written for a request says whether an authorization header arrived", async () => {
  const rig = startedProxy()
  const req = requested("/healthz", { headers: { authorization: "Bearer invented-value" } })
  await rig.answering(0)(req, rig.listening(0))
  expect(rig.lines[0]).toBe("[oauth-proxy] req GET /healthz auth=yes")
})

test("a request reaching the message handler is given no server timeout", async () => {
  const rig = startedProxy()
  const req = requested("/v1/messages", POSTED)
  await rig.answering(0)(req, rig.listening(0))
  expect(rig.timeouts.length).toBe(1)
  expect(rig.timeouts[0]?.seconds).toBe(0)
  expect(rig.timeouts[0]?.req).toBe(req)
})

test("a request reaching the message handler raises the in-flight count", async () => {
  const gate = gated()
  const rig = startedProxy({ answered: () => gate.waited })
  const serving = rig.answering(0)(requested("/v1/messages", POSTED), rig.listening(0))
  await ticked()
  expect(await inFlightOf(rig)).toBe(1)
  gate.open(new Response(null, { status: 204 }))
  await serving
})

test("a response carrying no body lowers the in-flight count", async () => {
  const rig = startedProxy()
  await rig.answering(0)(requested("/v1/messages", POSTED), rig.listening(0))
  expect(await inFlightOf(rig)).toBe(0)
})

test("a response leaving the slot empty lowers the in-flight count", async () => {
  const rig = startedProxy({ answered: async () => new Response("body", { status: 200 }) })
  const res = await rig.answering(0)(requested("/v1/messages", POSTED), rig.listening(0))
  expect(res.status).toBe(200)
  expect(await inFlightOf(rig)).toBe(0)
})

test("a response carrying a body arms the observer to lower the in-flight count", async () => {
  const held = heldObserver()
  const rig = rigged({
    answered: async (turn) => {
      turn.observerSlot.current = held.observer
      return new Response("streaming", { status: 200 })
    },
  })
  startOAuthProxy(optionsOf(), rig.doors)
  await rig.answering(0)(requested("/v1/messages", POSTED), rig.listening(0))
  expect(held.armed().length).toBe(1)
  expect(await inFlightOf(rig)).toBe(1)
  held.armed()[0]?.()
  expect(await inFlightOf(rig)).toBe(0)
})

test("a slot holding an observer nothing armed is emptied", async () => {
  const held = heldObserver()
  const rig = rigged({
    answered: async (turn) => {
      turn.observerSlot.current = held.observer
      return new Response(null, { status: 204 })
    },
  })
  startOAuthProxy(optionsOf(), rig.doors)
  await rig.answering(0)(requested("/v1/messages", POSTED), rig.listening(0))
  expect(held.disconnects()).toEqual(["fetch_handler_exit"])
  expect(rig.turns[0]?.observerSlot.current).toBeNull()
})

test("a client that aborts ends the observer as a client disconnect", async () => {
  const held = heldObserver()
  const gate = gated()
  const control = new AbortController()
  const rig = rigged({
    answered: (turn) => {
      turn.observerSlot.current = held.observer
      return gate.waited
    },
  })
  startOAuthProxy(optionsOf(), rig.doors)
  const req = requested("/v1/messages", { ...POSTED, signal: control.signal })
  const serving = rig.answering(0)(req, rig.listening(0))
  await ticked()
  control.abort()
  expect(held.disconnects()[0]).toBe("client_abort")
  expect(await inFlightOf(rig)).toBe(0)
  gate.open(new Response(null, { status: 204 }))
  await serving
})

test("the in-flight count is lowered once however many ends are reached", async () => {
  const held = heldObserver()
  const control = new AbortController()
  const rig = rigged({
    answered: async (turn) => {
      turn.observerSlot.current = held.observer
      control.abort()
      return new Response(null, { status: 204 })
    },
  })
  startOAuthProxy(optionsOf(), rig.doors)
  const req = requested("/v1/messages", { ...POSTED, signal: control.signal })
  await rig.answering(0)(req, rig.listening(0))
  expect(await inFlightOf(rig)).toBe(0)
})

test("a request forwarded over the remote-control listener raises the connection count", async () => {
  const held = streamedUpstream()
  const rig = startedProxy({ upstream: held.upstream }, { unixSocketPath: SOCKET_PATH })
  const res = await rig.answering(1)(requested("/v1/models"), rig.listening(1))
  expect(await rcOf(rig)).toBe(1)
  held.close()
  expect(await res.text()).toBe("first")
  expect(await rcOf(rig)).toBe(0)
})

test("a request forwarded over the port raises no connection count", async () => {
  const rig = startedProxy({}, { unixSocketPath: SOCKET_PATH })
  await rig.answering(0)(requested("/v1/models"), rig.listening(0))
  expect(await rcOf(rig)).toBe(0)
})

test("a flush ends every stream the shutdown registry holds", async () => {
  const held = streamedUpstream()
  const rig = rigged({ upstream: held.upstream })
  const proxy = startOAuthProxy(optionsOf({ unixSocketPath: SOCKET_PATH }), rig.doors)
  await rig.answering(1)(requested("/v1/models"), rig.listening(1))
  expect(await rcOf(rig)).toBe(1)
  proxy.flushAll("SIGTERM")
  expect(await rcOf(rig)).toBe(0)
  held.close()
})

test("a request carrying a body is read into one buffer before it is forwarded", async () => {
  const rig = startedProxy()
  const req = requested("/v1/models", { method: "PUT", body: "hello" })
  await rig.answering(0)(req, rig.listening(0))
  const body = rig.sent[0]?.init.body
  expect(body instanceof ArrayBuffer).toBe(true)
  expect(body instanceof ArrayBuffer ? new TextDecoder().decode(body) : null).toBe("hello")
})

test("a forwarded request is sent with no access token of its own", async () => {
  const rig = startedProxy()
  const req = requested("/v1/models", { headers: { authorization: "Bearer invented-value" } })
  await rig.answering(0)(req, rig.listening(0))
  const headers = rig.sent[0]?.init.headers
  expect(headers instanceof Headers ? headers.get("authorization") : null).toBe(
    "Bearer invented-value"
  )
})

test("an idle span the caller names nowhere reaches the forward as zero", async () => {
  const rig = startedProxy()
  await rig.answering(0)(requested("/v1/messages"), rig.listening(0))
  expect(rig.sent[0]?.init.signal).toBeUndefined()
})

test("an idle span the caller names reaches the forward", async () => {
  const rig = startedProxy({}, { upstreamIdleTimeoutMs: 5000 })
  await rig.answering(0)(requested("/v1/messages"), rig.listening(0))
  expect(rig.sent[0]?.init.signal).toBeInstanceOf(AbortSignal)
})

test("a port meeting EADDRINUSE is bound again through bind-with-retry", () => {
  const rig = rigged({ bindRefusals: 1 })
  const proxy = startOAuthProxy(optionsOf(), rig.doors)
  expect(proxy.port).toBe(PORT)
  expect(rig.opened.length).toBe(1)
})

test("a listener answering no port is stopped and throws", () => {
  const rig = rigged({ noPort: true })
  expect(() => startOAuthProxy(optionsOf(), rig.doors)).toThrow("answered no port")
  expect(rig.stopped).toEqual([0])
})

test("a unix socket path is cleared before the remote-control listener is opened", () => {
  const rig = startedProxy({}, { unixSocketPath: SOCKET_PATH })
  expect(rig.cleared).toEqual([SOCKET_PATH])
  expect(rig.opened.length).toBe(2)
  expect(rig.warnings).toContain(
    `[oauth-proxy] remote-control unix socket listening at ${SOCKET_PATH}`
  )
})

test("a gateway named no unix socket path opens one listener", () => {
  const rig = startedProxy()
  expect(rig.opened.length).toBe(1)
  expect(rig.cleared).toEqual([])
})

test("a remote-control listener that throws leaves the port listener serving", async () => {
  const rig = rigged({ openRefused: true })
  const proxy = startOAuthProxy(optionsOf({ unixSocketPath: SOCKET_PATH }), rig.doors)
  expect(proxy.port).toBe(PORT)
  expect(rig.opened.length).toBe(1)
  expect(rig.warnings.some((line) => line.includes("remote-control unix bind failed"))).toBe(true)
  const res = await rig.answering(0)(requested("/healthz"), rig.listening(0))
  expect(res.status).toBe(200)
})

test("stopping a gateway stops both listeners and takes the socket path away", () => {
  const rig = rigged()
  const proxy = startOAuthProxy(optionsOf({ unixSocketPath: SOCKET_PATH }), rig.doors)
  proxy.stop()
  expect(rig.stopped).toEqual([0, 1])
  expect(rig.removed).toEqual([SOCKET_PATH])
})

test("the unix socket path goes away even where stopping that listener throws", () => {
  const rig = rigged({ stopRefused: true })
  const proxy = startOAuthProxy(optionsOf({ unixSocketPath: SOCKET_PATH }), rig.doors)
  expect(() => proxy.stop()).toThrow("stop refused")
  expect(rig.removed).toEqual([SOCKET_PATH])
})

test("a gateway with no unix socket path takes no socket path away", () => {
  const rig = rigged()
  startOAuthProxy(optionsOf(), rig.doors).stop()
  expect(rig.stopped).toEqual([0])
  expect(rig.removed).toEqual([])
})

test("a gateway whose remote-control listener never opened takes no socket path away", () => {
  const rig = rigged({ openRefused: true })
  startOAuthProxy(optionsOf({ unixSocketPath: SOCKET_PATH }), rig.doors).stop()
  expect(rig.removed).toEqual([])
})

test("the port handed back is the port the listener bound", () => {
  const rig = rigged()
  expect(startOAuthProxy(optionsOf({ port: 0 }), rig.doors).port).toBe(PORT)
})

test("the effects handed in are reached rather than effects built from the root", () => {
  const rig = startedProxy()
  expect(rig.parts[0]?.oauth).toBe(STUB_OAUTH)
})

test("the effects are built from the root where the caller hands none in", () => {
  const rig = startedProxy({}, { oauth: undefined })
  expect(rig.parts[0]?.oauth).not.toBe(STUB_OAUTH)
  expect(typeof rig.parts[0]?.oauth.getBestCredential).toBe("function")
})

test("the log prefix is the oauth-proxy prefix where the caller names none", () => {
  const rig = startedProxy()
  expect(rig.parts[0]?.logPrefix).toBe("[oauth-proxy]")
  expect(rig.warnings).toContain(`[oauth-proxy] listening on http://localhost:${PORT}`)
})

test("a log prefix the caller names is written on every line", async () => {
  const rig = startedProxy({}, { logPrefix: "[named]" })
  await rig.answering(0)(requested("/healthz"), rig.listening(0))
  expect(rig.parts[0]?.logPrefix).toBe("[named]")
  expect(rig.lines[0]).toBe("[named] req GET /healthz auth=no")
  expect(rig.warnings).toContain(`[named] listening on http://localhost:${PORT}`)
})

test("the pipeline is built once with the forward and the hold registry", () => {
  const rig = startedProxy()
  expect(rig.parts.length).toBe(1)
  expect(typeof rig.parts[0]?.forward).toBe("function")
  expect(typeof rig.parts[0]?.holds.snapshot).toBe("function")
  expect(rig.parts[0]?.logAt).toBeUndefined()
})

test("the clock is handed in so a test needs no real time", async () => {
  const rig = startedProxy()
  await snapshotOf(rig)
  expect(rig.asked()).toBeGreaterThan(0)
})

test("nothing the pipeline throws reaches the caller of a route", async () => {
  const rig = startedProxy({ answered: () => Promise.reject(new Error("the pipeline is refused")) })
  const res = await rig.answering(0)(requested("/v1/messages", POSTED), rig.listening(0))
  expect(res.status).toBe(502)
  expect(rig.thrown.length).toBe(1)
  expect(await inFlightOf(rig)).toBe(0)
})

test("the pipeline is handed the clock, the sleep and the saying seam", () => {
  const rig = startedProxy()
  expect(rig.parts[0]?.now).toBe(rig.doors.now)
  expect(rig.parts[0]?.slept).toBe(rig.doors.slept)
  expect(rig.parts[0]?.said).toBe(rig.doors.said)
})

test("a turn runs through the pipeline named here where the caller hands none in", async () => {
  const rig = startedProxy({ named: true })
  const res = await rig.answering(0)(requested("/v1/messages", POSTED), rig.listening(0))
  expect(res.status).toBe(429)
  expect(rig.turns).toEqual([])
})
