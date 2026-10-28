import type { TemperStatusEffect } from "akasha/temper/catalog/effect/temper-status-effect/temper-status-effect.page-type.types.ts"

export const diseased = {
  id: "01a05fc6-42c7-7c2f-8806-54ed3e556738",
  type: "page-type/temper-status-effect",
  slug: "diseased",
  title: "Diseased",
  key: "diseased",
  description: "Applies Minor Defile, reducing healing received and damage shield strength by 6%",
  esoAbilityId: 21925,
  effects: "jsonl",
  equations: ["<<1>> = 0.008 MaxStat + 0.084 MaxPower (Dmg, Disease, SingleTarget, Direct)"],
  createdAt: "2026-09-02T01:40:23.879Z",
  updatedAt: "2026-10-28T21:57:42.192Z",
} as const satisfies TemperStatusEffect
