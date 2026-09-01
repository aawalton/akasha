import type { Finding } from "../finding.page-type.ts"

export const aWhereTestThePageStoreDoesNotKnowIsIgnored = {
  id: "01a05aec-eaaa-719c-9bfd-3621be9d798c",
  pageTypeSlug: "finding",
  slug: "a-where-test-the-page-store-does-not-know-is-ignored",
  domainSlug: "workspace-package/pages-system-service",
  claim:
    "A question's `where` is checked for its shape but not for its vocabulary. The store runs four tests and drops every other key without a word, so a caller spelling a test the store does not know is answered with every page of the type rather than the pages it asked for.",
  evidence:
    'Measured against the service on 127.0.0.1:8787 while it ran the code at dcec1c4f1a. Over `page-type`, which holds 65 pages: `{"slug":{"is":"finding"}}` answers 1 row, `{"slug":{"in":["finding","page","domain"]}}` answers 3, `{"partSlugs":{"has":"text-property/claim"}}` answers 1, and `{"extendsSlug":{"empty":true}}` answers 1. Every other spelling tried answers 65: `eq`, `equals`, `not`, `isNot`, `contains`, `startsWith`, `endsWith`, `gt`, `absent`, `present`, and the invented `bogusop`. `page-asking.module.code.ts` reads a test as an object and consults `is`, `in`, `has` and `empty`; a key it does not hold leaves every branch unentered, and the test passes. A value that is not an object is refused as `where.<key> is no test this takes`, and `{"is":true}` is refused because `is` takes a string, so the shape is judged while the vocabulary is not. This matters because the call sites of the deleted `@shared/pages-query` spell `at-or-after`, `before`, `contains` and `ends-with`, none of which the store runs: a reading meant to be one day\'s rows would come back as every row ever filed. `@akasha/pages-query` refuses a test it cannot name and runs the five the store lacks over the rows itself, so nothing there reaches this. Anything posting to `/ask` directly still does.',
} as const satisfies Finding
