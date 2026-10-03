import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherKeep = {
  id: "01a10219-3a23-7a98-9a5c-4bb210ad0bcc",
  type: "page-type/world-skill",
  slug: "fairweather-keep",
  title: "Keep",
  world: "world/fairweather",
  description:
    "An Enthraller skill that keeps a person within the caster's bond, out of anyone else's reach.",
} as const satisfies WorldSkill
