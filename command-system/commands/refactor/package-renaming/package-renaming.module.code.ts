import { spelledIn } from "@akasha/code-system/code-specifier"
import { everyPath } from "@akasha/indexes"
import type { Held } from "../../../asking/asking.module.code.ts"
import { counted, landedMechanically, landingAsked } from "../../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../../calling/calling.module.code.ts"
import { answering } from "../../../calling/calling.module.code.ts"
import { bodyAt } from "../../../commit-reading/commit-reading.module.code.ts"
import type { FileEdit } from "../../../landing/landing.module.code.ts"
import { baseOf } from "../../../landing/landing.module.code.ts"
import {
  namedTracked,
  respeltNames,
  spelledRespelt,
} from "../../../outside-naming/outside-naming.module.code.ts"
import { nameIn, reachedOver } from "../../../package-linking/package-linking.module.code.ts"
import { glassIn, messageIn } from "../../write/write.command.code.ts"
import { bodyTextOf } from "../landing/refactor-landing.module.code.ts"
import {
  aliasAddedIn,
  aliasDroppedIn,
  batchIn,
  namesIn,
  phaseOf,
} from "../package-phasing/package-phasing.module.code.ts"
import type { Spot } from "../type-renaming/type-renaming.module.code.ts"
import { splicedIn } from "../type-renaming/type-renaming.module.code.ts"

const PARTED_BY = "/"

const MANIFEST = "package.json"

const LOCK = "bun.lock"

const INSTALL = "run `bun install` to settle the lockfile under the new name"

const CODE = [".ts", ".tsx"]

const QUOTED = /"([^"\\]*)"/g

const BYTES = new TextEncoder()

const WIDTH = 200

const OUTSIDE =
  "a file the index does not carry is found by searching what git tracks, so a file naming this " +
  "package is respelled whether or not the index knows it"

export type Packaging = {
  readonly was: string
  readonly now: string
  readonly at: string
  readonly folder: string
}

export type Asked = { readonly packaging: Packaging } | { readonly refused: string }

export type Outside = { readonly said: ReadonlyMap<string, string> } | { readonly refusal: string }

export function namedAs(spelt: string, was: string, now: string): string | null {
  if (spelt !== was && !spelt.startsWith(`${was}${PARTED_BY}`)) return null
  return `${now}${spelt.slice(was.length)}`
}

export function manifestAt(path: string): boolean {
  return path === MANIFEST || path.endsWith(`${PARTED_BY}${MANIFEST}`)
}

export function folderOf(at: string): string {
  return at === MANIFEST ? "" : at.slice(0, -(MANIFEST.length + 1))
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
    return { refused: `no manifest calls its package \`${was}\`` }
  }
  return { packaging: { was, now, at, folder: folderOf(at) } }
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
  if (manifestAt(path)) return manifestRespeltIn(text, was, now)
  if (!CODE.some((one) => path.endsWith(one))) return null
  return bodyRespeltIn(path, text, was, now)
}

export function packageRespelt(text: string, was: string, now: string): string {
  return respeltNames(text, new Map([[was, now]]))
}

export function outsidePackage(
  root: string,
  base: string,
  one: Packaging,
  already: ReadonlySet<string>
): Outside {
  const found = spelledRespelt(
    root,
    base,
    [one.was],
    (_path, text) => packageRespelt(text, one.was, one.now),
    already
  )
  if ("refusal" in found) return found
  return { said: new Map(found.respelt.map((held) => [held.path, held.text])) }
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

export function bodiesNaming(
  root: string,
  base: string,
  one: Packaging,
  paths: readonly string[],
  textOf: (path: string) => string | null
): Outside {
  const carried = paths.filter((path) => !manifestAt(path))
  const inside = renamingOver(one, carried, textOf)
  const outside = outsidePackage(root, base, one, new Set(inside.keys()))
  if ("refusal" in outside) return outside
  const said = new Map(inside)
  for (const [path, text] of outside.said) {
    if (manifestAt(path) || path === LOCK) continue
    said.set(path, text)
  }
  return { said }
}

function editsFor(
  said: ReadonlyMap<string, string>,
  paths: readonly string[]
): readonly FileEdit[] {
  return paths.map((path) => ({ path, body: BYTES.encode(String(said.get(path))) }))
}

async function expandLanded(
  given: Given,
  root: string,
  one: Packaging,
  manifests: ReadonlyMap<string, string>,
  dryRun: boolean
): Promise<Answer> {
  const said = new Map<string, string>()
  for (const [path, text] of manifests) {
    const next = manifestRespeltIn(text, one.was, one.now)
    if (next !== null && next !== text) said.set(path, next)
  }
  const held = said.get(MANIFEST) ?? manifests.get(MANIFEST) ?? null
  if (held === null) return answering([], [`${MANIFEST} carries no body at the root`], 2)
  const aliased = aliasAddedIn(held, one.was, one.now)
  if (aliased === null) {
    return answering([], [`${MANIFEST} names no dependencies for the alias to sit among`], 1)
  }
  said.set(MANIFEST, aliased)
  const report = [
    `\`${one.was}\` ${dryRun ? "would be renamed" : "was renamed"} to \`${one.now}\``,
    `${counted(said.size, "manifest")} ${dryRun ? "would be" : "were"} respelled`,
    `\`${one.was}\` is aliased at ${MANIFEST} so every file naming it still resolves`,
    ...(dryRun ? [...said.keys()].sort().map((path) => `  ${path}`) : [INSTALL]),
  ]
  if (dryRun) return answering(report, [], 0)
  const landing = await landedMechanically(
    root,
    given.calledAs,
    editsFor(said, [...said.keys()].sort()),
    `rename the package \`${one.was}\` to \`${one.now}\` and alias the old name`,
    [],
    given.agentId
  )
  return answering([...report, ...landing.report], landing.refusals, landing.code)
}

async function contractLanded(
  given: Given,
  root: string,
  base: string,
  one: Packaging,
  held: string,
  dryRun: boolean,
  argv: readonly string[],
  flags: readonly string[]
): Promise<Answer> {
  const dropped = aliasDroppedIn(held, one.was)
  if (dropped === null) {
    return answering([`no file names \`${one.was}\` and no alias is left to take away`], [], 0)
  }
  const found = namedTracked(root, base, [one.now])
  if ("refusal" in found) return answering([], [found.refusal], 1)
  const unmoved: Held[] = []
  for (const path of found.paths) {
    const bytes = bodyAt(root, base, path)
    if (bytes !== null) unmoved.push({ path, was: bytes })
  }
  const report = [
    `no file names \`${one.was}\`, so the alias ${dryRun ? "would be" : "was"} taken away`,
    `${counted(unmoved.length, "path")} naming \`${one.now}\` ${dryRun ? "would be" : "were"} judged`,
  ]
  const glass = glassIn(argv, flags)
  if ("refusals" in glass) return answering([], glass.refusals, 1)
  const asked = messageIn(argv, flags)
  if ("refusals" in asked) return answering([], asked.refusals, 1)
  const landing = await landingAsked(
    { ...given, root },
    {
      changes: [{ path: MANIFEST, body: BYTES.encode(dropped) }],
      message: asked.message ?? `take the alias for \`${one.was}\` away`,
      dryRun,
      glass: glass.glass,
      unmoved,
      read: base,
      saying: () => report,
    }
  )
  return answering([...report, ...landing.report], landing.refusals, landing.code)
}

async function migrateLanded(
  given: Given,
  root: string,
  base: string,
  one: Packaging,
  held: string,
  width: number,
  dryRun: boolean,
  argv: readonly string[],
  flags: readonly string[]
): Promise<Answer> {
  const bodyText = bodyTextOf(root, base)
  const found = bodiesNaming(root, base, one, everyPath(root), bodyText)
  if ("refusal" in found) return answering([], [found.refusal], 1)
  if (found.said.size === 0) {
    return await contractLanded(given, root, base, one, held, dryRun, argv, flags)
  }
  const batch = batchIn([...found.said.keys()], width)
  const report = [
    `${counted(found.said.size, "file")} still name \`${one.was}\``,
    `${counted(batch.length, "file")} ${dryRun ? "would be" : "were"} respelled in this batch`,
    OUTSIDE,
    ...(dryRun ? batch.map((path) => `  ${path}`) : []),
  ]
  if (dryRun) return answering(report, [], 0)
  const landing = await landedMechanically(
    root,
    given.calledAs,
    editsFor(found.said, batch),
    `respell ${counted(batch.length, "file")} naming \`${one.was}\` as \`${one.now}\``,
    [],
    given.agentId
  )
  return answering([...report, ...landing.report], landing.refusals, landing.code)
}

export async function packageLanded(
  given: Given,
  root: string,
  from: string,
  to: string,
  dryRun: boolean,
  argv: readonly string[],
  flags: readonly string[],
  width: number = WIDTH
): Promise<Answer> {
  const base = baseOf(root)
  const bodyText = bodyTextOf(root, base)
  const manifests = new Map<string, string>()
  for (const path of everyPath(root)) {
    if (!manifestAt(path)) continue
    const text = bodyText(path)
    if (text !== null) manifests.set(path, text)
  }
  const held = manifests.get(MANIFEST)
  if (held === undefined) return answering([], [`${MANIFEST} carries no body at the root`], 2)
  const phasing = phaseOf(namesIn(manifests), held, from, to)
  if ("refused" in phasing) return answering([], [phasing.refused], 1)
  const one: Packaging = { was: from, now: to, at: phasing.at, folder: folderOf(phasing.at) }
  if (phasing.phase === "done") {
    return answering([`\`${from}\` is renamed to \`${to}\` and no alias is left`], [], 0)
  }
  const clear = reachedOver(root, [{ name: to, folder: one.folder }])
  try {
    const landing =
      phasing.phase === "expand"
        ? await expandLanded(given, root, one, manifests, dryRun)
        : await migrateLanded(given, root, base, one, held, width, dryRun, argv, flags)
    if (dryRun || landing.code !== 0) clear()
    return landing
  } catch (thrown) {
    clear()
    throw thrown
  }
}
