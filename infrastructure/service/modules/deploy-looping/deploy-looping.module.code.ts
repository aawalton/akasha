import { join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { DATA } from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  keepingFor,
  recordedEnding,
  recordedRefusal,
} from "akasha/command/pages/deploy/modules/commit-recording/deploy-commit-recording.module.code.ts"
import { heldNow } from "akasha/command/pages/deploy/modules/holding/deploy-holding.module.code.ts"
import {
  CLUSTER_SERVICE,
  CONTAINER_RECIPE,
  ESO_ADDON,
  INFERENCE_SERVICE,
  IOS_APP,
  type Kind,
  WEB_APP,
  WORKSTATION_SERVICE,
} from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import {
  saidOfNoTree,
  treeIn,
} from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import { headOf } from "akasha/git/modules/head-commit/head-commit.module.code.ts"
import {
  type Candidate,
  chosenFrom,
  cooledBy,
  type Wanting,
} from "akasha/infrastructure/service/modules/deploy-choosing/deploy-choosing.module.code.ts"
import { subjectsOf } from "akasha/infrastructure/service/modules/deploy-subject-listing/deploy-subject-listing.module.code.ts"
import {
  candidatesIn,
  wantingIn,
} from "akasha/infrastructure/service/modules/deploy-wanting/deploy-wanting.module.code.ts"
import {
  type Refused,
  runOf,
} from "akasha/infrastructure/service/workstation/modules/run-composing/run-composing.module.code.ts"
import {
  asked,
  type Running,
} from "akasha/infrastructure/service/workstation/modules/service-asking/service-asking.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/workstation/modules/service-checkout/service-checkout.module.code.ts"
import {
  type Ran,
  systemctl,
} from "akasha/infrastructure/service/workstation/modules/service-installing/service-installing.module.code.ts"
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

export const SCOPE_LEAD = "akasha-deploy-"

export const SCOPE_END = ".scope"

const CLI = "module/cli"

const DEPLOY = "deploy"

const MEASURED = "--measured"

export const RUNTIME_MAX_SECONDS = 3600

const RUNTIME_MAX = `--property=RuntimeMaxSec=${RUNTIME_MAX_SECONDS}`

const A_SERVICE = "service"

const SHOW = "show"

const LOAD_STATE = "--property=LoadState"

const LOADED = "LoadState=loaded"

export type Ticked = {
  readonly said: readonly string[]
  readonly wrong: readonly string[]
}

export function scopeFor(slug: string): string {
  return `${SCOPE_LEAD}${slug}${SCOPE_END}`
}

export function deployArgv(root: string, tree: string, slug: string): readonly string[] | Refused {
  const run = runOf(root, CLI)
  if ("refused" in run) return run
  return [
    "--scope",
    "--collect",
    "--quiet",
    `--unit=${scopeFor(slug)}`,
    RUNTIME_MAX,
    "--",
    run.runner,
    join(tree, run.path),
    DEPLOY,
    MEASURED,
    slug,
  ]
}

export function systemdRun(args: readonly string[]): Ran {
  const held = ran(["systemd-run", "--user", ...args])
  return { code: held.code, out: `${held.out}${held.err}`.trim() }
}

export function saidOfNothing(
  kind: string,
  every: readonly Candidate[],
  now: number,
  answered: ReadonlyMap<string, boolean>
): string {
  const deploying = every.filter((one) => one.deploying).length
  const cooling = every.filter((one) => !one.deploying && !cooledBy(one, now)).length
  const current = every.filter((one) => answered.get(one.slug) === false).length
  return `nothing of \`${kind}\` was put up — ${counted(every.length, A_SERVICE)} weighed, ${current} of those up to date, ${cooling} waiting out a cooldown, and ${deploying} with a deploy running`
}

export function scopeLoaded(probe: Running, slug: string): boolean {
  const done = asked(probe, [SHOW, scopeFor(slug), LOAD_STATE])
  return done.out.split("\n").some((one) => one.trim() === LOADED)
}

export async function endingKept(
  root: string,
  kind: Kind,
  slug: string,
  commit: string,
  why: readonly string[]
): Promise<readonly string[]> {
  const subject = subjectsOf(root, kind).find((one) => one.slug === slug)
  if (subject === undefined) return []
  const keeping = keepingFor(root, kind)
  return [
    ...(await recordedRefusal(slug, subject.pagePath, commit, why, keeping)),
    ...(await recordedEnding(slug, subject.pagePath, true, new Date(), keeping)),
  ]
}

export function saidOfRefusedTree(slug: string, out: string): string {
  return `a check refused the tree \`${slug}\` is built from, so \`${slug}\` was not put up and this loop is working — ${out}`
}

export function saidOfLoadedScope(slug: string): string {
  return `a scope named \`${scopeFor(slug)}\` is loaded with no deploy of \`${slug}\` holding it, so \`${slug}\` was not put up`
}

export type Past = {
  readonly chosen: Candidate | null
  readonly said: readonly string[]
}

export function chosenPastLoaded(
  every: readonly Candidate[],
  now: number,
  wants: Wanting,
  probe: Running
): Past {
  const said: string[] = []
  let left = every
  for (let tries = 0; tries <= every.length; tries += 1) {
    const chosen = chosenFrom(left, now, wants)
    if (chosen === null) return { chosen: null, said }
    if (!scopeLoaded(probe, chosen.slug)) return { chosen, said }
    said.push(saidOfLoadedScope(chosen.slug))
    left = left.map((one) => (one.slug === chosen.slug ? { ...one, deploying: true } : one))
  }
  return { chosen: null, said }
}

export async function ticked(
  root: string,
  kind: Kind,
  now: number = Date.now(),
  run: Running = systemdRun,
  probe: Running = systemctl
): Promise<Ticked> {
  const tree = treeIn(root, WORKSTATION_SERVICE)
  if (tree === null) {
    return {
      said: [],
      wrong: [saidOfNoTree(WORKSTATION_SERVICE, `git names no folder under ${root}`)],
    }
  }
  const deploying = heldNow(root)
  const commit = headOf(root)
  const every = await candidatesIn(root, kind, deploying)
  const wanting = await wantingIn(root, kind, commit)
  const past = chosenPastLoaded(every, now, wanting.wants, probe)
  if (past.chosen === null) {
    return {
      said: [...past.said, saidOfNothing(kind, every, now, wanting.answered)],
      wrong: [],
    }
  }
  const argv = deployArgv(root, tree, past.chosen.slug)
  if ("refused" in argv) return { said: past.said, wrong: [argv.refused] }
  const started = asked(run, argv)
  if (started.code === DATA) {
    return { said: [...past.said, saidOfRefusedTree(past.chosen.slug, started.out)], wrong: [] }
  }
  if (started.code !== 0) {
    const why = `\`${past.chosen.slug}\` was not put up — ${started.out}`
    const kept = await endingKept(root, kind, past.chosen.slug, commit, [why])
    return { said: past.said, wrong: [why, ...kept] }
  }
  return { said: [...past.said, `put \`${past.chosen.slug}\` up at ${commit}`], wrong: [] }
}

export const EVERY_KIND: readonly Kind[] = [
  CLUSTER_SERVICE,
  CONTAINER_RECIPE,
  ESO_ADDON,
  INFERENCE_SERVICE,
  IOS_APP,
  WEB_APP,
  WORKSTATION_SERVICE,
]

export function kindIn(word: string | undefined): Kind | null {
  return EVERY_KIND.find((one) => one === word) ?? null
}

export function saidOfNoKind(word: string | undefined): string {
  return `a loop is run for one kind, and \`${word ?? ""}\` is no kind a deploy puts up — the kinds are ${EVERY_KIND.join(", ")}`
}

export async function runDeployLooping(word: string | undefined): Promise<number> {
  const kind = kindIn(word)
  if (kind === null) {
    process.stderr.write(`${saidOfNoKind(word)}\n`)
    return 1
  }
  const done = await ticked(checkoutAt(), kind)
  for (const one of done.said) process.stdout.write(`${one}\n`)
  for (const one of done.wrong) process.stderr.write(`${one}\n`)
  return done.wrong.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(await runDeployLooping(process.argv[2]))
}
