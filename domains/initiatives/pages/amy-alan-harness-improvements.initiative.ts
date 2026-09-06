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
        "The readout asks the tracking day for `strength-volume`, and no day page has carried that key since 2026-09-02. The `strength-points` rollup that would write it has no importer: its only caller was an ops-CLI wrapper that went when the CLI went. The newest health export on the Mac is `export-2026-08-09.zip`, so the samples that rollup reads stopped arriving as well. A live health-sample import and a caller for the rollup are both wanted here.",
    },
    {
      statement: "The Endurance stoplight shows a figure taken from data that arrives every day.",
      workingMemory:
        "The readout asks the tracking day for `active-calories`, and no day page has carried that key since 2026-09-01. `loadActiveCaloriesByDay` itself answers null from 2026-09-02 onward. The `day-active-calories` rollup that would write it has no importer: its only caller was an ops-CLI wrapper that went when the CLI went. The newest health export on the Mac is `export-2026-08-09.zip`. A live health-sample import and a caller for the rollup are both wanted here.",
    },
    {
      statement: "The Wisdom stoplight shows a figure taken from data that arrives every day.",
      workingMemory:
        "What Wisdom counts is already settled: the words Alan added about himself, ten thousand to the point. What is missing is whatever writes the count. The readout asks the tracking day for `wisdom-words`, no day page has ever carried that key, and the readout page says so in a stopgap. The `topic-words` rollup that would count them has no importer either.",
    },
    {
      statement:
        "The Intelligence stoplight shows a figure taken from data that arrives every day.",
      workingMemory:
        "What Intelligence counts is already settled: the words Alan added about what he is learning, ten thousand to the point. What is missing is whatever writes the count. The readout asks the tracking day for its own words key, no day page has ever carried that key, and the readout page says so in a stopgap. The `topic-words` rollup that would count them has no importer either.",
    },
  ],
} as const satisfies Initiative
