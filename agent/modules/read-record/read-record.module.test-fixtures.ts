import { mkdirSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import {
  readsFileAt,
  SUBAGENT_MARK,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { reads } from "akasha/agent/properties/reads.file-property.ts"
import { mintedId } from "akasha/check/test/fixture/minting/minting.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { uncommittedBesideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export const AGENT = "01a04e96-c80a-79ef-819f-a455a96a0e54"

export const OTHER = "01a04e96-c80a-79ef-819f-000000000000"

export const UNDER = `${AGENT}${SUBAGENT_MARK}sub-one`

export const NOBODY = "01a04e96-c80a-79ef-819f-00000000ffff"

export const UNDER_TOO = `${AGENT}${SUBAGENT_MARK}sub-two`

export const UNDER_OTHER = `${OTHER}${SUBAGENT_MARK}sub-three`

export const A = "akasha/a.ts"

export const B = "akasha/b.ts"

export const DAY = 24 * 60 * 60 * 1000

export const scratch = scratchWorld()

const SEAT = "seat"

const SUBAGENT = "subagent"

const HELD = "jsonl"

const SEAT_SLUG_FROM = 24

export const HELD_SEAT = "held"

const KEPT_SEAT = "kept"

export const HELD_SUB = `${HELD_SEAT}-sub-one`

export function seatPageOf(slug: string): string {
  return `agent/seat/pages/${slug}/${slug}.seat.ts`
}

export function subagentPageOf(slug: string): string {
  return `agent/subagent/pages/${slug}/${slug}.subagent.ts`
}

export function readsBeside(page: string): string {
  return uncommittedBesideAt(page, reads.propertySlug, HELD) ?? ""
}

function seatPaged(root: string, id: string, slug: string, at?: string): undefined {
  const path = at ?? seatPageOf(slug)
  listedFiled(root, SEAT, slug, [{ path, id }])
  valueAlsoFiled(root, SEAT, [{ path, value: { id, pageTypeSlug: SEAT, slug } }])
  return undefined
}

function subagentPaged(root: string, agentId: string, slug: string, at?: string): undefined {
  const path = at ?? subagentPageOf(slug)
  const id = mintedId(slug)
  listedFiled(root, SUBAGENT, slug, [{ path, id }])
  valueAlsoFiled(root, SUBAGENT, [{ path, value: { id, pageTypeSlug: SUBAGENT, slug, agentId } }])
  return undefined
}

export function agentPaged(root: string, agentId: string, slug?: string, at?: string): undefined {
  const cut = agentId.indexOf(SUBAGENT_MARK)
  if (cut < 0) return seatPaged(root, agentId, slug ?? `seat-${agentId.slice(SEAT_SLUG_FROM)}`, at)
  const under = agentId.slice(cut + SUBAGENT_MARK.length)
  return subagentPaged(root, agentId, slug ?? under, at)
}

export function rootedAs(named: string): string {
  const root = scratch.rootFor(named)
  nothingFiled(root)
  seatPaged(root, AGENT, HELD_SEAT)
  seatPaged(root, OTHER, KEPT_SEAT)
  subagentPaged(root, UNDER, HELD_SUB)
  subagentPaged(root, UNDER_TOO, `${HELD_SEAT}-sub-two`)
  subagentPaged(root, UNDER_OTHER, `${KEPT_SEAT}-sub-three`)
  return root
}

export function rooted(): string {
  return rootedAs("akasha-reading-")
}

export function rawAt(root: string, text: string): undefined {
  const at = readsFileAt(root, AGENT)
  if (at === null) return undefined
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, text)
  return undefined
}

export function thinAt(root: string, said: Record<string, unknown>): undefined {
  rawAt(root, `${JSON.stringify(said)}\n`)
  return undefined
}
