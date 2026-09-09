import { parsedAs } from "@akasha/code/code-source"
import { gathered, refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { statedIn } from "../../../../modules/page-literal/page-literal.module.code.ts"

const RENAME_FILE_PAGE = "change-mechanical/rename-file-page"

const RENAME_PAGE_ADDRESSES = "change-mechanical-file-content/rename-page-addresses"

const SLUG = "slug"

const PAGE_TYPE = "type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

export type Asked = {
  readonly moved: Readonly<Record<string, string>>
}

export type Held = {
  readonly at: string
  readonly was: string
  readonly to: string
  readonly pageTypeSlug: string
}

type Read = { readonly held: readonly Held[] } | { readonly refused: string }

function readIn(world: World, moved: Readonly<Record<string, string>>): Read {
  const found: Held[] = []
  for (const [at, to] of Object.entries(moved)) {
    const text = world.textOf(at)
    if (text === null) return { refused: `\`${at}\` could not be read` }
    const said = statedIn(parsedAs(at, text))
    const slug = said.get(SLUG)
    const pageTypeSlug = said.get(PAGE_TYPE) ?? said.get(PAGE_TYPE_SLUG)
    if (slug === undefined) return { refused: `\`${at}\` states no \`${SLUG}\`` }
    if (pageTypeSlug === undefined) return { refused: `\`${at}\` states no \`${PAGE_TYPE_SLUG}\`` }
    found.push({ at, was: slug.text, to, pageTypeSlug: pageTypeSlug.text })
  }
  return { held: found }
}

export function addressesIn(held: readonly Held[]): Record<string, string> {
  const found: Record<string, string> = {}
  for (const one of held) {
    if (one.to === one.was) continue
    found[`${one.pageTypeSlug}/${one.was}`] = `${one.pageTypeSlug}/${one.to}`
  }
  return found
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const read = readIn(world, given.moved)
  if ("refused" in read) return refusing(`${read.refused}, so no page is renamed`)
  if (read.held.length === 0) return refusing("no page was handed in, so no page is renamed")
  const addresses = addressesIn(read.held)
  const answers: Answer[] = []
  let seen = world
  if (Object.keys(addresses).length > 0) {
    const restated = await reach(seen, RENAME_PAGE_ADDRESSES, { moved: addresses })
    if (restated.said.refused !== null) return restated.said
    answers.push(restated.said)
    seen = restated.world
  }
  for (const one of read.held) {
    const renamed = await reach(seen, RENAME_FILE_PAGE, {
      at: one.at,
      to: one.to,
      addressesRestated: true,
    })
    if (renamed.said.refused !== null) return renamed.said
    answers.push(renamed.said)
    seen = renamed.world
  }
  return gathered(answers)
}
