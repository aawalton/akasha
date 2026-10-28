import {
  namedOver,
  reachersIn,
  readersIn,
} from "akasha/check/code/pages/tests-pass/modules/run-naming/run-naming.module.code.ts"
import { slowSaid } from "akasha/check/code/pages/tests-pass/tests-pass.check-code.decision.code.ts"
import { testsPass } from "akasha/check/code/pages/tests-pass/tests-pass.check-code.ts"
import { asked, type Told } from "akasha/check/modules/audit-asking/audit-asking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { inCluster } from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { z } from "zod"

export const VERDICT_HANDED = "AKASHA_DEPLOY_TESTS_VERDICT"

export type Verdict = {
  readonly commit: string
  readonly refusals: readonly string[]
}

export type Taken = { readonly verdict: Verdict } | { readonly broken: string }

export type Asking = (root: string, commit: string) => Promise<Told>

const askedOfAudit: Asking = (root, commit) => asked({ root, checks: [testsPass.slug], commit })

const APART = " — "

const ENCODED = "base64"

const HANDED_SHAPE = z.object({ commit: z.string().min(1), refusals: z.array(z.string()) })

export function saidOfUnasked(commit: string, why: string): string {
  return (
    `\`${testsPass.slug}\` was asked of the audit service for ${commit} and no verdict came ` +
    `back, so nothing judged the tests this deploy carries — ${why}`
  )
}

export function saidOfUnhanded(commit: string, why: string): string {
  return (
    `a deploy run in the cluster is handed the \`${testsPass.slug}\` verdict for ${commit} ` +
    `by the workstation that sent it, and ${why}`
  )
}

function rawOf(said: string): string {
  const at = said.indexOf(APART)
  return at < 0 ? said : said.slice(at + APART.length)
}

export function takenFrom(told: Told, commit: string): Taken {
  if (told.broken !== null) return { broken: saidOfUnasked(commit, told.broken) }
  if (told.unanswered.length > 0) {
    return { broken: saidOfUnasked(commit, "no round answered for that commit") }
  }
  if (told.unrun.length > 0) {
    return { broken: saidOfUnasked(commit, "the round could not run the tests") }
  }
  return { verdict: { commit, refusals: told.refusals.map(rawOf) } }
}

export async function verdictAsked(
  root: string,
  commit: string,
  asking: Asking = askedOfAudit
): Promise<Taken> {
  try {
    return takenFrom(await asking(root, commit), commit)
  } catch (thrown) {
    return { broken: saidOfUnasked(commit, whyOf(thrown)) }
  }
}

const HANDED_CEILING = 500

export function handedOf(verdict: Verdict): string {
  const refusals = verdict.refusals.map((one) => one.slice(0, HANDED_CEILING))
  return Buffer.from(JSON.stringify({ commit: verdict.commit, refusals })).toString(ENCODED)
}

export function handedSaid(verdict: Verdict | null): string {
  return verdict === null ? "" : `${VERDICT_HANDED}='${handedOf(verdict)}' `
}

export function handedIn(said: string | undefined, commit: string): Taken {
  if (said === undefined || said === "") {
    return { broken: saidOfUnhanded(commit, "this run was handed none") }
  }
  let read: z.infer<typeof HANDED_SHAPE> | undefined
  try {
    read = HANDED_SHAPE.safeParse(JSON.parse(Buffer.from(said, ENCODED).toString())).data
  } catch {
    read = undefined
  }
  if (read === undefined) {
    return { broken: saidOfUnhanded(commit, "what this run was handed reads as no verdict") }
  }
  if (read.commit !== commit) {
    return { broken: saidOfUnhanded(commit, `this run was handed the verdict for ${read.commit}`) }
  }
  return { verdict: { commit, refusals: read.refusals } }
}

export async function verdictFor(
  root: string,
  commit: string,
  asking: Asking = askedOfAudit,
  here: boolean = inCluster()
): Promise<Taken> {
  if (here) return handedIn(optionalEnv(VERDICT_HANDED), commit)
  return await verdictAsked(root, commit, asking)
}

export function pathOf(refusal: string): string {
  const at = refusal.indexOf(APART)
  return at < 0 ? refusal : refusal.slice(0, at)
}

export function judgedFrom(
  refusals: readonly string[],
  named: ReadonlySet<string>
): readonly Judged[] {
  return refusals.flatMap((one) => {
    const path = pathOf(one)
    if (!named.has(path)) return []
    const reason = one.slice(path.length + APART.length)
    return [slowSaid(reason) ? { path, reason, slow: true } : { path, reason }]
  })
}

export type Naming = Pick<
  Answering,
  "importersOf" | "importsReaching" | "listedAt" | "namersAt" | "fileKeysAt" | "typesCarrying"
>

export function namedFor(
  changed: readonly string[],
  there: (path: string) => boolean,
  index: Naming
): ReadonlySet<string> {
  const importersOf = (path: string): readonly string[] => index.importersOf(path)
  return new Set(namedOver(changed, there, importersOf, readersIn(index), reachersIn(index)))
}
