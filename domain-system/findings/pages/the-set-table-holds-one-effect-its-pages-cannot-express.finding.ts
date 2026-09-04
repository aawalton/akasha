import type { Finding } from "../finding.page-type.ts"

export const theSetTableHoldsOneEffectItsPagesCannotExpress = {
  id: "01a06130-20c0-72ff-bfd1-ef8782c92261",
  pageTypeSlug: "finding",
  slug: "the-set-table-holds-one-effect-its-pages-cannot-express",
  domainSlug: "domain/temper",
  claim:
    "temper-set.generated.ts and the temper-set pages differ by 26 characters, and neither the file nor the generator has fallen behind. The generator reproduces the pages faithfully and the pages are short one datum. `bonus-effects` declares metric-id, effect-type and effect-value, all three required, so a bonus effect naming a buff rather than a metric has nowhere to sit and was dropped on the way into akasha. Regenerating would write that loss into the file, which is its only surviving record.",
  evidence:
    'The table holds 707 sets in the same order in both copies, so nothing here moves a position in the ordered id list and the codec is untouched. Of 2,463 bonus entries in the checked-in file exactly one effect carries no metricId: mighty-chudan\'s two-piece bonus holds `{"buffId":"major-resolve"}`, 26 characters, which is the whole difference. That line has not changed since 0e69821019, the commit that moved every package into akasha, so it predates the pages rather than drifting from them. The page carries that bonus with its description and no effects list at all, and akasha/temper/temper-catalog/temper-gear/properties/bonus-effects.record-property.ts declares metric-id, effect-type and effect-value with all three required, so the shape cannot hold a buff. Because the declaration is `required: false, many: true`, an absent list is legal and nothing refused. temper-set.module.code.ts reads effects through `z.looseObject({})` and passes every field but `id` through unchanged, so it would emit a buffId if the page carried one; it emits an empty list because `bonus.effects ?? []` finds nothing. Separately, all 707 rows agree on icon content but 537 order the keys differently: the file orders them by key length and then alphabetically, the generator alphabetically throughout. That is byte-neutral, which is why the census saw only 26 characters, but it means a regeneration would rewrite 537 rows and bury the one real loss among them.',
} as const satisfies Finding
