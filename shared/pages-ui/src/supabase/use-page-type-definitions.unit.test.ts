import { beforeEach, describe, expect, it } from "bun:test"
import {
  askPageTypeDefinitions,
  definitionsAlong,
  forgetPageTypeDefinitions,
  PAGE_TYPE_DEFINITIONS_PATH,
  readPageTypeDefinitions,
} from "./use-page-type-definitions"

function row(
  owner: string,
  key: string,
  type = "text",
  more: Record<string, unknown> = {}
): Record<string, unknown> {
  return {
    id: `id-${owner}-${key}`,
    title: `${owner} ${key}`,
    attributes: { key, type, definedOnSlug: owner, ...more },
  }
}

describe("readPageTypeDefinitions", () => {
  it("groups every definition under the page type it is declared on", () => {
    const read = readPageTypeDefinitions({
      rows: [row("page", "seq", "number"), row("domain", "slug"), row("page", "icon")],
    })
    expect(read?.get("page")?.map((d) => d.id)).toEqual(["seq", "icon"])
    expect(read?.get("domain")?.map((d) => d.id)).toEqual(["slug"])
  })

  it("names a definition by the camelCase of the key its document states", () => {
    const read = readPageTypeDefinitions({ rows: [row("page-type", "body-shape-slug")] })
    const only = read?.get("page-type")?.[0]
    expect(only?.id).toBe("bodyShapeSlug")
    expect(only?.pageId).toBe("id-page-type-body-shape-slug")
    expect(only?.title).toBe("page-type body-shape-slug")
  })

  it("reads a formula's return type off the lowercased spelling a file reader delivers", () => {
    const read = readPageTypeDefinitions({
      rows: [row("persona", "level", "formula", { returntype: "number" })],
    })
    expect(read?.get("persona")?.[0]?.config).toEqual({ returnType: "number" })
  })

  it("passes over a row stating no key, which declares no property", () => {
    const read = readPageTypeDefinitions({
      rows: [{ id: "x", attributes: { definedOnSlug: "page" } }, row("page", "seq")],
    })
    expect(read?.get("page")?.map((d) => d.id)).toEqual(["seq"])
  })

  it("tells a route that answered nothing apart from a page type declaring nothing", () => {
    expect(readPageTypeDefinitions({ error: "nope" })).toBeNull()
    const empty = readPageTypeDefinitions({ rows: [] })
    expect(empty).not.toBeNull()
    expect(empty?.get("page")).toBeUndefined()
  })
})

describe("definitionsAlong", () => {
  it("lets the nearest declaration win over an ancestor stating the same key", () => {
    const read = readPageTypeDefinitions({
      rows: [
        row("domain", "instructions-path", "region | list(region, max 5)"),
        row("ops-command", "instructions-path", "region"),
      ],
    })
    expect(read).not.toBeNull()
    if (read === null) return
    const along = definitionsAlong(read, ["ops-command", "domain", "page"])
    expect(along.map((d) => d.id)).toEqual(["instructionsPath"])
    expect(along[0]?.type).toBe("region")
  })

  it("carries what an ancestor declares and the type itself does not", () => {
    const read = readPageTypeDefinitions({
      rows: [row("page", "seq", "number"), row("domain", "slug"), row("page-type", "files")],
    })
    expect(read).not.toBeNull()
    if (read === null) return
    const along = definitionsAlong(read, ["page-type", "domain", "page"])
    expect([...along.map((d) => d.id)].sort()).toEqual(["files", "seq", "slug"])
  })

  it("states nothing for a chain no document names", () => {
    const read = readPageTypeDefinitions({ rows: [row("page", "seq")] })
    expect(read).not.toBeNull()
    if (read === null) return
    expect(definitionsAlong(read, ["no-such-page-type"])).toEqual([])
  })
})

describe("askPageTypeDefinitions", () => {
  beforeEach(() => {
    forgetPageTypeDefinitions()
  })

  it("asks the file-backed listing route for the property documents", async () => {
    const asked: string[] = []
    await askPageTypeDefinitions(async (input) => {
      asked.push(input)
      return Response.json({ rows: [row("page", "seq")] })
    })
    expect(asked).toEqual([PAGE_TYPE_DEFINITIONS_PATH])
  })

  it("answers nothing where the route refuses, so a caller falls back rather than reading a blank", async () => {
    const got = await askPageTypeDefinitions(async () => new Response("", { status: 503 }))
    expect(got).toBeNull()
  })

  it("asks once and holds the answer", async () => {
    let calls = 0
    const fetcher = async (): Promise<Response> => {
      calls += 1
      return Response.json({ rows: [row("page", "seq")] })
    }
    await askPageTypeDefinitions(fetcher)
    await askPageTypeDefinitions(fetcher)
    expect(calls).toBe(1)
  })
})
