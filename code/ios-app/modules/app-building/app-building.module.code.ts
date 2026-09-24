import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { sharedBuildFiles } from "akasha/code/ios-app/modules/shared-build-files/shared-build-files.module.code.ts"
import { quoted } from "akasha/code/shell/modules/quoting/quoting.module.code.ts"
import {
  indexThere,
  listedAt,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { z } from "zod"

const COMPONENT = "ios-component/"

const SUFFIX = ".ios-component.swift.swift"

const MANIFEST = "package.json"

export type Ranged = Readonly<Record<string, string>>

const MANIFEST_RANGES = z.object({
  dependencies: z.record(z.string(), z.string()).optional(),
  devDependencies: z.record(z.string(), z.string()).optional(),
})

export type Plan = {
  readonly appSlug: string
  readonly shellPath: string
  readonly buildScriptPath: string
  readonly syncScriptPath: string
  readonly dependencies: Ranged
  readonly deliverPaths: readonly string[]
  readonly deliverFiles: readonly string[]
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
  return listAt(program, "components")
    .map((one) => slugOf(one.startsWith(COMPONENT) ? one : `${COMPONENT}${one}`))
    .map((slug) => `${slug}/${slug}${SUFFIX}`)
    .join(" ")
}

function exportsOf(app: Value, shipped: Value): readonly string[] {
  const bundleId = textAt(app, "bundleId") ?? ""
  const team = textAt(app, "developmentTeam") ?? ""
  const said: [string, string][] = [
    ["NATIVE_SHELL_BUNDLE_ID", bundleId],
    ["NATIVE_SHELL_DISPLAY_NAME", textAt(app, "displayName") ?? ""],
    ["NATIVE_SHELL_MARKETING_VERSION", textAt(app, "marketingVersion") ?? ""],
    ["NATIVE_SHELL_DEVELOPMENT_TEAM", team],
    ["NATIVE_SHELL_WIDGET_BUNDLE_ID", textAt(app, "widgetBundleId") ?? ""],
    ["NATIVE_SHELL_APP_PROFILE_NAME", textAt(app, "appProfileName") ?? ""],
    ["NATIVE_SHELL_WIDGET_PROFILE_NAME", textAt(app, "widgetProfileName") ?? ""],
    ["NATIVE_SHELL_KEYCHAIN_ACCESS_GROUP", `${team}.${bundleId}`],
    ["NATIVE_SHELL_DEVICE_SECRET_SERVICE", `${bundleId}.device-secret`],
    ["NATIVE_SHELL_WIDGET_NAME", textAt(shipped, "targetName") ?? ""],
    ["NATIVE_SHELL_COMPONENTS", componentsOf(shipped)],
  ]
  return said.map(([name, value]) => `export ${name}=${quoted(value)}`)
}

type Shipped = { readonly shipped: Value } | { readonly why: string }

function shippedOf(root: string, app: Value, appSlug: string): Shipped {
  const shipped: Value[] = []
  for (const one of listAt(app, "programs")) {
    const page = pageOf(root, "ios-program", slugOf(one))
    if (page !== null && textAt(page, "targetName") !== null) shipped.push(page)
  }
  const [first, second] = shipped
  if (first === undefined) {
    return {
      why: `no program ${appSlug} builds states a target of its own, so nothing says what is shipped inside it`,
    }
  }
  if (second !== undefined) {
    const among = shipped.map((one) => textAt(one, "slug") ?? "?").join(", ")
    return {
      why: `${among} each state a target of their own, so which is shipped inside is unclear`,
    }
  }
  return { shipped: first }
}

type Found = { readonly at: string } | { readonly why: string }

function shellOf(root: string, named: string, appSlug: string, kind: string): Found {
  const page = pathOf(root, "shell-script", slugOf(named))
  if (page === null) {
    return { why: `${appSlug} names the ${kind} ${named}, and no such page exists` }
  }
  const at = besideAt(page, "shell", "sh")
  return at === null ? { why: `no shell file can sit beside ${page}` } : { at }
}

type Ranging = { readonly ranges: Ranged } | { readonly why: string }

function dependenciesOf(root: string, app: Value, appSlug: string): Ranging {
  const named = listAt(app, "toolReached")
  const held = MANIFEST_RANGES.parse(JSON.parse(readFileSync(join(root, MANIFEST), "utf8")))
  const stated: Ranged = { ...held.dependencies, ...held.devDependencies }
  const ranges: Record<string, string> = {}
  const missing: string[] = []
  for (const one of named) {
    const range = stated[one]
    if (range === undefined) missing.push(one)
    else ranges[one] = range
  }
  if (missing.length > 0) {
    return {
      why: `${appSlug} reaches ${missing.join(", ")} and the akasha manifest states no range for any of them`,
    }
  }
  return { ranges }
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
  const built = shellOf(root, named, appSlug, "build script")
  if ("why" in built) return { refused: [built.why] }
  const syncing = textAt(app, "syncScript")
  if (syncing === null) {
    return {
      refused: [
        `${appSlug} states no \`sync-script\`, so its page names nothing making its native sources`,
      ],
    }
  }
  const synced = shellOf(root, syncing, appSlug, "sync script")
  if ("why" in synced) return { refused: [synced.why] }
  const ranged = dependenciesOf(root, app, appSlug)
  if ("why" in ranged) return { refused: [ranged.why] }
  const programs = shippedOf(root, app, appSlug)
  if ("why" in programs) return { refused: [programs.why] }
  const shared = sharedBuildFiles(root)
  if ("why" in shared) return { refused: [shared.why] }
  const shellPath = dirname(appPath)
  return {
    appSlug,
    shellPath,
    buildScriptPath: built.at,
    syncScriptPath: synced.at,
    dependencies: ranged.ranges,
    deliverPaths: [shellPath],
    deliverFiles: shared.files,
    exports: exportsOf(app, programs.shipped),
  }
}
