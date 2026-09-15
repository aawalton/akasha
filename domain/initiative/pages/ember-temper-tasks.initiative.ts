import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberTemperTasks = {
  id: "01a06cac-aa56-7519-8281-5622fa42a987",
  type: "page-type/initiative",
  slug: "ember-temper-tasks",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "A filed inventory scan carries a row for every slot, bag and currency it holds.",
      workingMemory:
        "A scan lands as a page with the whole scan in the data file beside it, and nothing turns that scan into the rows the page type declares: stacks, locations, bagSizes, currencies, craftingLevels and placedFurnishings. The 151 pages filed before carry those rows, so a page filed now is thinner than one filed in August. The scan nests locations, bags and slots, whose ids are keys rather than fields. A row renames itemName to title and requiredCP to requiredCp, and a currency key is a page slug.",
    },
  ],
  constraints: [
    "The watcher and the addons count as off-workstation, so they reach pages through page-service rather than by reading the repository.",
    "Supabase is used for auth and for nothing else.",
  ],
} as const satisfies Initiative
