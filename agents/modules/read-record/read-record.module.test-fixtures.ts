import { mkdirSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import {
  readsFileAt,
  SUBAGENT_MARK,
} from "akasha/agents/modules/read-record/read-record.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/modules/filing/index-filing.module.code.ts"
import { nothingFiled } from "akasha/pages/indexes/modules/reading/index-reading.module.test-fixtures.ts"
import { mintedId } from "akasha/testing-system/modules/minting/minting.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/modules/scratching/scratching.module.code.ts"

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

const SEAT_SLUG_FROM = 24

export function seatPaged(root: string, id: string, slug: string, at?: string): undefined {
  const path = at ?? `agents/seats/pages/${slug}/${slug}.seat.ts`
  listedFiled(root, SEAT, slug, [{ path, id }])
  valueAlsoFiled(root, SEAT, [{ path, value: { id, pageTypeSlug: SEAT, slug } }])
  return undefined
}

export function subagentPaged(root: string, agentId: string, slug: string, at?: string): undefined {
  const path = at ?? `agents/subagents/pages/${slug}/${slug}.subagent.ts`
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
  seatPaged(root, AGENT, "astra")
  seatPaged(root, OTHER, "nimue")
  subagentPaged(root, UNDER, "astra-sub-one")
  subagentPaged(root, UNDER_TOO, "astra-sub-two")
  subagentPaged(root, UNDER_OTHER, "nimue-sub-three")
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
