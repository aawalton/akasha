import { describe, expect, test } from "bun:test"
import { askPage } from "./ask.ts"
import type { Sleeper } from "./retry.ts"

const napless: Sleeper = async () => {}

function reply(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

const STANDING = {
  pageType: "web-app",
  name: "atlas",
  at: "memory:apps/atlas.md",
  values: { "live-version": "abc123" },
  relations: {},
}

describe("askPage says whether the corpus was read", () => {
  test("a page that stands is `found`", async () => {
    const asked = await askPage("web-app", "atlas", async () => reply(STANDING, 200), napless)
    expect(asked.outcome).toBe("found")
  })

  test("a 404 is `absent` — the corpus was read and holds no such page", async () => {
    const asked = await askPage(
      "web-app",
      "atlas",
      async () => reply({ error: "no page stands there" }, 404),
      napless
    )
    expect(asked.outcome).toBe("absent")
  })

  test("a service that never answered is `unasked`, not `absent`", async () => {
    const asked = await askPage(
      "web-app",
      "atlas",
      async () => {
        throw new Error("connection refused")
      },
      napless
    )
    expect(asked.outcome).toBe("unasked")
  })

  test("a 503 is `unasked`, not `absent`", async () => {
    const asked = await askPage(
      "web-app",
      "atlas",
      async () => reply({ error: "unreachable" }, 503),
      napless
    )
    expect(asked.outcome).toBe("unasked")
  })

  test("a reply this reader cannot read is `unasked`, not `absent`", async () => {
    const asked = await askPage(
      "web-app",
      "atlas",
      async () => reply({ nonsense: true }, 200),
      napless
    )
    expect(asked.outcome).toBe("unasked")
  })
})
