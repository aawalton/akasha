import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionStart = {
  id: "01a060f9-badc-70b2-a9a4-5672a001af3e",
  pageTypeSlug: "module",
  slug: "dungeon-champion-start",
  definition: "bringing the addon up once the game has loaded",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Settings are brought up before pins are registered.",
    },
  ],
} as const satisfies Module
