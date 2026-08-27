import { describe, expect, it } from "bun:test"
import { evaluateSchemaProfile } from "./schema-profile"

const flags = (violations: readonly string[], substr: string): boolean =>
  violations.some((v) => v.includes(substr))

const withKey = <T extends Record<string, unknown>>(o: T, k: string, v: unknown): T => {
  o[k] = v
  return o
}

describe("evaluateSchemaProfile — compliant baselines", () => {
  it("passes an object schema with anchored pattern, minimum, and an enum", () => {
    expect(
      evaluateSchemaProfile({
        type: "object",
        additionalProperties: false,
        properties: {
          name: { type: "string", pattern: "^x$" },
          count: { type: "integer", minimum: 0 },
          color: { enum: ["red", "green"] },
        },
        required: ["name"],
      })
    ).toEqual([])
  })

  it("passes a realistic nested chronology-shaped schema (every node compliant)", () => {
    expect(
      evaluateSchemaProfile(
        withKey(
          {
            type: "object",
            additionalProperties: false,
            properties: {
              status: { enum: ["draft", "published"] },
              order: { type: "integer", minimum: 0 },
              slug: { type: "string", pattern: "^[a-z]+$", minLength: 1 },
              tags: {
                type: "array",
                uniqueItems: true,
                items: { type: "string", pattern: "^.+$" },
              },
            },
            required: ["status", "order"],
            if: {
              properties: { status: { const: "published" } },
            },
            else: { not: { required: ["slug"] } },
          },
          "then",
          { required: ["slug"] }
        )
      )
    ).toEqual([])
  })
})

describe("evaluateSchemaProfile — keyword whitelist", () => {
  const UNKNOWN_KEYWORDS = [
    "format",
    "patternProperties",
    "unevaluatedProperties",
    "multipleOf",
    "contains",
    "propertyNames",
    "$dynamicRef",
    "contentEncoding",
  ] as const

  for (const kw of UNKNOWN_KEYWORDS) {
    it(`flags "${kw}" as not permitted by the profile`, () => {
      expect(evaluateSchemaProfile({ [kw]: "whatever" })).toEqual([
        `#: keyword "${kw}" is not permitted by the profile`,
      ])
    })
  }
})

describe("evaluateSchemaProfile — additionalProperties: false on every object node", () => {
  it("flags an object node missing additionalProperties", () => {
    expect(evaluateSchemaProfile({ type: "object", properties: {} })).toEqual([
      "#: object schema must declare additionalProperties: false",
    ])
  })

  it("flags additionalProperties: true", () => {
    expect(
      evaluateSchemaProfile({ type: "object", additionalProperties: true, properties: {} })
    ).toEqual(["#/additionalProperties: must be false"])
  })

  it("flags a NESTED object node under properties missing additionalProperties (recursion)", () => {
    expect(
      evaluateSchemaProfile({
        type: "object",
        additionalProperties: false,
        properties: {
          inner: { type: "object", properties: {} },
        },
      })
    ).toEqual(["#/properties/inner: object schema must declare additionalProperties: false"])
  })

  it("treats a bare `properties` node (no type) as an object node too", () => {
    expect(evaluateSchemaProfile({ properties: {} })).toEqual([
      "#: object schema must declare additionalProperties: false",
    ])
  })
})

describe("evaluateSchemaProfile — type must be a single permitted primitive", () => {
  it('flags a type-array like ["string", "null"]', () => {
    const out = evaluateSchemaProfile({ type: ["string", "null"] })
    expect(flags(out, "#/type: must be one of")).toBe(true)
    expect(flags(out, "type-arrays are not permitted")).toBe(true)
  })

  it("flags an unknown type name", () => {
    expect(flags(evaluateSchemaProfile({ type: "foo" }), "#/type: must be one of")).toBe(true)
  })

  it("passes each of the seven permitted primitives", () => {
    for (const t of ["array", "string", "number", "integer", "boolean", "null"] as const) {
      expect(evaluateSchemaProfile({ type: t })).toEqual([])
    }
    expect(evaluateSchemaProfile({ type: "object", additionalProperties: false })).toEqual([])
  })
})

describe("evaluateSchemaProfile — pattern must be anchored ^...$", () => {
  it("flags an unanchored pattern", () => {
    expect(evaluateSchemaProfile({ pattern: "abc" })).toEqual([
      "#/pattern: must be an anchored ^...$ string",
    ])
  })

  it("passes an anchored pattern", () => {
    expect(evaluateSchemaProfile({ type: "string", pattern: "^abc$" })).toEqual([])
  })
})

describe("evaluateSchemaProfile — $ref must be same-document #/$defs/...", () => {
  it("flags an external URL ref", () => {
    expect(evaluateSchemaProfile({ $ref: "https://x" })).toEqual([
      '#/$ref: only same-document "#/$defs/..." refs are permitted',
    ])
  })

  it("flags a #/definitions/... ref (draft-04 anchor)", () => {
    expect(evaluateSchemaProfile({ $ref: "#/definitions/x" })).toEqual([
      '#/$ref: only same-document "#/$defs/..." refs are permitted',
    ])
  })

  it("passes a #/$defs/... ref with a matching $defs", () => {
    expect(
      evaluateSchemaProfile({ $ref: "#/$defs/Foo", $defs: { Foo: { type: "string" } } })
    ).toEqual([])
  })
})

describe("evaluateSchemaProfile — not only in the forbidden-field idiom", () => {
  it("passes not: { required: [k] }", () => {
    expect(evaluateSchemaProfile({ not: { required: ["by"] } })).toEqual([])
  })

  it("flags a general not: { type: ... } subschema", () => {
    expect(evaluateSchemaProfile({ not: { type: "string" } })).toEqual([
      "#/not: only the forbidden-field idiom { required: [<string>] } is permitted",
    ])
  })

  it("flags not with required plus extra sibling keys", () => {
    expect(
      evaluateSchemaProfile({ not: { required: ["x"], properties: { a: { type: "string" } } } })
    ).toEqual(["#/not: only the forbidden-field idiom { required: [<string>] } is permitted"])
  })
})

describe("evaluateSchemaProfile — items", () => {
  it("recurses into a single-schema items and flags a violation inside", () => {
    expect(
      evaluateSchemaProfile({ type: "array", items: { type: "string", pattern: "abc" } })
    ).toEqual(["#/items/pattern: must be an anchored ^...$ string"])
  })

  it("flags a tuple items: [...] array form", () => {
    expect(evaluateSchemaProfile({ type: "array", items: [{ type: "string" }] })).toEqual([
      "#/items: tuple items are not permitted; use a single schema",
    ])
  })
})

describe("evaluateSchemaProfile — $defs values are schemas and recurse", () => {
  it("flags a bad keyword inside a $def with a $defs path", () => {
    const out = evaluateSchemaProfile({ $defs: { Foo: { format: "email" } } })
    expect(out).toEqual(['#/$defs/Foo: keyword "format" is not permitted by the profile'])
    expect(flags(out, "$defs")).toBe(true)
  })
})

describe("evaluateSchemaProfile — conditionals recurse", () => {
  it("recurses into if / then / else", () => {
    expect(flags(evaluateSchemaProfile({ if: { multipleOf: 2 } }), "#/if:")).toBe(true)
    expect(flags(evaluateSchemaProfile(withKey({}, "then", { format: "x" })), "#/then:")).toBe(true)
    expect(flags(evaluateSchemaProfile({ else: { contains: {} } }), "#/else:")).toBe(true)
  })

  it("recurses into dependentSchemas values", () => {
    expect(evaluateSchemaProfile({ dependentSchemas: { a: { format: "email" } } })).toEqual([
      '#/dependentSchemas/a: keyword "format" is not permitted by the profile',
    ])
  })
})

describe("evaluateSchemaProfile — conditional matchers are exempt from additionalProperties:false", () => {
  it("ACCEPTS an `if` matcher with properties and no additionalProperties (fidelity form)", () => {
    expect(evaluateSchemaProfile({ if: { properties: { by: { const: "epi" } } } })).toEqual([])
  })

  it("ACCEPTS a `then` overlay carrying properties without additionalProperties", () => {
    expect(
      evaluateSchemaProfile(withKey({}, "then", { properties: { claimed: { type: "string" } } }))
    ).toEqual([])
  })

  it("ACCEPTS an `else` overlay carrying properties without additionalProperties", () => {
    expect(evaluateSchemaProfile({ else: { properties: { slug: { type: "string" } } } })).toEqual(
      []
    )
  })

  it("ACCEPTS a dependentSchemas value carrying properties without additionalProperties", () => {
    expect(
      evaluateSchemaProfile({
        dependentSchemas: {
          credit: { properties: { amount: { minimum: 1 } }, required: ["amount"] },
        },
      })
    ).toEqual([])
  })

  it("still ACCEPTS a matcher that declares additionalProperties:false (permitted, not required)", () => {
    expect(
      evaluateSchemaProfile({
        if: { additionalProperties: false, properties: { by: { const: "epi" } } },
      })
    ).toEqual([])
  })

  it("still REJECTS additionalProperties:true inside a conditional matcher", () => {
    expect(
      evaluateSchemaProfile({
        if: { additionalProperties: true, properties: { by: { const: "epi" } } },
      })
    ).toEqual(["#/if/additionalProperties: must be false"])
  })

  it("still REQUIRES additionalProperties:false on the structural parent of a conditional", () => {
    expect(
      evaluateSchemaProfile({
        type: "object",
        properties: { by: { enum: ["epi", "asserted"] } },
        if: { properties: { by: { const: "epi" } } },
      })
    ).toEqual(["#: object schema must declare additionalProperties: false"])
  })

  it("still enforces the keyword whitelist inside a conditional overlay", () => {
    expect(evaluateSchemaProfile({ if: { properties: { by: { format: "email" } } } })).toEqual([
      '#/if/properties/by: keyword "format" is not permitted by the profile',
    ])
  })
})

describe("evaluateSchemaProfile — keyword value-type checks", () => {
  it("flags a non-integer minLength", () => {
    expect(evaluateSchemaProfile({ minLength: "x" })).toEqual([
      "#/minLength: must be a non-negative integer",
    ])
  })

  it("flags a non-number minimum", () => {
    expect(evaluateSchemaProfile({ minimum: "x" })).toEqual(["#/minimum: must be a number"])
  })

  it("flags a non-boolean uniqueItems", () => {
    expect(evaluateSchemaProfile({ uniqueItems: "x" })).toEqual([
      "#/uniqueItems: must be a boolean",
    ])
  })
})

describe("evaluateSchemaProfile — the whole doc must be an object", () => {
  it("flags a string doc", () => {
    expect(evaluateSchemaProfile("nope")).toEqual(["#: schema node must be an object"])
  })

  it("flags a number doc", () => {
    expect(evaluateSchemaProfile(42)).toEqual(["#: schema node must be an object"])
  })
})
