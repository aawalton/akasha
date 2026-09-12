import {
  changedBetween,
  sinceCommit,
} from "akasha/commands/pages/deploy/check-judging/deploy-check-judging.module.code.ts"
import {
  commitRecordedIn,
  endedIn,
  refusedAtIn,
} from "akasha/commands/pages/deploy/commit-recording/deploy-commit-recording.module.code.ts"
import {
  closureIn,
  type Reading,
  readingAt,
} from "akasha/commands/pages/deploy/file-closure/deploy-file-closure.module.code.ts"
import {
  type Named,
  WORKSTATION_SERVICE,
} from "akasha/commands/pages/deploy/kind-reading/deploy-kind-reading.module.code.ts"
import { told } from "akasha/git/running/git-running.module.code.ts"
import type {
  Candidate,
  Wanting,
} from "akasha/infrastructure/services/deploy-choosing/deploy-choosing.module.code.ts"
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

export type Changing = (was: string) => readonly string[]

export function changingIn(root: string, commit: string): Changing {
  const held = new Map<string, readonly string[]>()
  return (was) => {
    const found = held.get(was)
    if (found !== undefined) return found
    const changed = changedBetween(root, was, commit)
    held.set(was, changed)
    return changed
  }
}

export function wantsIn(
  root: string,
  subject: Subject,
  was: string | null,
  reading: Reading,
  changing: Changing
): boolean {
  if (was === null) return true
  const changed = changing(was)
  if (changed.length === 0) return false
  const built = closureIn(reading, root, subject.slug, readAs(subject))
  return changed.some((one) => built.has(one))
}

export function wantingIn(root: string, kind: Named["kind"], commit: string): Wanting {
  const subjects = new Map(subjectsOf(root, kind).map((one) => [one.slug, one] as const))
  const reading = readingAt(root, commit)
  const changing = changingIn(root, commit)
  const held = new Map<string, boolean>()
  return (one) => {
    const found = held.get(one.slug)
    if (found !== undefined) return found
    const subject = subjects.get(one.slug)
    const was =
      subject === undefined ? null : sinceCommit(root, commitRecordedIn(root, subject.pagePath))
    const answer = subject === undefined ? false : wantsIn(root, subject, was, reading, changing)
    held.set(one.slug, answer)
    return answer
  }
}

export function candidateFor(
  root: string,
  subject: Subject,
  deploying: boolean = false
): Candidate {
  const was = sinceCommit(root, commitRecordedIn(root, subject.pagePath))
  return {
    slug: subject.slug,
    deploying,
    deployedAt: was === null ? null : committedAt(root, was),
    deployEndedAt: endedIn(root, subject.pagePath),
    refusedAt: refusedAtIn(root, subject.pagePath),
    cooldownSeconds: subject.cooldownSeconds,
    dependsOn: subject.deploysAfter,
  }
}

export function candidatesIn(
  root: string,
  kind: Named["kind"],
  deploying: ReadonlySet<string> = new Set<string>()
): readonly Candidate[] {
  return subjectsOf(root, kind).map((one) => candidateFor(root, one, deploying.has(one.slug)))
}
