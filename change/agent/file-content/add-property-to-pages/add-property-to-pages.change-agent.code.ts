import { addPropertyToPages as addPropertyToPagesMechanical } from "akasha/change/mechanical/file-content/add/add-property-to-pages/add-property-to-pages.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const PUTS = `${changeMechanicalFileContent.slug}/${addPropertyToPagesMechanical.slug}` as const

const KEY = "key"

const PAGES = "pages"

const AFTER = "after"

const GAP = /\s+/

export type Valued = {
  readonly path: string
  readonly value: string
}

export type AddPropertyToPagesAsked = {
  readonly key: string
  readonly valued: readonly Valued[]
  readonly after?: string
}

export function valuedIn(pages: string): readonly Valued[] | string {
  const found: Valued[] = []
  for (const line of pages.split("\n")) {
    const said = line.trim()
    if (said === "") continue
    const at = said.search(GAP)
    if (at < 0) return `\`${said}\` holds one word, and a line is a path then one value`
    found.push({ path: said.slice(0, at), value: said.slice(at).trim() })
  }
  return found
}

export async function addPropertyToPages(
  world: World,
  given: AddPropertyToPagesAsked
): Promise<Answer> {
  return (await reach(world, PUTS, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [KEY, PAGES, AFTER]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const pages = given[PAGES]
  if (pages === undefined) return refusing(missing(PAGES))
  const valued = valuedIn(pages)
  if (typeof valued === "string") return refusing(valued)
  if (valued.length === 0) return refusing("no page is named, so nothing is put in")
  const after = given[AFTER]
  return await addPropertyToPages(
    world,
    after === undefined ? { key, valued } : { key, valued, after }
  )
}
