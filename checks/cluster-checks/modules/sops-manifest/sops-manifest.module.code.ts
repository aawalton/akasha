import { parseAllDocuments } from "yaml"

const isRecord = (x: unknown): x is Record<string, unknown> => typeof x === "object" && x !== null

export type AssertResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly errors: readonly string[] }

export function assertManifestShape(yamlText: string): AssertResult {
  const docs = parseAllDocuments(yamlText)
  if (docs.length === 0) {
    return { ok: false, errors: ["empty document stream"] }
  }
  const errors: string[] = []
  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i]
    if (doc === undefined) continue
    if (doc.errors.length > 0) {
      for (const e of doc.errors) errors.push(`doc[${i}]: yaml parse error: ${e.message}`)
      continue
    }
    const obj: unknown = doc.toJS()
    if (obj === null) {
      errors.push(`doc[${i}]: top-level value is null`)
      continue
    }
    if (Array.isArray(obj) || !isRecord(obj)) {
      const got = Array.isArray(obj) ? "array" : typeof obj
      errors.push(`doc[${i}]: top-level value is not a mapping (got ${got})`)
      continue
    }
    if (typeof obj.apiVersion !== "string" || obj.apiVersion === "") {
      errors.push(`doc[${i}]: missing or empty top-level "apiVersion"`)
    }
    if (typeof obj.kind !== "string" || obj.kind === "") {
      errors.push(`doc[${i}]: missing or empty top-level "kind"`)
    }
  }
  return errors.length === 0 ? { ok: true } : { ok: false, errors }
}
