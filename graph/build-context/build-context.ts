import type { Roots } from "../../page/page.ts"

export type SaidName = {
  readonly name: string
  readonly entry: string
}

export type Said = {
  readonly of: (said: SaidName, repo: string, key: string, work: () => unknown) => unknown
  readonly held: (said: SaidName) => ReadonlyMap<string, unknown> | null
  readonly done: () => void
}

export const KEEPS_NOTHING: Said = {
  of: (_said, _repo, _key, work) => work(),
  held: () => null,
  done: () => {},
}

export type BuildContext = {
  readonly roots: Roots
  readonly said: Said
}
