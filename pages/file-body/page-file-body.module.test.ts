import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { bodyAt, bytesAt, filedAmong, filedValue } from "./page-file-body.module.code.ts"

const ROOT = join(import.meta.dir, "..", "..")

const A_PERSONA_AT = "personas/pages/ember/ember.persona.ts"

const PORTRAIT = { key: "portrait", propertySlug: "portrait", pageTypeSlug: "file-property" }

const PURPOSE = { key: "purpose", propertySlug: "purpose", pageTypeSlug: "text-property" }

const SESSIONS = {
  key: "sessions",
  propertySlug: "sessions",
  pageTypeSlug: "page-property-entry",
}

const SCRATCH_AT = process.env["SCRATCH_AT"] ?? "/var/tmp"

const A_PICTURE_AT = "holder/holder.persona.ts"

const A_PICTURE = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0xff, 0xfe, 0x00])

const scratch = mkdtempSync(join(SCRATCH_AT, "page-file-body-"))

mkdirSync(join(scratch, "holder"), { recursive: true })
writeFileSync(join(scratch, A_PICTURE_AT), "export const holder = {}\n")
writeFileSync(join(scratch, "holder/holder.persona.mobile-wallpaper.png"), A_PICTURE)

afterAll(() => {
  rmSync(scratch, { recursive: true, force: true })
})

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
  const said = bodyAt(ROOT, "personas/ember/ember.persona.portrait.md", "portrait", "md")
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

test("a body that is no text is read back byte for byte", () => {
  const said = bytesAt(scratch, A_PICTURE_AT, "mobile-wallpaper", "png")
  expect("bytes" in said).toBe(true)
  if (!("bytes" in said)) return
  expect(Array.from(said.bytes)).toEqual(Array.from(A_PICTURE))
})

test("the same body decoded as text loses the bytes no encoding admits", () => {
  const said = bodyAt(scratch, A_PICTURE_AT, "mobile-wallpaper", "png")
  expect("body" in said).toBe(true)
  if (!("body" in said)) return
  const again = new TextEncoder().encode(said.body)
  expect(Array.from(again)).not.toEqual(Array.from(A_PICTURE))
  expect(again[0]).not.toBe(0x89)
})

test("a picture read as bytes is refused where no file sits beside the page", () => {
  const said = bytesAt(scratch, A_PICTURE_AT, "mobile-wallpaper", "jpg")
  expect("refused" in said && said.refused).toContain("no file is there")
})
