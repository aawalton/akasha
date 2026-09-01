import { existsSync, lstatSync, mkdirSync, rmSync, symlinkSync } from "node:fs"
import { dirname, join } from "node:path"
import { spelledIn } from "@akasha/code-system/code-specifier"
import { everyPath } from "@akasha/indexes"
import { counted } from "../../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../../calling/calling.module.code.ts"
import { answering } from "../../../calling/calling.module.code.ts"
import { baseOf } from "../../../landing/landing.module.code.ts"
import {
  bodyTextOf,
  respelledLanded,
  were,
} from "../refactor-landing/refactor-landing.module.code.ts"
import type { Spot } from "../type-renaming/type-renaming.module.code.ts"
import { splicedIn } from "../type-renaming/type-renaming.module.code.ts"

const PARTED_BY = "/"

const MANIFEST = "package.json"

const MODULES = "node_modules"

const INSTALL = "run `bun install` to settle the lockfile under the new name"

const CODE = [".ts", ".tsx"]

const QUOTED = /"([^"\\]*)"/g

const OUTSIDE =
  "the index carries `akasha/` alone, so a file outside it naming this package is left " +
  "unrespelled and was not looked for"

export type Packaging = {
  readonly was: string
  readonly now: string
  readonly at: string
  readonly folder: string
}

export type Asked = { readonly packaging: Packaging } | { readonly refused: string }

export function namedAs(spelt: string, was: string, now: string): string | null {
  if (spelt !== was && !spelt.startsWith(`${was}${PARTED_BY}`)) return null
  return `${now}${spelt.slice(was.length)}`
}

export function nameIn(text: string): string | null {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return null
  }
  if (read === null || typeof read !== "object") return null
  const named = (read as Record<string, unknown>).name
  return typeof named === "string" ? named : null
}

export function packagingFor(
  manifests: ReadonlyMap<string, string>,
  was: string,
  now: string
): Asked {
  if (was === now) return { refused: `\`${was}\` is the name it already carries` }
  let at: string | null = null
  for (const [path, text] of manifests) {
    const named = nameIn(text)
    if (named === now) return { refused: `\`${now}\` is the name ${path} already carries` }
    if (named === was) at = path
  }
  if (at === null) {
    return { refused: `no manifest under \`akasha/\` calls its package \`${was}\`` }
  }
  return { packaging: { was, now, at, folder: at.slice(0, -(MANIFEST.length + 1)) } }
}

export function bodyRespeltIn(path: string, text: string, was: string, now: string): string | null {
  const spots: (readonly [Spot, string])[] = []
  for (const one of spelledIn(path, text)) {
    const said = namedAs(one.text, was, now)
    if (said === null) continue
    spots.push([{ start: one.start, end: one.end }, JSON.stringify(said)])
  }
  return spots.length === 0 ? null : splicedIn(text, spots)
}

export function manifestRespeltIn(text: string, was: string, now: string): string | null {
  let found = false
  const next = text.replace(QUOTED, (whole, inner: string) => {
    const said = namedAs(inner, was, now)
    if (said === null) return whole
    found = true
    return JSON.stringify(said)
  })
  return found ? next : null
}

export function respeltIn(path: string, text: string, was: string, now: string): string | null {
  if (!text.includes(was)) return null
  if (path.endsWith(MANIFEST)) return manifestRespeltIn(text, was, now)
  if (!CODE.some((one) => path.endsWith(one))) return null
  return bodyRespeltIn(path, text, was, now)
}

export function renamingOver(
  one: Packaging,
  paths: readonly string[],
  textOf: (path: string) => string | null
): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const path of [...paths].sort()) {
    const text = textOf(path)
    if (text === null) continue
    const next = respeltIn(path, text, one.was, one.now)
    if (next !== null && next !== text) found.set(path, next)
  }
  return found
}

export function packageSaying(
  one: Packaging,
  said: ReadonlyMap<string, string>,
  dry: boolean
): readonly string[] {
  const paths = [...said.keys()].sort()
  const manifests = paths.filter((path) => path.endsWith(MANIFEST))
  const bodies = paths.length - manifests.length
  return [
    `\`${one.was}\` ${dry ? "would be renamed" : "was renamed"} to \`${one.now}\``,
    `${one.at} calls the package, and ${one.folder} stays where it is`,
    `${counted(manifests.length, "manifest")} and ${counted(bodies, "other file")} ` +
      `${were(paths.length, dry)} respelled`,
    ...(dry ? paths.map((path) => `  ${path}`) : []),
    OUTSIDE,
    ...(dry ? [] : [INSTALL]),
  ]
}

export function reachedAt(root: string, one: Packaging): string {
  return join(root, MODULES, ...one.now.split(PARTED_BY))
}

function alreadyAt(at: string): boolean {
  try {
    lstatSync(at)
    return true
  } catch {
    return existsSync(at)
  }
}

export function reachedFor(root: string, one: Packaging): (() => undefined) | null {
  const at = reachedAt(root, one)
  if (alreadyAt(at)) return null
  const parts = one.now.split(PARTED_BY)
  mkdirSync(dirname(at), { recursive: true })
  symlinkSync(`${"../".repeat(parts.length)}${one.folder}`, at)
  return () => {
    rmSync(at, { force: true })
  }
}

export function packageLanded(
  given: Given,
  root: string,
  from: string,
  to: string,
  dryRun: boolean,
  argv: readonly string[],
  flags: readonly string[]
): Answer {
  const bodyText = bodyTextOf(root, baseOf(root))
  const paths = everyPath(root)
  const manifests = new Map<string, string>()
  for (const path of paths) {
    if (!path.endsWith(MANIFEST)) continue
    const text = bodyText(path)
    if (text !== null) manifests.set(path, text)
  }
  const asked = packagingFor(manifests, from, to)
  if ("refused" in asked) return answering([], [asked.refused], 1)
  const said = renamingOver(asked.packaging, paths, bodyText)
  const undo = reachedFor(root, asked.packaging)
  const clear = (): undefined => {
    if (undo !== null) undo()
  }
  try {
    const landing = respelledLanded(
      given,
      root,
      said,
      `rename the package \`${from}\` to \`${to}\``,
      (dry) => packageSaying(asked.packaging, said, dry),
      dryRun,
      argv,
      flags
    )
    if (dryRun || landing.code !== 0) clear()
    return landing
  } catch (thrown) {
    clear()
    throw thrown
  }
}
