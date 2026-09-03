import { InputError } from "@akasha/errors-core/exit-code"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import type { Row } from "@akasha/pages-system/page-derive-shape"
import { listOf, textOf } from "@akasha/pages-system/page-query-values"
import { readFilePages } from "@tools/lib/file-pages"

export interface MobileApp {
  readonly slug: string
  readonly pagePath: string
  readonly displayName: string
  readonly bundleId: string
  readonly widgetBundleId: string | null
  readonly developmentTeam: string
  readonly nativeShellRepoPath: string | null
  readonly iconRepoPath: string | null
  readonly simBuildScript: string | null
  readonly wwwStageScript: string | null
  readonly spaSourceRepoPath: string | null
  readonly webEnvSegments: readonly string[] | null
  readonly ascCapabilities: readonly string[]
  readonly appProfileName: string
  readonly widgetProfileName: string | null
  readonly macBuildLockDir: string
  readonly macBuildNumberFile: string
  readonly macWwwStagingRel: string | null
  readonly defaultDeviceUdid: string | null
}

export const IOS_APP_PAGE_TYPE_SLUG = "ios-app"

export const DEFAULT_APP_SLUG = "alanwalton"

const APP_KEYS: readonly string[] = [
  "app-slug",
  "display-name",
  "bundle-id",
  "widget-bundle-id",
  "development-team",
  "native-shell-repo-path",
  "icon-repo-path",
  "sim-build-script",
  "www-stage-script",
  "spa-source-repo-path",
  "web-env-path",
  "asc-capabilities",
  "app-profile-name",
  "widget-profile-name",
  "mac-build-lock-dir",
  "mac-build-number-file",
  "mac-www-staging-rel",
  "default-device-udid",
]

function stated(row: Row, key: string): string | null {
  const value = textOf(row.values, key)
  return value === null || value.trim() === "" ? null : value
}

function required(row: Row, key: string): string {
  const value = stated(row, key)
  if (value === null) {
    throw new InputError(
      `${row.at} stands as an iOS app and states no \`${key}\`, which the mobile commands read off the page`
    )
  }
  return value
}

function mobileAppOf(row: Row): MobileApp {
  const webEnvPath = stated(row, "web-env-path")
  return {
    slug: required(row, "app-slug"),
    pagePath: row.at,
    displayName: required(row, "display-name"),
    bundleId: required(row, "bundle-id"),
    widgetBundleId: stated(row, "widget-bundle-id"),
    developmentTeam: required(row, "development-team"),
    nativeShellRepoPath: stated(row, "native-shell-repo-path"),
    iconRepoPath: stated(row, "icon-repo-path"),
    simBuildScript: stated(row, "sim-build-script"),
    wwwStageScript: stated(row, "www-stage-script"),
    spaSourceRepoPath: stated(row, "spa-source-repo-path"),
    webEnvSegments: webEnvPath === null ? null : webEnvPath.split("/"),
    ascCapabilities: listOf(row.values, "asc-capabilities"),
    appProfileName: required(row, "app-profile-name"),
    widgetProfileName: stated(row, "widget-profile-name"),
    macBuildLockDir: required(row, "mac-build-lock-dir"),
    macBuildNumberFile: required(row, "mac-build-number-file"),
    macWwwStagingRel: stated(row, "mac-www-staging-rel"),
    defaultDeviceUdid: stated(row, "default-device-udid"),
  }
}

let held: Readonly<Record<string, MobileApp>> | null = null

export function mobileApps(): Readonly<Record<string, MobileApp>> {
  if (held !== null) return held
  const byAppSlug: Record<string, MobileApp> = {}
  for (const row of readFilePages(IOS_APP_PAGE_TYPE_SLUG, APP_KEYS)) {
    const app = mobileAppOf(row)
    if (byAppSlug[app.slug] !== undefined) {
      throw new InputError(`two iOS app pages both spell their \`app-slug\` ${app.slug}`)
    }
    byAppSlug[app.slug] = app
  }
  held = byAppSlug
  return held
}

export function knownAppSlugs(): readonly string[] {
  return Object.keys(mobileApps()).sort()
}

export function resolveApp(slug?: string): MobileApp {
  const wanted = slug === undefined || slug === "" ? DEFAULT_APP_SLUG : slug
  const app = mobileApps()[wanted]
  if (app === undefined) {
    throw new InputError(
      `unknown --app ${JSON.stringify(wanted)} — known apps: ${knownAppSlugs().join(", ")}`
    )
  }
  return app
}

export const CODE_REPO = "code"

export interface RepoPath {
  readonly repo: string
  readonly path: string
}

export function splitRepoPath(value: string): RepoPath {
  const at = value.indexOf(":")
  if (at === -1) return { repo: CODE_REPO, path: value }
  return { repo: value.slice(0, at), path: value.slice(at + 1) }
}

export function shellRepoPath(app: MobileApp): RepoPath {
  if (app.nativeShellRepoPath === null) {
    throw new InputError(
      `${app.slug} states no \`native-shell-repo-path\`, so a checkout holds no native shell to compile`
    )
  }
  return splitRepoPath(app.nativeShellRepoPath)
}

export function shellRepoRoot(app: MobileApp): string {
  const { repo } = shellRepoPath(app)
  const root = resolveRoots()[repo]
  if (root === undefined) {
    throw new InputError(
      `\`${repo}\` is not a repository this system knows, so no native shell can be found in it`
    )
  }
  return root
}

export function nativeShellDir(app: MobileApp, root: string): string {
  return `${root}/${shellRepoPath(app).path}`
}

export function iosAppDir(app: MobileApp, root: string): string {
  return `${nativeShellDir(app, root)}/ios/App`
}

export function stagedWwwRepoPath(app: MobileApp): string | null {
  if (app.nativeShellRepoPath === null) return null
  return `${splitRepoPath(app.nativeShellRepoPath).path}/www`
}

export function macWwwStagingDir(app: MobileApp): string | null {
  return app.macWwwStagingRel === null ? null : `$HOME/${app.macWwwStagingRel}`
}
