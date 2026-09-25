import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  appNamedIn,
  installedOnDevice,
} from "akasha/command/pages/deploy/modules/device-installing/deploy-device-installing.module.code.ts"
import { installedOnSimulator } from "akasha/command/pages/deploy/modules/simulator-installing/deploy-simulator-installing.module.code.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"

export async function iosAppInstalled(
  slug: string,
  given: Given,
  commit: string,
  onDevice: boolean
): Promise<Answer> {
  if (onDevice) return await installedOnDevice(slug, appNamedIn(pagesAt(given.root, commit)))
  return await installedOnSimulator(slug, given)
}
