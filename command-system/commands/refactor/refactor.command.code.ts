import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import { compiled, readingOf, typed, typingOver } from "@akasha/code-system/code-typing"
import { reachingInto } from "@akasha/graph/graph-asking"
import { importEdge } from "@akasha/graph/import-edge"
import { everyPath, listedAt, readingIn } from "@akasha/indexes"
import { uncommittedNamed } from "@akasha/pages-system/page-file-name"
import { shadowAt } from "@akasha/pages-system/shadow"
import type { Asked } from "../../asking/asking.module.code.ts"
import { counted, landingAsked, textOf } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { answering } from "../../calling/calling.module.code.ts"
import { bodyAt } from "../../commit-reading/commit-reading.module.code.ts"
import type { FileCarry, FileEdit } from "../../landing/landing.module.code.ts"
import { baseOf } from "../../landing/landing.module.code.ts"
import type { Carry as Reading } from "../../reading/reading.module.code.ts"
import { blobIdOf, carryReadings } from "../../reading/reading.module.code.ts"
import { move } from "../move/move.command.code.ts"
import { importingOf, spellingOf } from "../move/naming/move-naming.module.code.ts"
import { repointed } from "../move/repointing/move-repointing.module.code.ts"
import { glassIn, messageIn } from "../write/write.command.code.ts"
import {
  AT,
  FROM,
  flagsIn,
  IN_STRINGS,
  PLURAL,
  TO,
  VALUED,
} from "./arguing/refactor-arguing.module.code.ts"
import type { Keying, Respelling } from "./key-respelling/key-respelling.module.code.ts"
import { keyingFor, respellingFor } from "./key-respelling/key-respelling.module.code.ts"
import { bodyTextOf, respelledLanded, were } from "./landing/refactor-landing.module.code.ts"
import { packageLanded } from "./package-renaming/package-renaming.module.code.ts"
import { pairFor, passedOn } from "./slug-renaming/slug-renaming.module.code.ts"
import type { Tokening } from "./token-renaming/token-renaming.module.code.ts"
import {
  bindingFor,
  LINE,
  tokeningFor,
  tokenSaying,
} from "./token-renaming/token-renaming.module.code.ts"
import type { Carry, Renaming } from "./type-renaming/type-renaming.module.code.ts"
import {
  carriesFor,
  pagesOf,
  renamingFor,
  restated,
  splicedIn,
} from "./type-renaming/type-renaming.module.code.ts"
import type { Bindings, Spelling } from "./type-respelling/type-respelling.module.code.ts"
import {
  bindingsOver,
  namesStill,
  pathRespelled,
  respelled,
  spellingOver,
} from "./type-respelling/type-respelling.module.code.ts"

const RENAME = "rename"

const PAGE_TYPE = "page-type"

const PAGE_SLUG = "page-slug"

const PROPERTY_SLUG = "property-slug"

const TOKEN = "token"

const PACKAGE = "package"

const BYTES = new TextEncoder()

const LEFT = 12

const IMPORT = importEdge.slug

type Rewriting = {
  readonly one: Renaming
  readonly moved: ReadonlyMap<string, string>
  readonly spelling: Spelling
  readonly pages: ReadonlySet<string>
  readonly bindings: Bindings
}

function rewritten(held: Rewriting, from: string, to: string, text: string): string {
  const one = held.one
  const own = from === one.path
  let next = text
  const bound = held.bindings.get(from)
  if (bound !== undefined) next = splicedIn(next, bound)
  const spelled = held.spelling.get(from)
  if (spelled !== undefined) next = respelled(from, next, spelled.said, spelled.keys)
  const said = own
    ? new Map([
        ["slug", one.now],
        ["pluralSlug", one.plural],
      ])
    : held.pages.has(from)
      ? new Map([["pageTypeSlug", one.now]])
      : null
  if (said !== null) {
    const stated = restated(from, next, said, own ? one.now : null)
    if (stated !== null) next = stated
  }
  const done = repointed(from, to, next, held.moved)
  return pathRespelled(to, done, one.was, one.now) ?? done
}

function saying(
  one: Renaming,
  carries: readonly Carry[],
  repointing: readonly string[],
  pages: number,
  left: readonly string[],
  dry: boolean
): readonly string[] {
  return [
    `\`${one.was}\` ${dry ? "would be renamed" : "was renamed"} to \`${one.now}\`, ` +
      `and its plural to \`${one.plural}\``,
    `${one.path} states it, and ${counted(pages, "page")} ${pages === 1 ? "is" : "are"} of it`,
    ...(dry ? carries.map((held) => `  ${held.from} -> ${held.to}`) : []),
    `${counted(carries.length, "file")} ${were(carries.length, dry)} carried`,
    repointing.length === 0
      ? "no file naming it needed repointing"
      : `${counted(repointing.length, "file")} naming it ${were(repointing.length, dry)} repointed`,
    left.length === 0
      ? "nothing in the pages still names it"
      : `${counted(left.length, "place")} naming it ${left.length === 1 ? "stands" : "stand"} unchanged`,
    ...left.slice(0, LEFT),
    ...(left.length > LEFT ? [`  and ${left.length - LEFT} more`] : []),
  ]
}

function unread(path: string, why: string): Answer {
  return answering([], [`${path} ${why}`], 2)
}

export async function landed(
  given: Given,
  root: string,
  one: Renaming,
  dryRun: boolean,
  argv: readonly string[]
): Promise<Answer> {
  const base = baseOf(root)
  const bodyText = bodyTextOf(root, base)
  const onDisk = (path: string): boolean => existsSync(join(root, path))
  const carries = carriesFor(root, one, onDisk)
  const moved = new Map<string, string>(carries.map((held) => [held.from, held.to]))
  const typing = typingOver(root, everyPath(root).filter(compiled), readingOf(root, bodyText))
  const held: Rewriting = {
    one,
    moved,
    spelling: spellingOver(root, one, bodyText),
    pages: new Set(pagesOf(root, one)),
    bindings: bindingsOver(typing, root, one),
  }
  const reading = importingOf(root, moved)
  if ("unread" in reading) return answering([], [reading.unread], 2)
  const naming = new Set<string>(reading.importers)
  for (const path of held.spelling.keys()) naming.add(path)
  for (const path of spellingOf(root, base, moved, naming)) naming.add(path)
  const left: string[] = []
  const noting = (path: string, said: string): undefined => {
    for (const line of namesStill(said, one.was)) left.push(`  ${path}:${line}`)
  }
  const bodies = new Map<string, Uint8Array>()
  for (const path of everyPath(root)) {
    if (moved.has(path) || !onDisk(path)) continue
    if (namesStill(path, one.was).length > 0) left.push(`  ${path} — its own path`)
    if (!typed(path)) continue
    const bytes = bodyAt(root, base, path)
    const text = bytes === null ? null : textOf(bytes)
    if (bytes === null || text === null || !text.includes(one.was)) continue
    bodies.set(path, bytes)
    naming.add(path)
  }
  const changes: FileEdit[] = []
  const readings: Reading[] = []
  const moving: FileCarry[] = []
  for (const carry of carries) {
    if (uncommittedNamed(carry.from)) {
      moving.push({ from: carry.from, to: carry.to })
      continue
    }
    const bytes = bodyAt(root, base, carry.from)
    if (bytes === null) return unread(carry.from, `stands in no commit at \`${base}\``)
    readings.push({ was: carry.from, now: carry.to, from: blobIdOf(bytes) })
    changes.push({ path: carry.from, body: null })
    if (!typed(carry.from)) {
      changes.push({ path: carry.to, body: bytes, carried: true })
      continue
    }
    const text = textOf(bytes)
    if (text === null) return unread(carry.from, `is TypeScript and its bytes are not utf-8`)
    const said = rewritten(held, carry.from, carry.to, text)
    noting(carry.to, said)
    changes.push({ path: carry.to, body: BYTES.encode(said), carried: true })
  }
  const repointing: string[] = []
  for (const path of [...naming].sort()) {
    if (!typed(path) || moved.has(path)) continue
    const bytes = bodies.get(path) ?? bodyAt(root, base, path)
    if (bytes === null) continue
    const text = textOf(bytes)
    if (text === null) return unread(path, `names what moved and its bytes are not utf-8`)
    const next = rewritten(held, path, path, text)
    noting(path, next)
    if (next === text) continue
    repointing.push(path)
    readings.push({ was: path, now: path, from: blobIdOf(bytes) })
    changes.push({ path, body: BYTES.encode(next), carried: true })
  }
  const glass = glassIn(argv, VALUED)
  if ("refusals" in glass) return answering([], glass.refusals, 1)
  const message = messageIn(argv, VALUED)
  if ("refusals" in message) return answering([], message.refusals, 1)
  const pages = held.pages.size
  left.sort()
  const asked: Asked = {
    changes,
    message: message.message ?? `rename the page type \`${one.was}\` to \`${one.now}\``,
    dryRun,
    glass: glass.glass,
    unmoved: [],
    read: base,
    carries: moving,
    saying: () => saying(one, carries, repointing, pages, left, false),
  }
  const landing = await landingAsked({ ...given, root }, asked)
  if (!dryRun) {
    if (landing.code === 0) carryReadings(root, readings)
    return landing
  }
  return answering(
    [...saying(one, carries, repointing, pages, left, true), ...landing.report],
    landing.refusals,
    landing.code
  )
}

function keySaying(one: Keying, respelling: Respelling, dry: boolean): readonly string[] {
  const paths = [...respelling.changes.keys()].sort()
  const pages = respelling.pages.length
  const types = respelling.declarers.length
  return [
    `\`${one.named}\` ${dry ? "would be read" : "is read"} by \`${one.nowKey}\` ` +
      `rather than \`${one.wasKey}\``,
    `${one.path} states the key, and its slug \`${one.was}\` does not move`,
    `${counted(types, "type")} ${types === 1 ? "declares" : "declare"} it`,
    ...respelling.declarers.map((path) => `  ${path}`),
    `${counted(pages, "page")} ${pages === 1 ? "states" : "state"} it`,
    `${counted(paths.length, "file")} ${were(paths.length, dry)} respelled`,
    ...(dry ? paths.map((path) => `  ${path}`) : []),
  ]
}

export async function keyLanded(
  given: Given,
  root: string,
  one: Keying,
  dryRun: boolean,
  argv: readonly string[]
): Promise<Answer> {
  const made = respellingFor(root, readingIn(root), one, bodyTextOf(root, baseOf(root)))
  if ("refused" in made) return answering([], [made.refused], 1)
  return await respelledLanded(
    given,
    root,
    made.respelling.changes,
    `read \`${one.named}\` by \`${one.nowKey}\` rather than \`${one.wasKey}\``,
    (dry) => keySaying(one, made.respelling, dry),
    dryRun,
    argv,
    VALUED
  )
}

export async function tokenLanded(
  given: Given,
  root: string,
  one: Tokening,
  dryRun: boolean,
  argv: readonly string[],
  inStrings: boolean
): Promise<Answer> {
  const every = everyPath(root).filter(compiled)
  const reached = reachingInto([one.path], [IMPORT], shadowAt(root).index, compiled)
  const made = bindingFor(
    root,
    { typed: reached, every, inStrings },
    one,
    bodyTextOf(root, baseOf(root))
  )
  if ("refused" in made) return answering([], [made.refused], 1)
  return await respelledLanded(
    given,
    root,
    made.binding.changes,
    `rename \`${one.was}\` to \`${one.now}\``,
    (dry) => tokenSaying(one, made.binding, dry),
    dryRun,
    argv,
    VALUED
  )
}

export async function refactor(argv: readonly string[], given: Given): Promise<Answer> {
  const [act, namespace, ...rest] = argv
  if (act === undefined) {
    return answering(
      [],
      [`this takes an act, and none was named — say \`${RENAME} ${PAGE_TYPE}\``],
      1
    )
  }
  if (act !== RENAME) {
    return answering([], [`\`${act}\` is no act this carries — it carries \`${RENAME}\``], 1)
  }
  if (
    namespace !== PAGE_TYPE &&
    namespace !== PAGE_SLUG &&
    namespace !== PROPERTY_SLUG &&
    namespace !== TOKEN &&
    namespace !== PACKAGE
  ) {
    const said = namespace === undefined ? "none was named" : `\`${namespace}\` is not one of them`
    return answering(
      [],
      [
        `${RENAME} names the namespace it is worked over, and ${said} — ` +
          `it carries \`${PAGE_TYPE}\`, \`${PAGE_SLUG}\`, \`${PROPERTY_SLUG}\`, \`${TOKEN}\` ` +
          `and \`${PACKAGE}\``,
      ],
      1
    )
  }
  const read = flagsIn(rest)
  if ("refused" in read) return answering([], [read.refused], 1)
  const only = read.inStrings ? IN_STRINGS : read.said.has(LINE) ? LINE : null
  if (only !== null && namespace !== TOKEN) {
    return answering([], [`only a name rename takes ${only}`], 1)
  }
  const from = read.said.get(FROM)
  const to = read.said.get(TO)
  const root = resolve(given.root)
  if (namespace === TOKEN) {
    const at = read.said.get(AT)
    if (from === undefined || to === undefined || at === undefined) {
      const said = `a name rename takes ${AT}, ${FROM} and ${TO}, and one of them was not said`
      return answering([], [said], 1)
    }
    const asked = tokeningFor(at, from, to, read.said.get(LINE))
    if ("refused" in asked) return answering([], [asked.refused], 1)
    return await tokenLanded(given, root, asked.tokening, read.dryRun, argv, read.inStrings)
  }
  if (namespace === PACKAGE) {
    if (from === undefined || to === undefined) {
      const said = `a package rename takes ${FROM} and ${TO}, and one of them was not said`
      return answering([], [said], 1)
    }
    if (read.said.has(PLURAL)) {
      return answering([], [`${PLURAL} names a page type's plural, and a package carries none`], 1)
    }
    return await packageLanded(given, root, from, to, read.dryRun, argv, VALUED)
  }
  if (namespace === PAGE_SLUG) {
    if (from === undefined || to === undefined) {
      const said = `a page slug rename takes ${FROM} and ${TO}, and one of them was not said`
      return answering([], [said], 1)
    }
    if (read.said.has(PLURAL)) {
      return answering([], [`${PLURAL} names a page type's plural, and a page carries none`], 1)
    }
    const asked = pairFor(from, to, (slug, said) => listedAt(root, slug, said))
    if ("refused" in asked) return answering([], [asked.refused], 1)
    return await move(passedOn(asked.pair, to, rest), given)
  }
  if (namespace === PROPERTY_SLUG) {
    if (from === undefined || to === undefined) {
      return answering(
        [],
        [`a property key rename takes ${FROM} and ${TO}, and one of them was not said`],
        1
      )
    }
    if (read.said.has(PLURAL)) {
      return answering([], [`${PLURAL} names a page type's plural, and a key carries none`], 1)
    }
    const keyed = keyingFor(readingIn(root), from, to)
    if ("refused" in keyed) return answering([], [keyed.refused], 1)
    return await keyLanded(given, root, keyed.keying, read.dryRun, argv)
  }
  const plural = read.said.get(PLURAL)
  if (from === undefined || to === undefined || plural === undefined) {
    return answering(
      [],
      [`a page type rename takes ${FROM}, ${TO} and ${PLURAL}, and one of them was not said`],
      1
    )
  }
  const base = baseOf(root)
  const asked = renamingFor(root, from, to, plural, bodyTextOf(root, base))
  if ("refused" in asked) return answering([], [asked.refused], 1)
  return await landed(given, root, asked.renaming, read.dryRun, argv)
}
