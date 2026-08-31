import type { Finding } from "../finding.page-type.ts"

export const aGreenGateLetARedChangeLand = {
  id: "01a05866-f70d-7287-8fd9-80973cfb6cb2",
  pageTypeSlug: "finding",
  slug: "a-green-gate-let-a-red-change-land",
  domainSlug: "domain/checks-system",
  claim:
    "A change landed with every check green and left fifty-eight tests failing, six of them in the test standing beside a code file that same change carried. The gate runs the tests belonging to the paths a change names rather than the tests those paths are proved by, so a code file is changed and the test proving it never runs.",
  evidence:
    "Landing `c13a8654b3` said `27 checks judged the 5 paths asked for, and none refused`. That change carried `identifier-names-one-page.check.code.ts`; `akasha test` over `indexes`, `page-type` and `checks-system` straight afterwards failed 58 tests across four files, six of them in `identifier-names-one-page.check.test.ts`, the test standing beside that very code file. Another 25 failed in `page-matches-its-type.check.test.ts`, which is proved through `page-type-properties.module.code.ts`, a second of the five paths. Neither test file was itself carried by the change. The change was taken back in `c35b1e5640`, after which the same run passed 882 of 883, the one remaining failure belonging to another seat's work in flight.",
} as const satisfies Finding
