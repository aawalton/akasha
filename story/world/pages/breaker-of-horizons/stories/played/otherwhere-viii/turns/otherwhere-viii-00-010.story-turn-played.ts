import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereViii00010 = {
  id: "01a0eafc-8347-7a74-b829-89f89304d373",
  type: "page-type/story-turn-played",
  slug: "otherwhere-viii-00-010",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-viii"],
  position: 10,
  stepStatus: "step-status/game-master",
  action:
    '"I\'m not familiar with lenses and focuses from experience, but from the mathematics alone, either you are actively trying to trick me or I have a lot to teach you. The obvious answer is that the product of the lines and the focus is inches is a fixed value of one hundred twenty, I can read that off your columns. So, two lines would be sixty inches and fifteen lines would be eight inches. Likewise, you could solve for any case you need with a simple algebraic equation of `L * F = 120`. If you know one, you can calculate the other through simple division. If you were to draw the curve it would be concave in the first quandrant with asymptotes at zero for both the X and Y axes."',
  lore: ["lore/otherwhere-viii-scholarship", "place/otherwhere-viii-the-institute"],
} as const satisfies StoryTurnPlayed
