import { describe, expect, it } from "bun:test"
import { nameFromAt, relPathFor } from "./file-name.ts"
import { mintedId } from "./file-rows.ts"
import { writerOf } from "./file-write.ts"
import { fileValuesOf } from "./file-write-values.ts"
import { FileWriteError } from "./file-write-error.ts"

const FLAT = "zoo/animals/*.md"
const NESTED = "zoo/habitats/**/*.md"

describe("nameFromAt", () => {
  it("names a page so that writing it lands on the file it was read from", () => {
    for (const [glob, relPath] of [
      [FLAT, "zoo/animals/lion.md"],
      [NESTED, "zoo/habitats/savanna/zebra.md"],
    ] as const) {
      const name = nameFromAt(glob, `instructions:${relPath}`)
      expect(name).not.toBeNull()
      if (name === null) throw new Error(`nameFromAt named nothing for ${relPath}`)
      expect(relPathFor(glob, name)).toBe(relPath)
    }
  })

  it("reads a path with no repo before it", () => {
    expect(nameFromAt(FLAT, "zoo/animals/lion.md")).toBe("lion")
  })

  it("names nothing where the path is not where the glob puts one", () => {
    expect(nameFromAt(FLAT, "fixture:zoo/signs/one.md")).toBeNull()
    expect(nameFromAt(FLAT, "fixture:zoo/animals/lion.yaml")).toBeNull()
  })
})

describe("fileValuesOf", () => {
  it("spells every key in kebab, which is what a file and a query both read", () => {
    expect(fileValuesOf("op", "t", { sortOrder: 3, focusTags: ["all"] })).toEqual({
      "sort-order": 3,
      "focus-tags": ["all"],
    })
  })

  it("carries a number and a boolean as themselves", () => {
    expect(fileValuesOf("op", "t", { count: 7, done: true })).toEqual({ count: 7, done: true })
  })

  it("clears a key held as null, which a file says by holding nothing", () => {
    expect(fileValuesOf("op", "t", { icon: null })).toEqual({ icon: [] })
  })

  it("leaves out a key held as undefined", () => {
    expect(fileValuesOf("op", "t", { icon: undefined })).toEqual({})
  })

  it("refuses a value no frontmatter line can carry, naming the key", () => {
    expect(() => fileValuesOf("op", "t", { config: { nested: true } })).toThrow(FileWriteError)
    expect(() => fileValuesOf("op", "t", { config: { nested: true } })).toThrow(/`config`/)
  })

  it("names the shape of a refused value, never the value, which carries a page's own text", () => {
    const said = "a line out of somebody's conversation"
    let refusal = ""
    try {
      fileValuesOf("op", "t", { window: { turns: [{ kind: "out", content: said }] } })
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
      if (!(err instanceof Error)) throw err
      refusal = err.message
    }
    expect(refusal).not.toBe("")
    expect(refusal).not.toContain(said)
    expect(refusal).toContain("`window`")
  })

  it("leaves out what the file settles for itself", () => {
    expect(fileValuesOf("op", "t", { pageTypeSlug: "t", userId: "u", note: "x" })).toEqual({
      note: "x",
    })
  })

  it("keeps the kebab spelling a page holds in its own file, dropping the camel one the row settles", () => {
    expect(fileValuesOf("op", "device-secret", { "user-id": "u", "device-id": "d" })).toEqual({
      "user-id": "u",
      "device-id": "d",
    })
    expect(fileValuesOf("op", "temper-net-worth-snapshot", { userId: "u", totalValue: 5 })).toEqual({
      "total-value": 5,
    })
  })
})

describe("mintedId", () => {
  it("mints a version 7 uuid, so a new page sorts by id beside every migrated one", () => {
    const id = mintedId(0x0192_3456_789a)
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    expect(id.replace(/-/g, "").slice(0, 12)).toBe("0192" + "3456789a")
  })

  it("orders by time, which is what ordering by id is reached for", () => {
    const earlier = mintedId(1_000_000)
    const later = mintedId(2_000_000)
    expect(earlier < later).toBe(true)
  })
})

const SEAT = "019ff7d3-64eb-7461-915f-86e3404857d6"
const DELEGATE = `${SEAT}--a1159c2aa8b4e2245`

function writerUnder(env: Readonly<Record<string, string>>): string {
  const held = { ...process.env }
  for (const key of ["AGENT_ID", "ACTING_AGENT_ID", "PAGE_WRITER"]) delete process.env[key]
  Object.assign(process.env, env)
  try {
    return writerOf(undefined)
  } finally {
    for (const key of ["AGENT_ID", "ACTING_AGENT_ID", "PAGE_WRITER"]) delete process.env[key]
    Object.assign(process.env, held)
  }
}

describe("writerOf", () => {
  it("names the delegate that acted, not the seat every delegate shares", () => {
    expect(writerUnder({ AGENT_ID: SEAT, ACTING_AGENT_ID: DELEGATE })).toBe(DELEGATE)
  })

  it("names the seat where no delegate is acting under it", () => {
    expect(writerUnder({ AGENT_ID: SEAT })).toBe(SEAT)
  })

  it("refuses an acting id that names a seat this process is not", () => {
    const foreign = "019aaaaa-0000-7000-8000-000000000000--a0"
    expect(writerUnder({ AGENT_ID: SEAT, ACTING_AGENT_ID: foreign })).toBe(SEAT)
  })

  it("keeps a stated writer ahead of any agent in the environment", () => {
    expect(writerOf("idle-card-projection")).toBe("idle-card-projection")
    expect(
      writerUnder({ AGENT_ID: SEAT, ACTING_AGENT_ID: DELEGATE, PAGE_WRITER: "temper-watcher" })
    ).toBe("temper-watcher")
  })
})
