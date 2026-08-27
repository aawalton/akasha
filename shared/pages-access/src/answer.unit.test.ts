import { describe, expect, it } from "bun:test"
import type { Asked } from "../../pages-query/src/index"
import { z } from "zod"
import { answerPages, LISTING_CEILING, type PagesDeps } from "./answer"

const REQUEST = new Request("https://alanwalton.com/api/pages/claude-account")
const COOKIE = "sb-refresh=renewed; Path=/"

const MARKER = "x-session-refreshed"

const headers = () => new Headers({ "set-cookie": COOKIE, [MARKER]: "yes" })

const answered = (rows: readonly { at?: string; values: Record<string, unknown> }[]): Asked => ({
  ok: true,
  answer: { n: rows.length, value: null, over: null, rows: [...rows] },
})

const deps = (over: Partial<PagesDeps> = {}): PagesDeps => ({
  readUser: () => Promise.resolve({ user: { id: "alan" }, headers: headers() }),
  ask: () => Promise.resolve(answered([])),
  readPageType: () =>
    Promise.resolve({ pageTypeId: "019db533-f381-7454-a6e4-fed5397cfd84", definitions: [] }),
  ...over,
})

const BodySchema = z.record(z.string(), z.unknown())
const bodyOf = async (response: Response) => BodySchema.parse(await response.json())

describe("answerPages — what each reply to the listing UI means", () => {
  it("refuses a reader with no session", async () => {
    const response = await answerPages(
      REQUEST,
      "claude-account",
      deps({ readUser: () => Promise.resolve({ user: null, headers: headers() }) })
    )
    expect(response.status).toBe(401)
    expect(await bodyOf(response)).toHaveProperty("error")
  })

  it("refuses a page type whose pages are not files", async () => {
    const response = await answerPages(
      REQUEST,
      "nothing-here",
      deps({
        ask: () => Promise.resolve({ ok: false, why: "replied 404", status: 404 }),
      })
    )
    expect(response.status).toBe(404)
    expect(String((await bodyOf(response)).error)).toContain("nothing-here")
  })

  it("refuses a page type the database holds no row for", async () => {
    const response = await answerPages(
      REQUEST,
      "claude-account",
      deps({ readPageType: () => Promise.resolve(null) })
    )
    expect(response.status).toBe(404)
  })

  it("holds an engine it could not reach apart from a page type with nothing in it", async () => {
    const response = await answerPages(
      REQUEST,
      "claude-account",
      deps({ ask: () => Promise.resolve({ ok: false, why: "went unasked: ECONNREFUSED" }) })
    )
    expect(response.status).toBe(503)
    const body = await bodyOf(response)
    expect(body.unread).toEqual(["went unasked: ECONNREFUSED"])
  })

  it("says so where more pages stand than this answer carries", async () => {
    const carried = [{ at: "fixture:zoo/animals/tiger.md", values: { title: "Tiger" } }]
    const response = await answerPages(
      REQUEST,
      "claude-account",
      deps({
        ask: () =>
          Promise.resolve({
            ok: true,
            answer: { n: 155_440, value: null, over: null, rows: carried },
          }),
      })
    )
    expect(response.status).toBe(200)
    const body = await bodyOf(response)
    expect(body.held).toBe(155_440)
    expect(body.cut).toBe(true)
  })

  it("asks the query service for no more than the ceiling", async () => {
    const asked: unknown[] = []
    await answerPages(
      REQUEST,
      "temper-mined-item",
      deps({
        ask: (pageTypeSlug) => {
          asked.push(pageTypeSlug)
          return Promise.resolve(answered([]))
        },
      })
    )
    expect(asked).toEqual(["temper-mined-item"])
    expect(LISTING_CEILING).toBeLessThan(155_440)
  })

  it("answers a page type with nothing in it as an empty list, not a refusal", async () => {
    const response = await answerPages(REQUEST, "claude-account", deps())
    expect(response.status).toBe(200)
    expect(await bodyOf(response)).toEqual({ rows: [], held: 0, cut: false })
  })

  it("answers the engine's rows as pages rows", async () => {
    const response = await answerPages(
      REQUEST,
      "claude-account",
      deps({
        ask: () =>
          Promise.resolve(
            answered([
              {
                at: "fixture:zoo/animals/tiger.md",
                values: {
                  id: "019fa944-c37d-7631-be0b-d2ff83b74635",
                  title: "Tiger",
                  owner: "alan",
                },
              },
            ])
          ),
      })
    )
    expect(response.status).toBe(200)
    const body = await bodyOf(response)
    expect(body.rows).toEqual([
      expect.objectContaining({
        id: "019fa944-c37d-7631-be0b-d2ff83b74635",
        title: "Tiger",
        page_type_slug: "claude-account",
        page_type_id: "019db533-f381-7454-a6e4-fed5397cfd84",
        attributes: { owner: "alan" },
      }),
    ])
  })

  it("threads the headers getUser returned onto every reply, a refusal included", async () => {
    const replies = await Promise.all([
      answerPages(
        REQUEST,
        "claude-account",
        deps({ readUser: () => Promise.resolve({ user: null, headers: headers() }) })
      ),
      answerPages(
        REQUEST,
        "claude-account",
        deps({ ask: () => Promise.resolve({ ok: false, why: "no", status: 404 }) })
      ),
      answerPages(REQUEST, "claude-account", deps({ readPageType: () => Promise.resolve(null) })),
      answerPages(
        REQUEST,
        "claude-account",
        deps({ ask: () => Promise.resolve({ ok: false, why: "unreached" }) })
      ),
      answerPages(REQUEST, "claude-account", deps()),
    ])
    expect(replies.map((r) => r.status)).toEqual([401, 404, 404, 503, 200])
    for (const reply of replies) {
      expect(reply.headers.get(MARKER)).toBe("yes")
    }
  })
})
