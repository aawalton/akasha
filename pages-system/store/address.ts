/**
 * Where a page stands, said whole: which repository, and where inside it.
 *
 * AN ADDRESS IS `<repo>:<path inside it>`. What stands before the colon names the repository; what
 * stands after it is the path below that repository's root. A caller reading across every repository
 * has nowhere else to learn which one a page came from, and no way to ask for one of them, so where
 * a page stands says the repository rather than leaving it to be carried beside the page.
 *
 * THE COLON IS ALREADY THE REPOSITORY'S SPELLING FOR THIS. A page type names the repository its
 * pages are filed in ahead of a colon, and every page address written by hand here is written the
 * same way. A second spelling would read as a second thing.
 *
 * THE FIRST COLON DIVIDES AN ADDRESS. A repository is named by a slug and carries no colon; a path
 * below a root may carry one, and every colon after the first belongs to the path.
 *
 * PURE, AND KNOWING NO REPOSITORY. Which repositories there are and where each stands is the
 * caller's to say. This spells an address and reads one back, and touches no disk.
 */

/** What divides the repository from the path inside it. */
const IN = ":"

/**
 * A repository a store reads pages out of: what it is called, and where it stands on this disk.
 *
 * THE TWO ARE HELD TOGETHER BECAUSE THEY TRAVEL TOGETHER. Both are strings, and a call handed them
 * the other way round would walk a directory named `akasha` and issue addresses inside a repository
 * named for a path, with nothing to catch it. Holding them in one value is what makes that
 * unwritable.
 */
export type Repo = {
  /** What the repository is called, which is what every address issued from it begins with. */
  readonly repo: string
  /** Where the repository stands on this disk. */
  readonly root: string
}

/**
 * What is said of a string handed in where an address was wanted.
 *
 * ONE SPELLING OF THIS REFUSAL. Every reader of an address refuses the same shape for the same
 * reason, and two wordings of it would read as two faults.
 */
export const NOT_AN_ADDRESS =
  "names no page: an address is a repository, a colon, and a path inside it"

/** The address of what stands at `path` inside the repository called `repo`. */
export const addressIn = (repo: string, path: string): string => `${repo}${IN}${path}`

/** Which repository an address names, or nothing where it names none. */
export const repoOf = (address: string): string | null => {
  const cut = address.indexOf(IN)
  return cut <= 0 ? null : address.slice(0, cut)
}

/**
 * Where inside its repository an address points, or nothing where it names no repository.
 *
 * AN ADDRESS WITH NOTHING AFTER THE COLON POINTS NOWHERE. Reading it as the empty path would answer
 * the repository's own root, which is a directory rather than a page.
 */
export const pathIn = (address: string): string | null => {
  const cut = address.indexOf(IN)
  return cut <= 0 || cut === address.length - 1 ? null : address.slice(cut + 1)
}
