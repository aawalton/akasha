import { dirname, join } from "node:path"
import { akasha } from "akasha/akasha.domain.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import { addPropertyValue } from "akasha/change/mechanical/file-content/add/add-property-value/add-property-value.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  gathered,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parts } from "akasha/domain/properties/parts.multi-relation-property.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  exportedAs,
  typedAs,
} from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { gameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.ts"
import { gameMechanics } from "akasha/story/game/properties/game-mechanics.multi-relation-property.ts"
import { storyGame } from "akasha/story/game/story-game.page-type.ts"

const HERE = "change/agent/file/add-game-mechanic"
const GAME = "game"
const SLUG = "slug"
const DEFINITION = "definition"
const CODE = "code"
const TS = "ts"
const TYPES = "types"
const PAGES = "pages"

const ADD_FILE = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const
const ADD_VALUE = `${changeMechanicalFileContent.slug}/${addPropertyValue.slug}` as const

type Placed = {
  readonly typeAt: string
  readonly pageAt: string
  readonly codeAt: string
  readonly typesAt: string
}

function placedFor(world: World, slug: string): Placed | null {
  const listed = world.index.listedAt(pageType.slug, gameMechanic.slug)[0]
  if (listed === undefined) return null
  const typesAt = besideAt(listed.path, TYPES, TS)
  const pageAt = join(dirname(listed.path), PAGES, slug, `${slug}.${gameMechanic.slug}.${TS}`)
  const codeAt = besideAt(pageAt, CODE, TS)
  if (typesAt === null || codeAt === null) return null
  return { typeAt: listed.path, pageAt, codeAt, typesAt }
}

function bodyFor(slug: string, definition: string, typesAt: string): string {
  const typed = typedAs(gameMechanic.slug)
  const lines = [
    `import type { ${typed} } from "${akasha.slug}/${typesAt}"`,
    "",
    `export const ${exportedAs(slug)} = {`,
    `  type: "${namedAs(pageType.slug, gameMechanic.slug, null)}",`,
    `  slug: "${slug}",`,
    `  definition: "${definition}",`,
    `  ${CODE}: "${TS}",`,
    `} as const satisfies ${typed}`,
    "",
  ]
  return lines.join("\n")
}

type Step = {
  readonly address: typeof ADD_FILE | typeof ADD_VALUE
  readonly given: Readonly<Record<string, string>>
}

function stepsFor(
  placed: Placed,
  played: string,
  slug: string,
  definition: string,
  code: string
): readonly Step[] {
  const held = namedAs(gameMechanic.slug, slug, null)
  return [
    {
      address: ADD_FILE,
      given: { at: placed.pageAt, body: bodyFor(slug, definition, placed.typesAt) },
    },
    { address: ADD_FILE, given: { at: placed.codeAt, body: code } },
    { address: ADD_VALUE, given: { at: placed.typeAt, key: parts.propertySlug, value: held } },
    { address: ADD_VALUE, given: { at: played, key: gameMechanics.propertySlug, value: held } },
  ]
}

async function writtenIn(world: World, steps: readonly Step[]): Promise<Answer> {
  const held: Answer[] = []
  let seen = world
  for (const one of steps) {
    const done = await reach(seen, one.address, one.given)
    if (done.said.refused !== null) return done.said
    held.push(done.said)
    seen = done.world
  }
  return gathered(held)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [GAME, SLUG, DEFINITION, CODE]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const named = given[GAME]
  if (named === undefined) return refusing(missing(GAME))
  const slug = given[SLUG]
  if (slug === undefined) return refusing(missing(SLUG))
  const definition = given[DEFINITION]
  if (definition === undefined) return refusing(missing(DEFINITION))
  const code = given[CODE]
  if (code === undefined) return refusing(missing(CODE))
  const played = world.index.listedAt(storyGame.slug, named)[0]
  if (played === undefined) return refusing(`\`${named}\` names no game, ${HERE}`)
  const placed = placedFor(world, slug)
  if (placed === null) return refusing(`\`${gameMechanic.slug}\` names no page type, ${HERE}`)
  return await writtenIn(world, stepsFor(placed, played.path, slug, definition, code))
}
