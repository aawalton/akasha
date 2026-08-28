import { askPage } from "./ask"
import type { Fetcher } from "./index"

const WEB_APP_PAGE_TYPE = "web-app"

const LIVE_VERSION_KEY = "live-version"

const DEPLOYED_AT_KEY = "deployed-at"

export interface LiveVersion {
  readonly ok: boolean
  readonly liveVersion: string | null
  readonly deployedAt: string | null
}

function textIn(values: Readonly<Record<string, unknown>>, key: string): string | null {
  const one = values[key]
  return typeof one === "string" && one !== "" ? one : null
}

export async function readLiveVersion(
  webAppSlug: string,
  fetcher: Fetcher = fetch
): Promise<LiveVersion> {
  const asked = await askPage(WEB_APP_PAGE_TYPE, webAppSlug, fetcher)
  if (asked.outcome !== "found") return { ok: false, liveVersion: null, deployedAt: null }
  return {
    ok: true,
    liveVersion: textIn(asked.page.values, LIVE_VERSION_KEY),
    deployedAt: textIn(asked.page.values, DEPLOYED_AT_KEY),
  }
}

export async function liveVersionLoader(
  webAppSlug: string,
  fetcher: Fetcher = fetch
): Promise<Response> {
  const read = await readLiveVersion(webAppSlug, fetcher)
  return Response.json(
    { liveVersion: read.liveVersion, deployedAt: read.deployedAt },
    { status: read.ok ? 200 : 503, headers: { "cache-control": "no-store" } }
  )
}
