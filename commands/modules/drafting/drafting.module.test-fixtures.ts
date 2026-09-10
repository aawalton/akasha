import { said as gitSaid } from "../../../git/running/git-running.module.code.ts"
import type { Kind } from "../calling/calling.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { writing } from "../scratching/scratching.module.test-fixtures.ts"
import type { Running } from "./drafting.module.code.ts"

export const ONE = "akasha/one.page.ts"
export const TWO = "akasha/two.page.ts"
export const TEN = "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\n"

const WHO = ["-c", "user.email=t@t", "-c", "user.name=t", "-c", "commit.gpgsign=false"]

export const NOTHING_RUNS: Running = {
  checks: false,
  writerOwesReading: false,
  readersOweReading: false,
}

export const BOTH_RUN: Running = { checks: true, writerOwesReading: true, readersOweReading: true }

export const CHECKS_RUN: Running = {
  checks: true,
  writerOwesReading: false,
  readersOweReading: false,
}

export const kindOf = (
  runsChecks: boolean,
  writerOwesReading: boolean,
  readersOweReading: boolean
): Kind => ({ slug: "held", runsChecks, writerOwesReading, readersOweReading })

export const scratch = scratchWorld()

export function landed(root: string, bodies: Readonly<Record<string, string>>): undefined {
  const paths = Object.keys(bodies)
  for (const path of paths) writing(root, path, bodies[path] ?? "")
  gitSaid(root, ["add", "--", ...paths])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "landed", "--", ...paths])
}

export function repoAt(): string {
  const root = scratch.rootFor("drafting-")
  gitSaid(root, ["init", "-q", "-b", "main", "."])
  landed(root, { [ONE]: TEN })
  return root
}
