import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "../../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standing } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import { idTakenFrom } from "../../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import {
  domainStanding,
  indexed,
  namesPart,
  pathsOf,
  type Standing,
} from "../../warrant-scratch/warrant-scratch.module.code.ts"
import { unreadIn } from "../../warranting/warranting.module.code.ts"
import { warrantsStanding } from "../../warranting/warranting.module.test-fixtures.ts"
import { fileDomain, WHOLE } from "./file-domain.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a04f58-a7ee-7000-94ad-769aa16fc838"

function beside(root: string, one: Standing, ending: string): string {
  const at = `${one.path.slice(0, -".ts".length)}.${ending}.ts`
  standing(root, at, "body\n")
  indexed(root, `path/${at}.jsonl`, JSON.stringify(one))
  return at
}

test("a file warrants the page that names it among its parts", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = domainStanding(root, "whole")
  const part = domainStanding(root, "part")
  namesPart(root, whole, part)
  expect(pathsOf(fileDomain(root, part.path))).toEqual([whole.path])
})

test("a file standing beside a page warrants what names that page among its parts", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = domainStanding(root, "whole")
  const part = domainStanding(root, "part")
  namesPart(root, whole, part)
  expect(pathsOf(fileDomain(root, beside(root, part, "code")))).toEqual([whole.path])
})

test("a warrant carries the body standing at the naming page, and why it is owed", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = domainStanding(root, "whole")
  const part = domainStanding(root, "part")
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
  domainStanding(root, "whole")
  const part = domainStanding(root, "part")
  expect(pathsOf(fileDomain(root, part.path))).toEqual([])
})

test("a page naming several parts is warranted by each of them", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = domainStanding(root, "whole")
  const one = domainStanding(root, "one")
  const two = domainStanding(root, "two")
  namesPart(root, whole, one)
  namesPart(root, whole, two)
  expect(pathsOf(fileDomain(root, one.path))).toEqual([whole.path])
  expect(pathsOf(fileDomain(root, two.path))).toEqual([whole.path])
})

test("a page named among the parts of several pages warrants every one of them, by path", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const part = domainStanding(root, "part")
  const two = domainStanding(root, "two")
  const one = domainStanding(root, "one")
  namesPart(root, two, part)
  namesPart(root, one, part)
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
  const whole = domainStanding(root, "whole")
  const part = domainStanding(root, "part")
  namesPart(root, whole, part)
  const loose = "akasha/part/loose.ts"
  standing(root, loose, "body\n")
  expect(pathsOf(fileDomain(root, loose))).toEqual([])
})

test("a naming page the index no longer holds warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = domainStanding(root, "whole")
  const part = domainStanding(root, "part")
  namesPart(root, whole, part)
  idTakenFrom(root, whole.id)
  expect(pathsOf(fileDomain(root, part.path))).toEqual([])
})

test("a naming page whose body is gone warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const whole = domainStanding(root, "whole")
  const part = domainStanding(root, "part")
  namesPart(root, whole, part)
  rmSync(join(root, whole.path))
  expect(pathsOf(fileDomain(root, part.path))).toEqual([])
})

test("a page naming itself among its parts warrants nothing of itself", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  const one = domainStanding(root, "one")
  namesPart(root, one, one)
  expect(pathsOf(fileDomain(root, one.path))).toEqual([])
})

test("a naming page not read is refused, and the refusal says why it is owed", () => {
  const root = scratch.rootFor("akasha-file-domain-")
  warrantsStanding(root, ["file-domain"])
  const whole = domainStanding(root, "whole")
  const part = domainStanding(root, "part")
  namesPart(root, whole, part)
  const oid = standing(root, part.path, "one\n")
  recordRead(root, AGENT, { path: part.path, oid, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [part.path])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(WHOLE)
  expect(said[0]).toContain(whole.path)
})
