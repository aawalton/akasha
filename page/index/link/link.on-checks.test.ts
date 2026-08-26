import { expect, test } from "bun:test"
import { hrefsIn, linkTargetsFrom, walkedFrom } from "./link.ts"

const FROM = "pages/task/split-file.task.md"

const targets = (body: string): readonly string[] => linkTargetsFrom("instructions", FROM, body)

test("a link resolves against the folder of the page carrying it", () => {
  expect(targets("See [it](../domain/file-structure.domain.md).")).toEqual([
    "instructions/pages/domain/file-structure.domain.md",
  ])
})

test("the heading a link names is not part of the file it points at", () => {
  expect(targets("[it](../domain/file-structure.domain.md#domain-directory)")).toEqual([
    "instructions/pages/domain/file-structure.domain.md",
  ])
})

test("a link outside the repository, a slot and a bare heading point at no file", () => {
  expect(targets("[a](https://example.com/a.md) [b]({slot}) [c](#heading) [d]()")).toEqual([])
})

test("a link walking above the repository root points at no file", () => {
  expect(walkedFrom(FROM, "../../../elsewhere.md")).toBeNull()
  expect(targets("[a](../../../elsewhere.md)")).toEqual([])
})

test("a page linking at itself is not a link out of it", () => {
  expect(targets("[a](split-file.task.md)")).toEqual([])
})

test("a link inside a fence is code rather than a link", () => {
  expect(targets("```\n[a](../domain/file-structure.domain.md)\n```\n")).toEqual([])
})

test("one target is kept once however many links reach it, and targets come sorted", () => {
  const body = "[a](../domain/zebra.domain.md) [b](../domain/apple.domain.md) [c](../domain/zebra.domain.md)"
  expect(targets(body)).toEqual([
    "instructions/pages/domain/apple.domain.md",
    "instructions/pages/domain/zebra.domain.md",
  ])
})

test("a path from the repository root is read from there rather than from the page", () => {
  expect(walkedFrom(FROM, "/pages/domain/file-structure.domain.md")).toBe(
    "pages/domain/file-structure.domain.md"
  )
})

test("every link in the body is read, and nothing that is not one", () => {
  expect(hrefsIn("[a](one.md) then [b](two.md), and (three.md) alone")).toEqual(["one.md", "two.md"])
})
