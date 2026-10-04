import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherCovenant = {
  id: "01a106e8-584a-7b6f-a673-503fe1c02e50",
  type: "page-type/world-skill",
  slug: "fairweather-covenant",
  title: "Covenant",
  world: "world/fairweather",
  description:
    "A passive Enthraller skill, gained at level 10: a Tether or a Claim pours strength into the one bound rather than out of her. A girl under Elsie's Tether adds a quarter of each of Elsie's attribute totals, as Devotion, Tribute and Fealty leave them, rounded down, to her own; under Elsie's Claim, a half. A girl under both takes the Claim's alone. Elsie loses nothing by it, and no skill reads what Covenant adds.",
} as const satisfies WorldSkill
