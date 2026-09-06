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
        "The readout asks the tracking day for `strength-volume`, and no day page has carried that key since 2026-09-02. The `strength-points` rollup has no caller, and the shape to copy is `active-calories-service`: a run block over the four days ending today, and a timer naming it. Whether the health readings that rollup counts are arriving is unchecked. The road in is `akasha track health import`, which reads the newest export in `~/Downloads` on this workstation before reaching the macbook.",
    },
    {
      statement: "The Endurance stoplight shows a figure taken from data that arrives every day.",
      workingMemory:
        "Built and proven. `active-calories-service` runs the rollup every ten minutes over the four days ending today, and `spannedWindow` closes the day being lived at the ESO day's end so today counts at all. Days 09-02, 09-03 and 09-04 read 161, 543 and 409 calories. Nothing reads for 09-05 or today: the phone holds no activeEnergy after 2026-09-05T04:36Z, every such reading comes off the Apple Watch, and the step counts off the iPhone reach this morning. What is left is the watch handing its backlog to the phone.",
    },
  ],
} as const satisfies Initiative
