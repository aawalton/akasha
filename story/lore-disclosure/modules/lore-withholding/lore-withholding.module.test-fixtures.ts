import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { SUBAGENT_MARK } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { definer } from "akasha/agent/role/pages/definer.role.ts"
import { gameMaster } from "akasha/agent/role/pages/game-master.role.ts"
import { role as rolePageType } from "akasha/agent/role/role.page-type.ts"
import { role } from "akasha/agent/seat/properties/role.relation-property.ts"
import { seat } from "akasha/agent/seat/seat.page-type.ts"
import type { Scratch } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { valueAlsoFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import {
  lineOf,
  referencesAt,
} from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { lore } from "akasha/story/lore/lore.page-type.ts"
import { loreDisclosure } from "akasha/story/lore/properties/lore-disclosure.relation-property.ts"
import { loreDisclosure as disclosureType } from "akasha/story/lore-disclosure/lore-disclosure.page-type.ts"
import { worldBuilder } from "akasha/story/lore-disclosure/pages/world-builder.lore-disclosure.ts"

export const GAME_MASTER_SEAT = "01a0d600-0000-7000-8000-000000000001"

export const OTHER_SEAT = "01a0d600-0000-7000-8000-000000000002"

export const UNDER_GAME_MASTER = `${GAME_MASTER_SEAT}${SUBAGENT_MARK}held-sub`

export const LORE_AT = "story/world/pages/held/lore/sealed.lore.ts"

export const LORE_NAME = "sealed.lore.ts"

export const DISCLOSURE_AT = "story/lore-disclosure/pages/world-builder.lore-disclosure.ts"

const LORE_ID = "01a0d600-0000-7000-8000-000000000003"

const ROLE_AT = "agent/role/pages/game-master.role.ts"

const GAME_MASTER_AT = "agent/seat/pages/held/held.seat.ts"

const OTHER_AT = "agent/seat/pages/other/other.seat.ts"

type Naming = { readonly propertySlug: string; readonly path: string; readonly id: string }

function addressOf(pageTypeSlug: string, slug: string): string {
  return `${pageTypeSlug}/${slug}`
}

function typeOf(pageTypeSlug: string): string {
  return addressOf(pageType.slug, pageTypeSlug)
}

export function referencesWritten(root: string, page: string, lines: readonly Naming[]): undefined {
  const at = join(root, referencesAt(page) ?? page)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, lines.map((one) => `${lineOf({ ...one, fileName: null })}\n`).join(""))
}

function seatsFiled(root: string): undefined {
  valueAlsoFiled(root, seat.slug, [
    {
      path: GAME_MASTER_AT,
      value: {
        id: GAME_MASTER_SEAT,
        type: typeOf(seat.slug),
        slug: "held",
        [role.propertySlug]: addressOf(rolePageType.slug, gameMaster.slug),
      },
    },
    {
      path: OTHER_AT,
      value: {
        id: OTHER_SEAT,
        type: typeOf(seat.slug),
        slug: "other",
        [role.propertySlug]: addressOf(rolePageType.slug, definer.slug),
      },
    },
  ])
}

function pagesFiled(root: string): undefined {
  valueAlsoFiled(root, rolePageType.slug, [
    {
      path: ROLE_AT,
      value: { id: gameMaster.id, type: typeOf(rolePageType.slug), slug: gameMaster.slug },
    },
  ])
  valueAlsoFiled(root, disclosureType.slug, [
    {
      path: DISCLOSURE_AT,
      value: { id: worldBuilder.id, type: typeOf(disclosureType.slug), slug: worldBuilder.slug },
    },
  ])
  valueAlsoFiled(root, lore.slug, [
    {
      path: LORE_AT,
      value: {
        id: LORE_ID,
        type: typeOf(lore.slug),
        slug: "sealed",
        [loreDisclosure.propertySlug]: addressOf(disclosureType.slug, worldBuilder.slug),
      },
    },
  ])
}

export function loreWorld(scratch: Scratch): string {
  const root = realpathSync(scratch.rootFor("lore-withholding-"))
  seatsFiled(root)
  pagesFiled(root)
  referencesWritten(root, ROLE_AT, [
    { propertySlug: role.propertySlug, path: GAME_MASTER_AT, id: GAME_MASTER_SEAT },
  ])
  referencesWritten(root, DISCLOSURE_AT, [
    { propertySlug: loreDisclosure.propertySlug, path: LORE_AT, id: LORE_ID },
  ])
  return root
}
