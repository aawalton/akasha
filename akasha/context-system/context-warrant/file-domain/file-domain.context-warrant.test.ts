import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "../../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standing } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import { indexed, pathsOf } from "../../warrant-scratch/warrant-scratch.module.code.ts"
import { unreadIn } from "../../warranting/warranting.module.code.ts"
import { warrantsStanding } from "../../warranting/warranting.module.test-fixtures.ts"
import { fileDomain, WHOLE } from "./file-domain.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a04f58-a7ee-7000-94ad-769aa16fc838"

const PAGES_AT = ".git/data/index/identity/page/id"

type Standing = {
  readonly path: string
  readonly id: string
}

let minted = 0

function page(root: string, slug: string): Standing {
  minted = minted + 1
  const id = `01a04f58-0000-7000-9000-${String(minted).padStart(12, "0")}`
  const path = `akasha/${slug}/${slug}.domain.ts`
  const held = { path, id }
  standing(root, path, `export const held = { id: "${id}", slug: "${slug}" }\n`)
  indexed(root, `path/${path}.jsonl`, JSON.stringify(held))
  indexed(root, `identity/page/id/${id}.jsonl`, JSON.stringify(held))
  return held
}

function beside(root: string, one: Standing, ending: string): string {
  const at = `${one.path.slice(0, -".ts".length)}.${ending}.ts`
  standing(root, at, "body\n")
  indexed(root, `path/${at}.jsonl`, JSON.stringify(one))
  return at
}

function names(root: string, whole: Standing, part: Standing): void {
  indexed(
    root,
    `relation/page/id/${part.id}/part-slugs/${whole.id}.jsonl`,
    JSON.stringify({ path: whole.path })
  )
}

test("a file warrants the page that names it among its parts", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = page(root, "whole")
  const part = page(root, "part")
  names(root, whole, part)
  expect(pathsOf(fileDomain(root, part.path))).toEqual([whole.path])
})

test("a file standing beside a page warrants what names that page among its parts", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = page(root, "whole")
  const part = page(root, "part")
  names(root, whole, part)
  expect(pathsOf(fileDomain(root, beside(root, part, "code")))).toEqual([whole.path])
})

test("a warrant carries the body standing at the naming page, and why it is owed", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = page(root, "whole")
  const part = page(root, "part")
  names(root, whole, part)
  const held = fileDomain(root, part.path)[0]
  expect(held?.path).toBe(whole.path)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(WHOLE)
})

test("a file no page names among its parts warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  page(root, "whole")
  const part = page(root, "part")
  expect(pathsOf(fileDomain(root, part.path))).toEqual([])
})

test("a page naming several parts is warranted by each of them", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = page(root, "whole")
  const one = page(root, "one")
  const two = page(root, "two")
  names(root, whole, one)
  names(root, whole, two)
  expect(pathsOf(fileDomain(root, one.path))).toEqual([whole.path])
  expect(pathsOf(fileDomain(root, two.path))).toEqual([whole.path])
})

test("a page named among the parts of several pages warrants every one of them, by path", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const part = page(root, "part")
  const two = page(root, "two")
  const one = page(root, "one")
  names(root, two, part)
  names(root, one, part)
  expect(pathsOf(fileDomain(root, part.path))).toEqual([one.path, two.path])
})

test("a cold index warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const path = "akasha/part/part.domain.ts"
  standing(root, path, "body\n")
  expect(pathsOf(fileDomain(root, path))).toEqual([])
})

test("a path standing at no page warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = page(root, "whole")
  const part = page(root, "part")
  names(root, whole, part)
  const loose = "akasha/part/loose.ts"
  standing(root, loose, "body\n")
  expect(pathsOf(fileDomain(root, loose))).toEqual([])
})

test("a naming page the index no longer holds warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = page(root, "whole")
  const part = page(root, "part")
  names(root, whole, part)
  rmSync(join(root, PAGES_AT, `${whole.id}.jsonl`))
  expect(pathsOf(fileDomain(root, part.path))).toEqual([])
})

test("a naming page whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = page(root, "whole")
  const part = page(root, "part")
  names(root, whole, part)
  rmSync(join(root, whole.path))
  expect(pathsOf(fileDomain(root, part.path))).toEqual([])
})

test("a page naming itself among its parts warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const one = page(root, "one")
  names(root, one, one)
  expect(pathsOf(fileDomain(root, one.path))).toEqual([])
})

test("a naming page not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  warrantsStanding(root, ["file-domain"])
  const whole = page(root, "whole")
  const part = page(root, "part")
  names(root, whole, part)
  const oid = standing(root, part.path, "one\n")
  recordRead(root, AGENT, { path: part.path, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [part.path])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(WHOLE)
  expect(said[0]).toContain(whole.path)
})
