import type { Initiative } from "../initiative.page-type.ts"

export const amyAlanHarnessImprovements = {
  id: "01a07679-5492-7992-ab84-cc889f134678",
  pageTypeSlug: "initiative",
  slug: "amy-alan-harness-improvements",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  intents: [
    {
      statement: "The Strength stoplight shows a figure taken from data that arrives every day.",
      workingMemory:
        "The readout asks the tracking day for `strength-volume`, and no day page has carried that key since 2026-09-02. Two pieces are missing. The `strength-points` rollup has no caller, and the shape to copy is `topic-words-service`, the timer running `topic-words.module.code.ts`. The samples that rollup reads stopped as well: the newest Apple Health export on the Mac is `export-2026-08-09.zip`, checked on 2026-09-06, so Alan sends a fresh one off his phone before any of this reads.",
    },
    {
      statement: "The Endurance stoplight shows a figure taken from data that arrives every day.",
      workingMemory:
        "The readout asks the tracking day for `active-calories`, and no day page has carried that key since 2026-09-01. `loadActiveCaloriesByDay` answers null from 2026-09-02 onward. The `day-active-calories` rollup has no caller, and the shape to copy is `topic-words-service`, the timer running `topic-words.module.code.ts`. The newest Apple Health export on the Mac is `export-2026-08-09.zip`, checked on 2026-09-06, so Alan sends a fresh one off his phone before any of this reads.",
    },
  ],
} as const satisfies Initiative
