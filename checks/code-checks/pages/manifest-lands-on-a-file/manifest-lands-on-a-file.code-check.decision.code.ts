import { reachesIn } from "@akasha/code/package-manifest"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import type { Manifest } from "../package-reached-where-named/package-reached-where-named.code-check.code.ts"

const SAID = "a way into a package lands on a file that is there"

export type Asking = {
  readonly textAt: (path: string) => string | null
  readonly there: (path: string) => boolean
}

export function missingIn(
  folder: string,
  text: string,
  there: (path: string) => boolean
): readonly string[] {
  const said: string[] = []
  for (const [specifier, path] of reachesIn(folder, text)) {
    if (there(path)) continue
    said.push(`names \`${specifier}\`, which lands on ${path}, where no file is — ${SAID}`)
  }
  return said
}

export function refusalsOver(manifests: readonly Manifest[], asking: Asking): readonly Judged[] {
  const said: Judged[] = []
  for (const one of manifests) {
    const text = asking.textAt(one.at)
    if (text === null) continue
    for (const reason of missingIn(one.folder, text, asking.there)) {
      said.push({ path: one.at, reason })
    }
  }
  return said.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}
