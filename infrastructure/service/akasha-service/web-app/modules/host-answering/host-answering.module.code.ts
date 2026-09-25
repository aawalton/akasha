import { discoverTunnelRoutes } from "akasha/infrastructure/cluster/manifest/modules/tunnel-route-discovery/tunnel-route-discovery.module.code.ts"
import {
  deployableNamed,
  WEB_APP_TYPE,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-reading/web-app-reading.module.code.ts"
import type { Verdict } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-wellness/service-wellness.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const CLUSTER_HOST = "svc.cluster.local"

const HOST_ENDS: ReadonlySet<string | undefined> = new Set([undefined, ":", "/"])

const LOOK_MS = 15_000

const BROKEN_FROM = 500

export type Reached = { readonly status: number } | { readonly why: string }

export type Fetched = (url: string) => Promise<Reached>

type Served = {
  readonly slug: string
  readonly pagePath: string
  readonly hostnames: readonly string[]
  readonly why: string | null
}

function urlOf(hostname: string): string {
  return `https://${hostname}/`
}

function aimsAt(service: string, host: string): boolean {
  const opened = `//${host}`
  const at = service.indexOf(opened)
  return at >= 0 && HOST_ENDS.has(service[at + opened.length])
}

function servedIn(root: string): readonly Served[] {
  const routes = discoverTunnelRoutes(root)
  const found: Served[] = []
  for (const one of valuesOfType(root, WEB_APP_TYPE)) {
    const said = partedIn(one.path)
    if (said === null || said.sections.length > 0) continue
    const read = deployableNamed(root, said.slug)
    if ("refused" in read) {
      found.push({ slug: said.slug, pagePath: one.path, hostnames: [], why: read.refused })
      continue
    }
    const { name, namespace } = read.deployable.workload
    const host = `${name}.${namespace}.${CLUSTER_HOST}`
    const hostnames = routes
      .filter((stated) => aimsAt(stated.route.service, host))
      .map((stated) => stated.route.hostname)
    found.push({ slug: said.slug, pagePath: one.path, hostnames, why: null })
  }
  return found
}

export function reachedBrokenIn(hostname: string, reached: Reached): string | null {
  if ("why" in reached) return `${urlOf(hostname)} could not be reached: ${reached.why}`
  return reached.status < BROKEN_FROM ? null : `${urlOf(hostname)} answered ${reached.status}`
}

async function fetching(url: string): Promise<Reached> {
  try {
    const answered = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(LOOK_MS) })
    await answered.body?.cancel()
    return { status: answered.status }
  } catch (thrown) {
    return { why: thrown instanceof Error ? thrown.message : String(thrown) }
  }
}

async function brokenOf(one: Served, fetched: Fetched): Promise<string | null> {
  if (one.why !== null) return one.why
  if (one.hostnames.length === 0) {
    return "no tunnel route reaches the workload its cluster service states"
  }
  for (const hostname of one.hostnames) {
    const broken = reachedBrokenIn(hostname, await fetched(urlOf(hostname)))
    if (broken !== null) return broken
  }
  return null
}

export async function webAppHealthFor(
  root: string,
  fetched: Fetched = fetching
): Promise<readonly Verdict[]> {
  const verdicts: Verdict[] = []
  for (const one of servedIn(root)) {
    verdicts.push({ slug: one.slug, pagePath: one.pagePath, broken: await brokenOf(one, fetched) })
  }
  return verdicts
}
