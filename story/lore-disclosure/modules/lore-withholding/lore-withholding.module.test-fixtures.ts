import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { SUBAGENT_MARK } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { definer } from "akasha/agent/role/pages/definer.role.ts"
import { gameMaster } from "akasha/agent/role/pages/game-master.role.ts"
import { reviewer } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder } from "akasha/agent/role/pages/story-recorder.role.ts"
import { writer } from "akasha/agent/role/pages/writer.role.ts"
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
import { loreAbout } from "akasha/story/lore/properties/lore-about.relation-property.ts"
import { loreFacts } from "akasha/story/lore/properties/lore-facts.record-property.ts"
import { loreSecrets } from "akasha/story/lore/properties/lore-secrets.file-property.ts"
import { loreDisclosure as disclosureType } from "akasha/story/lore-disclosure/lore-disclosure.page-type.ts"
import { gameMaster as gameMasterKnower } from "akasha/story/lore-disclosure/pages/game-master.lore-disclosure.ts"

export const GAME_MASTER_SEAT = "01a0d600-0000-7000-8000-000000000001"

export const OTHER_SEAT = "01a0d600-0000-7000-8000-000000000002"

export const REVIEWER_SEAT = "01a0d600-0000-7000-8000-000000000007"

export const WRITER_SEAT = "01a0d600-0000-7000-8000-000000000008"

export const RECORDER_SEAT = "01a0d600-0000-7000-8000-000000000009"

export const UNDER_GAME_MASTER = `${GAME_MASTER_SEAT}${SUBAGENT_MARK}held-sub`

export const LORE_AT = "story/world/pages/held/lore/sealed.lore.ts"

export const LORE_NAME = "sealed.lore.ts"

export const SECRETS_AT = "story/world/pages/held/lore/told.lore.secrets.jsonl"

const LORE_ID = "01a0d600-0000-7000-8000-000000000003"

export const TARGET_AT = "story/world/pages/held/characters/hidden.world-character.ts"

export const OUTSIDE_AT = "persona/pages/held/held.persona.ts"

export const TOLD_AT = "story/world/pages/held/lore/told.lore.ts"

const TARGET_TYPE = "world-character"

const TARGET = `${TARGET_TYPE}/hidden`

const ROLE_AT = "agent/role/pages/game-master.role.ts"

const GAME_MASTER_AT = "agent/seat/pages/held/held.seat.ts"

const OTHER_AT = "agent/seat/pages/other/other.seat.ts"

const REVIEWER_ROLE_AT = "agent/role/pages/reviewer.role.ts"

const WRITER_ROLE_AT = "agent/role/pages/writer.role.ts"

const REVIEWER_AT = "agent/seat/pages/reviewing/reviewing.seat.ts"

const WRITER_AT = "agent/seat/pages/writing/writing.seat.ts"

const RECORDER_ROLE_AT = "agent/role/pages/story-recorder.role.ts"

const RECORDER_AT = "agent/seat/pages/recording/recording.seat.ts"

type Naming = { readonly propertySlug: string; readonly path: string; readonly id: string }

function addressOf(pageTypeSlug: string, slug: string): string {
  return `${pageTypeSlug}/${slug}`
}

function typeOf(pageTypeSlug: string): string {
  return addressOf(pageType.slug, pageTypeSlug)
}

function referencesWritten(root: string, page: string, lines: readonly Naming[]): undefined {
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
    {
      path: REVIEWER_AT,
      value: {
        id: REVIEWER_SEAT,
        type: typeOf(seat.slug),
        slug: "reviewing",
        [role.propertySlug]: addressOf(rolePageType.slug, reviewer.slug),
      },
    },
    {
      path: WRITER_AT,
      value: {
        id: WRITER_SEAT,
        type: typeOf(seat.slug),
        slug: "writing",
        [role.propertySlug]: addressOf(rolePageType.slug, writer.slug),
      },
    },
    {
      path: RECORDER_AT,
      value: {
        id: RECORDER_SEAT,
        type: typeOf(seat.slug),
        slug: "recording",
        [role.propertySlug]: addressOf(rolePageType.slug, storyRecorder.slug),
      },
    },
  ])
}

function targetsFiled(root: string): undefined {
  valueAlsoFiled(root, TARGET_TYPE, [
    {
      path: TARGET_AT,
      value: {
        id: "01a0d600-0000-7000-8000-000000000004",
        type: typeOf(TARGET_TYPE),
        slug: "hidden",
      },
    },
  ])
  valueAlsoFiled(root, "persona", [
    {
      path: OUTSIDE_AT,
      value: { id: "01a0d600-0000-7000-8000-000000000005", type: typeOf("persona"), slug: "held" },
    },
  ])
}

function toldFacts(): readonly unknown[] {
  return [{ fact: "told", knowers: [addressOf(disclosureType.slug, gameMasterKnower.slug)] }]
}

const ABOUT_AT: Readonly<Record<string, string>> = {
  [TARGET]: TARGET_AT,
  [addressOf("persona", "held")]: OUTSIDE_AT,
}

function aboutWritten(root: string, about: string, namings: readonly Naming[]): undefined {
  const at = ABOUT_AT[about]
  if (at !== undefined) referencesWritten(root, at, namings)
}

const SEALED: Naming = { propertySlug: loreAbout.slug, path: LORE_AT, id: LORE_ID }

export function toldAlso(root: string): undefined {
  aboutWritten(root, TARGET, [
    SEALED,
    { propertySlug: loreAbout.slug, path: TOLD_AT, id: "01a0d600-0000-7000-8000-000000000006" },
  ])
  valueAlsoFiled(root, lore.slug, [
    {
      path: TOLD_AT,
      value: {
        id: "01a0d600-0000-7000-8000-000000000006",
        type: typeOf(lore.slug),
        slug: "told",
        [loreAbout.propertySlug]: TARGET,
        [loreFacts.propertySlug]: toldFacts(),
        [loreSecrets.propertySlug]: "jsonl",
      },
    },
  ])
}

function pagesFiled(root: string, about: string, told: boolean): undefined {
  targetsFiled(root)
  valueAlsoFiled(root, rolePageType.slug, [
    {
      path: ROLE_AT,
      value: { id: gameMaster.id, type: typeOf(rolePageType.slug), slug: gameMaster.slug },
    },
    {
      path: REVIEWER_ROLE_AT,
      value: { id: reviewer.id, type: typeOf(rolePageType.slug), slug: reviewer.slug },
    },
    {
      path: WRITER_ROLE_AT,
      value: { id: writer.id, type: typeOf(rolePageType.slug), slug: writer.slug },
    },
    {
      path: RECORDER_ROLE_AT,
      value: { id: storyRecorder.id, type: typeOf(rolePageType.slug), slug: storyRecorder.slug },
    },
  ])
  valueAlsoFiled(root, lore.slug, [
    {
      path: LORE_AT,
      value: {
        id: LORE_ID,
        type: typeOf(lore.slug),
        slug: "sealed",
        [loreAbout.propertySlug]: about,
        ...(told ? { [loreFacts.propertySlug]: toldFacts() } : {}),
      },
    },
  ])
}

export function loreWorld(scratch: Scratch, about: string = TARGET, told = false): string {
  const root = realpathSync(scratch.rootFor("lore-withholding-"))
  seatsFiled(root)
  pagesFiled(root, about, told)
  aboutWritten(root, about, [SEALED])
  referencesWritten(root, ROLE_AT, [
    { propertySlug: role.propertySlug, path: GAME_MASTER_AT, id: GAME_MASTER_SEAT },
  ])
  referencesWritten(root, REVIEWER_ROLE_AT, [
    { propertySlug: role.propertySlug, path: REVIEWER_AT, id: REVIEWER_SEAT },
  ])
  referencesWritten(root, WRITER_ROLE_AT, [
    { propertySlug: role.propertySlug, path: WRITER_AT, id: WRITER_SEAT },
  ])
  referencesWritten(root, RECORDER_ROLE_AT, [
    { propertySlug: role.propertySlug, path: RECORDER_AT, id: RECORDER_SEAT },
  ])
  return root
}
