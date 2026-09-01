import type { Finding } from "../finding.page-type.ts"

export const theTileLosesItsNoneLeftWordsToASlugSeamBetweenTheTwoReadoutSystems = {
  id: "01a05e40-8ad2-7c6d-90c9-cb1b22461bfc",
  pageTypeSlug: "finding",
  slug: "the-tile-loses-its-none-left-words-to-a-slug-seam-between-the-two-readout-systems",
  domainSlug: "domain/alan-harness",
  claim:
    "The categorization tile never draws its none-left words or emoji, because the code asks for the akasha slug while the runtime answers from the markdown tree where that readout is named `unreviewed`.",
  evidence:
    "`readout-categorization.module.code.ts:11` names `monarch-unreviewed-transactions` and hands it to `readNoneLeft` at :47. `readout-none-left.module.code.ts:30` matches it against `rows.find((r) => r.values.slug === readoutSlug)` over the `readouts-all` page-query, which is `readouts/readout/readouts-all.page-query.md`. `readouts/readout/readout.page-type.md` makes `readout` a markdown page type, so `reaches()` answers true and a pod resolves it from `/app/repo` rather than from the store. The markdown slugs are `unreviewed`, `five-hour-back`, `weekly-back`, five `inboxes-*` and six `upkeep-*`; `monarch-unreviewed-transactions` is nowhere under `readouts/`. So the find misses and lines 53-54 drop both keys. The scale survives only because `backlog-count` carries the same slug on both sides.\n\nThe root of it is that `RingScale` and the body `{unreviewed, scale?, noneLeftWords?, noneLeftEmoji?}` are declared inside `monarch-unreviewed-transactions.readout.code.ts:3-15`, so `readout-scale-reading.module.code.ts:3` imports a specific readout to know what every scale is.\n\nThe repair is one change and cannot be smaller: `imports-inside` refuses any edit to `readout-scale-reading` or `readout-none-left` while they import `@shared/pages-query`, so lifting the type, dropping the two hard-coded slugs, and repointing onto `@akasha/pages-system-service/calling` land together with their three tests, both `api.categorization.ts` routes, Jenny's route test, `readout-system/package.json`, and the `BacklogScale` anchor in `tools/lib/check-workflow/widget-payload-shape-mirror.ts:36-42`. A pod reaches akasha pages already: asked from inside `alanwalton/web`, the store answers 200 with the readout and the scale.",
} as const satisfies Finding
