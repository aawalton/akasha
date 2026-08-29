import { readFileSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, type Reading, sameBody } from "../reading/reading.module.code.ts"

export function movedOnDisk(root: string, asRead: readonly Reading[]): readonly string[] {
  const moved: string[] = []
  for (const one of asRead) {
    let stood = ""
    try {
      stood = blobIdOf(readFileSync(join(root, one.path)))
    } catch {}
    if (!sameBody(one, stood)) moved.push(one.path)
  }
  return moved.sort()
}
