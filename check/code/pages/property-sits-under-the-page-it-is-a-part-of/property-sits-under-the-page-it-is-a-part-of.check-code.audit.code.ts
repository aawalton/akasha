import {
  judgingBy,
  PROPERTY,
} from "akasha/check/code/pages/property-sits-under-the-page-it-is-a-part-of/property-sits-under-the-page-it-is-a-part-of.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { namedUnder } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function propertySitsUnderThePageItIsAPartOf(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const judging = judgingBy(shadow, shadow.index.knownIn())
  const under = shadow.index.kindsUnder(PROPERTY)
  const said: Judged[] = []
  for (const kind of under) {
    for (const listed of shadow.index.everyOfType(kind)) {
      const held = namedUnder(listed.path, under)
      if (held === null) continue
      const shown = namedAs(held.pageTypeSlug, held.slug, null)
      const reason = judging(listed.id, shown, listed.path)
      if (reason !== null) said.push({ path: listed.path, reason })
    }
  }
  return said
}
