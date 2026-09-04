import type { WorldSkill } from "../world-skill.page-type.ts"

export const keenShot = {
  id: "01a06575-9821-77bb-9c01-a28c06201358",
  pageTypeSlug: "world-skill",
  slug: "keen-shot",
  title: "Keen Shot",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["silverstake-spreadshot"],
} as const satisfies WorldSkill
