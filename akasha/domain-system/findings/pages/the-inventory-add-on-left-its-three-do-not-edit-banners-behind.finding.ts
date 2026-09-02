import type { Finding } from "../finding.page-type.ts"

export const theInventoryAddOnLeftItsThreeDoNotEditBannersBehind = {
  id: "01a0627e-66ef-7132-9c47-65aac3514999",
  pageTypeSlug: "finding",
  slug: "the-inventory-add-on-left-its-three-do-not-edit-banners-behind",
  domainSlug: "domain/temper",
  claim:
    "The inventory add-on's three generated tables each carried the directive `DO NOT EDIT — regenerate with: ops temper addon-data generate`. The recreation under akasha/temper/temper-items-addon imports the landed rules-core modules those tables were generated from, so the directive came across as nothing, and the three files the generator still writes now feed no code in akasha.",
  evidence:
    "`temper/game-items-addon/src/generated/rule-classify.generated.ts:9`, `rule-types.generated.ts:10` and `trait-mappings.generated.ts:8` each read `* DO NOT EDIT — regenerate with: ops temper addon-data generate`; 456 lines between them. The recreation at commit `ee3181a15b` resolves every symbol they exported to a landed module instead: the fifteen names of `rule-types.generated` to `@akasha/temper-items-rules-core/inventory-rule-compiler-types`, `inventory-rule-types`, `buy-rule-types` and `comparison-op`; the classifier tree to `@akasha/temper-items-core/item-category-tree-data`; the trait map to `@akasha/temper-items-core/eso-trait-reverse-map`. `grep -rl game-items-addon/src/generated tools akasha` names one generator, `tools/lib/check-workflow/check-configs-codegen.ts`, and one finding. Nothing under `akasha/` imports the three files. The `ops` CLI the banner names is refused for agents by a hook, so the instruction could not be followed from a seat even where it still applied. This sits beside `five-generators-still-write-item-rule-data-into-the-old-source`: that finding says the generators still write; this one says the add-on that read what they wrote no longer does.",
} as const satisfies Finding
