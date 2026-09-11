import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export const DEPLOYED_COMMIT = "deployedCommit"

export const REFUSED_COMMIT = "refusedCommit"

export function commitKeptIn(root: string, pagePath: string, key: string): string | null {
  const kept = uncommittedIn(root, pagePath)
  return kept === null ? null : textAt(kept, key)
}

export function commitRecordedIn(root: string, pagePath: string): string | null {
  return commitKeptIn(root, pagePath, DEPLOYED_COMMIT)
}

export function saidOfNoRecord(slug: string, commit: string, wrong: readonly string[]): string {
  return `\`${slug}\` was put up at ${commit}, and that commit was not kept beside its page, so the next deploy would judge itself against the commit before this one: ${wrong.join("\n")}`
}

export function saidOfNoRefusal(slug: string, commit: string, wrong: readonly string[]): string {
  return `\`${slug}\` refused at ${commit}, and that commit was not kept beside its page, so a loop would try that same commit again: ${wrong.join("\n")}`
}

export function wroteUnder(
  root: string,
  pagePath: string,
  key: string,
  commit: string
): readonly string[] {
  if (commitKeptIn(root, pagePath, key) === commit) return []
  try {
    mergeUncommitted(root, pagePath, { [key]: commit })
    return []
  } catch (why) {
    return [why instanceof Error ? why.message : String(why)]
  }
}

export function recordedCommit(
  root: string,
  slug: string,
  pagePath: string,
  commit: string
): readonly string[] {
  const wrong = wroteUnder(root, pagePath, DEPLOYED_COMMIT, commit)
  return wrong.length === 0 ? [] : [saidOfNoRecord(slug, commit, wrong)]
}

export function recordedRefusal(
  root: string,
  slug: string,
  pagePath: string,
  commit: string
): readonly string[] {
  const wrong = wroteUnder(root, pagePath, REFUSED_COMMIT, commit)
  return wrong.length === 0 ? [] : [saidOfNoRefusal(slug, commit, wrong)]
}
