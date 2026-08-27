import { describe, expect, it } from "bun:test"
import { RosterUnreachable } from "@shared/pages-access/file-read"
import { rosterOverFetch } from "./file-backing"

function unreachableWhy(got: unknown): string {
  if (got instanceof RosterUnreachable) return got.why
  throw new Error(`expected a RosterUnreachable, got ${String(got)}`)
}

function answering(status: number, body: string, contentType: string): () => Promise<Response> {
  return async () => new Response(body, { status, headers: { "content-type": contentType } })
}

function json(status: number, body: unknown): () => Promise<Response> {
  return answering(status, JSON.stringify(body), "application/json")
}

describe("rosterOverFetch", () => {
  it("reads a roster naming page types as those slugs", async () => {
    const read = rosterOverFetch(json(200, { types: [{ slug: "seat" }, { slug: "finding" }] }))
    const got = await read()
    expect(got).toEqual(new Set(["seat", "finding"]))
  })

  it("reads a roster naming no page types as an answer, not as a silence", async () => {
    const read = rosterOverFetch(json(200, { types: [] }))
    const got = await read()
    expect(got).not.toBeInstanceOf(RosterUnreachable)
    expect(got).toEqual(new Set())
  })

  it("reads a 503 as unreachable, carrying the status the service chose", async () => {
    const read = rosterOverFetch(json(503, { error: "the roster is not being served" }))
    const got = await read()
    expect(got).toBeInstanceOf(RosterUnreachable)
    expect(unreachableWhy(got)).toContain("503")
  })

  it("reads a 401 as unreachable rather than as a page type naming nothing", async () => {
    const read = rosterOverFetch(json(401, { error: "signed out" }))
    const got = await read()
    expect(got).toBeInstanceOf(RosterUnreachable)
    expect(unreachableWhy(got)).toContain("401")
  })

  it("reads a 404 as unreachable, so a missing route cannot read as an empty roster", async () => {
    const read = rosterOverFetch(json(404, { error: "no such route" }))
    const got = await read()
    expect(got).toBeInstanceOf(RosterUnreachable)
    expect(unreachableWhy(got)).toContain("404")
  })

  it("reads the SPA's own HTML on a 200 as unreachable", async () => {
    const read = rosterOverFetch(answering(200, "<!doctype html><html></html>", "text/html"))
    const got = await read()
    expect(got).toBeInstanceOf(RosterUnreachable)
  })

  it("reads a 200 in a shape it cannot read as unreachable rather than as no page types", async () => {
    const read = rosterOverFetch(json(200, { types: [{ name: "seat" }] }))
    const got = await read()
    expect(got).toBeInstanceOf(RosterUnreachable)
  })

  it("reads a fetch that never answered as unreachable", async () => {
    const read = rosterOverFetch(() => Promise.reject(new Error("ECONNREFUSED")))
    const got = await read()
    expect(got).toBeInstanceOf(RosterUnreachable)
    expect(unreachableWhy(got)).toContain("ECONNREFUSED")
  })
})
