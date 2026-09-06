import { expect, test } from "bun:test"
import { join } from "node:path"
import { bodyAt, filedAmong, filedValue } from "./page-file-body.module.code.ts"

const ROOT = join(import.meta.dir, "..", "..")

const A_PERSONA_AT = "persona-system/personas/ember/ember.persona.ts"

const PORTRAIT = { key: "portrait", propertySlug: "portrait", pageTypeSlug: "file-property" }

const PURPOSE = { key: "purpose", propertySlug: "purpose", pageTypeSlug: "text-property" }

const SESSIONS = {
  key: "sessions",
  propertySlug: "sessions",
  pageTypeSlug: "page-property-entry",
}

test("a file property is picked out of what a page type declares", () => {
  expect(filedAmong([PORTRAIT, PURPOSE, SESSIONS])).toEqual([PORTRAIT])
})

test("a body is read from the file beside the page", () => {
  const said = bodyAt(ROOT, A_PERSONA_AT, "portrait", "md")
  expect("body" in said && said.body.length).toBeGreaterThan(0)
})

test("a file the page names that is not there is refused", () => {
  const said = bodyAt(ROOT, A_PERSONA_AT, "portrait", "txt")
  expect("refused" in said && said.refused).toContain("no file is there")
})

test("a path that is no page file is refused", () => {
  const said = bodyAt(
    ROOT,
    "persona-system/personas/ember/ember.persona.portrait.md",
    "portrait",
    "md"
  )
  expect("refused" in said && said.refused).toContain("is no page file")
})

test("a key asked for by name is answered as its body in place of its ending", () => {
  const said = filedValue(ROOT, A_PERSONA_AT, { portrait: "md" }, [PORTRAIT], ["portrait"])
  expect(typeof said.portrait).toBe("string")
  expect(said.portrait).not.toBe("md")
  expect(String(said.portrait).length).toBeGreaterThan(2)
})

test("a key nobody asked for is left as the ending it states", () => {
  const said = filedValue(ROOT, A_PERSONA_AT, { portrait: "md" }, [PORTRAIT], [])
  expect(said.portrait).toBe("md")
})

test("a key asked for that names no file property is left as it stands", () => {
  const said = filedValue(ROOT, A_PERSONA_AT, { purpose: "a purpose" }, [PURPOSE], ["purpose"])
  expect(said.purpose).toBe("a purpose")
})

test("a value the page does not carry is passed over", () => {
  const said = filedValue(ROOT, A_PERSONA_AT, {}, [PORTRAIT], ["portrait"])
  expect(said.portrait).toBeUndefined()
})

test("a file asked for by name that is not there raises", () => {
  expect(() =>
    filedValue(ROOT, A_PERSONA_AT, { portrait: "txt" }, [PORTRAIT], ["portrait"])
  ).toThrow("no file is there")
})
