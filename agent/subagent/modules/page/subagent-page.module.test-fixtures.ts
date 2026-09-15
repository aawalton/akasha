import { join } from "node:path"
import type { Went } from "akasha/agent/subagent/modules/landing-again/subagent-landing-again.module.code.ts"
import { standingSubagentsOf } from "akasha/agent/subagent/modules/page/subagent-page.module.code.ts"
import { slugOf } from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import { took } from "akasha/agent/subagent/modules/presence/subagent-presence.module.code.ts"
import {
  landingNaming,
  RETURNED,
} from "akasha/agent/subagent/modules/presence/subagent-presence.module.test-fixtures.ts"
import { declaringUnder } from "akasha/check/test/fixture/declaring/declaring.test-fixture.code.ts"
import { said as outOf } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/modules/filing/index-filing.module.code.ts"
import {
  listedTakenFrom,
  refreshedIn,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"

export const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

export const OWN = "a38f63805f9b94edf"

export const HELD_ID = "01a06d00-0000-7000-8000-000000000001"

export const HELD_ASSIGNMENT = "domain/held-before"

const TREE = "akasha"

const SEAT_AT = "agent/seat/pages/akasha.seat.ts"

const SEAT_BODY = `export const akasha = { assignmentSlug: "domain/akasha-system" }\n`

const REPO_AT = "infrastructure/repos/pages/akasha-repo.repo.ts"

const REPO_BODY = "export const akashaRepo = 1\n"

export function seated(root: string): string {
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(declaringUnder(TREE))) writing(root, path, body)
  writing(root, `${TREE}/held.ts`, "export const held = 1\n")
  writing(
    root,
    `${TREE}/holding.ts`,
    'import { held } from "./held.ts"\n\nexport const holding = held\n'
  )
  writing(root, SEAT_AT, SEAT_BODY)
  writing(root, REPO_AT, REPO_BODY)
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  refreshedIn(root, TREE)
  listedFiled(root, "seat", "akasha", [{ path: SEAT_AT, id: SEAT_ID }])
  valueAlsoFiled(root, "seat", [
    {
      path: SEAT_AT,
      value: {
        id: SEAT_ID,
        pageTypeSlug: "seat",
        slug: "akasha",
        assignmentSlug: "domain/akasha-system",
      },
    },
  ])
  return root
}

export function filedNow(root: string, at: string, slug: string, id: string): undefined {
  const value = valueAt(join(root, at), root)
  if (value === null) return
  listedFiled(root, "subagent", slug, [{ path: at, id }])
  valueAlsoFiled(root, "subagent", [{ path: at, value }])
}

export async function tookAway(root: string, seatName: string, own: string): Promise<Went> {
  const went = await took(root, seatName, own, [], landingNaming([]), null, RETURNED)
  const slug = slugOf(seatName, own)
  listedTakenFrom(root, "subagent", slug)
  return went
}

export function committed(root: string, why: string): undefined {
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", why])
}

export function pageGone(root: string, at: string): undefined {
  gitIn(root, ["rm", "--quiet", at])
  gitIn(root, ["commit", "--quiet", "-m", "the page went"])
}

export interface Seen {
  readonly name: string
  readonly dispatchedAs: string
}

export function seeing(root: string, agentId: string): readonly Seen[] {
  const out = outOf([process.execPath, import.meta.path, agentId], {
    env: { ...process.env, AKASHA_ROOT: root },
  }).trim()
  if (out === "") throw new Error("the reading said nothing")
  return JSON.parse(out) as readonly Seen[]
}

if (import.meta.main) {
  process.stdout.write(JSON.stringify(standingSubagentsOf(Bun.argv[2] ?? "")))
}
