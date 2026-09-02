export type ArmorWeightId = "no-weight" | "light" | "medium" | "heavy" | "shield"

export type StandardArmorWeightId = Exclude<ArmorWeightId, "shield">
