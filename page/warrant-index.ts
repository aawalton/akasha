import { pagesOver } from "../graph/page-index/page-index.ts"
import { rootsHere } from "../repo/roots.ts"
import { type AddressIndex, addressIndexOver } from "./address-index.ts"
import type { PageAt } from "./page-at.ts"
import { trackedIn } from "./pages.ts"
import { type Seeding, seedingOver } from "./required-reading.ts"
import { textAt } from "./text.ts"

const BEARING: readonly string[] = ["instructions", "akasha", "memory"]

export interface Standing {
  readonly index: AddressIndex
  readonly seeding: Seeding
  readonly rootOf: (repo: string) => string | undefined
}

let held: Standing | null = null

function madeHere(): Standing {
  const roots = rootsHere()
  const pages: PageAt[] = []
  for (const repo of BEARING) {
    const root = roots[repo]
    if (root === undefined) continue
    pages.push(...pagesOver(repo, trackedIn(root)))
  }
  const bodyOf = (at: PageAt): string | null => {
    const root = roots[at.repo]
    return root === undefined ? null : textAt(root, at.key)
  }
  const index = addressIndexOver(pages, bodyOf)
  return { index, seeding: seedingOver(pages, index), rootOf: (repo) => roots[repo] }
}

export function standingHere(): Standing {
  if (held === null) held = madeHere()
  return held
}
