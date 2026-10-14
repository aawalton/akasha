import { afterEach, describe, expect, mock, spyOn, test } from "bun:test"
import {
  fetchRingCountsFromMonarch,
  waitAfterAnswer,
} from "akasha/alan/harness/monarch/readouts/unreviewed-transactions/monarch-unreviewed-transactions.readout.reading.code.ts"
import { z } from "zod"

const COOKIE = "sessionid=abc; csrftoken=tok-123; theme=dark"

const NOW = new Date("2026-03-01T12:00:00.000Z")

type Sent = {
  url: string
  method: string | undefined
  headers: Record<string, string>
  backlog: Record<string, unknown>
  query: string
  signal: AbortSignal | null | undefined
}

type FetchStub = (asked: string | URL | Request, sent?: RequestInit) => Promise<Response>

const POSTED = z.looseObject({
  query: z.string(),
  variables: z.looseObject({ backlog: z.record(z.string(), z.unknown()) }),
})

const SENT: Sent[] = []

function stubbing(stub: FetchStub): undefined {
  spyOn(globalThis, "fetch").mockImplementation(stub as typeof fetch)
}

function counted(unreviewed: number): unknown {
  return { data: { unreviewed: { totalCount: unreviewed } } }
}

function answering(body: unknown, init: ResponseInit = {}): undefined {
  stubbing(async (url, sent = {}) => {
    const posted = POSTED.parse(JSON.parse(String(sent.body)))
    SENT.push({
      url: String(url),
      method: sent.method,
      headers: sent.headers as Record<string, string>,
      backlog: posted.variables.backlog,
      query: posted.query,
      signal: sent.signal,
    })
    return new Response(JSON.stringify(body), { status: 200, ...init })
  })
}

function onlyCall(): Sent {
  expect(SENT).toHaveLength(1)
  const only = SENT[0]
  if (only === undefined) throw new Error("no call was made")
  return only
}

afterEach(() => {
  SENT.length = 0
  mock.restore()
})

describe("The count Monarch answers with is what comes back.", () => {
  test("the total count is carried through", async () => {
    answering(counted(7))
    expect(await fetchRingCountsFromMonarch(COOKIE, NOW)).toEqual({ unreviewed: 7 })
  })

  test("a count of zero comes back as zero", async () => {
    answering(counted(0))
    expect(await fetchRingCountsFromMonarch(COOKIE, NOW)).toEqual({ unreviewed: 0 })
  })

  test("nothing but the count comes back", async () => {
    answering(counted(3))
    const counts = await fetchRingCountsFromMonarch(COOKIE, NOW)
    expect(Object.keys(counts)).toEqual(["unreviewed"])
  })
})

describe("Unreviewed is counted over the year behind the reading.", () => {
  test("the window ends on the day of the reading", async () => {
    answering(counted(1))
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    expect(onlyCall().backlog.endDate).toBe("2026-03-01")
  })

  test("the window starts three hundred and sixty-five days earlier", async () => {
    answering(counted(1))
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    expect(onlyCall().backlog.startDate).toBe("2025-03-01")
  })

  test("the window moves with the reading rather than sitting still", async () => {
    answering(counted(1))
    await fetchRingCountsFromMonarch(COOKIE, new Date("2026-09-13T00:00:00.000Z"))
    expect(onlyCall().backlog).toMatchObject({
      startDate: "2025-09-13",
      endDate: "2026-09-13",
    })
  })

  test("the window is named by day and carries no time of day", async () => {
    answering(counted(1))
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    const asked = onlyCall().backlog
    expect(String(asked.startDate)).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(String(asked.endDate)).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})

describe("Only settled transactions are counted.", () => {
  test("the filters refuse pending transactions", async () => {
    answering(counted(1))
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    expect(onlyCall().backlog.isPending).toBe(false)
  })

  test("the filters ask only for what needs review", async () => {
    answering(counted(1))
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    expect(onlyCall().backlog.needsReview).toBe(true)
  })
})

describe("The whole Cookie header is taken in.", () => {
  test("the cookie handed in is the cookie sent", async () => {
    answering(counted(1))
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    expect(onlyCall().headers.Cookie).toBe(COOKIE)
  })

  test("no part of the cookie is dropped on the way", async () => {
    const longer = `${COOKIE}; extra=kept`
    answering(counted(1))
    await fetchRingCountsFromMonarch(longer, NOW)
    expect(onlyCall().headers.Cookie).toBe(longer)
  })
})

describe("The X-CSRFToken header is split out of its `csrftoken=` value.", () => {
  test("the token is the value of the csrftoken part", async () => {
    answering(counted(1))
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    expect(onlyCall().headers["X-CSRFToken"]).toBe("tok-123")
  })

  test("a part of the cookie named elsewhere is not mistaken for the token", async () => {
    answering(counted(1))
    await fetchRingCountsFromMonarch("xcsrftoken=wrong; csrftoken=right", NOW)
    expect(onlyCall().headers["X-CSRFToken"]).toBe("right")
  })

  test("a cookie carrying no csrftoken is refused before any call", async () => {
    answering(counted(1))
    await expect(fetchRingCountsFromMonarch("sessionid=abc", NOW)).rejects.toThrow()
    expect(SENT).toHaveLength(0)
  })

  test("a cookie whose csrftoken is empty names the cookie in its refusal", async () => {
    answering(counted(1))
    await expect(fetchRingCountsFromMonarch("csrftoken=", NOW)).rejects.toThrow("MONARCH_COOKIE")
    expect(SENT).toHaveLength(0)
  })
})

describe("A Monarch answer that is not OK is refused.", () => {
  test("a 403 throws and names the status", async () => {
    answering(counted(1), { status: 403 })
    await expect(fetchRingCountsFromMonarch(COOKIE, NOW)).rejects.toThrow("403")
  })

  test("a 403 is blamed on the credential and asked once", async () => {
    answering(counted(1), { status: 403 })
    await expect(fetchRingCountsFromMonarch(COOKIE, NOW)).rejects.toThrow("dead credential")
    expect(SENT).toHaveLength(1)
  })

  test("a 500 throws even where the body holds a count", async () => {
    spyOn(Bun, "sleep").mockResolvedValue(undefined)
    answering(counted(9), { status: 500 })
    await expect(fetchRingCountsFromMonarch(COOKIE, NOW)).rejects.toThrow("500")
  })

  test("a 502 is blamed on Monarch rather than the credential", async () => {
    spyOn(Bun, "sleep").mockResolvedValue(undefined)
    answering(counted(9), { status: 502 })
    await expect(fetchRingCountsFromMonarch(COOKIE, NOW)).rejects.toThrow("Monarch's side")
  })

  test("an answer carrying no count throws", async () => {
    answering({ errors: [{ message: "refused" }] })
    await expect(fetchRingCountsFromMonarch(COOKIE, NOW)).rejects.toThrow("no count")
  })

  test("a count below zero throws", async () => {
    answering({ data: { unreviewed: { totalCount: -1 } } })
    await expect(fetchRingCountsFromMonarch(COOKIE, NOW)).rejects.toThrow("no count")
  })
})

describe("A fault on Monarch's side or a dropped connection is asked again before the reading fails.", () => {
  test("a 5xx waits 2, 5 and 10 seconds and then stops", () => {
    expect([0, 1, 2, 3].map((tried) => waitAfterAnswer(502, tried))).toEqual([
      2_000,
      5_000,
      10_000,
      null,
    ])
  })

  test("an answer below 500 is never asked again", () => {
    expect(waitAfterAnswer(401, 0)).toBeNull()
    expect(waitAfterAnswer(403, 0)).toBeNull()
    expect(waitAfterAnswer(429, 0)).toBeNull()
  })

  test("a 502 followed by a count comes back as the count", async () => {
    const slept = spyOn(Bun, "sleep").mockResolvedValue(undefined)
    let asked = 0
    stubbing(async () => {
      asked += 1
      return asked === 1
        ? new Response("bad gateway", { status: 502 })
        : new Response(JSON.stringify(counted(84)))
    })
    expect(await fetchRingCountsFromMonarch(COOKIE, NOW)).toEqual({ unreviewed: 84 })
    expect(asked).toBe(2)
    expect(slept).toHaveBeenCalledTimes(1)
  })

  test("a 502 that never clears is asked four times in all", async () => {
    spyOn(Bun, "sleep").mockResolvedValue(undefined)
    answering(counted(1), { status: 502 })
    await expect(fetchRingCountsFromMonarch(COOKIE, NOW)).rejects.toThrow("502")
    expect(SENT).toHaveLength(4)
  })

  test("a dropped connection waits 2, 5 and 10 seconds and then stops", () => {
    expect([0, 1, 2, 3].map((tried) => waitAfterAnswer(null, tried))).toEqual([
      2_000,
      5_000,
      10_000,
      null,
    ])
  })

  test("a dropped connection followed by a count comes back as the count", async () => {
    const slept = spyOn(Bun, "sleep").mockResolvedValue(undefined)
    let asked = 0
    stubbing(async () => {
      asked += 1
      if (asked === 1) {
        throw Object.assign(new Error("The socket connection was closed unexpectedly"), {
          code: "ECONNRESET",
        })
      }
      return new Response(JSON.stringify(counted(84)))
    })
    expect(await fetchRingCountsFromMonarch(COOKIE, NOW)).toEqual({ unreviewed: 84 })
    expect(asked).toBe(2)
    expect(slept).toHaveBeenCalledTimes(1)
  })

  test("a connection that always drops is asked four times in all", async () => {
    spyOn(Bun, "sleep").mockResolvedValue(undefined)
    let asked = 0
    stubbing(async () => {
      asked += 1
      throw new Error("The socket connection was closed unexpectedly")
    })
    await expect(fetchRingCountsFromMonarch(COOKIE, NOW)).rejects.toThrow("could not be reached")
    expect(asked).toBe(4)
  })
})

describe("A call gives up after ten seconds.", () => {
  test("the call carries an abort signal", async () => {
    answering(counted(1))
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    expect(onlyCall().signal).toBeInstanceOf(AbortSignal)
  })

  test("the signal has not fired while the call is in flight", async () => {
    answering(counted(1))
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    expect(onlyCall().signal?.aborted).toBe(false)
  })
})

describe("Nothing here caches a reading or decides when a reading is taken.", () => {
  test("every reading asks Monarch again", async () => {
    answering(counted(4))
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    expect(SENT).toHaveLength(2)
  })

  test("a second reading carries what the second call answered", async () => {
    let answered = 0
    stubbing(async () => {
      answered += 1
      return new Response(JSON.stringify(counted(answered)))
    })
    expect(await fetchRingCountsFromMonarch(COOKIE, NOW)).toEqual({ unreviewed: 1 })
    expect(await fetchRingCountsFromMonarch(COOKIE, NOW)).toEqual({ unreviewed: 2 })
  })
})

describe("Nothing is counted that is not shown.", () => {
  test("one count is asked for and one comes back", async () => {
    answering(counted(2))
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    expect(onlyCall().query.split("totalCount").length - 1).toBe(1)
  })

  test("the ring query is posted to Monarch's graphql endpoint", async () => {
    answering(counted(2))
    await fetchRingCountsFromMonarch(COOKIE, NOW)
    expect(onlyCall().url).toBe("https://api.monarch.com/graphql")
    expect(onlyCall().method).toBe("POST")
  })
})
