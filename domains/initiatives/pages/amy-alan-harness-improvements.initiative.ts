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
        "The readout asks the tracking day for `strength-volume`, and no day page has carried that key since 2026-09-02. `rollupStrengthForDay` has no caller, and the shape to copy is `active-calories-service`: a run block over the four days ending today, and a timer naming it. The volume itself comes from `dayVolume` in `session-volume`, which counts a day's exercise sessions and refuses a day where no bodyweight is stated. `session-volume` declares that no client profile page exists, so what that weight is read from is unsettled.",
    },
  ],
} as const satisfies Initiative
