import { dirname } from "node:path"
import { indexThere, listedAt } from "@akasha/indexes"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { slugOf, textAt, type Value, valueAt } from "@akasha/pages-system/page-value"
import { quoted } from "@akasha/shell/quoting"

export const SHARED_PATHS: readonly string[] = [
  "akasha/code-system/ios-apps/scripts",
  "akasha/code-system/ios-components/pages",
  "akasha/code-system/ios-programs/pages",
]

const PROGRAM = "ios-program/"

const COMPONENT = "ios-component/"

const SUFFIX = ".ios-component.swift.swift"

export type Staging = {
  readonly scriptPath: string
  readonly sourcePath: string
}

export type Plan = {
  readonly appSlug: string
  readonly shellPath: string
  readonly buildScriptPath: string
  readonly staging: Staging | null
  readonly deliverPaths: readonly string[]
  readonly exports: readonly string[]
}

export type Planned = Plan | { readonly refused: readonly string[] }

function listAt(value: Value, key: string): readonly string[] {
  const held = value[key]
  return Array.isArray(held) ? held.filter((one) => typeof one === "string") : []
}

function pathOf(root: string, typeSlug: string, slug: string): string | null {
  if (!indexThere(root)) return null
  const listed = listedAt(root, typeSlug, slug)
  return listed.length === 1 ? (listed[0]?.path ?? null) : null
}

function pageOf(root: string, typeSlug: string, slug: string): Value | null {
  const path = pathOf(root, typeSlug, slug)
  return path === null ? null : valueAt(path, root)
}

function componentsOf(program: Value): string {
  return listAt(program, "componentSlugs")
    .map((one) => slugOf(one.startsWith(COMPONENT) ? one : `${COMPONENT}${one}`))
    .map((slug) => `${slug}/${slug}${SUFFIX}`)
    .join(" ")
}

function exportsOf(app: Value, shipped: Value, hosting: Value): readonly string[] {
  const bundleId = textAt(app, "bundleId") ?? ""
  const team = textAt(app, "developmentTeam") ?? ""
  const said: [string, string][] = [
    ["NATIVE_SHELL_BUNDLE_ID", bundleId],
    ["NATIVE_SHELL_DISPLAY_NAME", textAt(app, "displayName") ?? ""],
    ["NATIVE_SHELL_DEVELOPMENT_TEAM", team],
    ["NATIVE_SHELL_WIDGET_BUNDLE_ID", textAt(shipped, "bundleId") ?? ""],
    ["NATIVE_SHELL_APP_PROFILE_NAME", textAt(hosting, "profileName") ?? ""],
    ["NATIVE_SHELL_WIDGET_PROFILE_NAME", textAt(shipped, "profileName") ?? ""],
    ["NATIVE_SHELL_KEYCHAIN_ACCESS_GROUP", `${team}.${bundleId}`],
    ["NATIVE_SHELL_DEVICE_SECRET_SERVICE", `${bundleId}.device-secret`],
    ["NATIVE_SHELL_WIDGET_NAME", textAt(shipped, "targetName") ?? ""],
    ["NATIVE_SHELL_COMPONENTS", componentsOf(shipped)],
  ]
  return said.map(([name, value]) => `export ${name}=${quoted(value)}`)
}

type Programs = { readonly shipped: Value; readonly hosting: Value } | { readonly why: string }

function programsOf(root: string, app: Value, appSlug: string): Programs {
  const named = listAt(app, "partSlugs").filter((one) => one.startsWith(PROGRAM))
  const held: Value[] = []
  for (const one of named) {
    const page = pageOf(root, "ios-program", slugOf(one))
    if (page !== null) held.push(page)
  }
  const shipped = held.filter((one) => textAt(one, "bundleId") !== null)
  if (shipped.length === 0) {
    return {
      why: `no program ${appSlug} builds states a name of its own, so nothing says what is shipped inside it`,
    }
  }
  if (shipped.length > 1) {
    const among = shipped.map((one) => textAt(one, "slug") ?? "?").join(", ")
    return { why: `${among} each state a name of their own, so which is shipped inside is unclear` }
  }
  const hosting = held.find(
    (one) => textAt(one, "bundleId") === null && textAt(one, "profileName") !== null
  )
  if (hosting === undefined) {
    return { why: `no program ${appSlug} builds carries the app itself and states a profile` }
  }
  const first = shipped[0]
  if (first === undefined) return { why: "unreachable" }
  return { shipped: first, hosting }
}

type Found = { readonly at: string } | { readonly why: string }

function shellOf(root: string, named: string, appSlug: string, kind: string): Found {
  const page = pathOf(root, "shell-script", slugOf(named))
  if (page === null) {
    return { why: `${appSlug} names the ${kind} ${named}, and no such page stands` }
  }
  const at = besideAt(page, "shell", "sh")
  return at === null ? { why: `no shell file can stand beside ${page}` } : { at }
}

type Staged = { readonly staging: Staging | null } | { readonly why: string }

function stagingOf(root: string, app: Value, appSlug: string): Staged {
  const named = textAt(app, "stageScript")
  const source = textAt(app, "spaSourcePath")
  if (named === null && source === null) return { staging: null }
  if (named === null) {
    return { why: `${appSlug} says where its site is built from and names no \`stage-script\`` }
  }
  if (source === null) {
    return { why: `${appSlug} names a \`stage-script\` and no \`spa-source-path\` to build from` }
  }
  const found = shellOf(root, named, appSlug, "stage script")
  if ("why" in found) return found
  return { staging: { scriptPath: found.at, sourcePath: source } }
}

export function planFor(root: string, appSlug: string): Planned {
  const appPath = pathOf(root, "ios-app", appSlug)
  if (appPath === null) return { refused: [`no ios-app page in akasha is slugged ${appSlug}`] }
  const app = valueAt(appPath, root)
  if (app === null) return { refused: [`${appPath} would not load, so nothing can be read off it`] }
  const named = textAt(app, "buildScript")
  if (named === null) {
    return {
      refused: [`${appSlug} states no \`build-script\`, so its page names nothing that builds it`],
    }
  }
  const staged = stagingOf(root, app, appSlug)
  if ("why" in staged) return { refused: [staged.why] }
  const built = shellOf(root, named, appSlug, "build script")
  if ("why" in built) return { refused: [built.why] }
  const programs = programsOf(root, app, appSlug)
  if ("why" in programs) return { refused: [programs.why] }
  const shellPath = dirname(appPath)
  const deliver = [shellPath, ...SHARED_PATHS]
  return {
    appSlug,
    shellPath,
    buildScriptPath: built.at,
    staging: staged.staging,
    deliverPaths: deliver,
    exports: exportsOf(app, programs.shipped, programs.hosting),
  }
}
