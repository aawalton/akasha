import { dirname, relative } from "node:path"
import { partedIn } from "@akasha/pages/page-file-name"
import type { Value } from "@akasha/pages/page-value"
import { typedAs } from "../../../../pages/export-name/page-export-name.module.code.ts"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import { importNotLeftHanging } from "../../../guards/pages/import-not-left-hanging/import-not-left-hanging.change-guard.code.ts"
import {
  answered,
  gathered,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../../modules/change-guarding/change-guarding.module.code.ts"
import { type World, worldOver } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { claimedIn } from "../../../modules/page-claiming/page-claiming.module.code.ts"
import { changeFile } from "../../../pages/change-file/change-file.change-mechanical.code.ts"

import { repointed } from "../../../pages/repoint-imports/repoint-imports.change-mechanical.code.ts"

const GUARDS = [importNotLeftHanging]

const TYPE_KEY = "pageTypeSlug"

export type ChangePagePageTypeAsked = {
  readonly at: string
  readonly to: string
}

function pageIn(world: World, at: string): Value | null {
  const said = partedIn(at)
  if (said === null || said.sections.length > 0) return null
  return world.index.pageAt(said.pageType, said.slug)
}

function specifierFor(dir: string, target: string): string {
  const said = relative(dir, target)
  return said.startsWith(".") ? said : `./${said}`
}

function importingFor(name: string): RegExp {
  return new RegExp(`^import type \\{ ${name} \\} from "[^"]*"$`, "m")
}

// Every file a page keeps beside that page states the page type in the file's name, so the type
// stated in a name moves with the type stated in the body.
function renamedInto(
  world: World,
  was: string,
  now: string,
  beside: readonly string[]
): ReadonlyMap<string, string> | string {
  const said = new Map<string, string>()
  for (const one of beside) {
    const held = one.replace(`.${was}.`, `.${now}.`)
    if (held === one) return `\`${one}\` states no \`${was}\` in its name, so the page type stands`
    if (world.textOf(held) !== null) return `\`${held}\` is a body already`
    said.set(one, held)
  }
  return said
}

// Each act reads the tree as every act before that one had already landed, because a passage is
// looked for in the body the moves leave rather than in the body at the path the page came from.
function stepped(world: World, held: Answer, run: (over: World) => Answer): Answer {
  if (held.refused !== null) return held
  const one = run(worldOver(world, held))
  return one.refused === null ? gathered([held, one]) : one
}

function restating(over: World, at: string, was: string): Answer {
  const text = over.textOf(at)
  if (text === null) return refusing(`\`${at}\` holds no body once the page is carried`)
  const name = typedAs(was)
  const line = importingFor(name).exec(text)
  if (line === null) {
    return refusing(`\`${at}\` imports no type named \`${name}\`, so the page type is not restated`)
  }
  return answered([])
}

export function changePagePageType(world: World, given: ChangePagePageTypeAsked): Answer {
  const said = partedIn(given.at)
  if (said === null || said.sections.length > 0) {
    return refusing(`\`${given.at}\` reads as no page file, so no page type is changed`)
  }
  const type = partedIn(given.to)
  if (type === null) {
    return refusing(`\`${given.to}\` reads as no page file, so no page type is named`)
  }
  if (world.textOf(given.to) === null) {
    return refusing(`\`${given.to}\` holds no body, so no page type is named`)
  }
  if (type.slug === said.pageType) {
    return refusing(`\`${said.pageType}\` is the page type the page already is`)
  }
  const value = pageIn(world, given.at)
  if (value === null) return refusing(`\`${given.at}\` names no page, so no page type is changed`)
  let beside: readonly string[]
  try {
    beside = claimedIn(world, given.at, value)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so the files beside \`${given.at}\` were not worked out`)
  }
  const moved = renamedInto(world, said.pageType, type.slug, beside)
  if (typeof moved === "string") return refusing(moved)
  const reading = importingOf(world.index, moved)
  if ("unread" in reading) return refusing(reading.unread)
  const at = moved.get(given.at)
  if (at === undefined) return refusing(`\`${given.at}\` names no file the page type moves`)
  const wasName = typedAs(said.pageType)
  const nowName = typedAs(type.slug)
  const carried: Edit[] = []
  for (const [one, next] of moved) {
    const text = world.textOf(one)
    if (text === null) return refusing(`\`${one}\` could not be read`)
    carried.push(...repointed(one, next, text, moved).edits)
  }
  let held = answered(carried)
  held = stepped(world, held, (over) => restating(over, at, said.pageType))
  held = stepped(world, held, (over) => {
    const text = over.textOf(at) ?? ""
    const line = importingFor(wasName).exec(text)
    const spelled = `import type { ${nowName} } from ${JSON.stringify(specifierFor(dirname(at), given.to))}`
    return changeFile(over, { at, old: line === null ? "" : line[0], new: spelled })
  })
  held = stepped(world, held, (over) =>
    changeFile(over, { at, old: `satisfies ${wasName}`, new: `satisfies ${nowName}` })
  )
  held = stepped(world, held, (over) =>
    changeFile(over, {
      at,
      old: `${TYPE_KEY}: ${JSON.stringify(said.pageType)}`,
      new: `${TYPE_KEY}: ${JSON.stringify(type.slug)}`,
    })
  )
  held = stepped(world, held, (over) => {
    const edits: Edit[] = []
    for (const path of reading.importers) {
      if (moved.has(path)) continue
      const text = over.textOf(path)
      if (text === null)
        return refusing(`\`${path}\` names a path that moved and could not be read`)
      for (const one of repointed(path, path, text, moved).edits) {
        if (one.body !== text) edits.push(one)
      }
    }
    return answered(edits)
  })
  if (held.refused !== null) return held
  return guardedBy(world, held, GUARDS)
}

export function runChange(world: World, given: ChangePagePageTypeAsked): Answer {
  return changePagePageType(world, given)
}
