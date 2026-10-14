import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberInfiniteArchiveSoloBuild = {
  id: "01a13aaf-dce3-74f0-9153-b091cba32189",
  type: "page-type/initiative",
  slug: "ember-infinite-archive-solo-build",
  domain: "domain/temper-player",
  persona: "persona/ember",
  constraints: ["Alan approves each intent and each constraint before it is added."],
  createdAt: "2026-10-14T13:52:46.306Z",
  updatedAt: "2026-10-14T13:52:46.306Z",
} as const satisfies Initiative
