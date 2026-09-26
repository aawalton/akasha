import { summingBy } from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"
import { towerOfNimueVit } from "akasha/story/world/pages/tower-of-nimue/stories/written/tower-of-nimue/mechanics/metrics/attributes/vit/tower-of-nimue-vit.page-type.ts"

export const worked = summingBy([{ of: towerOfNimueVit.slug, by: 10 }], 0, "none")
