import { basename } from "node:path"
import { mobileApps } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import {
  CLUSTER_SERVICE_SUFFIX,
  namedAmong,
  pagesUnder,
} from "../../../../infrastructure/cluster/services/web-app-reading/web-app-reading.module.code.ts"

export const WEB_APP = "web-app"

export const IOS_APP = "ios-app"

export const CLUSTER_SERVICE = "cluster-service"

export const WORKSTATION_SERVICE = "workstation-service"

const WEB_APP_SUFFIX = ".web-app.ts"

const WORKSTATION_SERVICE_SUFFIX = ".workstation-service.ts"

export type Kind =
  | typeof WEB_APP
  | typeof IOS_APP
  | typeof CLUSTER_SERVICE
  | typeof WORKSTATION_SERVICE

export type Named = {
  readonly kind: Kind
  readonly pagePath: string
}

export type Read = Named | { readonly refused: string }

export type Apps = Readonly<Record<string, { readonly pagePath: string }>>

export type IosApps = () => Apps

function slugsOf(paths: readonly string[], suffix: string): readonly string[] {
  return paths.map((one) => basename(one, suffix))
}

function having(label: string, slugs: readonly string[]): string {
  if (slugs.length === 0) return `no ${label} has a page`
  return `${slugs.length} ${label}s have one: ${slugs.join(", ")}`
}

export function kindNamed(root: string, slug: string, iosApps: IosApps = mobileApps): Read {
  const webApps = pagesUnder(root, WEB_APP_SUFFIX)
  if (webApps === null) return { refused: `git could not list the web app pages under ${root}` }
  const services = pagesUnder(root, CLUSTER_SERVICE_SUFFIX)
  if (services === null) {
    return { refused: `git could not list the cluster service pages under ${root}` }
  }
  const units = pagesUnder(root, WORKSTATION_SERVICE_SUFFIX)
  if (units === null) {
    return { refused: `git could not list the workstation service pages under ${root}` }
  }
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
  for (const one of namedAmong(webApps, slug, WEB_APP_SUFFIX)) {
    found.push({ kind: WEB_APP, pagePath: one })
  }
  if (iosNamed !== undefined) found.push({ kind: IOS_APP, pagePath: iosNamed.pagePath })
  for (const one of namedAmong(services, slug, CLUSTER_SERVICE_SUFFIX)) {
    found.push({ kind: CLUSTER_SERVICE, pagePath: one })
  }
  for (const one of namedAmong(units, slug, WORKSTATION_SERVICE_SUFFIX)) {
    found.push({ kind: WORKSTATION_SERVICE, pagePath: one })
  }

  const web = found.some((one) => one.kind === WEB_APP)
  const left = web ? found.filter((one) => one.kind !== CLUSTER_SERVICE) : found
  const only = left[0]
  if (only === undefined) {
    const webs = having("web app", slugsOf(webApps, WEB_APP_SUFFIX))
    const ioses = having("ios app", Object.keys(ios).sort())
    const servers = having("cluster service", slugsOf(services, CLUSTER_SERVICE_SUFFIX))
    const runners = having("workstation service", slugsOf(units, WORKSTATION_SERVICE_SUFFIX))
    return {
      refused: `no page of any kind a deploy puts up is named \`${slug}\` — ${webs}, ${ioses}, ${servers}, and ${runners}`,
    }
  }
  if (left.length > 1) {
    return {
      refused: `${left.length} pages are named \`${slug}\`, so what is meant is unsettled: ${left.map((one) => `${one.kind} ${one.pagePath}`).join(", ")}`,
    }
  }
  return only
}
