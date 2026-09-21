import { describe, expect, mock, test } from "bun:test"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"

const HANDED: unknown[] = []

let FOUND: readonly Page[] = []

const iterate = await import("akasha/page/access/modules/iterate/iterate.module.code.ts")

mock.module("akasha/page/access/modules/iterate/iterate.module.code.ts", () => ({
  ...iterate,
  collectPages: (args: unknown) => {
    HANDED.push(args)
    return Promise.resolve([...FOUND])
  },
}))

const serving = await import(
  "akasha/product/kofi/feature-request/modules/serving/feature-request-serving.module.code.ts"
)

function requestPage(id: string, backing: unknown): Page {
  return asPage({ id, slug: id, pageTypeSlug: "feature-request", backing })
}

function backedWith(...points: readonly number[]): unknown {
  return points.map((one, index) => ({ contributor: `contributor-${index}`, points: one }))
}

function idsOf(pages: readonly Page[]): readonly string[] {
  return pages.map((one) => one.id)
}

const NEWEST = "01a0c4b2-0003-7000-8000-000000000000"

const MIDDLE = "01a0c4b2-0002-7000-8000-000000000000"

const OLDEST = "01a0c4b2-0001-7000-8000-000000000000"

describe("pointsOn", () => {
  test("adds up the points on every backing", () => {
    expect(serving.pointsOn(requestPage("a", backedWith(3, 4, 5)))).toBe(12)
  })

  test("answers nothing for a request no one has backed", () => {
    expect(serving.pointsOn(requestPage("b", undefined))).toBe(0)
  })

  test("answers nothing for a request whose backing is empty", () => {
    expect(serving.pointsOn(requestPage("c", []))).toBe(0)
  })

  test("passes over a backing naming no points", () => {
    expect(serving.pointsOn(requestPage("d", [{ contributor: "x" }, { points: 7 }]))).toBe(7)
  })
})

describe("requestsFor", () => {
  test("asks for the feature requests of that product at those standings", async () => {
    HANDED.length = 0
    FOUND = []
    await serving.requestsFor({ product: "alanwalton", standings: ["published", "completed"] })
    expect(HANDED).toHaveLength(1)
    expect(HANDED[0]).toMatchObject({
      pageTypeSlug: "feature-request",
      where: [
        { key: "product", eq: "alanwalton" },
        { key: "standing", in: ["published", "completed"] },
      ],
    })
  })

  test("answers most points first", async () => {
    FOUND = [
      requestPage(OLDEST, backedWith(1)),
      requestPage(MIDDLE, backedWith(9, 1)),
      requestPage(NEWEST, backedWith(4)),
    ]
    const served = await serving.requestsFor({ product: "alanwalton", standings: ["published"] })
    expect(idsOf(served)).toEqual([MIDDLE, NEWEST, OLDEST])
  })

  test("answers newest first where two requests are level on points", async () => {
    FOUND = [
      requestPage(OLDEST, backedWith(5)),
      requestPage(NEWEST, backedWith(5)),
      requestPage(MIDDLE, backedWith(5)),
    ]
    const served = await serving.requestsFor({ product: "alanwalton", standings: ["published"] })
    expect(idsOf(served)).toEqual([NEWEST, MIDDLE, OLDEST])
  })

  test("puts a request no one has backed under every request with points", async () => {
    FOUND = [requestPage(NEWEST, undefined), requestPage(OLDEST, backedWith(1))]
    const served = await serving.requestsFor({ product: "alanwalton", standings: ["proposed"] })
    expect(idsOf(served)).toEqual([OLDEST, NEWEST])
  })
})
