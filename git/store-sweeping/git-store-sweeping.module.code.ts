import { existsSync, rmSync } from "node:fs"
import { join } from "node:path"
import { LEFT } from "akasha/files/git-place/git-place.module.code.ts"

export type Found = {
  readonly at: string
  readonly there: boolean
}

export type Took = {
  readonly took: readonly string[]
  readonly refusals: readonly string[]
}

export function foundIn(gitDir: string, left: readonly string[] = LEFT): readonly Found[] {
  return left.map((at) => ({ at, there: existsSync(join(gitDir, at)) }))
}

export function takingFrom(gitDir: string, found: readonly Found[]): Took {
  const took: string[] = []
  const refusals: string[] = []
  for (const one of found) {
    if (!one.there) continue
    try {
      rmSync(join(gitDir, one.at), { recursive: true, force: true })
      took.push(one.at)
    } catch (thrown) {
      const why = thrown instanceof Error ? thrown.message : String(thrown)
      refusals.push(`\`${one.at}\` would not go: ${why}`)
    }
  }
  return { took, refusals }
}
