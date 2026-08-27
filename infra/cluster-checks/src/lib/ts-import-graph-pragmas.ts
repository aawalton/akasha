import { z } from "zod"
import type { ModulePragmas } from "./ts-import-graph-types"

const LINE_PRAGMA_RE = /^\s*\/\/\s*ast-unused:\s*keep\s*(?:[—–-]{1,2})\s*(.*?)\s*$/
const FILE_PRAGMA_RE = /^\s*\/\/\s*ast-unused-file:\s*ignore\s*(?:[—–-]{1,2})\s*(.*?)\s*$/

const PRAGMA_MATCH_SCHEMA = z.tuple([z.string(), z.string()])

function parsePragmaMatch(re: RegExp, line: string): readonly [string, string] | null {
  const result = PRAGMA_MATCH_SCHEMA.safeParse(re.exec(line))
  return result.success ? result.data : null
}

export function parsePragmas(text: string): ModulePragmas {
  let file: ModulePragmas["file"] = null
  const lineMap: ModulePragmas["lines"] = new Map()
  const invalid: { line: number; kind: "line" | "file" }[] = []
  const lines = text.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line === undefined) continue
    const oneBased = i + 1
    const fileMatch = parsePragmaMatch(FILE_PRAGMA_RE, line)
    if (fileMatch) {
      const reason = fileMatch[1].trim()
      if (reason.length === 0) {
        invalid.push({ line: oneBased, kind: "file" })
      } else if (!file) {
        file = { reason, line: oneBased }
      }
      continue
    }
    const lineMatch = parsePragmaMatch(LINE_PRAGMA_RE, line)
    if (lineMatch) {
      const reason = lineMatch[1].trim()
      if (reason.length === 0) {
        invalid.push({ line: oneBased, kind: "line" })
      } else {
        lineMap.set(oneBased, { reason })
      }
    }
  }
  return { file, lines: lineMap, invalid }
}
