import { describe, expect, it } from "bun:test"
import { rewriteCodeTextString } from "./code-text-rewrites"

const OLD = "@FIXTURE-OLD/pkg"
const NEW = "@FIXTURE-NEW/pkg"

describe("rewriteCodeTextString", () => {
  it("rewrites the old name inside a line comment", () => {
    const src = `// Root barrel for ${OLD}.\nexport const X = 1\n`
    const r = rewriteCodeTextString(src, OLD, NEW)
    expect(r.next).toBe(`// Root barrel for ${NEW}.\nexport const X = 1\n`)
    expect(r.replacements).toBe(1)
  })

  it("rewrites the old name inside a JSDoc block comment", () => {
    const src = `/**\n * the previous home in ${OLD}/sub.ts) is\n */\n`
    const r = rewriteCodeTextString(src, OLD, NEW)
    expect(r.next).toBe(`/**\n * the previous home in ${NEW}/sub.ts) is\n */\n`)
    expect(r.replacements).toBe(1)
  })

  it("rewrites the old name inside a backticked code-span comment", () => {
    const src = `// registry in \`${OLD}\` so the lookup works\n`
    const r = rewriteCodeTextString(src, OLD, NEW)
    expect(r.next).toBe(`// registry in \`${NEW}\` so the lookup works\n`)
    expect(r.replacements).toBe(1)
  })

  it("rewrites multiple occurrences across a file", () => {
    const src = `// uses ${OLD}\nimport "${OLD}"\n// also ${OLD}/sub\n`
    const r = rewriteCodeTextString(src, OLD, NEW)
    expect(r.next).toBe(`// uses ${NEW}\nimport "${NEW}"\n// also ${NEW}/sub\n`)
    expect(r.replacements).toBe(3)
  })

  it("does NOT rewrite a longer name that has the old name as a prefix", () => {
    const longer = `${OLD}s`
    const src = `// references ${longer}\n`
    const r = rewriteCodeTextString(src, OLD, NEW)
    expect(r.next).toBe(src)
    expect(r.replacements).toBe(0)
  })

  it("no-op when oldName === newName", () => {
    const src = `// uses ${OLD}\n`
    const r = rewriteCodeTextString(src, OLD, OLD)
    expect(r.next).toBe(src)
    expect(r.replacements).toBe(0)
  })

  it("returns input unchanged when old name does not appear", () => {
    const src = `// nothing to see here\nexport const X = 1\n`
    const r = rewriteCodeTextString(src, OLD, NEW)
    expect(r.next).toBe(src)
    expect(r.replacements).toBe(0)
  })
})
