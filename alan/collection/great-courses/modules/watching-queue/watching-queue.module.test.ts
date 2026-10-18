import { describe, expect, test } from "bun:test"
import {
  queuedFrom,
  type Row,
} from "akasha/alan/collection/great-courses/modules/watching-queue/watching-queue.module.code.ts"

const NOW = new Date("2026-10-18T18:00:00.000Z")

function row(slug: string, attributes: Readonly<Record<string, unknown>>): Row {
  return {
    id: `id-${slug}`,
    slug,
    title: slug.toUpperCase(),
    attributes: {
      completion: "in-progress",
      externalIdentity: [
        { source: "the-great-courses", externalId: slug, externalLink: `https://site/${slug}` },
      ],
      ...attributes,
    },
  }
}

describe("queuedFrom", () => {
  test("courses come closest to done first", () => {
    const rows = [row("a", { completionPercent: 10 }), row("b", { completionPercent: 80 })]
    expect(queuedFrom(rows, NOW).map((one) => one.id)).toEqual(["id-b", "id-a"])
  })

  test("courses as far along as each other come by title", () => {
    const rows = [row("d", { completionPercent: 5 }), row("c", { completionPercent: 5 })]
    expect(queuedFrom(rows, NOW).map((one) => one.id)).toEqual(["id-c", "id-d"])
  })

  test("a completed course is left out", () => {
    const rows = [row("a", { completion: "completed" }), row("b", {})]
    expect(queuedFrom(rows, NOW).map((one) => one.id)).toEqual(["id-b"])
  })

  test("a course that progressed today is left out", () => {
    const rows = [row("a", { progressedAt: "2026-10-18T17:00:00.000Z" })]
    expect(queuedFrom(rows, NOW)).toEqual([])
  })

  test("a course that progressed on an earlier day is kept", () => {
    const rows = [row("a", { progressedAt: "2026-10-15T17:00:00.000Z" })]
    expect(queuedFrom(rows, NOW).map((one) => one.id)).toEqual(["id-a"])
  })

  test("a course holding no link to the site is left out", () => {
    const rows = [row("a", { externalIdentity: [] })]
    expect(queuedFrom(rows, NOW)).toEqual([])
  })

  test("a queued course carries its title and its link", () => {
    expect(queuedFrom([row("a", {})], NOW)).toEqual([
      { id: "id-a", title: "A", link: "https://site/a" },
    ])
  })
})
