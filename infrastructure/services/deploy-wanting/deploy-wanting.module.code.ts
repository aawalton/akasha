import {
  changedBetween,
  sinceCommit,
} from "akasha/commands/pages/deploy/check-judging/deploy-check-judging.module.code.ts"
import {
  commitRecordedIn,
  endedIn,
} from "akasha/commands/pages/deploy/commit-recording/deploy-commit-recording.module.code.ts"
import { closureFor } from "akasha/commands/pages/deploy/file-closure/deploy-file-closure.module.code.ts"
import {
  type Named,
  WORKSTATION_SERVICE,
} from "akasha/commands/pages/deploy/kind-reading/deploy-kind-reading.module.code.ts"
import { told } from "akasha/git/running/git-running.module.code.ts"
import type { Candidate } from "akasha/infrastructure/services/deploy-choosing/deploy-choosing.module.code.ts"
import {
  type Subject,
  subjectsOf,
} from "akasha/infrastructure/services/deploy-subject-listing/deploy-subject-listing.module.code.ts"

const A_SECOND = 1000

export function committedAt(root: string, commit: string): number | null {
  const said = told(root, ["show", "-s", "--format=%ct", commit])
  if (said === null) return null
  const seconds = Number(said.trim())
  return Number.isFinite(seconds) && said.trim() !== "" ? seconds * A_SECOND : null
}

export function readAs(subject: Subject): Named {
  if (subject.kind === WORKSTATION_SERVICE) {
    return { kind: subject.kind, pagePath: subject.pagePath, every: true }
  }
  return { kind: subject.kind, pagePath: subject.pagePath }
}

export function wantsIn(
  root: string,
  subject: Subject,
  was: string | null,
  commit: string
): boolean {
  if (was === null) return true
  const changed = changedBetween(root, was, commit)
  if (changed.length === 0) return false
  const built = closureFor(root, subject.slug, readAs(subject), commit)
  return changed.some((one) => built.has(one))
}

export function candidateFor(
  root: string,
  subject: Subject,
  commit: string,
  deploying: boolean = false
): Candidate {
  const was = sinceCommit(root, commitRecordedIn(root, subject.pagePath))
  return {
    slug: subject.slug,
    wants: wantsIn(root, subject, was, commit),
    deploying,
    deployedAt: was === null ? null : committedAt(root, was),
    deployEndedAt: endedIn(root, subject.pagePath),
    cooldownSeconds: subject.cooldownSeconds,
    dependsOn: subject.deploysAfter,
  }
}

export function candidatesIn(
  root: string,
  kind: Named["kind"],
  commit: string,
  deploying: ReadonlySet<string> = new Set<string>()
): readonly Candidate[] {
  return subjectsOf(root, kind).map((one) =>
    candidateFor(root, one, commit, deploying.has(one.slug))
  )
}
