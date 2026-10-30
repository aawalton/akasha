import type { Value } from "akasha/alan/value/value.page-type.types.ts"

export const health = {
  id: "019eb7d0-f6ed-73b7-8495-21dfdac80cd2",
  type: "page-type/value",
  slug: "health",
  definition: "how Alan keeps his body well",
  label: "Health",
  description:
    "Health represents my care for my physical body, including eat, move, sleep, and hygiene.",
  color: "color/blue",
  place: 3,
  unit: "green day units",
  scale: "readout-scale/green-day-units",
  groups: ["readout-group/values"],
  parts: ["domain/fitness"],
  createdAt: "2026-06-11T17:53:05.773Z",
  updatedAt: "2026-10-30T16:39:28.558Z",
} as const satisfies Value
