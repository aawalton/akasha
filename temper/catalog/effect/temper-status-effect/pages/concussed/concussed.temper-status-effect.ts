import type { TemperStatusEffect } from "akasha/temper/catalog/effect/temper-status-effect/temper-status-effect.page-type.types.ts"

export const concussed = {
  id: "01a05fc6-42c7-73da-830f-9717c9e35d8f",
  type: "page-type/temper-status-effect",
  slug: "concussed",
  title: "Concussed",
  key: "concussed",
  description: "Applies Minor Vulnerability, increasing damage taken by 5%",
  esoAbilityId: 21487,
  effects: "jsonl",
  equations: ["<<1>> = 0.008 MaxStat + 0.084 MaxPower (Dmg, Shock, SingleTarget, Direct)"],
  createdAt: "2026-09-02T01:40:23.879Z",
  updatedAt: "2026-10-28T21:57:42.192Z",
} as const satisfies TemperStatusEffect
