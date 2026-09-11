import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aranyaOnePackage = {
  id: "01a0876f-87da-77c3-9e65-8d261c7cbf2d",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "aranya-one-package",
  domain: "domain/akasha",
  persona: "aranya",
  parent: "initiative/akasha-folder-shape",
  intents: [
    {
      statement: "No file names another file by a relative path.",
      workingMemory:
        "22 refusals over 124568 files, from 85324 at the start, and all 22 are subagent pages, which are mortal and drain as they are reaped. Every hand-written specifier is folded and all thirteen composers are mended, so nothing writes a relative specifier any more. A subagent page written after the mend is root-spelled, seen across two seats. The check runs at change now and refuses one there, proved by a deliberate violation that was refused and dropped.",
    },
    {
      statement: "A check refuses a relative path.",
      workingMemory:
        "The check runs at change and refuses a relative specifier there, proved by a deliberate violation that was refused and dropped. runsOnWorktree, runsOnDeploy and runsOnAudit are still false: each reads the whole tree, which holds 22 refusals, all subagent pages draining as they are reaped. The page type calls for running at change before the count reaches zero, which this check own invariant had contradicted; that invariant is restated.",
    },
  ],
} as const satisfies Initiative
