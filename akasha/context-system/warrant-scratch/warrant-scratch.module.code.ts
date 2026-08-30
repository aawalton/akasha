import { join, relative } from "node:path"
import { standing } from "../../command-system/scratching/scratching.module.test-fixtures.ts"
import { indexIn } from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Warrant } from "../warranting/warranting.module.code.ts"

export function indexed(root: string, at: string, line: string): void {
  standing(root, join(relative(root, indexIn(root)), at), `${line}\n`)
}

export function pathsOf(found: readonly Warrant[]): readonly string[] {
  return found.map((one) => one.path)
}
