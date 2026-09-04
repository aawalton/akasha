export type Counting = (many: number, one: string) => string

export const REACHED = "akasha/"

export const OUTSIDE_REACH = `no check judges a path outside \`${REACHED}\``

const NO_PHASE = "no check runs at this phase"

const REFUSED = ", and none refused"

const ASKED = "asked for"

type Said = {
  readonly of: string
  readonly went: string
  readonly did: string
  readonly tail: string
}

const OVER: Said = { of: ASKED, went: "would go", did: "passed over", tail: "" }

const LANDED: Said = { of: ASKED, went: "landed", did: "judged", tail: REFUSED }

const DRAFTED: Said = { of: "the patch would leave", went: "went", did: "judged", tail: REFUSED }

export function checkReaches(path: string): boolean {
  return path.startsWith(REACHED)
}

export function outsideOf(paths: readonly string[]): readonly string[] {
  return paths.filter((one) => !checkReaches(one))
}

export function reachedIn(paths: readonly string[]): number {
  return paths.filter(checkReaches).length
}

export function judgedByNothing(outside: readonly string[], dry: boolean): readonly string[] {
  if (outside.length === 0) return []
  const went = dry ? "would go" : "went"
  return [`${OUTSIDE_REACH}, so what these carry ${went} unjudged — ${outside.join(", ")}`]
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
