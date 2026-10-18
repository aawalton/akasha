import {
  answeredWith,
  DATA,
  OK,
  OPERATIONAL,
  refused,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { putUpAddon } from "akasha/command/pages/deploy/modules/addon-installing/deploy-addon-installing.module.code.ts"
import {
  bundleHandedBack,
  bundleMadeFor,
  bundleTagged,
  imageRenamedIn,
} from "akasha/command/pages/deploy/modules/bundle-publishing/deploy-bundle-publishing.module.code.ts"
import { promotedApp } from "akasha/command/pages/deploy/modules/desktop-app-promoting/deploy-desktop-app-promoting.module.code.ts"
import { putUpExtension } from "akasha/command/pages/deploy/modules/extension-placing/deploy-extension-placing.module.code.ts"
import { pushedImage } from "akasha/command/pages/deploy/modules/image-pushing/deploy-image-pushing.module.code.ts"
import { putUpInferenceService } from "akasha/command/pages/deploy/modules/inference-installing/deploy-inference-installing.module.code.ts"
import { shipIosApp } from "akasha/command/pages/deploy/modules/ios-shipping/deploy-ios-shipping.module.code.ts"
import {
  BROWSER_EXTENSION,
  CLUSTER_FOUNDATION,
  CLUSTER_SERVICE,
  CONTAINER_RECIPE,
  DESKTOP_APP,
  INFERENCE_SERVICE,
  IOS_APP,
  type Named as Read,
  TEMPER_ADDON,
  WORKSTATION_SERVICE,
} from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import { putUpWebApp } from "akasha/command/pages/deploy/modules/web-putting-up/deploy-web-putting-up.module.code.ts"
import { inCluster } from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"
import { appliedFoundation } from "akasha/infrastructure/service/akasha-service/cluster-foundation/modules/foundation-applying/foundation-applying.module.code.ts"
import {
  appliedWorkload,
  servableNamed,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-applying/workload-applying.module.code.ts"
import { putUpEvery } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-putting-up/service-putting-up.module.code.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"

export type Wanted = {
  readonly noUpload: boolean
  readonly simulator: boolean
  readonly device: boolean
  readonly ref: string | null
}

export async function putUpFrom(
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
  const pages = () => pagesAt(given.root, commit)
  if (read.kind === IOS_APP) {
    return shipIosApp(slug, read.pagePath, wanted.noUpload, commit, pages(), up)
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
  if (read.kind === DESKTOP_APP) return await promotedApp(slug, given.calledAs, up)
  if (read.kind === BROWSER_EXTENSION) return await putUpExtension(at, slug, read.pagePath, up)
  if (read.kind === CLUSTER_FOUNDATION) {
    return await appliedFoundation(given.root, slug, at, up)
  }
  if (read.kind === CLUSTER_SERVICE) {
    const servable = servableNamed(pages(), slug)
    if ("refused" in servable) return refused(servable.refused, DATA)
    return appliedWorkload(given.root, slug, servable.servable, at, up)
  }
  const made = await bundleMadeFor(given.root, slug, commit, at, up)
  const renamed = made === null ? null : imageRenamedIn(given.root, made)
  const web = await putUpWebApp(slug, commit, given, at, up, renamed ?? undefined)
  if (made === null) return web
  const bundle = inCluster() ? bundleHandedBack(made) : await bundleTagged(given.root, made, up)
  const refusals = [...bundle.refusals, ...web.refusals]
  const code = bundle.refusals.length > 0 && web.code === OK ? OPERATIONAL : web.code
  return answeredWith([...bundle.lines, ...web.report], refusals, code)
}
