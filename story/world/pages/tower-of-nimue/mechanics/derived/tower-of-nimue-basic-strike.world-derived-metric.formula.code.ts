import { summingBy } from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"
import { towerOfNimuePwr } from "akasha/story/world/pages/tower-of-nimue/stories/written/tower-of-nimue/mechanics/metrics/attributes/pwr/tower-of-nimue-pwr.page-type.ts"

export const worked = summingBy([{ of: towerOfNimuePwr.slug, by: 2 }], 0, "none")
