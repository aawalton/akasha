import type { PartnersTalent } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/talents/partners-talent.page-type.types.ts"

export const partnersAlanTheLink = {
  id: "01a0de4f-edd8-7824-8df8-94d45dc54166",
  type: "page-type/partners-talent",
  slug: "partners-alan-the-link",
  title: "The Link",
  story: "story-played/partners",
  character: "character-player/partners-alan",
} as const satisfies PartnersTalent
