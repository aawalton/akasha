import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { textThere } from "akasha/utils/fs/text-there/text-there.module.code.ts"

export function generatedPathFor(synthPath: string, name: string): string {
  return join(dirname(synthPath), "generated", `${name}.generated.yaml`)
}

export function writeIfChanged(absPath: string, content: string): undefined {
  if (textThere(absPath) === content) return
  mkdirSync(dirname(absPath), { recursive: true })
  writeFileSync(absPath, content, "utf8")
}
