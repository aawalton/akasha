import type { TemperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.types.ts"

export const abyssalInk = {
  id: "01a15f68-6749-7a08-9b59-25dcd2d9603f",
  type: "page-type/temper-debuff-other",
  slug: "abyssal-ink",
  title: "Abyssal Ink",
  key: "abyssal-ink",
  description: "Cephaliarch's Flail marks an enemy, and its caster deals 5% increased damage to it",
  effects: "jsonl",
  createdAt: "2026-10-21T17:00:40.137Z",
  updatedAt: "2026-10-21T17:00:40.137Z",
} as const satisfies TemperDebuffOther
