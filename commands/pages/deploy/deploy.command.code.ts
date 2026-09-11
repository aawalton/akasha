import { costRecorded, opening } from "akasha/checks/modules/cost/check-cost.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answering, refused } from "akasha/commands/modules/calling/calling.module.code.ts"
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
  recordedRefusal,
} from "akasha/commands/pages/deploy/commit-recording/deploy-commit-recording.module.code.ts"
import { installedOnDevice } from "akasha/commands/pages/deploy/device-installing/deploy-device-installing.module.code.ts"
import {
  closureFor,
  closuresOf,
  touchedIn,
  unionOf,
} from "akasha/commands/pages/deploy/file-closure/deploy-file-closure.module.code.ts"
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
import {
  pinnedTree,
  treeIn,
} from "akasha/commands/pages/deploy/tree-pinning/deploy-tree-pinning.module.code.ts"
import { putUpWebApp } from "akasha/commands/pages/deploy/web-putting-up/deploy-web-putting-up.module.code.ts"
import {
  appliedWorkload,
  servableNamed,
} from "akasha/infrastructure/services/clusters/workload-applying/workload-applying.module.code.ts"
import { putUpEvery } from "akasha/infrastructure/services/workstations/service-putting-up/service-putting-up.module.code.ts"

const INPUT = 1
const DATA = 2
const OPERATIONAL = 3
const PUT_UP = "deploy"
const DRY_RUN = "--dry-run"
const NO_UPLOAD = "--no-upload"
const MEASURED = "--measured"
const REF = "--ref"
const SIMULATOR = "--simulator"
const DEVICE = "--device"
const FLAGS = [DRY_RUN, NO_UPLOAD, MEASURED, SIMULATOR, DEVICE]
const NAMED: Readonly<Record<string, string>> = {
  [CLUSTER_SERVICE]: "a cluster service",
  [WORKSTATION_SERVICE]: "a workstation service",
  [WEB_APP]: "a web app",
  [CONTAINER_RECIPE]: "a container recipe",
  [INFERENCE_SERVICE]: "an inference service",
  [ESO_ADDON]: "an ESO addon",
}

export interface RefNamed {
  readonly ref: string | null
  readonly rest: readonly string[]
}

export function refNamed(argv: readonly string[]): RefNamed | { readonly refused: string } {
  let ref: string | null = null
  const rest: string[] = []
  let at = 0
  while (at < argv.length) {
    const one = argv[at] as string
    at += 1
    let value: string | undefined
    if (one === REF) {
      value = argv[at]
      at += 1
    } else if (one.startsWith(`${REF}=`)) {
      value = one.slice(REF.length + 1)
    } else {
      rest.push(one)
      continue
    }
    if (value === undefined || value === "" || value.startsWith("-")) {
      return {
        refused: `\`${REF}\` takes the commit to build, and this call names none after it`,
      }
    }
    if (ref !== null) {
      return {
        refused: `\`${REF}\` is named twice, as \`${ref}\` and as \`${value}\`, so which commit is meant is unsettled`,
      }
    }
    ref = value
  }
  return { ref, rest }
}

export async function putUp(
  read: Read,
  slug: string,
  commit: string,
  rest: readonly string[],
  given: Given,
  restarting: ReadonlySet<string> | null = null
): Promise<Answer> {
  const dryRun = rest.includes(DRY_RUN)
  if (read.kind === IOS_APP) {
    return shipIosApp(slug, read.pagePath, rest.includes(NO_UPLOAD), commit)
  }
  if (read.kind === CONTAINER_RECIPE) return await pushedImage(slug, dryRun)
  if (read.kind === WORKSTATION_SERVICE) {
    const every = restarting ?? new Set<string>()
    if (dryRun) return putUpEvery(given.root, true, every, treeIn(given.root, read.kind) ?? "")
    const pinned = pinnedTree(given.root, read.kind, commit)
    if ("refused" in pinned) return refused(pinned.refused, OPERATIONAL)
    return putUpEvery(given.root, false, every, pinned.at)
  }
  if (read.kind === INFERENCE_SERVICE) return await putUpInferenceService(given.root, slug, dryRun)
  if (read.kind === ESO_ADDON) return await putUpAddon(given.root, slug, read.pagePath, dryRun)
  if (read.kind === CLUSTER_SERVICE) {
    const servable = servableNamed(given.root, slug)
    if ("refused" in servable) return refused(servable.refused, DATA)
    return appliedWorkload(given.root, slug, servable.servable, dryRun)
  }
  const bundle = await publishedBundleFor(given.root, slug, dryRun)
  if (bundle !== null && bundle.refusals.length > 0) {
    return answering(bundle.lines, bundle.refusals, OPERATIONAL)
  }
  const up = await putUpWebApp(slug, commit, given, dryRun)
  if (bundle === null) return up
  return answering([...bundle.lines, ...up.report], up.refusals, up.code)
}

export async function deploy(argv: readonly string[], given: Given): Promise<Answer> {
  const taken = refNamed(argv)
  if ("refused" in taken) return refused(taken.refused, INPUT)
  const { ref, rest } = taken
  const strange = rest.find((one) => one.startsWith("-") && !FLAGS.includes(one))
  if (strange !== undefined) {
    return refused(`\`${strange}\` is nothing \`akasha deploy\` takes`, INPUT)
  }
  const named = rest.filter((one) => !one.startsWith("-"))
  if (named.length === 0) {
    return refused("name the app to put up by the slug its page carries", INPUT)
  }
  if (named.length > 1) {
    return refused(
      `a deploy puts up one app, and ${named.length} were named, so which one is meant is unsettled: ${named.join(", ")}`,
      INPUT
    )
  }

  if (rest.includes(MEASURED)) allowedThrough()

  const slug = named[0] as string
  const read = kindNamed(given.root, slug)
  if ("refused" in read) return refused(read.refused, DATA)
  if (read.kind === IOS_APP) {
    const onto = rest.find((one) => one === SIMULATOR || one === DEVICE)
    if (onto !== undefined) {
      if (rest.includes(SIMULATOR) && rest.includes(DEVICE)) {
        return refused(
          `\`${SIMULATOR}\` and \`${DEVICE}\` name two places to install to, so which is meant is unsettled`,
          INPUT
        )
      }
      if (rest.includes(NO_UPLOAD) || ref !== null) {
        return refused(
          `\`${onto}\` installs the build rather than handing it to Apple, so \`${NO_UPLOAD}\` and \`${REF}\` say nothing about it`,
          INPUT
        )
      }
      if (onto === DEVICE) return await installedOnDevice(slug)
      return installedOnSimulator(slug, given)
    }
    if (rest.includes(DRY_RUN)) {
      return refused(
        `\`${slug}\` names an ios app, which is built and handed to Apple rather than applied to a cluster, so \`${DRY_RUN}\` says nothing about it — a build Apple validates and nobody is sent is \`${NO_UPLOAD}\``,
        INPUT
      )
    }
  } else {
    const what = NAMED[read.kind] as string
    const elsewhere = rest.find((one) => one === SIMULATOR || one === DEVICE)
    if (elsewhere !== undefined) {
      return refused(
        `\`${slug}\` names ${what}, which is put up rather than installed on a phone, so \`${elsewhere}\` says nothing about it`,
        INPUT
      )
    }
    if (rest.includes(NO_UPLOAD)) {
      return refused(
        `\`${slug}\` names ${what}, which is put up rather than uploaded, so \`${NO_UPLOAD}\` says nothing about it — a run that applies nothing is \`${DRY_RUN}\``,
        INPUT
      )
    }
  }
  const commit = commitAt(given.root, ref)
  if (commit === null) return refused(saidOfNoCommit(ref ?? AT_HEAD), INPUT)
  const closures = read.every === true ? closuresOf(given.root, read.kind, commit) : null
  const built = closures === null ? closureFor(given.root, slug, read, commit) : unionOf(closures)
  const was = sinceCommit(given.root, commitRecordedIn(given.root, read.pagePath))
  const moved = was === null ? null : changedBetween(given.root, was, commit)
  const restarting = closures === null ? null : touchedIn(closures, moved)
  const unjudged = await judgedOnDeploy(given.root, slug, was, commit, built)
  const dry = rest.includes(DRY_RUN)
  const noting = () => (dry ? [] : recordedRefusal(given.root, slug, read.pagePath, commit))
  if (unjudged.length > 0) {
    return answering([`commit\t${commit}`], [...unjudged, ...noting()], DATA)
  }
  const before = opening()
  const answer = await putUp(read, slug, commit, rest, given, restarting)
  if (!dry) {
    costRecorded(given.root, read.pagePath, before, PUT_UP, slug, 0, answer.refusals.length)
  }
  const lines = [`commit\t${commit}`, ...answer.report]
  if (answer.code !== 0 || answer.refusals.length > 0) {
    return answering(lines, [...answer.refusals, ...noting()], answer.code)
  }
  if (dry) return answering(lines, answer.refusals, answer.code)
  const wrong = recordedCommit(given.root, slug, read.pagePath, commit)
  if (wrong.length > 0) return answering(lines, wrong, OPERATIONAL)
  return answering([...lines, `recorded\t${slug}\t${commit}`], [], 0)
}
