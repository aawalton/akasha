import { describe, expect, it } from "bun:test"
import { isPackageDoc, rewriteMarkdownLinks } from "./docs-rewrites"
import type { WorkspaceMove } from "./types"

const move: WorkspaceMove = {
  old: "temper/tasks",
  new: "temper/domain/tasks",
  oldName: "@temper/tasks",
  newName: "@temper/domain-tasks",
}

describe("isPackageDoc", () => {
  const workspaceDirs = ["temper/tasks", "temper/next", "shared/pages-core"]

  it("takes a docs/ markdown inside a workspace package", () => {
    expect(isPackageDoc("temper/tasks/docs/schema.md", workspaceDirs)).toBe(true)
  })

  it("leaves a docs/ markdown under no workspace package", () => {
    expect(isPackageDoc("pages/domain/docs/schema.md", workspaceDirs)).toBe(false)
  })

  it("leaves a markdown inside a workspace package that is not under docs/", () => {
    expect(isPackageDoc("temper/tasks/notes.md", workspaceDirs)).toBe(false)
  })
})

describe("rewriteMarkdownLinks", () => {
  it("rewrites inline relative link pointing into moved package", () => {
    const file = "temper/next/components/tasks/CLAUDE.md"
    const src = "- [Task Schema](../../../tasks/docs/temper-task-schema.md)\n"
    const { text, count } = rewriteMarkdownLinks(file, src, move)
    expect(count).toBe(1)
    expect(text).toBe("- [Task Schema](../../../domain/tasks/docs/temper-task-schema.md)\n")
  })

  it("preserves anchor fragment", () => {
    const file = "temper/next/components/tasks/CLAUDE.md"
    const src = "[X](../../../tasks/docs/foo.md#section)"
    const { text, count } = rewriteMarkdownLinks(file, src, move)
    expect(count).toBe(1)
    expect(text).toBe("[X](../../../domain/tasks/docs/foo.md#section)")
  })

  it("rewrites reference-style link", () => {
    const file = "temper/next/components/tasks/CLAUDE.md"
    const src = "[foo]: ../../../tasks/docs/foo.md\n"
    const { text, count } = rewriteMarkdownLinks(file, src, move)
    expect(count).toBe(1)
    expect(text).toBe("[foo]: ../../../domain/tasks/docs/foo.md\n")
  })

  it("skips external and anchor links", () => {
    const file = "temper/next/CLAUDE.md"
    const src = "[a](https://x.com) [b](#heading) [c](/abs)"
    const { count } = rewriteMarkdownLinks(file, src, move)
    expect(count).toBe(0)
  })

  it("leaves unrelated relative links alone", () => {
    const file = "temper/next/components/tasks/CLAUDE.md"
    const src = "[sibling](./other.md) [parent](../other/foo.md)"
    const { text, count } = rewriteMarkdownLinks(file, src, move)
    expect(count).toBe(0)
    expect(text).toBe(src)
  })

  it("rewrites outbound relative links inside a moved file (depth change)", () => {
    const file = "temper/domain/tasks/CLAUDE.md"
    const src = "[x](../next/foo.md)"
    const { text, count } = rewriteMarkdownLinks(file, src, move)
    expect(count).toBe(1)
    expect(text).toBe("[x](../../next/foo.md)")
  })

  it("preserves link title", () => {
    const file = "temper/next/components/tasks/CLAUDE.md"
    const src = '[t](../../../tasks/docs/foo.md "title")'
    const { text, count } = rewriteMarkdownLinks(file, src, move)
    expect(count).toBe(1)
    expect(text).toBe('[t](../../../domain/tasks/docs/foo.md "title")')
  })
})
