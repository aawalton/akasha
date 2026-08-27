import { describe, expect, it } from "bun:test"
import { askComposed, askPageTypes } from "./ask"
import type { Fetcher } from "./index"

const ATTEMPTS = 4

const NOTHING = { n: 0, rows: [], value: null, over: null }

const ROSTER = { types: [{ slug: "monarch-transaction", repo: "memory", glob: "m/*.md" }] }

const napless = () => Promise.resolve()

function blipping(rounds: number, body: unknown): { fetcher: Fetcher; tries: () => number } {
  let tries = 0
  const fetcher: Fetcher = () => {
    tries += 1
    if (tries <= rounds) return Promise.reject(new Error("ECONNREFUSED"))
    return Promise.resolve(Response.json(body, { status: 200 }))
  }
  return { fetcher, tries: () => tries }
}

describe("a read of the page query service outlives a restart, as a write already does", () => {
  it("asks the roster again after a refused connection", async () => {
    const { fetcher, tries } = blipping(2, ROSTER)
    const asked = await askPageTypes(fetcher, napless)
    expect(asked.ok).toBe(true)
    expect(tries()).toBe(3)
  })

  it("asks a composed query again after a refused connection", async () => {
    const { fetcher, tries } = blipping(1, NOTHING)
    const asked = await askComposed({ "page-type": "page-type" }, fetcher, napless)
    expect(asked.ok).toBe(true)
    expect(tries()).toBe(2)
  })

  it("gives up rather than asking forever, and says why", async () => {
    let tries = 0
    const asked = await askPageTypes(() => {
      tries += 1
      return Promise.reject(new Error("ECONNREFUSED"))
    }, napless)
    expect(tries).toBe(ATTEMPTS)
    expect(asked.ok).toBe(false)
    if (asked.ok) return
    expect(asked.why).toContain("went unasked")
  })

  it("does not ask again where the service answered and refused the caller", async () => {
    let tries = 0
    const asked = await askComposed(
      { "page-type": "page-type" },
      () => {
        tries += 1
        return Promise.resolve(Response.json({ why: "no such key" }, { status: 400 }))
      },
      napless
    )
    expect(tries).toBe(1)
    expect(asked.ok).toBe(false)
  })
})
