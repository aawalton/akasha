import { dirname, join } from "node:path"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import {
  type Parted,
  pageOf,
  partedIn,
  sectionedIn,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const ID_STATED = /^\s*id: "([^"]*)"/m

const PAGE_HELD = ".ts"

function carryingBeside(world: World, said: Parted): readonly string[] {
  const propertySlug = sectionedIn(said)?.propertySlug
  if (propertySlug === undefined) return []
  const filed = world.index.filePropertiesAt()
  const found: string[] = []
  for (const kind of world.index.pageTypesIn()) {
    if (filed.get(kind)?.has(propertySlug) !== true) continue
    for (const one of world.index.listedAt(kind, said.slug)) found.push(one.path)
  }
  return found.sort()
}

function nowAt(world: World, page: string, said: Parted): readonly string[] {
  const was = world.base(page)
  const id = typeof was === "string" ? firstCapture(ID_STATED.exec(was)) : null
  const byId = id === null ? null : world.index.listedById(id)
  if (byId !== null) return [byId.path]
  const same = world.index.listedAt(said.pageType, said.slug).map((one) => one.path)
  return same.length > 0 ? same : carryingBeside(world, said)
}

export function orphanAt(world: World, at: string): string | null {
  if (world.bodyOf(at) !== null) return null
  const said = partedIn(at)
  if (said === null || said.sections.length === 0) return null
  const page = join(dirname(at), `${pageOf(said)}${PAGE_HELD}`)
  if (world.bodyOf(page) !== null) return null
  const gone = "`" + at + "` is not begun, because `" + page + "` beside it is no page"
  const found = nowAt(world, page, said)
  const [only] = found
  if (only === undefined) return gone
  if (found.length === 1) return `${gone} — the page is now at \`${only}\``
  return (
    `${gone} — pages with the slug \`${said.slug}\` carrying this file are at ` +
    `\`${found.join("`, `")}\``
  )
}
