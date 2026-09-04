import type { Finding } from "../finding.page-type.ts"

export const anEffectRowIsSpelledOneWayInAkashaAndAnotherInTheMarkdownPages = {
  id: "01a061b7-dc39-7444-b16d-e702ec390fb6",
  pageTypeSlug: "finding",
  slug: "an-effect-row-is-spelled-one-way-in-akasha-and-another-in-the-markdown-pages",
  domainSlug: "domain/temper",
  claim:
    "Every effect row beside an akasha page spells `type` and `value`; every one beside a markdown page spells `effect-type` and `effect-value`, which is what the property declares. That is 534 akasha rows across 17 page types disagreeing with their own declaration, and no check refuses one, because the fields of a page-property-entry are never judged against the rows. One reader knows both spellings, which is what keeps the disagreement invisible.",
  evidence:
    "Measured 2026-09-02 over every `*.effects.jsonl` in the repository.\n\nUnder `akasha/`: 295 files, 534 rows. `type` on 384, `value` on 336, `effect-type` on none, `effect-value` on none. Under `pages/`: 73 files, 96 rows. `effect-type` on 96, `effect-value` on 96, `type` on none, `value` on none. The split is total, and no file mixes the two.\n\n`effects.page-property-entry.ts` declares `effect-type` and `effect-value` among its fields and declares neither `type` nor `value`. Every field is optional, so a row naming none of them is well shaped, and a row naming two fields the entry never declared is well shaped too.\n\nWhat holds it together is `eitherOf` in `tools/lib/temper-addon-data/catalog-sidecars.ts`, which asks for both spellings so neither half answers null. Its own comment says why. So the rows read correctly today through that one function and would misread through any reader written from the declaration.\n\nThe hazard is which way a seat repairs it. A seat meeting the 187 `temper-skill` rows alone reads those rows as the wrong ones and renames them, which leaves 347 akasha rows on the old spelling and makes skills the one akasha page type spelled the markdown way. The measurement across every page type is what turns that from a skills defect into a choice between two spellings, and the choice belongs to whoever owns both.\n\nAlso true of `id`: all 534 akasha rows and all 96 markdown rows carry one, no generator emits it, and every reshape drops it separately.",
} as const satisfies Finding
