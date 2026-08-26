import type { Roots } from "../../page/page.ts"

export type Said = {
  readonly of: (name: string, repo: string, key: string, work: () => unknown) => unknown
  readonly done: () => void
}

export const KEEPS_NOTHING: Said = {
  of: (_name, _repo, _key, work) => work(),
  done: () => {},
}

export type BuildContext = {
  readonly roots: Roots
  readonly said: Said
}
