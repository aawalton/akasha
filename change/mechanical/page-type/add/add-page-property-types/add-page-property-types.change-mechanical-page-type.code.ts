import {
  type FileChange,
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  passagesOf,
  plannedCarrying,
} from "akasha/change/modules/code-export-carrying/code-export-carrying.module.code.ts"
import { pageIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import { editsOver } from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import {
  carrying,
  isLedger,
  ledgerAt,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { typedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PAGE_PROPERTY = "page-property"

const TYPES = "types"

const HOLDS = "ts"

const SLUG = "slug"

export type Asked = {
  readonly pageType: string
  readonly under?: string
}

type Held = {
  readonly at: string
  readonly to: string
  readonly of: string
}

function listedIn(world: World, given: Asked): readonly Held[] | string {
  if (!world.index.kindsUnder(PAGE_PROPERTY).has(given.pageType)) {
    return `\`${given.pageType}\` names no page type a page property is`
  }
  const under = given.under
  const listed = world.index
    .everyOfType(given.pageType)
    .filter((one) => under === undefined || one.path.startsWith(under))
  if (listed.length === 0) return `no page is a \`${given.pageType}\``
  const found: Held[] = []
  for (const one of listed) {
    const owner = pageIn(world, one.path)
    if (owner !== null && owner[TYPES] !== undefined) continue
    const slug = owner === null ? null : textAt(owner, SLUG)
    const to = besideAt(one.path, TYPES, HOLDS)
    if (slug === null || to === null) return `\`${one.path}\` states no slug to name a type`
    found.push({ at: one.path, of: typedAs(slug), to })
  }
  if (found.length === 0) return `every \`${given.pageType}\` states its type already`
  return found
}

function carriedOver(world: World, held: readonly Held[]): readonly FileChange[] | string {
  const edits: FileChange[] = []
  let over = world
  for (const one of held) {
    const made = plannedCarrying(over, { from: one.at, to: one.to, of: [one.of] })
    if ("refused" in made) return `\`${one.at}\` is refused, and ${made.refused}`
    const found: FileChange[] = made.adding
      ? [{ kind: "add", path: one.to, content: made.body }]
      : []
    for (const passage of passagesOf(made)) {
      found.push({
        kind: "replace",
        path: passage.at,
        contentFrom: passage.old,
        contentTo: passage.new,
      })
    }
    edits.push(...found)
    over = carrying(over, stating(found))
  }
  return edits
}

function answeredIn(world: World, given: Asked): Said {
  const held = listedIn(world, given)
  if (typeof held === "string") return refusing(held)
  const keyed = editsOver(
    world,
    held.map((one) => ({
      path: one.at,
      written: [{ written: "put", key: TYPES, value: JSON.stringify(HOLDS) } as const],
    }))
  )
  if (typeof keyed === "string") return refusing(keyed)
  const ledger = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  const carried = carriedOver(carrying(ledger, stating(keyed)), held)
  if (typeof carried === "string") return refusing(carried)
  return stating([...keyed, ...carried])
}

export function addPagePropertyTypes(world: World, given: Asked): Said {
  try {
    return answeredIn(world, given)
  } catch (cause) {
    return refusing(`${saidBy(cause)}, so no page property hands its type on`)
  }
}

export function runChange(world: World, given: Asked): Said {
  return addPagePropertyTypes(world, given)
}
