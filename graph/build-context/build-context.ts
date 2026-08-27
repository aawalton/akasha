import type { Roots } from "../../page/page.ts"

/**
 * One kind of held answer, and the file whose code works it out.
 *
 * `entry` IS WHAT THE ANSWER'S MARK IS TAKEN OVER, so it names the file the answer's correctness
 * depends on rather than whichever file happens to ask. An answer must not outlive the code that
 * wrote it, and the import closure of that file is what says whether that code moved.
 */
export type SaidName = {
  readonly name: string
  readonly entry: string
}

export type Said = {
  readonly of: (said: SaidName, repo: string, key: string, work: () => unknown) => unknown
  readonly done: () => void
}

export const KEEPS_NOTHING: Said = {
  of: (_said, _repo, _key, work) => work(),
  done: () => {},
}

export type BuildContext = {
  readonly roots: Roots
  readonly said: Said
}
