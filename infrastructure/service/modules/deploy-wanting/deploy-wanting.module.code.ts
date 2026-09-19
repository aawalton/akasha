import {
  changedBetween,
  sinceCommit,
} from "akasha/command/pages/deploy/modules/check-judging/deploy-check-judging.module.code.ts"
import {
  commitRecordedIn,
  endedIn,
  keepingFor,
  refusedAtIn,
} from "akasha/command/pages/deploy/modules/commit-recording/deploy-commit-recording.module.code.ts"
import {
  closureIn,
  type Reading,
  readingAt,
} from "akasha/command/pages/deploy/modules/file-closure/deploy-file-closure.module.code.ts"
import {
  type Named,
  WORKSTATION_SERVICE,
} from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"
import type {
  Candidate,
  Wanting,
} from "akasha/infrastructure/service/modules/deploy-choosing/deploy-choosing.module.code.ts"
import {
  type Subject,
  subjectsOf,
} from "akasha/infrastructure/service/modules/deploy-subject-listing/deploy-subject-listing.module.code.ts"

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

export type Wanted = {
  readonly wants: Wanting
  readonly answered: ReadonlyMap<string, boolean>
}

export async function wantingIn(
  root: string,
  kind: Named["kind"],
  commit: string
): Promise<Wanted> {
  const subjects = new Map(subjectsOf(root, kind).map((one) => [one.slug, one] as const))
  const reading = readingAt(root, commit)
  const changing = changingIn(root, commit)
  const since = new Map<string, string | null>()
  for (const [slug, one] of subjects) {
    const keeping = keepingFor(root, one.kind)
    since.set(slug, sinceCommit(root, await commitRecordedIn(one.pagePath, keeping)))
  }
  const held = new Map<string, boolean>()
  const wants: Wanting = (one) => {
    const found = held.get(one.slug)
    if (found !== undefined) return found
    const subject = subjects.get(one.slug)
    const was = since.get(one.slug) ?? null
    const answer = subject === undefined ? false : wantsIn(root, subject, was, reading, changing)
    held.set(one.slug, answer)
    return answer
  }
  return { wants, answered: held }
}

async function candidateFor(
  root: string,
  subject: Subject,
  deploying: boolean = false
): Promise<Candidate> {
  const keeping = keepingFor(root, subject.kind)
  const was = sinceCommit(root, await commitRecordedIn(subject.pagePath, keeping))
  return {
    slug: subject.slug,
    deploying,
    deployedAt: was === null ? null : committedAt(root, was),
    deployEndedAt: await endedIn(subject.pagePath, keeping),
    refusedAt: await refusedAtIn(subject.pagePath, keeping),
    cooldownSeconds: subject.cooldownSeconds,
    dependsOn: subject.deploysAfter,
  }
}

export async function candidatesIn(
  root: string,
  kind: Named["kind"],
  deploying: ReadonlySet<string> = new Set<string>()
): Promise<readonly Candidate[]> {
  const found: Candidate[] = []
  for (const one of subjectsOf(root, kind)) {
    found.push(await candidateFor(root, one, deploying.has(one.slug)))
  }
  return found
}
