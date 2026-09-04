import { readdirSync } from "node:fs"
import { join } from "node:path"
import { InputError } from "@akasha/errors-core/exit-code"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { slugAt, textAt, textsAt, type Value, valueAt } from "@akasha/pages-system/page-value"

export interface MobileApp {
  readonly slug: string
  readonly pagePath: string
  readonly displayName: string
  readonly bundleId: string
  readonly widgetBundleId: string | null
  readonly developmentTeam: string
  readonly nativeShellRepoPath: string | null
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

const APPS_FOLDER = "code-system/ios-apps/pages"

const PAGE_SUFFIX = ".ios-app.ts"

const SCRIPT_SUFFIX = ".shell-script.shell.sh"

function inAkasha(path: string): string {
  return `${AKASHA}:${path}`
}

function akashaRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

function appPagePath(slug: string): string {
  return `${APPS_FOLDER}/${slug}/${slug}${PAGE_SUFFIX}`
}

function pagePathsUnder(root: string): readonly string[] {
  const found: string[] = []
  try {
    for (const entry of readdirSync(join(root, APPS_FOLDER), { withFileTypes: true })) {
      if (entry.isDirectory()) found.push(appPagePath(entry.name))
    }
  } catch (why) {
    throw new InputError(
      `the iOS app pages under ${APPS_FOLDER} would not be listed: ${why instanceof Error ? why.message : String(why)}`
    )
  }
  return found.sort()
}

let scripts: Readonly<Record<string, string>> | null = null

function scriptPaths(): Readonly<Record<string, string>> {
  if (scripts !== null) return scripts
  const root = akashaRoot()
  const bySlug: Record<string, string> = {}
  for (const found of new Bun.Glob(`**/*${SCRIPT_SUFFIX}`).scanSync({ cwd: root })) {
    const path = found.split("\\").join("/")
    const name = path.slice(path.lastIndexOf("/") + 1)
    bySlug[name.slice(0, -SCRIPT_SUFFIX.length)] = path
  }
  scripts = bySlug
  return scripts
}

function scriptAt(value: Value, key: string, path: string): string | null {
  const slug = slugAt(value, key)
  if (slug === null) return null
  const found = scriptPaths()[slug]
  if (found === undefined) {
    throw new InputError(
      `${path} names \`${slug}\` as its \`${key}\`, and no shell script in akasha carries that slug`
    )
  }
  return inAkasha(found)
}

function stated(value: Value, key: string): string | null {
  const held = textAt(value, key)
  return held === null || held.trim() === "" ? null : held
}

function required(value: Value, key: string, path: string): string {
  const held = stated(value, key)
  if (held === null) {
    throw new InputError(
      `${path} is an iOS app page and states no \`${key}\`, which the mobile commands read off the page`
    )
  }
  return held
}

function mobileAppOf(value: Value, path: string): MobileApp {
  const webEnvPath = stated(value, "webEnvPath")
  return {
    slug: required(value, "slug", path),
    pagePath: path,
    displayName: required(value, "displayName", path),
    bundleId: required(value, "bundleId", path),
    widgetBundleId: stated(value, "widgetBundleId"),
    developmentTeam: required(value, "developmentTeam", path),
    nativeShellRepoPath: stated(value, "nativeShellRepoPath"),
    simBuildScript: scriptAt(value, "buildScript", path),
    wwwStageScript: scriptAt(value, "stageScript", path),
    spaSourceRepoPath: stated(value, "spaSourcePath"),
    webEnvSegments: webEnvPath === null ? null : webEnvPath.split("/"),
    ascCapabilities: textsAt(value, "ascCapabilities") ?? [],
    appProfileName: required(value, "appProfileName", path),
    widgetProfileName: stated(value, "widgetProfileName"),
    macBuildLockDir: required(value, "macBuildLockDir", path),
    macBuildNumberFile: required(value, "macBuildNumberFile", path),
    macWwwStagingRel: stated(value, "macWwwStagingRel"),
    defaultDeviceUdid: stated(value, "defaultDeviceUdid"),
  }
}

let held: Readonly<Record<string, MobileApp>> | null = null

export function mobileApps(): Readonly<Record<string, MobileApp>> {
  if (held !== null) return held
  const root = akashaRoot()
  const bySlug: Record<string, MobileApp> = {}
  for (const path of pagePathsUnder(root)) {
    const value = valueAt(path, root)
    if (value === null) throw new InputError(`${path} declares no page value`)
    const app = mobileAppOf(value, path)
    if (bySlug[app.slug] !== undefined) {
      throw new InputError(`two iOS app pages both spell their \`slug\` ${app.slug}`)
    }
    bySlug[app.slug] = app
  }
  held = bySlug
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
