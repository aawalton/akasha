const PERMITTED_KEYWORDS = new Set<string>([
  "type",
  "properties",
  "required",
  "additionalProperties",
  "items",
  "$defs",
  "$ref",
  "enum",
  "const",
  "pattern",
  "minLength",
  "maxLength",
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "minItems",
  "maxItems",
  "uniqueItems",
  "if",
  "then",
  "else",
  "dependentSchemas",
  "not",
])

const PERMITTED_TYPES = new Set<string>([
  "object",
  "array",
  "string",
  "number",
  "integer",
  "boolean",
  "null",
])

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v)

const isInteger = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v)

function walkSchema(node: unknown, path: string, exemptAp: boolean): readonly string[] {
  const out: string[] = []
  if (!isPlainObject(node)) {
    out.push(`${path}: schema node must be an object`)
    return out
  }

  for (const key of Object.keys(node)) {
    if (!PERMITTED_KEYWORDS.has(key)) {
      out.push(`${path}: keyword "${key}" is not permitted by the profile`)
    }
  }

  if ("type" in node) {
    const t = node.type
    if (typeof t !== "string" || !PERMITTED_TYPES.has(t)) {
      out.push(
        `${path}/type: must be one of object|array|string|number|integer|boolean|null (a single string; type-arrays are not permitted)`
      )
    }
  }

  if ("properties" in node) {
    const props = node.properties
    if (!isPlainObject(props)) {
      out.push(`${path}/properties: must be an object`)
    } else {
      for (const [k, sub] of Object.entries(props)) {
        out.push(...walkSchema(sub, `${path}/properties/${k}`, exemptAp))
      }
    }
  }

  if ("required" in node) {
    const req = node.required
    if (!Array.isArray(req) || !req.every((r) => typeof r === "string")) {
      out.push(`${path}/required: must be an array of strings`)
    }
  }

  if ("items" in node) {
    if (Array.isArray(node.items)) {
      out.push(`${path}/items: tuple items are not permitted; use a single schema`)
    } else {
      out.push(...walkSchema(node.items, `${path}/items`, exemptAp))
    }
  }

  if ("$defs" in node) {
    const defs = node.$defs
    if (!isPlainObject(defs)) {
      out.push(`${path}/$defs: must be an object`)
    } else {
      for (const [k, sub] of Object.entries(defs)) {
        out.push(...walkSchema(sub, `${path}/$defs/${k}`, exemptAp))
      }
    }
  }

  if ("$ref" in node) {
    const ref = node.$ref
    if (typeof ref !== "string" || !/^#\/\$defs\//.test(ref)) {
      out.push(`${path}/$ref: only same-document "#/$defs/..." refs are permitted`)
    }
  }

  if ("enum" in node && !Array.isArray(node.enum)) {
    out.push(`${path}/enum: must be an array`)
  }

  if ("pattern" in node) {
    const p = node.pattern
    if (typeof p !== "string" || !p.startsWith("^") || !p.endsWith("$")) {
      out.push(`${path}/pattern: must be an anchored ^...$ string`)
    }
  }

  for (const lenKey of ["minLength", "maxLength", "minItems", "maxItems"] as const) {
    if (lenKey in node) {
      const val = node[lenKey]
      if (!(isInteger(val) && val >= 0)) {
        out.push(`${path}/${lenKey}: must be a non-negative integer`)
      }
    }
  }

  for (const numKey of ["minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum"] as const) {
    if (numKey in node && typeof node[numKey] !== "number") {
      out.push(`${path}/${numKey}: must be a number`)
    }
  }

  if ("uniqueItems" in node && typeof node.uniqueItems !== "boolean") {
    out.push(`${path}/uniqueItems: must be a boolean`)
  }

  for (const condKey of ["if", "then", "else"] as const) {
    if (condKey in node) out.push(...walkSchema(node[condKey], `${path}/${condKey}`, true))
  }

  if ("dependentSchemas" in node) {
    const dep = node.dependentSchemas
    if (!isPlainObject(dep)) {
      out.push(`${path}/dependentSchemas: must be an object`)
    } else {
      for (const [k, sub] of Object.entries(dep)) {
        out.push(...walkSchema(sub, `${path}/dependentSchemas/${k}`, true))
      }
    }
  }

  if ("not" in node) {
    const n = node.not
    const keys = isPlainObject(n) ? Object.keys(n) : []
    const okShape =
      isPlainObject(n) &&
      keys.length === 1 &&
      keys[0] === "required" &&
      Array.isArray(n.required) &&
      n.required.every((r) => typeof r === "string")
    if (!okShape) {
      out.push(`${path}/not: only the forbidden-field idiom { required: [<string>] } is permitted`)
    }
  }

  const isObjectNode = node.type === "object" || "properties" in node
  if (isObjectNode && !exemptAp && !("additionalProperties" in node)) {
    out.push(`${path}: object schema must declare additionalProperties: false`)
  } else if ("additionalProperties" in node && node.additionalProperties !== false) {
    out.push(`${path}/additionalProperties: must be false`)
  }

  return out
}

export function evaluateSchemaProfile(doc: unknown): readonly string[] {
  return walkSchema(doc, "#", false)
}
