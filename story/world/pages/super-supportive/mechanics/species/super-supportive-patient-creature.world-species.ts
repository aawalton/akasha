import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportivePatientCreature = {
  id: "01a0e9fc-be83-7250-a7fc-99812c61ec7a",
  type: "page-type/world-species",
  slug: "super-supportive-patient-creature",
  title: "Patient creature",
  world: "world/super-supportive",
  description:
    "A spiny urchin-like river creature whose young are glowing, transparent jelly-butterflies.",
} as const satisfies WorldSpecies
