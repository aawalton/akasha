import type { Check } from "../check-shape.ts"
import { carriesCode, outwardOf, specifiersIn } from "../imports.ts"

export const importReach: Check = {
  slug: "import-reach",
  needs: "file",
  run: ({ root, path, body }) => {
    if (!carriesCode(path)) return []
    const reasons: string[] = []
    for (const specifier of specifiersIn(body.toString("utf8"))) {
      const outward = outwardOf(root, path, specifier)
      if (outward === null) continue
      reasons.push(`imports \`${specifier}\`, which is \`${outward}\` — outside this repository`)
    }
    return reasons
  },
}

export default importReach
