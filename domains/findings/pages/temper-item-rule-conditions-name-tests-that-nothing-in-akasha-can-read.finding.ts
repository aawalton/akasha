import type { Finding } from "../finding.page-type.ts"

export const temperItemRuleConditionsNameTestsThatNothingInAkashaCanRead = {
  id: "01a05fda-025e-75d1-9f24-fc31f60ddb99",
  pageTypeSlug: "finding",
  slug: "temper-item-rule-conditions-name-tests-that-nothing-in-akasha-can-read",
  domainSlug: "domain/temper-progress",
  claim:
    "`temper-rule-template` and `temper-comparison-op` recreate a small item-rule engine as pages, and the pages alone do not say what any rule does. What each condition field means, and which comparison applies to a field naming none, lived in temper's code and is written down nowhere in akasha.",
  evidence:
    '48 rule templates landed, 33 of them carrying a `conditions` entry file. Across those files 16 distinct fields occur: maxQuality (14), crafted (8), stolen (7), qualityOp (4), canInspire, canResearch, canUnlock, value (2 each), and canOpen, canGiveMaxRewards, targetQuantity, traits, known, reconstructed, transmuted, valueOp (1 each). Four of those files name an operator by the key of a `temper-comparison-op` page: `qualityOp` and `valueOp`, both holding `>=`. The other quality tests name no operator at all — `{"maxQuality":3}` on `companion-green-sell` reads as at most 3 only because the field is named `max`, which is a reading of the name rather than a fact any page states. `value` holds either the number 0 or the bare word `MIN_LISTING_VALUE`, a name resolved somewhere outside these pages. Every condition value is held as text because the values are numbers, words and lists together. The recreation models the rules faithfully as data and builds no evaluator, as it was told to.',
} as const satisfies Finding
