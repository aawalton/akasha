import { relative, resolve } from "node:path"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import { carriesCode, specifiersIn, targetOf } from "../../imports/imports.ts"
import type { Check, CheckFailure } from "../check-shape.ts"

const AKASHA = "akasha"

export const akashaImportsInside = {
  slug: "akasha-imports-inside",
  needs: "tree",
  run: ({ root, paths, tree }) => {
    const under = resolve(root, AKASHA)
    const judged = paths.filter((one) => one.startsWith(`${under}/`) && carriesCode(one))
    if (judged.length === 0) return []
    const tracked = new Set(tree.paths())
    const said: CheckFailure[] = []
    for (const path of judged) {
      const body = tree.at(path)
      if (body === null) continue
      const text = decodeUtf8(body)
      if (text === null) continue
      for (const specifier of specifiersIn(text)) {
        const target = targetOf(root, path, specifier)
        if (target === null) continue
        if (target.startsWith(`${under}/`)) continue
        if (!tracked.has(target)) continue
        said.push({
          path,
          reason: `\`${specifier}\` names \`${relative(root, target)}\`, a tracked file outside the akasha folder`,
        })
      }
    }
    return said
  },
} satisfies Check

export default akashaImportsInside
