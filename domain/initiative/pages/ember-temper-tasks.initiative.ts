import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberTemperTasks = {
  id: "01a06cac-aa56-7519-8281-5622fa42a987",
  type: "page-type/initiative",
  slug: "ember-temper-tasks",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [],
  constraints: [
    "The watcher and the addons count as off-workstation, so they reach pages through page-service rather than by reading the repository.",
    "Supabase is used for auth and for nothing else.",
  ],
} as const satisfies Initiative
