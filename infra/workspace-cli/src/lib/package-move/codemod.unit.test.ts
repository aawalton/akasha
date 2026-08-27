import { describe, expect, it } from "bun:test"
import { rewriteImportString } from "./codemod"

const OLD = "@FIXTURE-OLD/pkg"
const NEW = "@FIXTURE-NEW/pkg"

describe("rewriteImportString", () => {
  it('rewrites `from "X"`', () => {
    const r = rewriteImportString(`import { x } from "${OLD}"\n`, OLD, NEW)
    expect(r.next).toBe(`import { x } from "${NEW}"\n`)
    expect(r.replacements).toBe(1)
  })

  it("rewrites subpath imports", () => {
    const r = rewriteImportString(`import { x } from "${OLD}/util"\n`, OLD, NEW)
    expect(r.next).toBe(`import { x } from "${NEW}/util"\n`)
  })

  it("rewrites bare side-effect imports", () => {
    const r = rewriteImportString(`import "${OLD}/style.css"\n`, OLD, NEW)
    expect(r.next).toBe(`import "${NEW}/style.css"\n`)
  })

  it("rewrites dynamic imports", () => {
    const r = rewriteImportString(`const x = await import("${OLD}")\n`, OLD, NEW)
    expect(r.next).toBe(`const x = await import("${NEW}")\n`)
  })

  it("rewrites CommonJS require", () => {
    const r = rewriteImportString(`const x = require("${OLD}")\n`, OLD, NEW)
    expect(r.next).toBe(`const x = require("${NEW}")\n`)
  })

  it("does NOT rewrite arbitrary string literals matching the name", () => {
    const r = rewriteImportString(`const x = "${OLD}"\n`, OLD, NEW)
    expect(r.next).toBe(`const x = "${OLD}"\n`)
    expect(r.replacements).toBe(0)
  })

  it("does NOT rewrite similar-prefix names", () => {
    const r = rewriteImportString(`import { x } from "${OLD}bar"\n`, OLD, NEW)
    expect(r.next).toBe(`import { x } from "${OLD}bar"\n`)
    expect(r.replacements).toBe(0)
  })

  it("no-op when oldName === newName", () => {
    const r = rewriteImportString(`import { x } from "${OLD}"\n`, OLD, OLD)
    expect(r.replacements).toBe(0)
  })

  it("preserves quote style", () => {
    const single = rewriteImportString(`import { x } from '${OLD}'\n`, OLD, NEW)
    expect(single.next).toBe(`import { x } from '${NEW}'\n`)
  })
})
