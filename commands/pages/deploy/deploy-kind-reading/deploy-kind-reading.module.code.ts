import { mobileApps } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { pathsNamed } from "akasha/infrastructure/cluster/services/web-app-reading/web-app-reading.module.code.ts"
import { slugsOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

export const WEB_APP = "web-app"

export const IOS_APP = "ios-app"

export const CLUSTER_SERVICE = "cluster-service"

export const WORKSTATION_SERVICE = "workstation-service"

export const CONTAINER_RECIPE = "container-recipe"

export const INFERENCE_SERVICE = "service-inference"

export const ESO_ADDON = "eso-addon"

export type Kind =
  | typeof WEB_APP
  | typeof IOS_APP
  | typeof CLUSTER_SERVICE
  | typeof WORKSTATION_SERVICE
  | typeof CONTAINER_RECIPE
  | typeof INFERENCE_SERVICE
  | typeof ESO_ADDON

export type Named = {
  readonly kind: Kind
  readonly pagePath: string
}

export type Read = Named | { readonly refused: string }

export type Apps = Readonly<Record<string, { readonly pagePath: string }>>

export type IosApps = () => Apps

function having(label: string, slugs: readonly string[]): string {
  if (slugs.length === 0) return `no ${label} has a page`
  return `${slugs.length} ${label}s have one: ${slugs.join(", ")}`
}

export function kindNamed(root: string, slug: string, iosApps: IosApps = mobileApps): Read {
  let ios: Apps
  try {
    ios = iosApps()
  } catch (err) {
    const said = err instanceof Error ? err.message : String(err)
    return {
      refused: `the ios app pages would not be read, so which ios apps there are is unsaid: ${said}`,
    }
  }
  const iosNamed = ios[slug]
  const found: Named[] = []
  for (const one of pathsNamed(root, WEB_APP, slug)) {
    found.push({ kind: WEB_APP, pagePath: one })
  }
  if (iosNamed !== undefined) found.push({ kind: IOS_APP, pagePath: iosNamed.pagePath })
  const rest = [
    CLUSTER_SERVICE,
    WORKSTATION_SERVICE,
    CONTAINER_RECIPE,
    INFERENCE_SERVICE,
    ESO_ADDON,
  ] as const
  for (const kind of rest) {
    for (const one of pathsNamed(root, kind, slug)) found.push({ kind, pagePath: one })
  }

  const web = found.some((one) => one.kind === WEB_APP)
  const left = web ? found.filter((one) => one.kind !== CLUSTER_SERVICE) : found
  const only = left[0]
  if (only === undefined) {
    const webs = having("web app", slugsOfType(root, WEB_APP))
    const ioses = having("ios app", Object.keys(ios).sort())
    const servers = having("cluster service", slugsOfType(root, CLUSTER_SERVICE))
    const runners = having("workstation service", slugsOfType(root, WORKSTATION_SERVICE))
    const recipes = having("container recipe", slugsOfType(root, CONTAINER_RECIPE))
    const models = having("inference service", slugsOfType(root, INFERENCE_SERVICE))
    const addons = having("eso addon", slugsOfType(root, ESO_ADDON))
    return {
      refused: `no page of any kind a deploy puts up is named \`${slug}\` — ${webs}, ${ioses}, ${servers}, ${runners}, ${recipes}, ${models}, and ${addons}`,
    }
  }
  if (left.length > 1) {
    return {
      refused: `${left.length} pages are named \`${slug}\`, so what is meant is unsettled: ${left.map((one) => `${one.kind} ${one.pagePath}`).join(", ")}`,
    }
  }
  return only
}
