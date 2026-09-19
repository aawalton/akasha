import { afterAll, expect, test } from "bun:test"
import {
  ATTEMPTS,
  brokeOff,
  connectionRefused,
  notAnswering,
  originOf,
  ranIn,
  roundAsked,
  type Sending,
} from "akasha/check/modules/audit-calling/audit-calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const scratch = scratchWorld()

afterAll(scratch.sweep)

const CLEAN = { commit: "abc", ranAt: "2026-09-11T00:00:00.000Z", refusals: [], unrun: false }

const A_RUN = { check: "typecheck", verdict: CLEAN, ran: true }

const AT = "abc123"

const neverWaits = (): Promise<void> => Promise.resolve()

function refusing(): Error & { code: string } {
  return Object.assign(new Error("Unable to connect."), { code: "ConnectionRefused" })
}

function answering(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

test("a round is asked for at the loopback address on the port it was handed", () => {
  expect(originOf(8788)).toBe("http://127.0.0.1:8788/round")
})

test("a connection the service refused is told apart from anything else thrown", () => {
  expect(connectionRefused(refusing())).toBe(true)
  expect(connectionRefused(new Error("The operation timed out."))).toBe(false)
  expect(connectionRefused(null)).toBe(false)
})

test("a round the service answered carries its runs back", () => {
  expect(ranIn({ ran: [A_RUN], turned: [], refused: [] })).toEqual({ ran: [A_RUN] })
})

test("a refusal the service answered is carried back as it was written", () => {
  expect(ranIn({ refused: "a round is asked for by a JSON object" })).toEqual({
    refused: "a round is asked for by a JSON object",
  })
})

test("an answer naming no runs is refused rather than read as a round that ran none", () => {
  expect(ranIn({ turned: [] })).toEqual({
    refused: "the audit service answered a round naming no runs",
  })
  expect(ranIn([])).toEqual({
    refused: "the audit service answered a round with something no runs read out of",
  })
})

test("the refusal for a service answering nothing names the deploy and no unit", () => {
  const said = notAnswering(originOf(8788))
  expect(said).toContain("nothing is listening at `http://127.0.0.1:8788/round`")
  expect(said).toContain("akasha deploy service-workstation")
  expect(said).not.toContain("systemctl")
  expect(said).not.toContain("systemd")
  expect(said.charAt(0)).toBe(said.charAt(0).toLowerCase())
})

test("a round that broke off part way says what broke rather than that nothing listens", () => {
  const said = brokeOff(originOf(8788), new Error("The operation timed out."))
  expect(said).toContain("did not answer")
  expect(said).toContain("The operation timed out.")
  expect(said).not.toContain("akasha deploy")
})

test("a page stating no port leaves the round unasked and says so", async () => {
  const held = await roundAsked(scratch.rootFor("akasha-audit-calling-bare-"), [], AT, () => {
    throw new Error("a round was asked for where no port is stated")
  })
  expect(held).toEqual({ refused: expect.stringContaining("no page states the port") })
})

test("the checks asked for reach the service as the body of one call", async () => {
  const bodies: string[] = []
  const held = await roundAsked(
    ROOT,
    ["typecheck"],
    AT,
    (_url, init) => {
      bodies.push(String(init.body))
      return Promise.resolve(answering({ ran: [A_RUN], turned: [], refused: [] }))
    },
    neverWaits
  )
  expect(bodies).toEqual(['{"checks":["typecheck"],"commit":"abc123"}'])
  expect(held).toEqual({ ran: [A_RUN] })
})

test("the commit the caller needs judged reaches the service in that same body", async () => {
  const bodies: string[] = []
  await roundAsked(
    ROOT,
    [],
    "def456",
    (_url, init) => {
      bodies.push(String(init.body))
      return Promise.resolve(answering({ ran: [A_RUN], turned: [], refused: [] }))
    },
    neverWaits
  )
  expect(bodies).toEqual(['{"checks":[],"commit":"def456"}'])
})

test("the wait the runtime puts on a request of its own accord is turned off", async () => {
  const sent: Sending[] = []
  await roundAsked(
    ROOT,
    [],
    AT,
    (_url, init) => {
      sent.push(init)
      return Promise.resolve(answering({ ran: [A_RUN], turned: [], refused: [] }))
    },
    neverWaits
  )
  expect(sent[0]?.timeout).toBe(false)
  expect(sent[0]?.signal?.aborted).toBe(false)
})

test("a connection the service refused is asked again, three times in all", async () => {
  let tries = 0
  const held = await roundAsked(
    ROOT,
    [],
    AT,
    () => {
      tries += 1
      throw refusing()
    },
    neverWaits
  )
  expect(tries).toBe(ATTEMPTS)
  expect(held).toEqual({ refused: expect.stringContaining("nothing is listening at") })
})

test("a service that answers on a later try is not refused", async () => {
  let tries = 0
  const held = await roundAsked(
    ROOT,
    [],
    AT,
    () => {
      tries += 1
      if (tries < ATTEMPTS) throw refusing()
      return Promise.resolve(answering({ ran: [A_RUN], turned: [], refused: [] }))
    },
    neverWaits
  )
  expect(held).toEqual({ ran: [A_RUN] })
})

test("a round still working is waited on rather than asked for a second time", async () => {
  let tries = 0
  const held = await roundAsked(
    ROOT,
    [],
    AT,
    () => {
      tries += 1
      throw new Error("The operation timed out.")
    },
    neverWaits
  )
  expect(tries).toBe(1)
  expect(held).toEqual({ refused: expect.stringContaining("The operation timed out.") })
})
