import type { Finding } from "../finding.page-type.ts"

export const thePoiAndCompletionTypeLabelsRepeatDownEveryEntryRow = {
  id: "01a06175-dbd4-7001-a387-0357421988d0",
  pageTypeSlug: "finding",
  slug: "the-poi-and-completion-type-labels-repeat-down-every-entry-row",
  domainSlug: "domain/temper",
  claim:
    "The POI type group and the completion type group were flattened into their leaf rows, so `poi-type-label` repeats down 2077 rows for 8 distinct labels and `completion-type-label` repeats down 3795 rows for 14. The generators regroup and check that a group's rows agree on one label. This was chosen over two further page types so the three tables would need one page type between them.",
  evidence:
    "Measured on 2026-09-02.\n\nThe repeated labels come to 26,907 characters across the 2077 POI rows and 52,512 across the 3795 completion rows, against 8 and 14 distinct labels. The 8 are Standard, Wayshrines, Achievement Components, Achievements, Objectives, Public Dungeons, Group Dungeons, Houses. The 14 run from Priority Quests to Group Delves.\n\nThe labels are not captured from the game. They are constant maps in `akasha/temper/temper-catalog-generators/poi-catalog-tier/poi-catalog-tier.module.code.ts` and `akasha/temper/temper-catalog-generators/zone-completion-catalog-tier/zone-completion-catalog-tier.module.code.ts`, keyed by the type number the capture does report. So the label is a fact about the type rather than about the place, and carrying it once on 8 and 14 pages of their own would say that better.\n\nWhat argued against it: the seat brief settled that one new page type carries all three tables, and two more page types would each want a `getPages` fetch, an `AddonDataPages` field and a `page-row-totals.ts` line in `tools/lib/temper-addon-data/`, which several seats were editing at once.\n\n`akasha/temper/temper-catalog/temper-world/location-types/` was read first and is not these types. Its 7 pages are bank, character, companion, craftbag, guild, house and housing-storage, which is where a character's things are held.\n\nThe safeguard against the repetition going wrong is in the generators: `labelOf` in each throws where the rows of one type in one zone disagree on the label.",
} as const satisfies Finding
