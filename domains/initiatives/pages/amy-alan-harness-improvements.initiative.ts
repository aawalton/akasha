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
        "The home screen draws a could-not-be-assembled notice instead, saying nothing answered for the `nav` page type before the app stopped waiting. Seen on Alan's phone at 5:59 on 2026-09-07, with Add and More drawn at the foot and no nav item between them. Atlas carries no nav page at all, so the two may share a cause.",
    },
  ],
} as const satisfies Initiative
