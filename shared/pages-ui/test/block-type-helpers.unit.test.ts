import { describe, expect, it } from "bun:test"
import type { Block } from "@shared/pages-core/property-types/rich-document"
import { planEnterSplit } from "../src/block-editor/block-type-helpers"

const block = (type: string, text: string): Block => ({ id: "a", type, text })

describe("planEnterSplit", () => {
  it("exits an empty list item to a paragraph", () => {
    expect(planEnterSplit(block("bulleted-list-item", "- "), 2)).toEqual({ kind: "exit" })
    expect(planEnterSplit(block("to-do", "[ ] "), 4)).toEqual({ kind: "exit" })
  })

  it("continues a bullet with the next literal marker, caret after it", () => {
    expect(planEnterSplit(block("bulleted-list-item", "- milk"), 6)).toEqual({
      kind: "split",
      before: "- milk",
      newType: "bulleted-list-item",
      newText: "- ",
      newCaret: 2,
    })
  })

  it("continues a numbered item with the incremented literal number", () => {
    expect(planEnterSplit(block("numbered-list-item", "1. first"), 8)).toEqual({
      kind: "split",
      before: "1. first",
      newType: "numbered-list-item",
      newText: "2. ",
      newCaret: 3,
    })
  })

  it("splits mid-content, moving the after-caret remainder past the new marker", () => {
    expect(planEnterSplit(block("bulleted-list-item", "- abcdef"), 5)).toEqual({
      kind: "split",
      before: "- abc",
      newType: "bulleted-list-item",
      newText: "- def",
      newCaret: 2,
    })
  })

  it("never splits inside the marker (caret clamped to marker length)", () => {
    expect(planEnterSplit(block("bulleted-list-item", "- hi"), 1)).toEqual({
      kind: "split",
      before: "- ",
      newType: "bulleted-list-item",
      newText: "- hi",
      newCaret: 2,
    })
  })

  it("splits a plain paragraph with no marker, caret at the new block start", () => {
    expect(planEnterSplit(block("paragraph", "hello world"), 5)).toEqual({
      kind: "split",
      before: "hello",
      newType: "paragraph",
      newText: " world",
      newCaret: "start",
    })
  })

  it("caret-0 on a paragraph pushes content down (insert-above)", () => {
    expect(planEnterSplit(block("paragraph", "content"), 0)).toEqual({
      kind: "split",
      before: "",
      newType: "paragraph",
      newText: "content",
      newCaret: "start",
    })
  })

  it("exits an empty toggle to a paragraph", () => {
    expect(planEnterSplit(block("toggle", "> "), 2)).toEqual({ kind: "exit" })
  })

  it("continues a toggle to a plain paragraph, not another toggle", () => {
    expect(planEnterSplit(block("toggle", "> Section"), 9)).toEqual({
      kind: "split",
      before: "> Section",
      newType: "paragraph",
      newText: "",
      newCaret: "start",
    })
  })

  it("splits a toggle mid-content into a plain paragraph carrying the remainder", () => {
    expect(planEnterSplit(block("toggle", "> abcdef"), 5)).toEqual({
      kind: "split",
      before: "> abc",
      newType: "paragraph",
      newText: "def",
      newCaret: "start",
    })
  })
})
