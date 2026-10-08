import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherKeep = {
  id: "01a10219-3a23-7a98-9a5c-4bb210ad0bcc",
  type: "page-type/world-skill",
  slug: "fairweather-keep",
  title: "Keep",
  world: "world/fairweather",
  description:
    "An Enthraller skill that keeps a person within the caster's bond, out of anyone else's reach.",
  createdAt: "2026-10-03T14:09:30.147Z",
  updatedAt: "2026-10-03T14:09:42.000Z",
} as const satisfies WorldSkill
