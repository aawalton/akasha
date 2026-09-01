import { dirname } from "node:path"
import {
  indexStanding,
  listedAt,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { besideAt } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import {
  slugOf,
  textAt,
  type Value,
  valueAt,
} from "../../../pages-system/page/page-value/page-value.module.code.ts"

export const SHARED_PATHS: readonly string[] = [
  "akasha/code-system/ios-app/shell-scripts",
  "akasha/code-system/ios-component/ios-components",
  "akasha/code-system/ios-program/ios-programs",
]

const PROGRAM = "ios-program/"

const COMPONENT = "ios-component/"

const SUFFIX = ".ios-component.swift.swift"

export type Plan = {
  readonly appSlug: string
  readonly shellPath: string
  readonly buildScriptPath: string
  readonly deliverPaths: readonly string[]
  readonly exports: readonly string[]
}

export type Planned = Plan | { readonly refused: readonly string[] }

function quoted(value: string): string {
  return `'${value.replaceAll("'", "'\\''")}'`
}

function listAt(value: Value, key: string): readonly string[] {
  const held = value[key]
  return Array.isArray(held) ? held.filter((one) => typeof one === "string") : []
}

function pathOf(root: string, typeSlug: string, slug: string): string | null {
  if (!indexStanding(root)) return null
  const standing = listedAt(root, typeSlug, slug)
  return standing.length === 1 ? (standing[0]?.path ?? null) : null
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
  const scriptPage = pathOf(root, "shell-script", slugOf(named))
  if (scriptPage === null) {
    return { refused: [`${appSlug} names the build script ${named}, and no such page stands`] }
  }
  const buildScriptPath = besideAt(scriptPage, "shell", "sh")
  if (buildScriptPath === null) {
    return { refused: [`no shell file can stand beside ${scriptPage}`] }
  }
  const programs = programsOf(root, app, appSlug)
  if ("why" in programs) return { refused: [programs.why] }
  const shellPath = dirname(appPath)
  const icon = textAt(app, "iconPath")
  const deliver = [shellPath, ...SHARED_PATHS]
  if (icon !== null) deliver.push(dirname(icon))
  return {
    appSlug,
    shellPath,
    buildScriptPath,
    deliverPaths: deliver,
    exports: exportsOf(app, programs.shipped, programs.hosting),
  }
}
