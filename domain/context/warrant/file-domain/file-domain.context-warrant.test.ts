import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { owedIn } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import {
  domainListed,
  type Listed,
  namesPart,
  pathsOf,
  warrantsSeeded,
} from "akasha/domain/context/modules/warranting/warranting.module.test-fixtures.ts"
import {
  fileDomain,
  WHOLE,
} from "akasha/domain/context/warrant/file-domain/file-domain.context-warrant.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { idTakenFrom } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a04f58-a7ee-7000-94ad-769aa16fc838"

function beside(root: string, one: Listed, ending: string): string {
  const at = `${one.path.slice(0, -".ts".length)}.${ending}.ts`
  writing(root, at, "body\n")
  return at
}

test("a file warrants the page that names it among its parts", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = domainListed(root, "whole")
  const part = domainListed(root, "part")
  namesPart(root, whole, part)
  expect(pathsOf(fileDomain(root, part.path))).toEqual([whole.path])
})

test("a file sitting beside a page warrants what names that page among its parts", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = domainListed(root, "whole")
  const part = domainListed(root, "part")
  namesPart(root, whole, part)
  expect(pathsOf(fileDomain(root, beside(root, part, "code")))).toEqual([whole.path])
})

test("a warrant carries the body at the naming page, and why it is owed", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = domainListed(root, "whole")
  const part = domainListed(root, "part")
  namesPart(root, whole, part)
  const held = fileDomain(root, part.path)[0]
  expect(held?.path).toBe(whole.path)
  expect(held?.oid).toBe(
    blobIdOf(new TextEncoder().encode(readFileSync(join(root, held?.path ?? ""), "utf8")))
  )
  expect(held?.owed).toBe(WHOLE)
})

test("a file no page names among its parts warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  domainListed(root, "whole")
  const part = domainListed(root, "part")
  expect(pathsOf(fileDomain(root, part.path))).toEqual([])
})

test("a page naming several parts is warranted by each of them", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = domainListed(root, "whole")
  const one = domainListed(root, "one")
  const two = domainListed(root, "two")
  namesPart(root, whole, one)
  namesPart(root, whole, two)
  expect(pathsOf(fileDomain(root, one.path))).toEqual([whole.path])
  expect(pathsOf(fileDomain(root, two.path))).toEqual([whole.path])
})

test("a page named among the parts of several pages warrants every one of them, by path", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const part = domainListed(root, "part")
  const two = domainListed(root, "two")
  const one = domainListed(root, "one")
  namesPart(root, two, part)
  namesPart(root, one, part)
  expect(pathsOf(fileDomain(root, part.path))).toEqual([one.path, two.path])
})

test("a path sitting at no page warrants nothing", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = domainListed(root, "whole")
  const part = domainListed(root, "part")
  namesPart(root, whole, part)
  const loose = "akasha/part/loose.ts"
  writing(root, loose, "body\n")
  expect(pathsOf(fileDomain(root, loose))).toEqual([])
})

test("a naming page the index no longer holds warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = domainListed(root, "whole")
  const part = domainListed(root, "part")
  namesPart(root, whole, part)
  idTakenFrom(root, whole.id)
  expect(pathsOf(fileDomain(root, part.path))).toEqual([])
})

test("a naming page whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = domainListed(root, "whole")
  const part = domainListed(root, "part")
  namesPart(root, whole, part)
  rmSync(join(root, whole.path))
  expect(pathsOf(fileDomain(root, part.path))).toEqual([])
})

test("a page naming itself among its parts warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const one = domainListed(root, "one")
  namesPart(root, one, one)
  expect(pathsOf(fileDomain(root, one.path))).toEqual([])
})

test("a naming page not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  warrantsSeeded(root, ["file-domain"])
  const whole = domainListed(root, "whole")
  const part = domainListed(root, "part")
  namesPart(root, whole, part)
  const oid = writing(
    root,
    part.path,
    `export const part = { id: "${part.id}", slug: "part", definition: "one" }\n`
  )
  recordRead(root, AGENT, { path: part.path, oid, seenAt: 1, carriedOid: null })
  const said = owedIn(root, AGENT, [part.path])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(WHOLE)
  expect(said[0]).toContain(whole.path)
})
