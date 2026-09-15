import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberRepairTemperTasks = {
  id: "01a06cac-aa56-7519-8281-5622fa42a987",
  type: "initiative",
  slug: "ember-repair-temper-tasks",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "The rules a player automates are pages rather than one JSON blob.",
      workingMemory:
        "All 82 are pages under temper-inventory-rule, and the browser and the watcher read them there. What the pages carry matches the blob's 82 exactly: same ids, same order, same fingerprints, same sell block. The browser writes a changed rule as a page, takes away the page no rule wants, and writes nothing to the blob. The watcher exported 82 rules into 90,683 bytes of Lua, against 216 for an account with none. Left: the CLI, which wants @akasha/pages-access, and the 82 still in the blob.",
    },
  ],
  constraints: [
    "The watcher and the addons count as off-workstation, so they reach pages through page-service rather than by reading the repository.",
    "Supabase is used for auth and for nothing else.",
  ],
} as const satisfies Initiative
