import { costRecorded, opening } from "akasha/checks/modules/cost/check-cost.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { deploySubject } from "akasha/commands/arguments/pages/deploy-subject.argument.ts"
import { device } from "akasha/commands/arguments/pages/device.argument.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import { measured } from "akasha/commands/arguments/pages/measured.argument.ts"
import { noUpload } from "akasha/commands/arguments/pages/no-upload.argument.ts"
import { ref } from "akasha/commands/arguments/pages/ref.argument.ts"
import { simulator } from "akasha/commands/arguments/pages/simulator.argument.ts"
import {
  answeredWith,
  DATA,
  INPUT,
  OK,
  OPERATIONAL,
  partWay,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { allowedThrough } from "akasha/commands/modules/stopping/command-stopping.module.code.ts"
import { putUpAddon } from "akasha/commands/pages/deploy/addon-installing/deploy-addon-installing.module.code.ts"
import { publishedBundleFor } from "akasha/commands/pages/deploy/bundle-publishing/deploy-bundle-publishing.module.code.ts"
import {
  changedBetween,
  judgedOnDeploy,
  sinceCommit,
} from "akasha/commands/pages/deploy/check-judging/deploy-check-judging.module.code.ts"
import {
  AT_HEAD,
  commitAt,
  saidOfNoCommit,
} from "akasha/commands/pages/deploy/commit-naming/deploy-commit-naming.module.code.ts"
import {
  commitRecordedIn,
  recordedCommit,
  recordedEnding,
  recordedRefusal,
} from "akasha/commands/pages/deploy/commit-recording/deploy-commit-recording.module.code.ts"
import { deploy as page } from "akasha/commands/pages/deploy/deploy.command.ts"
import { installedOnDevice } from "akasha/commands/pages/deploy/device-installing/deploy-device-installing.module.code.ts"
import {
  closureFor,
  closuresOf,
  touchedIn,
  unionOf,
} from "akasha/commands/pages/deploy/file-closure/deploy-file-closure.module.code.ts"
import { heldWhile } from "akasha/commands/pages/deploy/holding/deploy-holding.module.code.ts"
import { pushedImage } from "akasha/commands/pages/deploy/image-pushing/deploy-image-pushing.module.code.ts"
import { putUpInferenceService } from "akasha/commands/pages/deploy/inference-installing/deploy-inference-installing.module.code.ts"
import { shipIosApp } from "akasha/commands/pages/deploy/ios-shipping/deploy-ios-shipping.module.code.ts"
import {
  CLUSTER_SERVICE,
  CONTAINER_RECIPE,
  ESO_ADDON,
  INFERENCE_SERVICE,
  IOS_APP,
  kindNamed,
  type Named as Read,
  WEB_APP,
  WORKSTATION_SERVICE,
} from "akasha/commands/pages/deploy/kind-reading/deploy-kind-reading.module.code.ts"
import { installedOnSimulator } from "akasha/commands/pages/deploy/simulator-installing/deploy-simulator-installing.module.code.ts"
import { pinnedTree } from "akasha/commands/pages/deploy/tree-pinning/deploy-tree-pinning.module.code.ts"
import { putUpWebApp } from "akasha/commands/pages/deploy/web-putting-up/deploy-web-putting-up.module.code.ts"
import {
  appliedWorkload,
  servableNamed,
} from "akasha/infrastructure/services/clusters/workload-applying/workload-applying.module.code.ts"
import { putUpEvery } from "akasha/infrastructure/services/workstations/service-putting-up/service-putting-up.module.code.ts"
import { provingFor } from "akasha/infrastructure/services/workstations/service-running/service-running.module.code.ts"

const PUT_UP = "deploy"
const TAKES = [dryRun, deploySubject, noUpload, ref, measured, simulator, device]
const NAMED: Readonly<Record<string, string>> = {
  [CLUSTER_SERVICE]: "a cluster service",
  [WORKSTATION_SERVICE]: "a workstation service",
  [WEB_APP]: "a web app",
  [CONTAINER_RECIPE]: "a container recipe",
  [INFERENCE_SERVICE]: "an inference service",
  [ESO_ADDON]: "an ESO addon",
}

const NOTHING_UP =
  "the deploy stopped part way, and nothing it puts up had reached a machine at this commit"

export function stoppedPartWay(up: readonly string[]): string {
  return partWay(up)[0] ?? NOTHING_UP
}

export function saidOfUnproven(unproven: readonly string[]): string {
  return (
    "a workstation service is put up only where the test beside its page proves it runs, and " +
    `this commit holds no such test: ${unproven.join(", ")}`
  )
}

const PINNED: ReadonlySet<string> = new Set([
  WORKSTATION_SERVICE,
  INFERENCE_SERVICE,
  CONTAINER_RECIPE,
  CLUSTER_SERVICE,
  WEB_APP,
  ESO_ADDON,
])

export type Wanted = {
  readonly dryRun: boolean
  readonly noUpload: boolean
  readonly simulator: boolean
  readonly device: boolean
  readonly ref: string | null
}

function wrongIn(kind: string, slug: string, wanted: Wanted): string | null {
  const onto = wanted.simulator ? simulator.said : wanted.device ? device.said : null
  if (kind === IOS_APP) {
    if (onto === null) {
      if (!wanted.dryRun) return null
      return `\`${slug}\` names an ios app, which is built and handed to Apple rather than applied to a cluster, so \`${dryRun.said}\` says nothing about it — a build Apple validates and nobody is sent is \`${noUpload.said}\``
    }
    if (!wanted.noUpload && wanted.ref === null) return null
    return `\`${onto}\` installs the build rather than handing it to Apple, so \`${noUpload.said}\` and \`${ref.said}\` say nothing about it`
  }
  const what = NAMED[kind] as string
  if (onto !== null) {
    return `\`${slug}\` names ${what}, which is put up rather than installed on a phone, so \`${onto}\` says nothing about it`
  }
  if (!wanted.noUpload) return null
  return `\`${slug}\` names ${what}, which is put up rather than uploaded, so \`${noUpload.said}\` says nothing about it — a run that applies nothing is \`${dryRun.said}\``
}

async function putUp(
  read: Read,
  slug: string,
  commit: string,
  wanted: Wanted,
  given: Given,
  restarting: ReadonlySet<string> | null = null,
  up: string[] = []
): Promise<Answer> {
  const dry = wanted.dryRun
  let at = ""
  if (PINNED.has(read.kind)) {
    const pinned = pinnedTree(given.root, read.kind, commit)
    if ("refused" in pinned) return refused(pinned.refused, OPERATIONAL)
    at = pinned.at
  }
  if (read.kind === IOS_APP) {
    return shipIosApp(slug, read.pagePath, wanted.noUpload, commit, up)
  }
  if (read.kind === CONTAINER_RECIPE) return await pushedImage(slug, dry, at, up)
  if (read.kind === WORKSTATION_SERVICE) {
    return putUpEvery(given.root, dry, restarting ?? new Set<string>(), at, up)
  }
  if (read.kind === INFERENCE_SERVICE) {
    return await putUpInferenceService(given.root, slug, dry, at, up)
  }
  if (read.kind === ESO_ADDON) return await putUpAddon(at, slug, read.pagePath, dry, up)
  if (read.kind === CLUSTER_SERVICE) {
    const servable = servableNamed(given.root, slug)
    if ("refused" in servable) return refused(servable.refused, DATA)
    return appliedWorkload(given.root, slug, servable.servable, dry, at, up)
  }
  const bundle = await publishedBundleFor(given.root, slug, dry, at, up)
  if (bundle !== null && bundle.refusals.length > 0) {
    return answeredWith(bundle.lines, bundle.refusals, OPERATIONAL)
  }
  const web = await putUpWebApp(slug, commit, given, dry, at, up)
  if (bundle === null) return web
  return answeredWith([...bundle.lines, ...web.report], web.refusals, web.code)
}

export type PuttingUp = (
  read: Read,
  slug: string,
  commit: string,
  wanted: Wanted,
  given: Given,
  restarting: ReadonlySet<string> | null,
  up: string[]
) => Promise<Answer>

export async function deploy(
  argv: readonly string[],
  given: Given,
  putting: PuttingUp = putUp
): Promise<Answer> {
  const taken = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in taken) return refusedBy(taken.refused, INPUT)
  const held = taken.taken
  const wanted: Wanted = {
    dryRun: held.dryRun,
    noUpload: held.noUpload,
    simulator: held.simulator,
    device: held.device,
    ref: held.ref ?? null,
  }

  if (held.measured) allowedThrough()

  const slug = held.deploySubject
  const read = kindNamed(given.root, slug)
  if ("refused" in read) return refused(read.refused, DATA)
  const unfit = wrongIn(read.kind, slug, wanted)
  if (unfit !== null) return refused(unfit, INPUT)
  if (read.kind === IOS_APP && wanted.device) return await installedOnDevice(slug)
  if (read.kind === IOS_APP && wanted.simulator) return await installedOnSimulator(slug, given)
  const alone = await heldWhile(given.root, slug, () =>
    deployHeld(read, slug, wanted, given, putting)
  )
  return "refused" in alone ? refused(alone.refused, OPERATIONAL) : alone.value
}

async function deployHeld(
  read: Read,
  slug: string,
  wanted: Wanted,
  given: Given,
  putting: PuttingUp
): Promise<Answer> {
  const commit = commitAt(given.root, wanted.ref)
  if (commit === null) return refused(saidOfNoCommit(wanted.ref ?? AT_HEAD), INPUT)
  const closures = read.every === true ? closuresOf(given.root, read.kind, commit) : null
  const built = closures === null ? closureFor(given.root, slug, read, commit) : unionOf(closures)
  const was = sinceCommit(given.root, commitRecordedIn(given.root, read.pagePath))
  const moved = was === null ? null : changedBetween(given.root, was, commit)
  const restarting = closures === null ? null : touchedIn(closures, moved)
  const proving =
    read.kind === WORKSTATION_SERVICE && restarting !== null
      ? provingFor(given.root, restarting)
      : []
  const unproven = proving.filter((one) => !built.has(one))
  const unjudged =
    unproven.length > 0
      ? [saidOfUnproven(unproven)]
      : await judgedOnDeploy(given.root, slug, was, commit, built, proving)
  const dry = wanted.dryRun
  const noting = () =>
    dry
      ? []
      : [
          ...recordedRefusal(given.root, slug, read.pagePath, commit),
          ...recordedEnding(given.root, slug, read.pagePath, true),
        ]
  if (unjudged.length > 0) {
    return answeredWith([`commit\t${commit}`], [...unjudged, ...noting()], DATA)
  }
  const before = opening()
  const up: string[] = []
  let answer: Answer
  try {
    answer = await putting(read, slug, commit, wanted, given, restarting, up)
  } catch (thrown) {
    if (!dry) costRecorded(given.root, read.pagePath, before, PUT_UP, slug, 0, 1)
    const why = [whyOf(thrown), stoppedPartWay(up)]
    const said = [`commit\t${commit}`, ...up.map((one) => `up\t${one}`)]
    return answeredWith(said, [...why, ...noting()], OPERATIONAL)
  }
  if (!dry) {
    costRecorded(given.root, read.pagePath, before, PUT_UP, slug, 0, answer.refusals.length)
  }
  const lines = [`commit\t${commit}`, ...answer.report]
  if (answer.code !== OK || answer.refusals.length > 0) {
    return answeredWith(lines, [...answer.refusals, ...partWay(up), ...noting()], answer.code)
  }
  if (dry) return answeredWith(lines, answer.refusals, answer.code)
  const wrong = [
    ...recordedCommit(given.root, slug, read.pagePath, commit),
    ...recordedEnding(given.root, slug, read.pagePath),
  ]
  if (wrong.length > 0) return answeredWith(lines, wrong, OPERATIONAL)
  return told([...lines, `recorded\t${slug}\t${commit}`])
}
