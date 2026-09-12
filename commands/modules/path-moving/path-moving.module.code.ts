import { existsSync, mkdirSync, renameSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { pageOf, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { partFiled, partUnfiled } from "akasha/pages/indexes/path/index-path.index.code.ts"

const TS = ".ts"

export type FileMove = {
  readonly from: string
  readonly to: string
}

function besidePage(at: string): string | null {
  const said = partedIn(at)
  return said === null ? null : join(dirname(at), `${pageOf(said)}${TS}`)
}

export function filedOnto(root: string, moves: readonly FileMove[]): undefined {
  for (const one of moves) {
    partUnfiled(root, one.from)
    const page = besidePage(one.to)
    if (page !== null) partFiled(root, page, one.to)
  }
}

export function unfiledOnto(root: string, moves: readonly FileMove[]): undefined {
  for (const one of moves) partUnfiled(root, one.to)
}

export type Aside = {
  readonly took: readonly string[]
  readonly back: () => undefined
  readonly done: () => undefined
}

const ASIDE = "aside"

function asideAt(root: string, path: string): string {
  return `${join(root, path)}.${String(process.pid)}.${ASIDE}`
}

export function asideOnto(root: string, paths: readonly string[]): Aside {
  const took: string[] = []
  const back = (): undefined => {
    for (const one of took) {
      const aside = asideAt(root, one)
      if (existsSync(aside)) renameSync(aside, join(root, one))
    }
  }
  try {
    for (const one of paths) {
      renameSync(join(root, one), asideAt(root, one))
      took.push(one)
    }
  } catch (thrown) {
    back()
    throw thrown
  }
  const done = (): undefined => {
    for (const one of took) rmSync(asideAt(root, one), { force: true })
  }
  return { took, back, done }
}

export type Moving = {
  readonly committing: readonly FileMove[]
  readonly uncommitted: readonly FileMove[]
}

export function movesHeld(
  moves: readonly FileMove[],
  before: ReadonlyMap<string, Uint8Array | null>
): Moving {
  const on = (one: FileMove): boolean => (before.get(one.from) ?? null) !== null
  return { committing: moves.filter(on), uncommitted: moves.filter((one) => !on(one)) }
}

export function movedOnto(root: string, moves: readonly FileMove[]): () => undefined {
  const gone: FileMove[] = []
  const back = (): undefined => {
    for (const one of [...gone].reverse()) renameSync(join(root, one.to), join(root, one.from))
  }
  try {
    for (const one of moves) {
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
