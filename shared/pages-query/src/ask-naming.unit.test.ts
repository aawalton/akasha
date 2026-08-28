import { describe, expect, it } from "bun:test"
import { askNaming } from "./ask"
import type { Fetcher } from "./index"

const napless = () => Promise.resolve()

const ANSWER = {
  key: "team-slug",
  name: "roots",
  n: 1,
  naming: [
    {
      pageType: "job",
      key: "team-slug",
      rows: [
        { at: "akasha:pages/job/one.md", values: { slug: "one", "team-slug": "team/roots" } },
      ],
    },
  ],
}

function watching(body: unknown, status = 200): { fetcher: Fetcher; asked: () => string } {
  let seen = ""
  const fetcher: Fetcher = (url) => {
    seen = String(url)
    return Promise.resolve(Response.json(body, { status }))
  }
  return { fetcher, asked: () => seen }
}

describe("an ask for the pages naming one page", () => {
  it("asks the naming route for the key and the name", async () => {
    const { fetcher, asked } = watching(ANSWER)
    const got = await askNaming({ key: "team-slug", name: "roots" }, fetcher, napless)
    expect(got.ok).toBe(true)
    expect(asked()).toEndWith("/naming/team-slug/roots")
  })

  it("carries the page types and the limit as the route reads them", async () => {
    const { fetcher, asked } = watching(ANSWER)
    await askNaming(
      { key: "team-slug", name: "roots", pageTypes: ["job", "note"], limit: 5 },
      fetcher,
      napless
    )
    expect(asked()).toEndWith("/naming/team-slug/roots?page-types=job%2Cnote&limit=5")
  })

  it("escapes each segment of a name written as an address", async () => {
    const { fetcher, asked } = watching(ANSWER)
    await askNaming({ key: "team-slug", name: "team/roots" }, fetcher, napless)
    expect(asked()).toEndWith("/naming/team-slug/team/roots")
  })

  it("hands back the rows the service grouped by page type", async () => {
    const { fetcher } = watching(ANSWER)
    const got = await askNaming({ key: "team-slug", name: "roots" }, fetcher, napless)
    expect(got.ok === true && got.naming[0]?.rows[0]?.values.slug).toBe("one")
  })

  it("says what went wrong where the service answers in another shape", async () => {
    const { fetcher } = watching({ naming: "not a list" })
    const got = await askNaming({ key: "team-slug", name: "roots" }, fetcher, napless)
    expect(got.ok).toBe(false)
  })
})
