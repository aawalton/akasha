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
  ],
} as const satisfies Initiative
