import { summingBy } from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"
import { towerOfNimueAtt } from "akasha/story/world/pages/tower-of-nimue/stories/written/tower-of-nimue/mechanics/metrics/attributes/att/tower-of-nimue-att.page-type.ts"

export const worked = summingBy([{ of: towerOfNimueAtt.slug, by: 5 }], 0, "none")
