import { readFileSync } from "node:fs"
import { join } from "node:path"
import { patchState } from "@shared/pages-query"
import { listField, parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { git } from "../../repo/git/git.ts"
import { DeployRefused } from "../refusal/refusal.ts"

const WEB_APP_PAGE_TYPE = "web-app"

const WEB_APP_GLOB = "*.web-app.md"

const RUNS_KEY = "cluster-service-slugs"

const LIVE_VERSION_KEY = "live-version"

const DEPLOYED_AT_KEY = "deployed-at"

const WRITER = "ops-deploy"

export interface WebApp {
  readonly slug: string
  readonly path: string
}

export function webAppsRunOn(akasha: string, serviceSlug: string): readonly WebApp[] {
  const held = git(akasha, ["ls-files", "-z", "--", `*/${WEB_APP_GLOB}`, WEB_APP_GLOB])
  if (held.code !== 0) {
    throw new DeployRefused(
      `git could not list the web app pages under ${akasha}: ${held.stderr.trim()}`
    )
  }
  const found: WebApp[] = []
  for (const one of held.stdout.split("\0")) {
    if (one === "") continue
    const path = join(akasha, one)
    const fm = parseFrontmatter(readFileSync(path, "utf8"))
    const slug = textField(fm, "slug")
    if (slug === null) continue
    if (!listField(fm, RUNS_KEY).includes(serviceSlug)) continue
    found.push({ slug, path })
  }
  return found.sort((one, other) => one.slug.localeCompare(other.slug))
}

export interface Published {
  readonly webApp: string
  readonly ok: boolean
  readonly why: string
}

export async function publishLiveVersion(
  akasha: string,
  serviceSlug: string,
  sha: string
): Promise<readonly Published[]> {
  const at = new Date().toISOString()
  const published: Published[] = []
  for (const webApp of webAppsRunOn(akasha, serviceSlug)) {
    const written = await patchState(
      WEB_APP_PAGE_TYPE,
      webApp.slug,
      { [LIVE_VERSION_KEY]: sha, [DEPLOYED_AT_KEY]: at },
      WRITER
    )
    published.push({
      webApp: webApp.slug,
      ok: written.ok,
      why: written.ok ? written.at : written.why,
    })
  }
  return published
}
