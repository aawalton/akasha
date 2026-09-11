import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { allowedThrough } from "akasha/commands/modules/stopping/command-stopping.module.code.ts"
import { putUpAddon } from "akasha/commands/pages/deploy/deploy-addon-installing/deploy-addon-installing.module.code.ts"
import { installedOnDevice } from "akasha/commands/pages/deploy/deploy-device-installing/deploy-device-installing.module.code.ts"
import { pushedImage } from "akasha/commands/pages/deploy/deploy-image-pushing/deploy-image-pushing.module.code.ts"
import { putUpInferenceService } from "akasha/commands/pages/deploy/deploy-inference-installing/deploy-inference-installing.module.code.ts"
import { shipIosApp } from "akasha/commands/pages/deploy/deploy-ios-shipping/deploy-ios-shipping.module.code.ts"
import {
  CLUSTER_SERVICE,
  CONTAINER_RECIPE,
  ESO_ADDON,
  INFERENCE_SERVICE,
  IOS_APP,
  kindNamed,
  WEB_APP,
  WORKSTATION_SERVICE,
} from "akasha/commands/pages/deploy/deploy-kind-reading/deploy-kind-reading.module.code.ts"
import { installedOnSimulator } from "akasha/commands/pages/deploy/deploy-simulator-installing/deploy-simulator-installing.module.code.ts"
import { putUpWebApp } from "akasha/commands/pages/deploy/deploy-web-putting-up/deploy-web-putting-up.module.code.ts"
import {
  appliedWorkload,
  servableNamed,
} from "akasha/infrastructure/cluster/services/workload-applying/workload-applying.module.code.ts"
import { putUpService } from "akasha/services/workstation-services/service-putting-up/service-putting-up.module.code.ts"

const INPUT = 1
const DATA = 2
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
    return shipIosApp(slug, read.pagePath, rest.includes(NO_UPLOAD), ref)
  }
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
  if (ref !== null) {
    return refused(
      read.kind === WEB_APP
        ? `\`${slug}\` names a web app, which is built from the commit this workstation's HEAD is at rather than from one told, so \`${REF}\` says nothing about it`
        : `\`${slug}\` names ${what}, which runs what its page describes rather than a commit built here, so \`${REF}\` says nothing about it`,
      INPUT
    )
  }
  if (read.kind === CONTAINER_RECIPE) {
    return await pushedImage(slug, rest.includes(DRY_RUN))
  }
  if (read.kind === WORKSTATION_SERVICE) {
    return putUpService(given.root, slug, rest.includes(DRY_RUN))
  }
  if (read.kind === INFERENCE_SERVICE) {
    return await putUpInferenceService(given.root, slug, rest.includes(DRY_RUN))
  }
  if (read.kind === ESO_ADDON) {
    return await putUpAddon(given.root, slug, read.pagePath, rest.includes(DRY_RUN))
  }
  if (read.kind === CLUSTER_SERVICE) {
    const servable = servableNamed(given.root, slug)
    if ("refused" in servable) return refused(servable.refused, DATA)
    return appliedWorkload(given.root, slug, servable.servable, rest.includes(DRY_RUN))
  }
  return putUpWebApp(slug, given, rest.includes(DRY_RUN))
}
