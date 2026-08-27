import type { Check } from "../check-shape.ts"
import { carriesCode, outwardOf, specifiersIn } from "../../imports/imports.ts"

const DECLARATION = ".d.ts"

export function declaresOnly(specifier: string): boolean {
  return specifier.endsWith(DECLARATION)
}

export const importReach: Check = {
  slug: "import-reach",
  needs: "file",
  cached: false,
  run: ({ root, path, body }) => {
    if (!carriesCode(path)) return []
    const reasons: string[] = []
    for (const specifier of specifiersIn(body.toString("utf8"))) {
      if (declaresOnly(specifier)) continue
      const outward = outwardOf(root, path, specifier)
      if (outward === null) continue
      reasons.push(`imports \`${specifier}\`, which is \`${outward}\` — outside this repository`)
    }
    return reasons
  },
}

export default importReach
