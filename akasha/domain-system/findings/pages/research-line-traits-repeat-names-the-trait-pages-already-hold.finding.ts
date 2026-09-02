import type { Finding } from "../finding.page-type.ts"

export const researchLineTraitsRepeatNamesTheTraitPagesAlreadyHold = {
  id: "01a06178-6a91-7001-a2d8-7b4da0658408",
  pageTypeSlug: "finding",
  slug: "research-line-traits-repeat-names-the-trait-pages-already-hold",
  domainSlug: "domain/temper",
  claim:
    "The 324 `traits` entries recreating `trait-research-data.generated.ts` hold three distinct trait lists between them, and 22 of their 23 distinct names are already the titles of `temper-armor-trait`, `temper-weapon-trait` or `temper-jewelry-trait` pages. The 23rd is `Well-fitted`, which the trait page spells `Well-Fitted`, so the recreation carries a name the trait pages disagree with rather than reaching the page that settles it.",
  evidence:
    "Measured on 2026-09-02 against the pages landed in d33fc444a4.\n\n`akasha/temper/temper-catalog/temper-pursuits/research-lines/` holds 36 `temper-research-line` pages and 36 `traits` sidecars, 324 rows over 27,412 bytes of jsonl, 42,949 bytes for the cluster. Each row states `trait-index` and `trait-name`.\n\nThe 324 rows hold three distinct lists. 12 lines carry the weapon list Powered, Charged, Precise, Infused, Defending, Training, Sharpened, Decisive, Nirnhoned. 22 lines carry the armor list Sturdy, Impenetrable, Reinforced, Well-fitted, Training, Infused, Invigorating, Divines, Nirnhoned. 2 lines carry the jewelry list Arcane, Healthy, Robust, Triune, Infused, Protective, Swift, Harmony, Bloodthirsty. What a list belongs to is the shape of item rather than the line, and no page states the three lists.\n\n23 distinct names run over the 324 rows, spending 2,788 bytes of trait-name text. 22 of the 23 are page titles already: `temper-weapon-trait` carries 12 titles, `temper-armor-trait` 12, `temper-jewelry-trait` 12. The one that does not is `Well-fitted`; `temper-armor-trait` titles the same trait `Well-Fitted`. Nothing refuses the disagreement, because `trait-name` is `akasha/temper/temper-catalog/temper-pursuits/research-lines/properties/trait-name.text-property.ts` with a null `name-format-slug` and no relation to a trait page.\n\nThe emitted file spells it `Well-fitted`, so the generator reproduces `trait-research-data.generated.ts` byte for byte only by carrying the spelling the trait pages contradict.",
} as const satisfies Finding
