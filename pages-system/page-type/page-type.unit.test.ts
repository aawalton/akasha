import { expect, test } from "bun:test"
import { readdirSync, readFileSync } from "node:fs"
import { pageTypeOf } from "./page-type.ts"

test("a name ending in a kind and `.md` answers that kind", () => {
  expect(pageTypeOf("pages/domain/pilot.domain.md")).toBe("domain")
})

test("a kind spelt with hyphens comes back whole", () => {
  expect(pageTypeOf("pages/page-property-definition/title.page-property-definition.md")).toBe(
    "page-property-definition"
  )
})

test("a path carrying no suffix at all carries no kind", () => {
  expect(pageTypeOf("pages/domain/notes")).toBe(null)
  expect(pageTypeOf("Makefile")).toBe(null)
})

test("a name with one dot is an extension and not a kind", () => {
  expect(pageTypeOf("README.md")).toBe(null)
  expect(pageTypeOf("pages/story/chapter.md")).toBe(null)
})

test("a name that is not markdown carries no kind, whatever stands before its extension", () => {
  expect(pageTypeOf("pages/domain/pilot.domain.ts")).toBe(null)
  expect(pageTypeOf("pages/domain/pilot.domain.yaml")).toBe(null)
})

test("an uncommitted sidecar answers nothing rather than `uncommitted`", () => {
  expect(pageTypeOf("pages/domain/pilot.domain.uncommitted.yaml")).toBe(null)
})

test("the rows beside a page answer nothing", () => {
  expect(pageTypeOf("agent/seat/one.seat-log-day.lines.jsonl")).toBe(null)
  expect(pageTypeOf("agent/seat/one.seat-log-day.lines.uncommitted.jsonl")).toBe(null)
})

test("an attachment carrying its own extension answers nothing", () => {
  expect(pageTypeOf("pages/check/one.check.code.attachment.ts")).toBe(null)
  expect(pageTypeOf("pages/check/one.check.code.attachment.txt")).toBe(null)
})

test("an attachment named `.md` answers the kind its name states, which names no page type", () => {
  expect(pageTypeOf("pages/check/one.check.code.attachment.md")).toBe("attachment")
})

test("a dot in a directory contributes no kind", () => {
  expect(pageTypeOf("system/etc-sysctl.d/README.md")).toBe(null)
  expect(pageTypeOf("system/5.0/README.md")).toBe(null)
})

test("a dot in a directory does not disturb a name that does carry a kind", () => {
  expect(pageTypeOf("vendor/LibMediaProvider-1.0/pilot.domain.md")).toBe("domain")
  expect(pageTypeOf("system/.config/pilot.domain.md")).toBe("domain")
})

test("a bare name with no directory answers as the whole path to it does", () => {
  expect(pageTypeOf("pilot.domain.md")).toBe("domain")
  expect(pageTypeOf("pilot.domain.md")).toBe(pageTypeOf("pages/domain/pilot.domain.md"))
})

test("an absolute path and a repo-relative one agree", () => {
  const relative = "pages/domain/pilot.domain.md"
  expect(pageTypeOf(`/var/home/walton/repos/akasha/${relative}`)).toBe("domain")
  expect(pageTypeOf(`/var/home/walton/repos/akasha/${relative}`)).toBe(pageTypeOf(relative))
})

test("a name that is all suffix carries no kind", () => {
  expect(pageTypeOf(".domain.md")).toBe(null)
  expect(pageTypeOf("pages/domain/.domain.md")).toBe(null)
  expect(pageTypeOf(".md")).toBe(null)
})

test("an empty kind is no kind", () => {
  expect(pageTypeOf("pilot..md")).toBe(null)
})

test("a path naming no file carries no kind", () => {
  expect(pageTypeOf("")).toBe(null)
  expect(pageTypeOf("pages/domain/")).toBe(null)
  expect(pageTypeOf("/")).toBe(null)
})

test("only the last dot before `.md` marks the kind, so a stem may hold dots", () => {
  expect(pageTypeOf("pages/story-chapter/chapter-1.2.story-chapter.md")).toBe("story-chapter")
})

test("what the kind is spelt with is not judged here", () => {
  expect(pageTypeOf("notes.v2.md")).toBe("v2")
  expect(pageTypeOf("Notes.Domain.md")).toBe("Domain")
})

test("the same path answers the same twice, and is left as it was", () => {
  const path = "pages/domain/pilot.domain.md"
  expect(pageTypeOf(path)).toBe(pageTypeOf(path))
  expect(path).toBe("pages/domain/pilot.domain.md")
})

const ROOT = `${import.meta.dir}/../..`

const MARKDOWN = ".md"

function markdownUnder(dir: string, found: string[]): readonly string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) markdownUnder(`${dir}/${entry.name}`, found)
    else if (entry.name.endsWith(MARKDOWN)) found.push(`${dir}/${entry.name}`)
  }
  return found
}

function statedTypeOf(text: string): string | null {
  if (!text.startsWith("---\n")) return null
  const end = text.indexOf("\n---", 4)
  if (end < 0) return null
  for (const line of text.slice(4, end).split("\n")) {
    const found = /^page-type-slug:\s*"?([^"\s#]+)"?\s*$/.exec(line)
    if (found !== null) return found[1] as string
  }
  return null
}

test("every page on disk is of the kind its own frontmatter states", () => {
  const walked = markdownUnder(`${ROOT}/pages`, [])
  expect(walked.length).toBeGreaterThan(10000)
  const disagreed: string[] = []
  let agreed = 0
  for (const path of walked) {
    const stated = statedTypeOf(readFileSync(path, "utf8"))
    if (stated === null) continue
    const kind = pageTypeOf(path)
    if (kind === stated) agreed += 1
    else disagreed.push(`${path.slice(ROOT.length + 1)}: named \`${kind}\`, states \`${stated}\``)
  }
  expect(disagreed).toEqual([])
  expect(agreed).toBeGreaterThan(10000)
})
