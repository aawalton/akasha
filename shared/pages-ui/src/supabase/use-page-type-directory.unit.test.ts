import { beforeEach, describe, expect, it } from "bun:test"
import {
  askPageTypeDirectory,
  forgetPageTypeDirectory,
  PAGE_TYPE_DIRECTORY_PATH,
  readPageTypeDirectory,
} from "./use-page-type-directory"

const ID = "019db533-f381-74cd-b252-8cfc6fed0b94"

describe("readPageTypeDirectory", () => {
  it("names every page type the answer carries by its slug", () => {
    const read = readPageTypeDirectory({
      rows: [
        { id: ID, slug: "temper-completed-task" },
        { id: "019db5f4-063c-710f-a432-4c822d31915a", slug: "story-chapter" },
      ],
    })
    expect(read?.get("temper-completed-task")).toBe(ID)
    expect(read?.size).toBe(2)
  })

  it("passes over a row stating no id, which names nothing a view could resolve", () => {
    const read = readPageTypeDirectory({ rows: [{ slug: "car" }, { id: ID, slug: "seat" }] })
    expect(read?.has("car")).toBe(false)
    expect(read?.get("seat")).toBe(ID)
  })

  it("refuses an answer carrying no rows, rather than reporting an empty directory", () => {
    expect(readPageTypeDirectory({ error: "nope" })).toBeNull()
  })
})

describe("askPageTypeDirectory", () => {
  beforeEach(() => {
    forgetPageTypeDirectory()
  })

  it("asks the file-backed listing route", async () => {
    const asked: string[] = []
    await askPageTypeDirectory(async (input) => {
      asked.push(input)
      return Response.json({ rows: [{ id: ID, slug: "seat" }] })
    })
    expect(asked).toEqual([PAGE_TYPE_DIRECTORY_PATH])
  })

  it("answers nothing where the route refuses, so a caller falls back rather than reading a blank", async () => {
    const got = await askPageTypeDirectory(async () => new Response("", { status: 503 }))
    expect(got).toBeNull()
  })

  it("asks once and holds the answer", async () => {
    let calls = 0
    const fetcher = async (): Promise<Response> => {
      calls += 1
      return Response.json({ rows: [{ id: ID, slug: "seat" }] })
    }
    await askPageTypeDirectory(fetcher)
    await askPageTypeDirectory(fetcher)
    expect(calls).toBe(1)
  })
})
