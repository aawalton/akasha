import { relative } from "node:path"
import type { Check } from "../check-shape.ts"
import { carriesCode, specifiersIn, targetOf } from "../imports.ts"

export const importReach: Check = {
  slug: "import-reach",
  needs: "file",
  run: ({ root, path, body }) => {
    if (!carriesCode(path)) return []
    const reasons: string[] = []
    for (const specifier of specifiersIn(body.toString("utf8"))) {
      const target = targetOf(path, specifier)
      if (target === null) continue
      const outward = relative(root, target)
      if (outward !== ".." && !outward.startsWith("../")) continue
      reasons.push(`imports \`${specifier}\`, which is \`${outward}\` — outside this repository`)
    }
    return reasons
  },
}

export default importReach
