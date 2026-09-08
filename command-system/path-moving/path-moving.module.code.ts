import { existsSync, mkdirSync, renameSync } from "node:fs"
import { dirname, join } from "node:path"

export type FileMove = {
  readonly from: string
  readonly to: string
}

export type Carrying = {
  readonly committing: readonly FileMove[]
  readonly uncommitted: readonly FileMove[]
}

export function carriesHeld(
  carries: readonly FileMove[],
  before: ReadonlyMap<string, Uint8Array | null>
): Carrying {
  const on = (one: FileMove): boolean => (before.get(one.from) ?? null) !== null
  return { committing: carries.filter(on), uncommitted: carries.filter((one) => !on(one)) }
}

export function carriedOnto(root: string, carries: readonly FileMove[]): () => undefined {
  const gone: FileMove[] = []
  const back = (): undefined => {
    for (const one of [...gone].reverse()) renameSync(join(root, one.to), join(root, one.from))
  }
  try {
    for (const one of carries) {
      const at = join(root, one.from)
      if (!existsSync(at)) continue
      const to = join(root, one.to)
      mkdirSync(dirname(to), { recursive: true })
      renameSync(at, to)
      gone.push(one)
    }
  } catch (thrown) {
    back()
    throw thrown
  }
  return back
}
