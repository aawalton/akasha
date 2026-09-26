import { summingBy } from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"
import { cornerstoneMemory } from "akasha/story/world/pages/cornerstone/stories/written/cornerstone/mechanics/metrics/attributes/memory/cornerstone-memory.page-type.ts"
import { cornerstoneProvision } from "akasha/story/world/pages/cornerstone/stories/written/cornerstone/mechanics/metrics/attributes/provision/cornerstone-provision.page-type.ts"
import { cornerstoneReach } from "akasha/story/world/pages/cornerstone/stories/written/cornerstone/mechanics/metrics/attributes/reach/cornerstone-reach.page-type.ts"
import { cornerstoneSight } from "akasha/story/world/pages/cornerstone/stories/written/cornerstone/mechanics/metrics/attributes/sight/cornerstone-sight.page-type.ts"
import { cornerstoneTouch } from "akasha/story/world/pages/cornerstone/stories/written/cornerstone/mechanics/metrics/attributes/touch/cornerstone-touch.page-type.ts"
import { cornerstoneWarmth } from "akasha/story/world/pages/cornerstone/stories/written/cornerstone/mechanics/metrics/attributes/warmth/cornerstone-warmth.page-type.ts"

export const worked = summingBy(
  [
    { of: cornerstoneTouch.slug, by: 1 },
    { of: cornerstoneSight.slug, by: 1 },
    { of: cornerstoneWarmth.slug, by: 1 },
    { of: cornerstoneProvision.slug, by: 1 },
    { of: cornerstoneMemory.slug, by: 1 },
    { of: cornerstoneReach.slug, by: 1 },
  ],
  0,
  "none"
)
