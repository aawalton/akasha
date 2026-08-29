import { resolve } from "node:path"
import {
  assertionFindings,
  witnessTypesIn,
} from "../../../akasha/checks-system/check/witness-not-asserted/witness-not-asserted.check.code.ts"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import type { Check, CheckFailure } from "../check-shape.ts"

const AKASHA = "akasha"

export const akashaWitnessNotAsserted: Check = {
  slug: "akasha-witness-not-asserted",
  needs: "tree",
  run: ({ root, tree }) => {
    const under = resolve(root, AKASHA)
    const paths = tree.paths().filter((one) => one.startsWith(`${under}/`) && one.endsWith(".ts"))
    if (paths.length === 0) return []

    const bodies = new Map<string, string>()
    for (const path of paths) {
      const held = tree.at(path)
      if (held === null) continue
      const text = decodeUtf8(held)
      if (text !== null) bodies.set(path, text)
    }

    const witnessTypes = new Map<string, string>()
    for (const [path, text] of bodies) {
      for (const named of witnessTypesIn(path, text)) witnessTypes.set(named, path)
    }
    if (witnessTypes.size === 0) return []

    const named = (at: string): string => at
    const found: CheckFailure[] = []
    for (const [path, text] of bodies) {
      found.push(...assertionFindings(path, text, witnessTypes, named))
    }
    return found
  },
}

export default akashaWitnessNotAsserted
