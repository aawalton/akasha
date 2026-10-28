import type { TemperStatusEffect } from "akasha/temper/catalog/effect/temper-status-effect/temper-status-effect.page-type.types.ts"

export const concussed = {
  id: "01a05fc6-42c7-73da-830f-9717c9e35d8f",
  type: "page-type/temper-status-effect",
  slug: "concussed",
  title: "Concussed",
  key: "concussed",
  description: "Applies Minor Vulnerability, increasing damage taken by 5%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.879Z",
  updatedAt: "2026-10-28T21:24:57.225Z",
} as const satisfies TemperStatusEffect
