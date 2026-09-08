import type { Module } from "@akasha/code/module"

export const tsTimezoneViolations = {
  id: "01a08182-1312-7650-b817-1adb7f332561",
  pageTypeSlug: "module",
  slug: "ts-timezone-violations",
  definition: "the zone literals, hour-offset constants and day slices a source spells by hand",
  code: "ts",
} as const satisfies Module
