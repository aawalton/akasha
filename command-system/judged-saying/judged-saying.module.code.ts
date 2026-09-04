import type { Judged } from "@akasha/checks/judging"

export type Counting = (many: number, one: string) => string

export const OUTSIDE_REACH = "no check judges a path outside this checkout"

const NO_PHASE = "no check runs at this phase"

const NONE_REFUSED = ", and none refused"

const THESE_REFUSED = ", and these refused"

const ASKED = "asked for"

const CLASHED = " carries a conflict — resolve it in the patch before the patch applies"

const HOLDS_BACK = "the patch is judged whole, so it applies once every path it holds passes"

type Said = {
  readonly of: string
  readonly went: string
  readonly did: string
  readonly tail: string
}

const OVER: Said = { of: ASKED, went: "would go", did: "passed over", tail: "" }

const LANDED: Said = { of: ASKED, went: "landed", did: "judged", tail: NONE_REFUSED }

const LEFT = "the patch would leave"

const DRAFTED: Said = { of: LEFT, went: "went", did: "judged", tail: NONE_REFUSED }

const REFUSING: Said = { of: LEFT, went: "went", did: "judged", tail: THESE_REFUSED }

export function checkReaches(path: string): boolean {
  return !path.startsWith("/") && !path.split("/").includes("..")
}

export function reachedIn(paths: readonly string[]): number {
  return paths.filter(checkReaches).length
}

function saidOf(
  count: Counting,
  checks: number,
  judged: number,
  asked: number,
  said: Said
): string {
  const many = `${count(asked, "path")} ${said.of}`
  if (judged === 0) return `${OUTSIDE_REACH}, so the ${many} ${said.went} unjudged`
  if (checks === 0) return `${NO_PHASE}, so the ${many} ${said.went} unjudged`
  const over = judged === asked ? `the ${many}` : `${judged} of the ${many}`
  return `${count(checks, "check")} ${said.did} ${over}${said.tail}`
}

export function passedOver(count: Counting, checks: number, judged: number, asked: number): string {
  return saidOf(count, checks, judged, asked, OVER)
}

export function judgedBy(count: Counting, checks: number, judged: number, asked: number): string {
  return saidOf(count, checks, judged, asked, LANDED)
}

export function judgedOver(count: Counting, checks: number, judged: number, asked: number): string {
  return saidOf(count, checks, judged, asked, DRAFTED)
}

export function refusedOver(
  count: Counting,
  checks: number,
  judged: number,
  asked: number
): string {
  return saidOf(count, checks, judged, asked, REFUSING)
}

export function draftSaid(
  count: Counting,
  checks: number,
  judged: readonly string[],
  refused: readonly Judged[],
  clashed: readonly string[]
): readonly string[] {
  const over = refused.length === 0 ? judgedOver : refusedOver
  const said = [over(count, checks, reachedIn(judged), judged.length)]
  if (refused.length > 0) {
    said.push(...refused.map((one) => `${one.path} — ${one.reason}`), HOLDS_BACK)
  }
  return [...said, ...clashed.map((one) => `${one}${CLASHED}`)]
}
