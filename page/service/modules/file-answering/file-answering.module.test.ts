import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { filing } from "akasha/page/service/modules/file-answering/file-answering.module.code.ts"
import { REFUSED_WHOLE } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const A_PORTRAIT = { pageTypeSlug: "persona", slug: "amy", key: "portrait" }

const PORTRAIT_AT = "persona/pages/amy/amy.persona.portrait.md"

test("a page's file property is answered as the whole undecoded bytes", () => {
  const said = filing(ROOT, A_PORTRAIT)
  expect("bytes" in said).toBe(true)
  if (!("bytes" in said)) return
  const whole = readFileSync(join(ROOT, PORTRAIT_AT))
  expect({
    length: said.bytes.length,
    same: said.bytes.every((one, at) => one === whole[at]),
  }).toEqual({ length: whole.length, same: true })
})

test("a key the page type has no property for is refused", () => {
  const said = filing(ROOT, { ...A_PORTRAIT, key: "wallpaperOfTheDay" })
  expect("refused" in said && said.refused).toContain("has no")
})

test("a key naming a property that keeps no file is refused", () => {
  const said = filing(ROOT, { ...A_PORTRAIT, key: "purpose" })
  expect("refused" in said && said.refused).toContain("names no file property")
})

test("a file property held outside the commit is named by the ending its property states", () => {
  const said = filing(ROOT, { pageTypeSlug: "check-code", slug: "typecheck", key: "entries" })
  const named = "typecheck.check-code.entries.uncommitted.jsonl"
  expect("refused" in said && said.refused).toContain(named)
})

test("a property outside the commit that keeps no file is refused for keeping no file", () => {
  const said = filing(ROOT, { ...A_PORTRAIT, key: "lastMessagedAt" })
  expect("refused" in said && said.refused).toContain("names no file property")
})

test("a slug naming no page is refused", () => {
  const said = filing(ROOT, { ...A_PORTRAIT, slug: "nobody-by-this-name" })
  expect("refused" in said && said.refused).toContain("is no page here")
  expect("refused" in said && said.fault).toBe("caller")
})

test("a page stating no such file is refused rather than answered empty", () => {
  const said = filing(ROOT, { pageTypeSlug: "persona", slug: "akasha", key: "portrait" })
  expect("refused" in said && said.refused).toContain("states no")
})

test("a file of a page withheld from the asker is refused as akasha read refuses it", () => {
  const said = filing(ROOT, A_PORTRAIT, ["persona/pages/amy/amy.persona.ts"])
  expect("refused" in said && said.refused).toBe(REFUSED_WHOLE)
  expect("refused" in said && said.withheld).toBe(true)
  expect("refused" in said && said.fault).toBe("caller")
})

test("a file of a page not withheld is answered while another page is", () => {
  expect("bytes" in filing(ROOT, A_PORTRAIT, ["persona/pages/akasha/akasha.persona.ts"])).toBe(true)
})
