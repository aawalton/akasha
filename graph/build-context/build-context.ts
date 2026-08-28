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
  /**
   * Every answer held under one name, keyed by the subject it was filed against.
   *
   * NOTHING HELD ANSWERS `null`, which is what tells a reader to work the answer out instead of
   * reading a part of one. A producer answering `into` from these owes the same of a subject that
   * is missing: an answer short of one file is not an answer, it is an unreachable file.
   */
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
