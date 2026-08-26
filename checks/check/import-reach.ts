import { relative } from "node:path"
import type { Check, CheckFailure } from "../check-shape.ts"
import { carriesCode, specifiersIn, targetOf } from "../imports.ts"

export const importReach: Check = {
  slug: "import-reach",
  run: (paths, tree) => {
    const failures: CheckFailure[] = []
    for (const path of paths) {
      if (!carriesCode(path)) continue
      const body = tree.at(path)
      if (body === null) continue
      for (const specifier of specifiersIn(body.toString("utf8"))) {
        const target = targetOf(path, specifier)
        if (target === null) continue
        const outward = relative(tree.root, target)
        if (outward !== ".." && !outward.startsWith("../")) continue
        failures.push({
          path,
          reason: `imports \`${specifier}\`, which is \`${outward}\` — outside this repository`,
        })
      }
    }
    return failures
  },
}

export default importReach
