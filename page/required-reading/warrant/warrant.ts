import { rootsHere } from "../../../repo/roots/roots.ts"
import { BY_FILE } from "../../index/identity/identity.ts"
import { loadRelations } from "../../index/store/store.ts"
import type { PageAt } from "../../page.ts"
import { textAt } from "../../text/text.ts"
import { type AddressIndex, addressIndexIn } from "../address-index/address-index.ts"

const BEARING: ReadonlySet<string> = new Set(["instructions", "akasha", "memory"])

export interface Standing {
  readonly index: AddressIndex
  readonly naming: readonly string[]
  readonly rootOf: (repo: string) => string | undefined
}

let held: Standing | null = null

function namingHere(): readonly string[] {
  const found = new Set<string>()
  for (const relations of loadRelations().values()) {
    for (const one of relations) {
      if (one.kind === BY_FILE) found.add(one.key)
    }
  }
  return [...found].sort()
}

function madeHere(): Standing {
  const roots = rootsHere()
  const bodyOf = (at: PageAt): string | null => {
    const root = roots[at.repo]
    return root === undefined ? null : textAt(root, at.key)
  }
  return {
    index: addressIndexIn(BEARING, bodyOf),
    naming: namingHere(),
    rootOf: (repo) => roots[repo],
  }
}

export function standingHere(): Standing {
  if (held === null) held = madeHere()
  return held
}
