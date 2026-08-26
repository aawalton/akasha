import { rootsHere } from "../../../repo/roots/roots.ts"
import { type Claims, claimsWithin } from "../../index/claim/claim.ts"
import { claimsHere } from "../../index/build.ts"
import type { PageAt } from "../../page.ts"
import { textAt } from "../../text/text.ts"
import { type AddressIndex, addressIndexIn } from "../address-index/address-index.ts"

const BEARING: ReadonlySet<string> = new Set(["instructions", "akasha", "memory"])

export interface Standing {
  readonly index: AddressIndex
  readonly claims: Claims
  readonly rootOf: (repo: string) => string | undefined
}

let held: Standing | null = null

function madeHere(): Standing {
  const roots = rootsHere()
  const bodyOf = (at: PageAt): string | null => {
    const root = roots[at.repo]
    return root === undefined ? null : textAt(root, at.key)
  }
  return {
    index: addressIndexIn(BEARING, bodyOf),
    claims: claimsWithin(claimsHere(), BEARING),
    rootOf: (repo) => roots[repo],
  }
}

export function standingHere(): Standing {
  if (held === null) held = madeHere()
  return held
}
