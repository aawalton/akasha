import type { Finding } from "../finding.page-type.types.ts"

export const aFixtureStatingNeitherPageTypeKeyTestsNothingAndStaysGreen = {
  id: "01a0882f-d053-7942-a518-798261273824",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-fixture-stating-neither-page-type-key-tests-nothing-and-stays-green",
  domain: "domain/test-fixture",
  claim:
    "A test whose fixture is an untyped value bag states a page-type key that the code under test reads through the two-key fallback. Once the old key goes, the fixture states neither key, the reader answers null before it reaches what the test is named for, and the test stays green having exercised nothing. Nothing flags it, because a value bag is untyped and the answer the test asserts is the same answer by a shorter path. This is the shape of a test asserting an absence going green when its subject vanishes, wearing a positive assertion as its disguise.",
  evidence:
    '`pages/indexes/reaching/reaching.module.test.ts:150` asserts `known.slugOfKeyIn({ pageTypeSlug: "domain" }, "partSlugs")` is null. `reaching.module.code.ts:185` reads `textAt(value, "type") ?? textAt(value, "pageTypeSlug")` and line 186 answers null where that is null; the disambiguation the test is named for is lines 187 and 188. Today the fixture reaches it and answers null because the key is not carried. With the fallback gone the fixture states no type, line 186 answers first, and the assertion still passes. It is the only assertion in that file reaching those lines: the positive ones at 134 and 135 leave at line 184 on `held.length === 1`. Three shapes of this were met in one day: this one, `subagent-presence.module.test.ts:99` asserting the presence of the old key and nothing about the new one, and the eleven `*.test-fixtures.ts` files restating page bodies that no typechecker reads.',
} as const satisfies Finding
