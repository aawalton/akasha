import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import type { AppLoadContext } from "react-router"
import { z } from "zod"
import { RELAY_SECRET_HEADER } from "~/readout-credential/lib/readout-credential.server"

const RELAY_SECRET = "relay-secret-under-nobodys-user-id"

const optionalEnv = z.string().optional()

const anyObject = z.record(z.string(), z.unknown())

type ReadoutLoaderArgs = {
  request: Request
  url: URL
  params: Record<string, string | undefined>
  pattern: string
  context: AppLoadContext
}
type ReadoutLoader = (args: ReadoutLoaderArgs) => Promise<Response>

const RING: readonly [string, ReadoutLoader] = [
  "/api/categorization",
  (await import("./api.categorization")).loader,
]

const NOT_THE_RING: readonly (readonly [string, ReadoutLoader])[] = [
  ["/api/values-stoplights", (await import("./api.values-stoplights")).loader],
  ["/api/persona-stoplights", (await import("./api.persona-stoplights")).loader],
  ["/api/claude-usage", (await import("./api.claude-usage")).loader],
  ["/api/inbox-stoplights", (await import("./api.inbox-stoplights")).loader],
  ["/api/habit-stoplights", (await import("./api.habit-stoplights")).loader],
]

const argsFor = (path: string, headers: Record<string, string>): ReadoutLoaderArgs => {
  const request = new Request(`https://alanwalton.com${path}`, { headers })
  return { request, url: new URL(request.url), params: {}, pattern: path, context: {} }
}

const THREW_SO_IT_GOT_PAST_THE_GATE = 200

const statusOf = (loader: ReadoutLoader, path: string, headers: Record<string, string>) =>
  loader(argsFor(path, headers)).then(
    (response) => response.status,
    () => THREW_SO_IT_GOT_PAST_THE_GATE
  )

const realRelaySecret = optionalEnv.parse(process.env.SMILINGJENNY_RELAY_SECRET)
const realMonarchCookie = optionalEnv.parse(process.env.MONARCH_COOKIE)

beforeEach(() => {
  process.env.SMILINGJENNY_RELAY_SECRET = RELAY_SECRET
  process.env.MONARCH_COOKIE = ""
})

afterEach(() => {
  restore("SMILINGJENNY_RELAY_SECRET", realRelaySecret)
  restore("MONARCH_COOKIE", realMonarchCookie)
})

function restore(name: string, value: string | undefined): undefined {
  if (value === undefined) delete process.env[name]
  else process.env[name] = value
}

describe("the ring feed admits the relay", () => {
  test("does not refuse a caller presenting X-Relay-Secret", async () => {
    expect(await statusOf(RING[1], RING[0], { [RELAY_SECRET_HEADER]: RELAY_SECRET })).not.toBe(401)
  })

  test("refuses a caller presenting the wrong value in that header", async () => {
    expect(await statusOf(RING[1], RING[0], { [RELAY_SECRET_HEADER]: "wrong" })).toBe(401)
  })

  test("refuses the right value when no relay secret is configured in the pod", async () => {
    delete process.env.SMILINGJENNY_RELAY_SECRET
    expect(await statusOf(RING[1], RING[0], { [RELAY_SECRET_HEADER]: RELAY_SECRET })).toBe(401)
  })

  test("refuses a caller holding no credential at all", async () => {
    expect(await statusOf(RING[1], RING[0], {})).toBe(401)
  })
})

describe("the ring feed answers no counts rather than zero ones", () => {
  const admitted = () => argsFor(RING[0], { [RELAY_SECRET_HEADER]: RELAY_SECRET })

  test("answers 503 when it holds no reading", async () => {
    const response = await RING[1](admitted())
    expect(response.status).toBe(503)
    expect(response.headers.get("Cache-Control")).toBe("no-store")
  })

  test("sends no counts with it, so zero cannot pass for an empty backlog", async () => {
    const body = anyObject.parse(await RING[1](admitted()).then((r) => r.json()))
    expect(body["unreviewed"]).toBeUndefined()
    expect(body["total"]).toBeUndefined()
    expect(body["intake"]).toBeUndefined()
  })
})

describe("the other six readout feeds do not admit the relay credential", () => {
  for (const [path, loader] of NOT_THE_RING) {
    test(`${path} answers 401 to a caller presenting X-Relay-Secret`, async () => {
      expect(await statusOf(loader, path, { [RELAY_SECRET_HEADER]: RELAY_SECRET })).toBe(401)
    })
  }
})
