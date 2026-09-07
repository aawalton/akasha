import type { Initiative } from "../initiative.page-type.ts"

export const amyAlanHarnessImprovements = {
  id: "01a07679-5492-7992-ab84-cc889f134678",
  pageTypeSlug: "initiative",
  slug: "amy-alan-harness-improvements",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  intents: [
    {
      statement: "Alan can see how much each widget on his phone is used.",
      workingMemory:
        "The counting path is landed whole: a widget's `opens` link names that widget after `#widget=`, `deep-link-open-sync` posts `/api/widget-tap`, and `countTap` writes `taps` and `lastTappedAt`. No tap has ever been counted. The shipped Swift carries the link without the fragment. `alanwalton-attribute-stoplights` carries no `opens`. Nothing shows the counts: no view, no readout, no detail screen names them.",
    },
    {
      statement: "Alan's nav items load in the native app.",
      workingMemory:
        "The cause is fixed and live at fa63d016: the page and page-type routes answer the shell's preflight 204 with the cross-origin headers, and read a bearer token as well as a session cookie. Verified from here with `Origin: capacitor://localhost` and Alan's bearer: nav answers 200 carrying 24 rows, and page types answers 464. What is unseen from here is his phone drawing them.",
    },
    {
      statement: "Alan reaches the akasha commands tree from a panel in his editor.",
      workingMemory:
        "Asked by Alan on 2026-09-07: a panel parallel to the ones the extension already draws, opening on akasha, then its namespaces and top-level commands, then what sits under each. The tree is the `command` and `namespace` pages, which is what the walk behind `akasha --help` reads. Nothing here is read yet: which panels the extension draws, and how one is registered, is unchecked.",
    },
    {
      statement: "Alan's Endurance stoplight shows a reading rather than zero.",
      workingMemory:
        "Reported by Alan on 2026-09-07, a second time: the stoplight reads zero while `akasha measure attributes` prints `Endurance 0 0.17`. The data is landing — the 06:30 run patched 2026-09-04 and 2026-09-07, and 2026-09-07 carries activeCalories 69.742. So what diverges is what the stoplight reads against what the measure reads, rather than what the harness has. Which of the two columns the stoplight is meant to show is unasked.",
    },
    {
      statement: "The git origin clears the debris an aborted push leaves behind it.",
      workingMemory:
        "On 2026-09-07 the origin's 4.6G volume filled and every push was refused with `unable to create temporary object directory`, which stopped both deploys. The fill was 59 `tmp_objdir-incoming-*` quarantine directories dating back to 2026-08-27 and one 1.05G `tmp_pack_*`; clearing those by hand freed 1.9G and left the volume at 60%. Nothing under `git-transport` runs `git gc` or prunes, so it refills at roughly six abandoned pushes a day.",
    },
    {
      statement:
        "A climbing scale stating no black rung is read as one whose black rung is at zero.",
      workingMemory:
        "`readout-scale.page-type.ts` says `Black is at zero unless a scale moves black`, and `rungsIn` in `readout-tier.module.code.ts` does not do it, so a reading under the first rung draws neither an arc nor a figure. Alan met it on the attributes, where `blackAt: 0` was stated by hand on 2026-09-07. The same hole is open on activity-calories, green-day-units, plant-grams, safety-level and sleep-hours. In `rungsIn` it must skip a falling scale and allowance-hours.",
    },
  ],
} as const satisfies Initiative
