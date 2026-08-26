import { describe, expect, test } from "bun:test"
import { answerIn, askedUrl, askOverHttp } from "./ask-over-http.ts"

const ORIGIN = "http://127.0.0.1:8787"

function replying(body: unknown, status = 200): (url: string) => Promise<Response> {
  return async () =>
    new Response(typeof body === "string" ? body : JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    })
}

describe("askedUrl spells the query service's route", () => {
  test("a query taking nothing carries no question mark", () => {
    expect(askedUrl(ORIGIN, "persona-all", {})).toBe(`${ORIGIN}/q/persona-all`)
  })

  test("a stated argument rides the query string", () => {
    expect(askedUrl(ORIGIN, "persona-days-on-day", { date: "2026-08-26" })).toBe(
      `${ORIGIN}/q/persona-days-on-day?date=2026-08-26`
    )
  })

  test("a repeated argument is appended once per value", () => {
    expect(askedUrl(ORIGIN, "readouts", { group: ["upkeep", "safety"] })).toBe(
      `${ORIGIN}/q/readouts?group=upkeep&group=safety`
    )
  })

  test("a value needing escaping is escaped rather than written raw", () => {
    expect(askedUrl(ORIGIN, "q", { name: "a b&c" })).toBe(`${ORIGIN}/q/q?name=a+b%26c`)
  })
})

describe("answerIn reads the envelope without trusting it", () => {
  test("a whole answer comes back whole", () => {
    expect(
      answerIn({
        n: 2,
        value: 7,
        over: 3,
        rows: [{ at: "a", values: { slug: "x" } }, { values: { slug: "y" } }],
        faults: ["nope"],
        omitted: ["do"],
        unfound: ["gone"],
      })
    ).toEqual({
      n: 2,
      value: 7,
      over: 3,
      rows: [{ at: "a", values: { slug: "x" } }, { values: { slug: "y" } }],
      faults: ["nope"],
      omitted: ["do"],
      unfound: ["gone"],
    })
  })

  test("an empty body reads as an answer over nothing rather than throwing", () => {
    expect(answerIn({})).toEqual({
      n: 0,
      value: null,
      over: null,
      rows: [],
      faults: [],
      omitted: [],
      unfound: [],
    })
  })

  test("a body that is not an object reads the same way", () => {
    expect(answerIn(null).n).toBe(0)
    expect(answerIn("nope").rows).toEqual([])
  })

  test("a row carrying no values is dropped rather than admitted half-formed", () => {
    expect(answerIn({ rows: [{ at: "a" }, 4, null, { values: { k: 1 } }] }).rows).toEqual([
      { values: { k: 1 } },
    ])
  })

  test("a value that is not a finite number reads as nothing", () => {
    expect(answerIn({ value: "7" }).value).toBeNull()
    expect(answerIn({ over: Number.NaN }).over).toBeNull()
  })

  test("a fault list holding what is not a string keeps only the strings", () => {
    expect(answerIn({ faults: ["a", 2, null, "b"] }).faults).toEqual(["a", "b"])
  })
})

describe("askOverHttp asks and hands back what answered", () => {
  test("an answering service becomes a QueryAnswer", async () => {
    const ask = askOverHttp(ORIGIN, replying({ n: 1, value: 5, over: 1 }))
    expect(await ask("persona-all", {})).toMatchObject({ n: 1, value: 5, over: 1 })
  })

  test("the url it asks carries the given arguments", async () => {
    const seen: string[] = []
    const ask = askOverHttp(ORIGIN, async (url) => {
      seen.push(url)
      return new Response("{}", { status: 200 })
    })
    await ask("on-day", { date: "2026-08-26" })
    expect(seen).toEqual([`${ORIGIN}/q/on-day?date=2026-08-26`])
  })

  test("a refusing status throws, naming the query and the status", async () => {
    const ask = askOverHttp(ORIGIN, replying({}, 503))
    expect(ask("persona-all", {})).rejects.toThrow(/`persona-all` went unanswered.*503/)
  })

  test("a reply that is not JSON throws rather than reading as empty", async () => {
    const ask = askOverHttp(ORIGIN, replying("<html>down</html>"))
    expect(ask("persona-all", {})).rejects.toThrow(/replied with what is not JSON/)
  })

  test("a service that never answers throws, naming the ceiling it waited", async () => {
    const ask = askOverHttp(
      ORIGIN,
      async () => {
        throw new Error("connection refused")
      },
      250
    )
    expect(ask("persona-all", {})).rejects.toThrow(/went unasked.*within 250ms/)
  })
})
