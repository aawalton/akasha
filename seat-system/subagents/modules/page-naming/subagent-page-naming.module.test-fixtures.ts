import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { pathOf } from "akasha/seat-system/subagents/modules/page-naming/subagent-page-naming.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

export const ANOTHER = "01a05844-6e60-7000-b54c-4b14559df70c"

export const OWN = "a38f63805f9b94edf"

export const PERSONA_AT = "akasha/persona-system/personas/akasha/akasha.persona.ts"

export function inScratch(act: (root: string) => void): undefined {
  const world = scratchWorld()
  try {
    act(world.rootFor("subagent-page-naming-"))
  } finally {
    world.sweep()
  }
}

export function filedAsSeat(root: string, slug: string, at: string): undefined {
  listedFiled(root, "seat", slug, [{ path: at, id: `${SEAT_ID}-${slug}` }])
}

export function seatsFiled(root: string, names: readonly string[]): undefined {
  for (const one of names) filedAsSeat(root, one, `akasha/seat-system/seats/pages/${one}.seat.ts`)
}

export function subagentsFiled(root: string, slugs: readonly string[]): readonly string[] {
  const paths: string[] = []
  for (const one of slugs) {
    const at = pathOf(one)
    paths.push(at)
    listedFiled(root, "subagent", one, [{ path: at, id: `${ANOTHER}-${one}` }])
    valueAlsoFiled(root, "subagent", [{ path: at, value: { id: `${ANOTHER}-${one}`, slug: one } }])
  }
  return paths
}
