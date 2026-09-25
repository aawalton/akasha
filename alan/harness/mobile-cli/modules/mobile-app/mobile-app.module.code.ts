import { InputError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import {
  everyOfType,
  listedAt,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  slugAt,
  textAt,
  textsAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export interface MobileApp {
  readonly slug: string
  readonly pagePath: string
  readonly displayName: string
  readonly marketingVersion: string
  readonly bundleId: string
  readonly widgetBundleId: string | null
  readonly developmentTeam: string
  readonly nativeShellRepoPath: string | null
  readonly simBuildScript: string | null
  readonly syncScript: string | null
  readonly webEnvSegments: readonly string[] | null
  readonly ascCapabilities: readonly string[]
  readonly toolReached: readonly string[]
  readonly appProfileName: string
  readonly widgetProfileName: string | null
  readonly macBuildLockDir: string
  readonly macBuildNumberFile: string
  readonly defaultDeviceUdid: string | null
}

const IOS_APP_PAGE_TYPE_SLUG = "ios-app"

const SHELL_SCRIPT_PAGE_TYPE_SLUG = "shell-script"

const SHELL = "shell"

export const DEFAULT_APP_SLUG = "alanwalton"

function inAkasha(path: string): string {
  return `${AKASHA}:${path}`
}

function akashaRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

function scriptNamed(slug: string, at: string, why: string): string {
  const root = akashaRoot()
  const found = listedAt(root, SHELL_SCRIPT_PAGE_TYPE_SLUG, slug)[0]
  if (found === undefined) {
    throw new InputError(
      `${at} names \`${slug}\` ${why}, and no shell script in akasha carries that slug`
    )
  }
  const value = valueAt(found.path, root)
  if (value === null) throw new InputError(`${found.path} declares no page value`)
  const held = textAt(value, SHELL)
  const script = held === null ? null : besideAt(found.path, SHELL, held)
  if (script === null) {
    throw new InputError(
      `${found.path} carries the slug \`${slug}\` and states no \`${SHELL}\` file to run`
    )
  }
  return inAkasha(script)
}

function scriptAt(value: Value, key: string, path: string): string | null {
  const slug = slugAt(value, key)
  if (slug === null) return null
  return scriptNamed(slug, path, `as its \`${key}\``)
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
    marketingVersion: required(value, "marketingVersion", path),
    bundleId: required(value, "bundleId", path),
    widgetBundleId: stated(value, "widgetBundleId"),
    developmentTeam: required(value, "developmentTeam", path),
    nativeShellRepoPath: stated(value, "nativeShellRepoPath"),
    simBuildScript: scriptAt(value, "buildScript", path),
    syncScript: scriptAt(value, "syncScript", path),
    webEnvSegments: webEnvPath === null ? null : webEnvPath.split("/"),
    ascCapabilities: textsAt(value, "ascCapabilities") ?? [],
    toolReached: textsAt(value, "toolReached") ?? [],
    appProfileName: required(value, "appProfileName", path),
    widgetProfileName: stated(value, "widgetProfileName"),
    macBuildLockDir: required(value, "macBuildLockDir", path),
    macBuildNumberFile: required(value, "macBuildNumberFile", path),
    defaultDeviceUdid: stated(value, "defaultDeviceUdid"),
  }
}

let held: Readonly<Record<string, MobileApp>> | null = null

export function mobileApps(): Readonly<Record<string, MobileApp>> {
  if (held !== null) return held
  const root = akashaRoot()
  const bySlug: Record<string, MobileApp> = {}
  for (const { path } of everyOfType(root, IOS_APP_PAGE_TYPE_SLUG)) {
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

function knownAppSlugs(): readonly string[] {
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

type AppRead = MobileApp | { readonly refused: readonly string[] }

export function appIn(slug: string | undefined): AppRead {
  try {
    return resolveApp(slug)
  } catch (thrown) {
    return { refused: [whyOf(thrown)] }
  }
}

const SHELL_SCRIPT_PART_PREFIX = `${SHELL_SCRIPT_PAGE_TYPE_SLUG}/`

const RING_CREDENTIAL_SCRIPT_SUFFIX = "-ring-credential"

export function ringCredentialPartIn(parts: readonly string[], at: string): string | null {
  const named = parts.filter(
    (one) => one.startsWith(SHELL_SCRIPT_PART_PREFIX) && one.endsWith(RING_CREDENTIAL_SCRIPT_SUFFIX)
  )
  const [first, second] = named
  if (second !== undefined) {
    throw new InputError(
      `${at} names \`${first}\` and \`${second}\` among its parts, and an app bakes one`
    )
  }
  return first ?? null
}

export function ringCredentialScriptFor(app: MobileApp): string | null {
  const value = valueAt(app.pagePath, akashaRoot())
  if (value === null) {
    throw new InputError(`${app.pagePath} declares no page value`)
  }
  const named = ringCredentialPartIn(textsAt(value, "parts") ?? [], app.pagePath)
  if (named === null) return null
  return scriptNamed(named.slice(SHELL_SCRIPT_PART_PREFIX.length), app.pagePath, "among its parts")
}

const CODE_REPO = "code"

interface RepoPath {
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
