import { writing } from "@akasha/command-system/scratching/testing"
import { said as gitIn } from "@akasha/git/git-running"
import { listedFiled, rebuiltIn } from "@akasha/indexes/testing"
import { declaringUnder } from "@akasha/testing-system/declaring"
import { standingSubagentsOf } from "./subagent-page.module.code.ts"

export const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

export const OWN = "a38f63805f9b94edf"

export const HELD_ID = "01a06d00-0000-7000-8000-000000000001"

export const HELD_ASSIGNMENT = "domain/held-before"

const TREE = "akasha"

const SEAT_AT = "seat-system/seats/pages/akasha.seat.ts"

const SEAT_BODY = `export const akasha = { assignmentSlug: "domain/akasha-system" }\n`

const REPO_AT = "infrastructure/repos/pages/akasha-repo.repo.ts"

const REPO_BODY = "export const akashaRepo = 1\n"

// THE SEAT PAGE SITS AT THE ROOT RATHER THAN UNDER THE TREE THE INDEX IS REBUILT FROM, because a
// page found by id is a seat only where its path is under `seat-system/seats/pages`, and akasha's
// own checkout has no folder above that. The declaring pages keep their tree, which is what the
// rebuild reads and what a landing is judged against.
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
  rebuiltIn(root, TREE)
  listedFiled(root, "seat", "akasha", [{ path: SEAT_AT, id: SEAT_ID }])
  return root
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

// THE READING IS TAKEN IN A PROCESS OF ITS OWN. `standingSubagentsOf` asks which repositories are
// cloned here and holds the answer for the life of the process, so a test root it is pointed at
// has to be named before anything asks. That is what `AKASHA_ROOT` does, and a fresh process is
// what makes the naming reach the first question rather than the second.
export function seeing(root: string, agentId: string): readonly Seen[] {
  const proc = Bun.spawnSync([process.execPath, import.meta.path, agentId], {
    env: { ...process.env, AKASHA_ROOT: root },
    stdout: "pipe",
    stderr: "pipe",
  })
  const said = proc.stdout.toString().trim()
  if (said === "") throw new Error(`the reading said nothing — ${proc.stderr.toString()}`)
  return JSON.parse(said) as readonly Seen[]
}

if (import.meta.main) {
  process.stdout.write(JSON.stringify(standingSubagentsOf(Bun.argv[2] ?? "")))
}
