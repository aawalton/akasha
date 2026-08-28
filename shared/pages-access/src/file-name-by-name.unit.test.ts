import { describe, expect, it } from "bun:test"
import { nameFromAt, relPathFor, suffixOf } from "./file-name.ts"

const BY_NAME = "**/*.gadget.md"
const BY_FOLDER = "zoo/animals/*.md"

describe("suffixOf", () => {
  it("reads the page type a by-name glob matches", () => {
    expect(suffixOf(BY_NAME)).toBe("gadget")
  })

  it("reads no page type off a glob that files by folder", () => {
    expect(suffixOf(BY_FOLDER)).toBeNull()
    expect(suffixOf("zoo/habitats/**/*.md")).toBeNull()
  })
})

describe("relPathFor, where the type files by name", () => {
  it("names a new page for its page type", () => {
    expect(relPathFor(BY_NAME, "widget")).toBe("pages/gadget/widget.gadget.md")
  })

  it("writes a new page where its own glob would match it", () => {
    const relPath = relPathFor(BY_NAME, "widget")
    expect(new Bun.Glob(BY_NAME).match(relPath)).toBe(true)
  })

  it("leaves a type filed by folder exactly as it was", () => {
    expect(relPathFor(BY_FOLDER, "lion")).toBe("zoo/animals/lion.md")
  })
})

describe("nameFromAt, where the type files by name", () => {
  it("names a page by its stem, wherever the file stands", () => {
    expect(nameFromAt(BY_NAME, "akasha:pages/gadget/widget.gadget.md")).toBe("widget")
    expect(nameFromAt(BY_NAME, "akasha:anywhere/at/all/widget.gadget.md")).toBe("widget")
  })

  it("never folds the directory into the name", () => {
    const name = nameFromAt(BY_NAME, "akasha:pages/gadget/widget.gadget.md")
    expect(name).not.toContain("/")
  })

  it("names nothing for a file that does not carry the page type", () => {
    expect(nameFromAt(BY_NAME, "akasha:pages/gadget/widget.md")).toBeNull()
    expect(nameFromAt(BY_NAME, "akasha:pages/gadget/widget.sprocket.md")).toBeNull()
  })

  it("round-trips, so reading a page and writing it lands on the same file", () => {
    const at = "akasha:pages/gadget/widget.gadget.md"
    const name = nameFromAt(BY_NAME, at)
    expect(name).not.toBeNull()
    if (name === null) throw new Error("named nothing")
    expect(relPathFor(BY_NAME, name)).toBe("pages/gadget/widget.gadget.md")
  })
})
