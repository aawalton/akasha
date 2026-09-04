import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

export function tryRead(absPath: string): string | null {
  try {
    return readFileSync(absPath, "utf8")
  } catch {
    return null
  }
}

export function generatedPathFor(synthPath: string, name: string): string {
  return join(dirname(synthPath), "generated", `${name}.generated.yaml`)
}

export function writeIfChanged(absPath: string, content: string): undefined {
  if (tryRead(absPath) === content) return
  mkdirSync(dirname(absPath), { recursive: true })
  writeFileSync(absPath, content, "utf8")
}
