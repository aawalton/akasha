import { costRecorded, opening } from "akasha/check/modules/cost/check-cost.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { deploySubject } from "akasha/command/argument/pages/deploy-subject.argument.ts"
import { device } from "akasha/command/argument/pages/device.argument.ts"
import { measured } from "akasha/command/argument/pages/measured.argument.ts"
import { noUpload } from "akasha/command/argument/pages/no-upload.argument.ts"
import { ref } from "akasha/command/argument/pages/ref.argument.ts"
import { simulator } from "akasha/command/argument/pages/simulator.argument.ts"
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
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import {
  allowedAgain,
  allowedThrough,
} from "akasha/command/modules/stopping/command-stopping.module.code.ts"
import { deploy as page } from "akasha/command/pages/deploy/deploy.command.ts"
import { putUpAddon } from "akasha/command/pages/deploy/modules/addon-installing/deploy-addon-installing.module.code.ts"
import {
  bundleHandedBack,
  bundleMadeFor,
  bundleTagged,
  handedBackIn,
} from "akasha/command/pages/deploy/modules/bundle-publishing/deploy-bundle-publishing.module.code.ts"
import {
  changedBetween,
  judgementOf,
  saidOfHeldBack,
  sinceCommit,
} from "akasha/command/pages/deploy/modules/check-judging/deploy-check-judging.module.code.ts"
import {
  AT_HEAD,
  commitAt,
  saidOfNoCommit,
} from "akasha/command/pages/deploy/modules/commit-naming/deploy-commit-naming.module.code.ts"
import {
  commitRecordedIn,
  keepingFor,
  recordedCommit,
  recordedEnding,
  recordedRefusal,
} from "akasha/command/pages/deploy/modules/commit-recording/deploy-commit-recording.module.code.ts"
import { installedOnDevice } from "akasha/command/pages/deploy/modules/device-installing/deploy-device-installing.module.code.ts"
import {
  closureFor,
  closuresOf,
  narrowedTo,
  touchedIn,
  unionOf,
} from "akasha/command/pages/deploy/modules/file-closure/deploy-file-closure.module.code.ts"
import { heldWhile } from "akasha/command/pages/deploy/modules/holding/deploy-holding.module.code.ts"
import { pushedImage } from "akasha/command/pages/deploy/modules/image-pushing/deploy-image-pushing.module.code.ts"
import { putUpInferenceService } from "akasha/command/pages/deploy/modules/inference-installing/deploy-inference-installing.module.code.ts"
import { shipIosApp } from "akasha/command/pages/deploy/modules/ios-shipping/deploy-ios-shipping.module.code.ts"
import {
  CLUSTER_FOUNDATION,
  CLUSTER_SERVICE,
  CONTAINER_RECIPE,
  INFERENCE_SERVICE,
  IOS_APP,
  kindNamed,
  type Named as Read,
  TEMPER_ADDON,
  WEB_APP,
  WORKSTATION_SERVICE,
} from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import { installedOnSimulator } from "akasha/command/pages/deploy/modules/simulator-installing/deploy-simulator-installing.module.code.ts"
import { pinnedTree } from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import {
  foundIn,
  PINNED,
  takingFrom,
} from "akasha/command/pages/deploy/modules/tree-sweeping/deploy-tree-sweeping.module.code.ts"
import { putUpWebApp } from "akasha/command/pages/deploy/modules/web-putting-up/deploy-web-putting-up.module.code.ts"
import type { Ended } from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"
import { ranInCluster } from "akasha/infrastructure/job/modules/deploy-job-running/deploy-job-running.module.code.ts"
import { inCluster } from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"
import { waitedForRoom } from "akasha/infrastructure/kernel/modules/landing-admission/landing-admission.module.code.ts"
import { appliedFoundation } from "akasha/infrastructure/service/akasha-service/cluster-foundation/modules/foundation-applying/foundation-applying.module.code.ts"
import {
  appliedWorkload,
  servableNamed,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-applying/workload-applying.module.code.ts"
import {
  provingAt,
  putUpEvery,
  restartingAt,
  sinceAt,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-putting-up/service-putting-up.module.code.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const PUT_UP = "deploy"
const TAKES = [deploySubject, noUpload, ref, measured, simulator, device]
const NAMED: Readonly<Record<string, string>> = {
  [CLUSTER_SERVICE]: "a cluster service",
  [WORKSTATION_SERVICE]: "a workstation service",
  [WEB_APP]: "a web app",
  [CONTAINER_RECIPE]: "a container recipe",
  [INFERENCE_SERVICE]: "an inference service",
  [TEMPER_ADDON]: "an ESO addon",
  [CLUSTER_FOUNDATION]: "a cluster foundation",
}

const NOTHING_UP =
  "the deploy stopped part way, and nothing it puts up had reached a machine at this commit"

export function stoppedPartWay(up: readonly string[]): string {
  return partWay(up)[0] ?? NOTHING_UP
}

const RUN_IN_CLUSTER: ReadonlySet<string> = new Set([CLUSTER_SERVICE, CONTAINER_RECIPE, WEB_APP])

export type Wanted = {
  readonly noUpload: boolean
  readonly simulator: boolean
  readonly device: boolean
  readonly ref: string | null
}

function wrongIn(kind: string, slug: string, wanted: Wanted): string | null {
  const onto = wanted.simulator ? simulator.said : wanted.device ? device.said : null
  if (kind === IOS_APP) {
    if (onto === null) return null
    if (!wanted.noUpload && wanted.ref === null) return null
    return `\`${onto}\` installs the build rather than handing it to Apple, so \`${noUpload.said}\` and \`${ref.said}\` say nothing about it`
  }
  const what = NAMED[kind] as string
  if (onto !== null) {
    return `\`${slug}\` names ${what}, which is put up rather than installed on a phone, so \`${onto}\` says nothing about it`
  }
  if (!wanted.noUpload) return null
  return `\`${slug}\` names ${what}, which is put up rather than uploaded, so \`${noUpload.said}\` says nothing about it`
}

function sweptOf(root: string): readonly string[] {
  const swept = takingFrom(foundIn(root))
  return [
    ...swept.took.map((one) => `took\t${one}`),
    ...swept.refusals.map((one) => `left\t${one}`),
  ]
}

async function putUpFrom(
  read: Read,
  slug: string,
  commit: string,
  wanted: Wanted,
  given: Given,
  at: string,
  restarting: ReadonlySet<string> | null,
  leftAlone: ReadonlySet<string>,
  up: string[]
): Promise<Answer> {
  if (read.kind === IOS_APP) {
    const pages = pagesAt(given.root, commit)
    return shipIosApp(slug, read.pagePath, wanted.noUpload, commit, pages, up)
  }
  if (read.kind === CONTAINER_RECIPE) return await pushedImage(slug, at, up)
  if (read.kind === WORKSTATION_SERVICE) {
    const since = restarting ?? new Set<string>()
    return await putUpEvery(given.root, commit, since, at, up, leftAlone)
  }
  if (read.kind === INFERENCE_SERVICE) {
    return await putUpInferenceService(slug, at, up)
  }
  if (read.kind === TEMPER_ADDON) return await putUpAddon(at, slug, read.pagePath, up)
  if (read.kind === CLUSTER_FOUNDATION) {
    return await appliedFoundation(given.root, slug, at, up)
  }
  if (read.kind === CLUSTER_SERVICE) {
    const servable = servableNamed(given.root, slug)
    if ("refused" in servable) return refused(servable.refused, DATA)
    return appliedWorkload(given.root, slug, servable.servable, at, up)
  }
  const [made, web] = await Promise.all([
    bundleMadeFor(given.root, slug, commit, at, up),
    putUpWebApp(slug, commit, given, at, up),
  ])
  if (made === null) return web
  const bundle = inCluster() ? bundleHandedBack(made) : await bundleTagged(given.root, made, up)
  const refusals = [...bundle.refusals, ...web.refusals]
  const code = bundle.refusals.length > 0 && web.code === OK ? OPERATIONAL : web.code
  return answeredWith([...bundle.lines, ...web.report], refusals, code)
}

async function putUp(
  read: Read,
  slug: string,
  commit: string,
  wanted: Wanted,
  given: Given,
  restarting: ReadonlySet<string> | null = null,
  leftAlone: ReadonlySet<string> = new Set(),
  up: string[] = []
): Promise<Answer> {
  if (!PINNED.has(read.kind)) {
    return await putUpFrom(read, slug, commit, wanted, given, "", restarting, leftAlone, up)
  }
  const pinned = pinnedTree(given.root, slug, commit)
  if ("refused" in pinned) return refused(pinned.refused, OPERATIONAL)
  const swept = sweptOf(given.root)
  const at = pinned.at
  const answer = await putUpFrom(read, slug, commit, wanted, given, at, restarting, leftAlone, up)
  return answeredWith([...swept, ...answer.report], answer.refusals, answer.code)
}

export type PuttingUp = (
  read: Read,
  slug: string,
  commit: string,
  wanted: Wanted,
  given: Given,
  restarting: ReadonlySet<string> | null,
  leftAlone: ReadonlySet<string>,
  up: string[]
) => Promise<Answer>

export type Waiting = (kind: string) => Promise<undefined>

export type Dispatching = (root: string, subject: string, commit: string) => Ended | Promise<Ended>

const deployedInCluster: Dispatching = (root, subject, commit) =>
  ranInCluster(root, root, subject, commit)

function sentToCluster(kind: string): boolean {
  return RUN_IN_CLUSTER.has(kind) && !inCluster()
}

async function deployInCluster(
  slug: string,
  commit: string,
  given: Given,
  dispatching: Dispatching
): Promise<Answer> {
  const ended = await dispatching(given.root, slug, commit)
  if ("why" in ended) return refused(ended.why, OPERATIONAL)
  const handed = handedBackIn(ended.said)
  if (handed === null) return told(ended.said)
  const tagged = await bundleTagged(given.root, handed)
  const said = [...ended.said, ...tagged.lines]
  return tagged.refusals.length > 0 ? answeredWith(said, tagged.refusals, OPERATIONAL) : told(said)
}

export async function deploy(
  argv: readonly string[],
  given: Given,
  putting: PuttingUp = putUp,
  waiting: Waiting = waitedForRoom,
  recording?: Fetcher,
  dispatching: Dispatching = deployedInCluster
): Promise<Answer> {
  const taken = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in taken) return refusedBy(taken.refused, INPUT)
  const held = taken.taken
  const wanted: Wanted = {
    noUpload: held.noUpload,
    simulator: held.simulator,
    device: held.device,
    ref: held.ref ?? null,
  }

  if (held.measured) allowedThrough()

  const slug = held.deploySubject
  const arrived = commitAt(given.root, wanted.ref)
  if (arrived === null) return refused(saidOfNoCommit(wanted.ref ?? AT_HEAD), INPUT)
  const read = kindNamed(pagesAt(given.root, arrived), slug)
  if ("refused" in read) return refused(read.refused, DATA)
  const unfit = wrongIn(read.kind, slug, wanted)
  if (unfit !== null) return refused(unfit, INPUT)
  if (read.kind === IOS_APP && wanted.device) return await installedOnDevice(slug)
  if (read.kind === IOS_APP && wanted.simulator) return await installedOnSimulator(slug, given)
  const follows = wanted.ref === null
  const onward = () => allowedAgain(page.maxWallSeconds, given.calledAs)
  if (sentToCluster(read.kind)) {
    const away = await heldWhile(
      given.root,
      slug,
      arrived,
      follows,
      (commit) => deployInCluster(slug, commit, given, dispatching),
      onward
    )
    return "refused" in away ? refused(away.refused, OPERATIONAL) : away.value
  }
  await waiting(PUT_UP)
  const alone = await heldWhile(
    given.root,
    slug,
    arrived,
    follows,
    (commit) => deployHeld(read, slug, commit, wanted, given, putting, recording),
    onward
  )
  return "refused" in alone ? refused(alone.refused, OPERATIONAL) : alone.value
}

async function deployHeld(
  read: Read,
  slug: string,
  commit: string,
  wanted: Wanted,
  given: Given,
  putting: PuttingUp,
  recording?: Fetcher
): Promise<Answer> {
  const keeping = keepingFor(given.root, read.kind, recording)
  const closures = read.every === true ? closuresOf(given.root, read.kind, commit) : null
  const was = sinceCommit(given.root, await commitRecordedIn(read.pagePath, keeping))
  const moved = was === null ? null : changedBetween(given.root, was, commit)
  const touched = closures === null ? null : touchedIn(closures, moved)
  const restarting =
    read.kind === WORKSTATION_SERVICE && touched !== null && closures !== null
      ? restartingAt(touched, commit, closures, sinceAt(given.root, commit))
      : touched
  const narrowed =
    closures === null || restarting === null ? null : narrowedTo(closures, restarting)
  const built = narrowed === null ? closureFor(given.root, slug, read, commit) : unionOf(narrowed)
  const proving =
    read.kind === WORKSTATION_SERVICE && restarting !== null
      ? provingAt(given.root, commit, restarting)
      : []
  const judged = await judgementOf(given.root, slug, was, commit, built, proving, closures)
  const noting = async (why: readonly string[]): Promise<readonly string[]> => [
    ...(await recordedRefusal(slug, read.pagePath, commit, why, keeping)),
    ...(await recordedEnding(slug, read.pagePath, true, new Date(), keeping)),
  ]
  const holding = judged.heldBack ?? new Set<string>()
  if (judged.why.length > 0 && holding.size === 0) {
    const why = judged.why
    return answeredWith([`commit\t${commit}`], [...why, ...(await noting(why))], DATA)
  }
  const before = opening()
  const up: string[] = []
  let answer: Answer
  try {
    answer = await putting(read, slug, commit, wanted, given, restarting, holding, up)
  } catch (thrown) {
    costRecorded(given.root, read.pagePath, before, PUT_UP, slug, 0, 1)
    const why = [whyOf(thrown), stoppedPartWay(up)]
    const said = [`commit\t${commit}`, ...up.map((one) => `up\t${one}`)]
    return answeredWith(said, [...why, ...(await noting(why))], OPERATIONAL)
  }
  costRecorded(given.root, read.pagePath, before, PUT_UP, slug, 0, answer.refusals.length)
  const lines = [`commit\t${commit}`, ...answer.report]
  if (answer.code !== OK || answer.refusals.length > 0) {
    const why = [...answer.refusals, ...partWay(up)]
    return answeredWith(lines, [...why, ...(await noting(why))], answer.code)
  }
  if (holding.size > 0) {
    const why = [saidOfHeldBack([...holding].sort()), ...judged.why]
    return answeredWith(lines, [...why, ...(await noting(why))], DATA)
  }
  const wrong = [
    ...(await recordedCommit(slug, read.pagePath, commit, keeping)),
    ...(await recordedEnding(slug, read.pagePath, false, new Date(), keeping)),
  ]
  if (wrong.length > 0) return answeredWith(lines, wrong, OPERATIONAL)
  return told([...lines, `recorded\t${slug}\t${commit}`])
}
