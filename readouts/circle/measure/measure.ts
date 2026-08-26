import type { ReadingUnit } from "../circle.ts"

const MEASURE_DRAWN_AS: Readonly<Record<string, ReadingUnit>> = {
  hours: "hours",
  levels: "level",
  "green day units": "ratio",
}

const MEASURE_DRAWN_WHOLE: ReadingUnit = "whole"

export function readingUnitOf(measure: string): ReadingUnit {
  return MEASURE_DRAWN_AS[measure] ?? MEASURE_DRAWN_WHOLE
}
