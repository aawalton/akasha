import { describe, expect, test } from "bun:test"
import {
  KEY_SPACE_SCAN_BOUND,
  PROPERTIES_FILE_CANONICAL_KEY,
  scanPropertiesFileKeySpace,
} from "./properties-file-key-space.ts"

const K = "propertyId"
const MATCH = `{ ${K}:`

const scan = (source: string) => scanPropertiesFileKeySpace(source, "sample.ts")

describe("string-literal carriers — a claim made to a reader", () => {
  test("flags a double-quoted help string", () => {
    const found = scan(`const help = "JSON map \`{ ${K}: value }\` of domain properties"`)
    expect(found.map((c) => c.text)).toEqual([MATCH])
    expect(found.map((c) => c.line)).toEqual([1])
  })

  test("flags a single-quoted flag description", () => {
    expect(
      scan(`const d = 'JSON file with a \`{ ${K}: value }\` object ("-" = stdin)'`)
    ).toHaveLength(1)
  })

  test("flags a backtick template with no substitution", () => {
    expect(scan(`const help = \`points to a JSON map { ${K}: value }\``)).toHaveLength(1)
  })

  test("flags the brace-tight spelling", () => {
    expect(scan(`const h = "a {${K}: value} map"`).map((c) => c.text)).toEqual([`{${K}:`])
  })

  test("reports the line the claim sits on, not the line the literal opened on", () => {
    const found = scan(`const help =\n  "opens here\\n" +\n  "and claims { ${K}: value } here"`)
    expect(found.map((c) => c.line)).toEqual([3])
  })

  test("finds every claim in a file, not just the first", () => {
    expect(scan(`const a = "map { ${K}: v }"\nconst b = "file { ${K}: v }"`)).toHaveLength(2)
  })
})

describe("code carriers — structurally invisible, not filtered", () => {
  test("ignores a type annotation", () => {
    expect(scan(`props: ReadonlyArray<{ ${K}: string; value: unknown }>`)).toEqual([])
  })

  test("ignores an object literal written in code", () => {
    expect(scan(`props.push({ ${K}: "status", value: status })`)).toEqual([])
  })

  test("ignores a template substitution reading the field", () => {
    expect(scan(`throw new Error(\`property \${p.${K}} is not JSON-shaped\`)`)).toEqual([])
  })

  test("ignores the props-array record shape, which has no colon", () => {
    expect(scan(`const h = "Patch raw \`{ ${K}, value }\` props onto a page"`)).toEqual([])
  })
})

describe("comment carriers — the closed form, which is a claim rather than a paraphrase", () => {
  test("flags a JSDoc comment over the field that carries the map", () => {
    const found = scan(`/** Inbound \`{ ${K}: value }\` map. */\ninterface X { a: 1 }`)
    expect(found.map((c) => c.text)).toEqual([MATCH])
    expect(found.map((c) => c.line)).toEqual([1])
  })

  test("flags a line comment stating the same claim", () => {
    expect(scan(`// keys are \`{ ${K}: value }\` here`)).toHaveLength(1)
  })

  test("reports the line the claim sits on inside a block comment", () => {
    expect(
      scan(`/**\n * opens here\n * and claims { ${K}: value } here\n */`).map((c) => c.line)
    ).toEqual([3])
  })

  test("reaches a comment sitting last inside a block, before the closing brace", () => {
    expect(scan(`function f() {\n  // the \`{ ${K}: value }\` map\n}`)).toHaveLength(1)
  })

  test("reaches a comment after the last token in the file", () => {
    expect(scan(`const a = 1\n// the \`{ ${K}: value }\` map`)).toHaveLength(1)
  })

  test("ignores a comment describing a record whose field carries this name", () => {
    expect(scan(`// parsed into \`{ ${K}: "story", operator: "equals", value }\``)).toEqual([])
  })

  test("ignores a comment whose brace never closes, which the bound declares", () => {
    expect(scan(`// the map is \`{ ${K}: … and then more prose`)).toEqual([])
  })

  test("still flags the same open form inside help text, so the arms stay apart", () => {
    expect(scan(`const h = "the map is \`{ ${K}: …\` and the value is anything"`)).toHaveLength(1)
  })

  test("counts one claim once, however many tokens the comment precedes", () => {
    expect(scan(`// the \`{ ${K}: value }\` map\nexport const a = { b: 1, c: 2 }`)).toHaveLength(1)
  })
})

describe("the canonical spelling is never a violation", () => {
  test("does not flag the key space this check exists to require", () => {
    const canonical = PROPERTIES_FILE_CANONICAL_KEY
    expect(scan(`const h = "JSON map \`{ ${canonical}: value }\` — stored verbatim"`)).toEqual([])
  })

  test("the canonical key is the one the help texts were corrected to", () => {
    expect(PROPERTIES_FILE_CANONICAL_KEY).toBe("propertySlug")
  })
})

describe("the declared bound", () => {
  test("names what the comment arm's closed form leaves out, now that comments are read", () => {
    expect(KEY_SPACE_SCAN_BOUND.length).toBeGreaterThan(0)
    expect(KEY_SPACE_SCAN_BOUND.some((b) => b.toLowerCase().includes("closed"))).toBe(true)
  })

  test("no bound entry writes the prohibited form as a literal, which would self-flag", () => {
    for (const entry of KEY_SPACE_SCAN_BOUND) {
      expect(scanPropertiesFileKeySpace(`const b = ${JSON.stringify(entry)}`, "b.ts")).toEqual([])
    }
  })
})
