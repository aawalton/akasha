import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { writing } from "@akasha/command-system/scratching/testing"
import { said as gitIn } from "@akasha/git/git-running"
import { listedFiled, rebuiltIn } from "@akasha/indexes/testing"
import { declaringUnder } from "@akasha/testing-system/declaring"
import { bodyOf, pathOf, slugOf } from "./subagent-presence.module.code.ts"

export const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

export const ANOTHER = "01a05844-6e60-7000-b54c-4b14559df70c"

export const AGENT = "01a05844-6e60-7000-b54c-4b14559df70d"

export const OWN = "a38f63805f9b94edf"

export const AGAIN = "a38f63805f9b94ee0"

export const TREE = "akasha"

export const SEAT_AT = `${TREE}/seat-system/seats/pages/akasha.seat.ts`

export const SEAT_BODY = `export const akasha = { assignmentSlug: "domain/akasha-system" }\n`

export const MECHANICAL = "Checks-bypassed: a `change-mechanical` change runs no check"

export const WENT = { went: true } as const

export const HELD_ID = "01a06d00-0000-7000-8000-000000000001"

export const HELD_ASSIGNMENT = "domain/held-before"

const IMPORTED_AT = `${TREE}/held.ts`

const IMPORTED_BODY = "export const held = 1\n"

const IMPORTING_AT = `${TREE}/holding.ts`

const IMPORTING_BODY = 'import { held } from "./held.ts"\n\nexport const holding = held\n'

export function seated(root: string): string {
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(declaringUnder(TREE))) writing(root, path, body)
  writing(root, IMPORTED_AT, IMPORTED_BODY)
  writing(root, IMPORTING_AT, IMPORTING_BODY)
  writing(root, SEAT_AT, SEAT_BODY)
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  rebuiltIn(root, TREE)
  listedFiled(root, "seat", "akasha", [{ path: SEAT_AT, id: SEAT_ID }])
  return root
}

export function messageIn(root: string): string {
  return gitIn(root, ["log", "-1", "--pretty=%B"])
}

export function whyIn(went: unknown): string {
  return typeof went === "object" && went !== null && "why" in went ? String(went.why) : ""
}

export async function loggedAt(at: string, within: number): Promise<string> {
  const until = Date.now() + within
  while (Date.now() < until) {
    if (existsSync(at)) {
      const held = readFileSync(at, "utf8")
      if (held !== "") return held
    }
    await Bun.sleep(50)
  }
  return existsSync(at) ? readFileSync(at, "utf8") : ""
}

export function idIn(body: string): string | null {
  return /\n {2}id: "([^"]+)",/.exec(body)?.[1] ?? null
}

export function landedUnder(root: string, seatName: string, own: string): string {
  return readFileSync(join(root, pathOf(slugOf(seatName, own))), "utf8")
}

export function landedAt(root: string, own: string): string {
  return landedUnder(root, "akasha", own)
}

// THE PAGE A SUBAGENT HAD, PUT INTO THE HISTORY AND TAKEN OFF THE DISK, which is what a seat's
// working tree holds after a subagent stops. The body is composed by the module under test rather
// than spelled again, so what a resume reads back is what a put-up wrote. The seat is named because
// a seat stating no assignment is the one case where history answers for the assignment.
export function heldUnder(
  root: string,
  seatName: string,
  own: string,
  agentId: string,
  kind: string
): undefined {
  const slug = slugOf(seatName, own)
  const at = pathOf(slug)
  writing(root, at, bodyOf(slug, seatName, HELD_ASSIGNMENT, kind, agentId, HELD_ID))
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "the page was there"])
  gitIn(root, ["rm", "--quiet", at])
  gitIn(root, ["commit", "--quiet", "-m", "the page went"])
}

export function heldInHistory(root: string, own: string, agentId: string, kind: string): undefined {
  heldUnder(root, "akasha", own, agentId, kind)
}
