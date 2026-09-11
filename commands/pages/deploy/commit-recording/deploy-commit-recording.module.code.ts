import {
  type Asking,
  runMechanicalChange,
} from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export const ADD = "change-mechanical-file-content/add-page-property"

export const RESTATE = "change-mechanical-file-content/change-page-page-property"

export const DEPLOYED_COMMIT = "deployedCommit"

export type Adding = Extract<Asking, { readonly at: typeof ADD }>

export type Restating = Extract<Asking, { readonly at: typeof RESTATE }>

export function commitRecordedIn(root: string, pagePath: string): string | null {
  const value = valueAt(pagePath, root)
  return value === null ? null : textAt(value, DEPLOYED_COMMIT)
}

export function addingAt(at: string, commit: string): Adding {
  return { at: ADD, given: { at, key: DEPLOYED_COMMIT, value: JSON.stringify(commit) } }
}

export function restatingAt(at: string, commit: string): Restating {
  return { at: RESTATE, given: { at, key: DEPLOYED_COMMIT, to: commit } }
}

export function actFor(held: string | null, at: string, commit: string): Adding | Restating {
  return held === null ? addingAt(at, commit) : restatingAt(at, commit)
}

export function saidOfNoRecord(slug: string, commit: string, wrong: readonly string[]): string {
  return `\`${slug}\` was put up at ${commit}, and that commit was not written onto its page, so the next deploy would judge itself against the commit before this one: ${wrong.join("\n")}`
}

export async function recordedCommit(
  root: string,
  slug: string,
  pagePath: string,
  commit: string
): Promise<readonly string[]> {
  const held = commitRecordedIn(root, pagePath)
  if (held === commit) return []
  const said = await runMechanicalChange(
    root,
    [actFor(held, pagePath, commit)],
    `${slug} was put up at ${commit}`
  )
  const wrong = "refusals" in said ? said.refusals : said.wrong
  return wrong.length === 0 ? [] : [saidOfNoRecord(slug, commit, wrong)]
}
