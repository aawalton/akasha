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

const SUB_ID = "01a04e96-c80a-79ef-819f-00000000000"

function seatFiled(root: string, slug: string, id: string): undefined {
  const path = `agents/seats/pages/${slug}/${slug}.seat.ts`
  listedFiled(root, SEAT, slug, [{ path, id }])
  valueAlsoFiled(root, SEAT, [{ path, value: { id, pageTypeSlug: SEAT, slug } }])
}

function subagentFiled(root: string, slug: string, id: string, agentId: string): undefined {
  const path = `agents/subagents/pages/${slug}/${slug}.subagent.ts`
  listedFiled(root, SUBAGENT, slug, [{ path, id }])
  valueAlsoFiled(root, SUBAGENT, [{ path, value: { id, pageTypeSlug: SUBAGENT, slug, agentId } }])
}

export function rootedAs(named: string): string {
  const root = scratch.rootFor(named)
  nothingFiled(root)
  seatFiled(root, "astra", AGENT)
  seatFiled(root, "nimue", OTHER)
  subagentFiled(root, "astra-sub-one", `${SUB_ID}1`, UNDER)
  subagentFiled(root, "astra-sub-two", `${SUB_ID}2`, UNDER_TOO)
  subagentFiled(root, "nimue-sub-three", `${SUB_ID}3`, UNDER_OTHER)
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
