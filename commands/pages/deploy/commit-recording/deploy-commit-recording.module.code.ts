import {
  type Asking,
  runMechanicalChange,
} from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { textUnder } from "akasha/pages/value/page-value.module.code.ts"

export const ADD = "change-mechanical-file-content/add-page-property"

export const RESTATE = "change-mechanical-file-content/change-page-page-property"

export const DEPLOYED_COMMIT = "deployedCommit"

export const REFUSED_COMMIT = "refusedCommit"

export type Adding = Extract<Asking, { readonly at: typeof ADD }>

export type Restating = Extract<Asking, { readonly at: typeof RESTATE }>

export function commitRecordedIn(root: string, pagePath: string): string | null {
  return textUnder(root, pagePath, DEPLOYED_COMMIT)
}

export function addingAt(at: string, key: string, commit: string): Adding {
  return { at: ADD, given: { at, key, value: JSON.stringify(commit) } }
}

export function restatingAt(at: string, key: string, commit: string): Restating {
  return { at: RESTATE, given: { at, key, to: commit } }
}

export function actFor(
  held: string | null,
  at: string,
  key: string,
  commit: string
): Adding | Restating {
  return held === null ? addingAt(at, key, commit) : restatingAt(at, key, commit)
}

export function saidOfNoRecord(slug: string, commit: string, wrong: readonly string[]): string {
  return `\`${slug}\` was put up at ${commit}, and that commit was not written onto its page, so the next deploy would judge itself against the commit before this one: ${wrong.join("\n")}`
}

export function saidOfNoRefusal(slug: string, commit: string, wrong: readonly string[]): string {
  return `\`${slug}\` refused at ${commit}, and that commit was not written onto its page, so a loop would try that same commit again: ${wrong.join("\n")}`
}

export async function wroteUnder(
  root: string,
  pagePath: string,
  key: string,
  commit: string,
  message: string
): Promise<readonly string[]> {
  const held = textUnder(root, pagePath, key)
  if (held === commit) return []
  const said = await runMechanicalChange(root, [actFor(held, pagePath, key, commit)], message)
  return "refusals" in said ? said.refusals : said.wrong
}

export async function recordedCommit(
  root: string,
  slug: string,
  pagePath: string,
  commit: string
): Promise<readonly string[]> {
  const message = `${slug} was put up at ${commit}`
  const wrong = await wroteUnder(root, pagePath, DEPLOYED_COMMIT, commit, message)
  return wrong.length === 0 ? [] : [saidOfNoRecord(slug, commit, wrong)]
}

export async function recordedRefusal(
  root: string,
  slug: string,
  pagePath: string,
  commit: string
): Promise<readonly string[]> {
  const message = `${slug} refused at ${commit}`
  const wrong = await wroteUnder(root, pagePath, REFUSED_COMMIT, commit, message)
  return wrong.length === 0 ? [] : [saidOfNoRefusal(slug, commit, wrong)]
}
