import type { Initiative } from "../initiative.page-type.ts"

export const athenaSeatMigration = {
  id: "01a0536a-1d25-72cd-a5d8-617864bb7013",
  pageTypeSlug: "initiative",
  slug: "athena-seat-migration",
  domainSlug: "workspace-package/seat-system",
  personaSlug: "athena",
  parentSlug: "akasha-seats",
  intents: [
    { statement: "Every reader of a seat reads it from akasha." },
    { statement: "No seat and nothing beside a seat stand outside akasha." },
  ],
  constraints: [
    "An akasha file imports nothing tracked from outside, and the `imports-inside` check refuses one that tries.",
    "A seat writes its page as it works rather than being backfilled.",
    "A seat nobody sits in is swept rather than carried.",
    "A file on a live path is left consistent at every edit, the worktree being shared and unbuilt.",
    "A moved reader refuses a root it finds no seat under.",
    "What is unregistered or broken is migrated as it stands and rebuilt on the new stack afterwards.",
    "A writer that must honour a `max` checks it before writing, since nothing checks an uncommitted value against its property.",
    "The four turn keys are left out rather than migrated.",
  ],
} as const satisfies Initiative
