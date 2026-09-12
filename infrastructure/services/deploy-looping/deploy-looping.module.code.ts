import { join } from "node:path"
import { heldNow } from "akasha/commands/pages/deploy/holding/deploy-holding.module.code.ts"
import {
  CLUSTER_SERVICE,
  CONTAINER_RECIPE,
  ESO_ADDON,
  INFERENCE_SERVICE,
  IOS_APP,
  type Kind,
  WEB_APP,
  WORKSTATION_SERVICE,
} from "akasha/commands/pages/deploy/kind-reading/deploy-kind-reading.module.code.ts"
import {
  saidOfNoTree,
  treeIn,
} from "akasha/commands/pages/deploy/tree-pinning/deploy-tree-pinning.module.code.ts"
import { headOf } from "akasha/git/head-commit/head-commit.module.code.ts"
import {
  type Candidate,
  chosenFrom,
} from "akasha/infrastructure/services/deploy-choosing/deploy-choosing.module.code.ts"
import {
  candidatesIn,
  wantingIn,
} from "akasha/infrastructure/services/deploy-wanting/deploy-wanting.module.code.ts"
import {
  type Refused,
  runOf,
} from "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"
import type { Ran } from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import {
  asked,
  type Running,
} from "akasha/infrastructure/services/workstations/service-restarting/service-restarting.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"

export const SCOPE_LEAD = "akasha-deploy-"

export const SCOPE_END = ".scope"

const CLI = "module/cli"

const DEPLOY = "deploy"

const A_SERVICE = "service"

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
    "--",
    run.runner,
    join(tree, run.path),
    DEPLOY,
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
  deploying: ReadonlySet<string>
): string {
  return `nothing of \`${kind}\` was put up — ${counted(every.length, A_SERVICE)} were weighed, and ${deploying.size} already have a deploy running`
}

export function ticked(
  root: string,
  kind: Kind,
  now: number = Date.now(),
  run: Running = systemdRun
): Ticked {
  const tree = treeIn(root, WORKSTATION_SERVICE)
  if (tree === null) {
    return {
      said: [],
      wrong: [saidOfNoTree(WORKSTATION_SERVICE, `git names no folder under ${root}`)],
    }
  }
  const deploying = heldNow(root)
  const commit = headOf(root)
  const every = candidatesIn(root, kind, deploying)
  const chosen = chosenFrom(every, now, wantingIn(root, kind, commit))
  if (chosen === null) return { said: [saidOfNothing(kind, every, deploying)], wrong: [] }
  const argv = deployArgv(root, tree, chosen.slug)
  if ("refused" in argv) return { said: [], wrong: [argv.refused] }
  const started = asked(run, argv)
  if (started.code !== 0) {
    return { said: [], wrong: [`\`${chosen.slug}\` was not put up — ${started.out}`] }
  }
  return { said: [`put \`${chosen.slug}\` up at ${commit}`], wrong: [] }
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

export function runDeployLooping(word: string | undefined): number {
  const kind = kindIn(word)
  if (kind === null) {
    process.stderr.write(`${saidOfNoKind(word)}\n`)
    return 1
  }
  const done = ticked(checkoutAt(), kind)
  for (const one of done.said) process.stdout.write(`${one}\n`)
  for (const one of done.wrong) process.stderr.write(`${one}\n`)
  return done.wrong.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(runDeployLooping(process.argv[2]))
}
