import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const salveOfRenewal = {
  id: "01a0e13c-001b-7745-9a69-79283102accc",
  type: "page-type/temper-champion-star",
  slug: "salve-of-renewal",
  title: "Salve of Renewal",
  description:
    "Whenever you remove a harmful effect from yourself or an ally, you sanctify the ground beneath them and heal them and allies within 8 meters for 6400 Health. This effect can occur once every 10 seconds",
  esoChampionSkillId: 260,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 92,
} as const satisfies TemperChampionStar
