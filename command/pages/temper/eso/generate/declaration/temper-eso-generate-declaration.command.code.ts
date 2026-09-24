import { readFileSync, realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileCode } from "akasha/change/mechanical/file/add/add-file-code/add-file-code.change-mechanical.ts"
import { addFilePage } from "akasha/change/mechanical/file/add/add-file-page/add-file-page.change-mechanical.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFilePage } from "akasha/change/mechanical/file/remove/remove-file-page/remove-file-page.change-mechanical-file.ts"
import { addPropertyValue } from "akasha/change/mechanical/file-content/add/add-property-value/add-property-value.change-mechanical-file-content.ts"
import { changeFileContentPage } from "akasha/change/mechanical/file-content/change/change-file-content-page/change-file-content-page.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Asking,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { CEILING } from "akasha/check/code/pages/file-length/modules/length-ceiling/length-ceiling.module.code.ts"
import {
  keyOf,
  mergedBy,
  type Stated,
  statedIn,
} from "akasha/check/code/pages/global-declared-once/global-declared-once.check-code.decision.code.ts"
import { formattedBody } from "akasha/code/running/modules/code-format/code-format.module.code.ts"
import { codeRoot as codeRootArgument } from "akasha/command/argument/pages/code-root.argument.ts"
import {
  DATA,
  keeping,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  answeredByPage,
  type Generating,
  type Taking,
} from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperEsoGenerateDeclaration as page } from "akasha/command/pages/temper/eso/generate/declaration/temper-eso-generate-declaration.command.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { saidShort } from "akasha/temper/command/modules/flag-fault-stage/flag-fault-stage.module.code.ts"
import {
  assigned,
  type Group,
  pagedBy,
  slugsFor,
  spilled,
} from "akasha/temper/eso/declaration/modules/eso-declaration-chunking/eso-declaration-chunking.module.code.ts"
import {
  compilerNames,
  narrowed,
} from "akasha/temper/eso/declaration/modules/eso-declaration-narrowing/eso-declaration-narrowing.module.code.ts"
import {
  AMBIENT_KEY,
  AMBIENT_KIND,
  DECLARATION,
  namingOf,
  pageBodyFor,
  pagesWrittenBy,
  stampRestated,
} from "akasha/temper/eso/declaration/modules/eso-declaration-pages/eso-declaration-pages.module.code.ts"
import {
  enumGroups,
  eventGroups,
  functionGroups,
  objectGroups,
} from "akasha/temper/eso/declaration/modules/eso-declaration-text/eso-declaration-text.module.code.ts"
import {
  parseEnums,
  parseEvents,
  parseFunctions,
  parseObjects,
  typeFaultIn,
} from "akasha/temper/eso/declaration/modules/eso-doc-tokens/eso-doc-tokens.module.code.ts"
import { ESO_OPT_IN } from "akasha/temper/eso/declaration/modules/eso-opt-in/eso-opt-in.module.code.ts"
import {
  type SelectedTokens,
  selectOptIn,
} from "akasha/temper/eso/declaration/modules/eso-token-scope/eso-token-scope.module.code.ts"
import { parseEsoDocApiVersion } from "akasha/temper/eso/path/modules/eso-clone-stamp/eso-clone-stamp.module.code.ts"
import { esouiDocPath } from "akasha/temper/eso/path/modules/eso-paths/eso-paths.module.code.ts"

const NAMED = [codeRootArgument]

const PUT = `${changeMechanical.slug}/${addFileCode.slug}` as const

const MAKE = `${changeMechanical.slug}/${addFilePage.slug}` as const

const DROP = `${changeMechanicalFile.slug}/${removeFilePage.slug}` as const

const NAME = `${changeMechanicalFileContent.slug}/${addPropertyValue.slug}` as const

const STAMP = `${changeMechanicalFileContent.slug}/${changeFileContentPage.slug}` as const

const MESSAGE = "the game's API declarations, read out of the game's own documentation"

const AMBIENT = "ambient-types"

const PARTS = "parts"

const DECLARED_ONCE = "A global name is declared in one file."

const NAMED_FIRST = 5

const KINDS = [
  ["eso-enums", "a part of the game's numbers for its kinds"],
  ["eso-events", "the numbers the game gives its events"],
  ["eso-functions", "a part of the game calls an add-on makes"],
  ["eso-objects", "a part of the game objects whose methods an add-on calls"],
] as const

export function declaredIn(
  paths: readonly string[],
  bodyAt: (path: string) => string | null
): ReadonlyMap<string, Stated> {
  const held = new Map<string, Stated>()
  for (const path of paths) {
    const text = bodyAt(path)
    if (text === null) continue
    for (const one of statedIn(path, text)) if (!held.has(keyOf(one))) held.set(keyOf(one), one)
  }
  return held
}

export function heldAlready(
  bodies: readonly (readonly [string, string])[],
  held: ReadonlyMap<string, Stated>
): readonly string[] {
  const found = new Map<string, string>()
  for (const [name, body] of bodies) {
    for (const one of statedIn(name, body)) {
      const was = held.get(keyOf(one))
      if (was === undefined || mergedBy(one, was)) continue
      if (!found.has(one.name)) found.set(one.name, `${was.path}:${String(was.line)}`)
    }
  }
  return [...found].map(([name, at]) => `\`${name}\` at ${at}`).sort()
}

export function typeFaultsIn(selected: SelectedTokens): readonly string[] {
  const found = new Set<string>()
  const judged = (held: string): undefined => {
    const why = typeFaultIn(held)
    if (why !== null) found.add(why)
    return undefined
  }
  for (const one of selected.functions) {
    for (const said of one.params) judged(said.type)
    for (const said of one.returns) judged(said.type)
  }
  for (const one of selected.events) for (const said of one.params) judged(said.type)
  for (const one of selected.objects) {
    for (const method of one.methods) {
      for (const said of method.params) judged(said.type)
      for (const said of method.returns) judged(said.type)
    }
  }
  return [...found].sort()
}

function ambientIn(root: string, ours: ReadonlySet<string>): readonly string[] {
  const carried = shadowAt(root).index.carryingOf(AMBIENT)
  if ("refused" in carried) return []
  const found: string[] = []
  for (const one of carried.carrying) {
    if (ours.has(one.path)) continue
    const beside = besideAt(one.path, AMBIENT_KEY, AMBIENT_KIND)
    if (beside !== null) found.push(beside)
  }
  return found
}

function readAt(root: string): (path: string) => string | null {
  return (path) => {
    try {
      return readFileSync(resolve(root, path), "utf8")
    } catch {
      return null
    }
  }
}

type Taken = Taking<typeof page, typeof NAMED>

async function generated(done: string[], taken: Taken, given: Given): Promise<Answer> {
  const named = taken.codeRoot
  const writer = given.calledAs

  let root: string
  try {
    root = realpathSync(named ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${named ?? codeRoot()} is no checkout on this disk, so nothing was read or written — ${saidShort(thrown)}`,
      DATA
    )
  }

  const docPath = esouiDocPath()
  let doc: string
  try {
    doc = await readFile(docPath, "utf8")
  } catch (thrown) {
    return refused(
      `${docPath} is the game's own API documentation and is vendored in no repository here, so there was nothing to read the declarations out of. ` +
        "Restore the peer clone with `git clone https://github.com/esoui/esoui.git ~/esoui`, or name another copy with ESOUI_SRC_DIR — " +
        `${saidShort(thrown)}`,
      DATA
    )
  }

  let apiVersion: number
  try {
    apiVersion = parseEsoDocApiVersion(doc)
  } catch (thrown) {
    return refused(
      `${docPath} states no API version, so a written declaration would carry no stamp saying which version it was built from — ${saidShort(thrown)}`,
      DATA
    )
  }

  const ours = pagesWrittenBy(root, writer)
  if (ours.length === 0) {
    return refused(
      `no page under ${root} states this command wrote it, and a declaration is written onto ` +
        "such a page rather than into a folder, so there was nowhere to write.",
      DATA
    )
  }

  const selected = selectOptIn(
    {
      enums: parseEnums(doc),
      functions: parseFunctions(doc).filter((one) => one.access === undefined),
      events: parseEvents(doc),
      objects: parseObjects(doc),
    },
    ESO_OPT_IN
  )

  const faults = typeFaultsIn(selected)
  if (faults.length > 0) {
    return refused(
      `${docPath} states ${String(faults.length)} type(s) no declaration may carry, ` +
        `among them ${faults.slice(0, NAMED_FIRST).join(", ")}. A type is written into a ` +
        "declaration whole, so nothing was written.",
      DATA
    )
  }

  const held = declaredIn(ambientIn(root, new Set(ours.map((one) => one.at))), readAt(root))
  const byHand = new Set<string>()
  for (const [, one] of held) byHand.add(one.name)

  const kept = narrowed(
    [
      enumGroups(selected.enums),
      eventGroups(selected.events),
      functionGroups(selected.functions),
      objectGroups(selected.objects),
    ],
    { byHand, byCompiler: compilerNames() }
  )

  const bodyOf = (groups: readonly Group[]): string =>
    `${groups.map((one) => one.join("\n")).join("\n")}\n`
  const formattedAt = (at: string, text: string): string =>
    new TextDecoder().decode(formattedBody(root, at, new TextEncoder().encode(text)).body)
  const measured = new Map<string, number>()
  const sizing =
    (at: string) =>
    (groups: readonly Group[]): number => {
      const text = bodyOf(groups)
      const was = measured.get(text)
      if (was !== undefined) return was
      const many = new TextEncoder().encode(formattedAt(at, text)).length
      measured.set(text, many)
      return many
    }

  const asked: Asking[] = []
  const bodies: (readonly [string, string])[] = []
  let made = 0
  let gone = 0
  let stamped = 0

  for (const [which, kind] of KINDS.entries()) {
    const [prefix, definition] = kind
    const mine = ours.filter((one) => one.slug === prefix || one.slug.startsWith(`${prefix}-`))
    const first = mine[0]
    if (first === undefined) {
      return refused(
        `no page under ${root} is named for \`${prefix}\` and states this command wrote it, ` +
          "so there was nowhere to write that kind.",
        DATA
      )
    }
    const under = dirname(dirname(first.at))
    const pages = spilled(
      assigned(kept[which] ?? [], pagedBy(mine.map((one) => one.body))),
      sizing(first.beside),
      CEILING
    )
    const slugs = slugsFor(
      prefix,
      mine.map((one) => one.slug),
      pages.length
    )
    for (const [at, groups] of pages.entries()) {
      const slug = slugs[at] ?? prefix
      const was = mine[at]
      const beside = was?.beside ?? join(under, slug, `${slug}.${DECLARATION}.${AMBIENT_KEY}.ts`)
      const body = formattedAt(beside, bodyOf(groups))
      bodies.push([beside, body])
      if (was === undefined) {
        made += 1
        asked.push({
          at: MAKE,
          given: {
            at: join(under, slug, `${slug}.${DECLARATION}.ts`),
            body: pageBodyFor(slug, definition, writer, apiVersion),
          },
        })
        const naming = namingOf(root, first.slug)
        if (naming !== null) {
          asked.push({
            at: NAME,
            given: { at: naming, key: PARTS, value: `${DECLARATION}/${slug}` },
          })
        }
      }
      if (was?.body !== body) asked.push({ at: PUT, given: { at: beside, body } })
      const restated = was === undefined ? null : stampRestated(was.page, writer, apiVersion)
      if (was !== undefined && restated !== null) {
        stamped += 1
        asked.push({ at: STAMP, given: { at: was.at, old: restated.old, new: restated.new } })
      }
    }
    for (const one of mine.slice(pages.length)) {
      gone += 1
      asked.push({ at: DROP, given: { at: one.at } })
    }
  }

  const already = heldAlready(bodies, held)
  if (already.length > 0) {
    return refused(
      `${root} declares ${String(already.length)} of the names these declarations carry already, ` +
        `among them ${already.slice(0, NAMED_FIRST).join(", ")}. ${DECLARED_ONCE} ` +
        "A second file declaring one stops that name being typechecked wherever it is read, " +
        "so nothing was written.",
      DATA
    )
  }

  if (asked.length > 0) {
    const landed = await runMechanicalChange(root, asked, MESSAGE, { done })
    if ("refusals" in landed) {
      const why = `the declarations were not landed whole — ${landed.refusals.join("; ")}`
      return keeping(done, refused(why, OPERATIONAL))
    }
  }

  return told([
    `${String(selected.functions.length)} function(s), ${String(selected.objects.length)} object(s), ` +
      `${String(selected.events.length)} event(s) and ${String(selected.enums.length)} enum(s) ` +
      `are declared over ${String(bodies.length)} page(s)`,
    asked.length === 0
      ? "every page already held what it holds now, so nothing landed"
      : `landed ${String(asked.length)} change(s), ${String(made)} page(s) made, ${String(gone)} taken away and ${String(stamped)} stamped again`,
    `read from ${docPath} at API version ${String(apiVersion)}`,
  ])
}

export async function declaring(
  argv: readonly string[],
  given: Given,
  generating: Generating<Taken> = generated
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, NAMED, (taken, done) =>
    generating(done, taken, given)
  )
}

export function temperEsoGenerateDeclaration(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return declaring(argv, given)
}
