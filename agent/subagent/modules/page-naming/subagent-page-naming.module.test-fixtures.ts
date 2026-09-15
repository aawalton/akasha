import { pathOf } from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

export const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

const ANOTHER = "01a05844-6e60-7000-b54c-4b14559df70c"

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
  for (const one of names) filedAsSeat(root, one, `akasha/agent/seat/pages/${one}.seat.ts`)
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
