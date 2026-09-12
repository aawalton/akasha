import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const NOTHING_COMMITTED = "nothing was committed — the tree already holds what the change asked for"

const TOOK_OUTSIDE = "nothing was committed, because git ignores the path(s) this apply took away:"

export function landedSaid(paths: readonly string[]): readonly string[] {
  return paths.map((one) => `landed ${one}`)
}

export function formattedSaid(paths: readonly string[]): readonly string[] {
  return paths.map(
    (one) => `formatted ${one} as it landed — what is there is not what was handed in`
  )
}

export function defaultMessage(what: string, paths: readonly string[]): string {
  if (paths.length <= 3) return `${what} ${[...paths].sort().join(", ")}`
  return `${what} ${paths.length} files`
}

export function commitSaid(commit: string | null, untracked: readonly string[]): string {
  if (commit !== null) return `committed as ${commit}`
  if (untracked.length === 0) return NOTHING_COMMITTED
  return `${TOOK_OUTSIDE} ${[...untracked].sort().join(", ")}`
}

export function alsoFailed(act: () => undefined): string | null {
  try {
    act()
    return null
  } catch (thrown) {
    return saidBy(thrown)
  }
}

export function alsoSaid(why: string, back: string | null, off: string | null): string {
  const held = [why]
  if (back !== null) {
    held.push(`the index still names what did not land, and putting it back failed too: ${back}`)
    held.push("`akasha index refresh` builds the index again")
  }
  if (off !== null) held.push(`what was staged is staged still: ${off}`)
  return held.join("; ")
}
