import type { Finding } from "../finding.page-type.ts"

export const twoTierVocabulariesStandAndTheNarrowerOneRefusesTheWiderScale = {
  id: "01a0687b-de90-7002-9871-fd234bf619aa",
  pageTypeSlug: "finding",
  slug: "two-tier-vocabularies-stand-and-the-narrower-one-refuses-the-wider-scale",
  domainSlug: "domain/akasha-migration",
  claim:
    "`tools/lib/surplus-fall/tier.ts` and `akasha/readout-system/readout-tier` are the same vocabulary rebuilt with different membership: five tier colours against six. Both are live and read the same akasha `readout-scale` pages. The narrower one does not misplace a rung it does not know — it throws — so the surplus-fall notifier fails closed on any scale that states an orange rung, and one such scale already stands.",
  evidence:
    'Measured 2026-09-03. `tools/lib/surplus-fall/tier.ts:1` declares `TierColor = "black" | "red" | "yellow" | "green" | "blue"`, five members. `akasha/readout-system/readout-tier/readout-tier.module.code.ts:1` declares the same name with six, adding `"orange"` between red and yellow. `Rung` is `{at, color}` in both. The consequence is not silent drift: `tools/lib/surplus-fall/readout.ts:87-91` filters the rungs it reads off the scale page through `isTierColor` and throws `"rungsOf: the readout scale `X` states a `orange` rung, and a fall is said in the five colors a tier carries"` on anything outside the five. `akasha/readout-system/readout-scales/pages/backlog-count.readout-scale.ts` is the one readout-scale page under akasha matching `orange`, so the fault is latent rather than firing: `tools/lib/surplus-fall/tick.ts:13` pins `GROUP_SLUG = "surplus"` and resolves its scale from that group, not from backlog-count. It fires the day the surplus scale gains an orange rung, or the day the notifier is pointed at another group. `akasha/readout-system/readout-group-serving/readout-group-serving.module.code.ts:18` reads the six-colour module, so the same scale page is already read two ways in one repository. Neither module was migrated in this lane: `tier.ts` still stands, because folding the five into the six is a behaviour change to a live notifier rather than a carry, and it wants the `decideFall`/`TIER_ORDER`/`FallDecision` surface — which akasha has no counterpart for — moving in the same step.',
} as const satisfies Finding
