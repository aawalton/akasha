import { relative } from "node:path"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import { isGeneratedFile } from "../../../generated-file/generated-file.ts"
import { refusalText } from "../../../refusal/refusal.ts"
import type { Check } from "../check-shape.ts"

const CODE = /\.tsx?$/

const FORWARDED = /^export\s+(?:type\s+)?(\*(?:\s+as\s+\w+)?|\{[^}]*\})\s+from\s+"([^"]+)"/gm

const EXPORTED = /^export\s+(?:type\s+)?\{([^}]*)\}\s*$/gm

const IMPORTED = /^import\s+(?:type\s+)?\{([^}]*)\}\s+from\s+"([^"]+)"/gm

function listed(inside: string): readonly string[] {
  return inside
    .split(",")
    .map((one) => one.trim())
    .filter((one) => one !== "")
}

function renamed(entry: string): readonly string[] {
  return entry
    .replace(/^type\s+/, "")
    .split(/\s+as\s+/)
    .map((one) => one.trim())
}

function boundAs(entry: string): string {
  const parts = renamed(entry)
  return parts[parts.length - 1] ?? ""
}

function takenFrom(text: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of text.matchAll(IMPORTED)) {
    for (const entry of listed(one[1] as string)) found.set(boundAs(entry), one[2] as string)
  }
  return found
}

export const exportDeclaredHere = {
  slug: "export-declared-here",
  needs: "file",
  cached: false,
  run: ({ root, path, body }) => {
    const key = relative(root, path)
    if (!CODE.test(key)) return []
    const text = decodeUtf8(body)
    if (text === null || isGeneratedFile(key, text)) return []
    const said: string[] = []
    for (const one of text.matchAll(FORWARDED)) {
      said.push(
        refusalText("export-not-declared-here", {
          exported: one[1] as string,
          source: one[2] as string,
        })
      )
    }
    const taken = takenFrom(text)
    for (const one of text.matchAll(EXPORTED)) {
      for (const entry of listed(one[1] as string)) {
        const named = renamed(entry)[0] ?? ""
        const from = taken.get(named)
        if (from !== undefined) {
          said.push(refusalText("export-not-declared-here", { exported: named, source: from }))
        }
      }
    }
    return said
  },
} satisfies Check

export default exportDeclaredHere
