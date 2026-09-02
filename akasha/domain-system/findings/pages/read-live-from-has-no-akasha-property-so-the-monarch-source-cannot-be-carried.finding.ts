import type { Finding } from "../finding.page-type.ts"

export const readLiveFromHasNoAkashaPropertySoTheMonarchSourceCannotBeCarried = {
  id: "01a0641a-d59b-7969-a13f-820e1245001a",
  pageTypeSlug: "finding",
  slug: "read-live-from-has-no-akasha-property-so-the-monarch-source-cannot-be-carried",
  domainSlug: "workspace-package/readout-system",
  claim:
    "The markdown `unreviewed` readout declares `read-live-from: monarch`. The akasha readout page type declares no such property, so the value cannot be carried by an edit at all: it wants a page type change first. It is the only declaration of how the categorization reading is sourced, and akasha's twin carries neither an equivalent nor a `querySlug`.",
  evidence:
    'Measured 2026-09-02.\n\n`readouts/readout/readout-read-live-from.page-property-definition.md` defines it as "the outside service a readout reads at the moment it is drawn, where no query answers it." `readouts/readout/unreviewed.readout.md` is the only readout stating it, with the value `monarch`.\n\n`akasha/readout-system/readouts/readout.page-type.ts:73-93` declares 19 properties and none of them is `read-live-from`. Grep for `read-live-from` and `readLiveFrom` over every `.ts` and `.tsx` under `akasha/` returns zero files.\n\n`akasha/readout-system/readouts/pages/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.ts` carries no `querySlug` and no source property of any kind. Its invariants describe the Monarch call itself, the whole Cookie header taken in, the CSRF token split out, the ten-second give-up, so the reading is plainly known to come from outside. Nothing on the page states which service it comes from.\n\nWhy this is worse than a missing value: a missing value is an edit to one page, while a missing property is a change to the page type every readout answers to. That wants a change of its own rather than being folded into a data migration, which is why this is filed and not fixed.',
} as const satisfies Finding
