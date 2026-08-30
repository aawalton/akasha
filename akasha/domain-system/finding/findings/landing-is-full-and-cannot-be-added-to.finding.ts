import type { Finding } from "../finding.page-type.ts"

export const landingIsFullAndCannotBeAddedTo = {
  id: "01a05230-d24a-7fc4-b6e0-dd6938112956",
  pageTypeSlug: "finding",
  slug: "landing-is-full-and-cannot-be-added-to",
  domainSlug: "domain/command-system",
  claim:
    "The landing module has run out of room in both its code and its tests, and its fixtures refuse any edit at all. Nothing more can be pinned there until it is split into modules that each hold one thing.",
  evidence:
    "Measured rather than reasoned. `landing.module.code.ts` stands at 14,225 bytes and `landing.module.test.ts` at 14,475, against a 15,000 byte ceiling: 775 and 525 bytes of room. A test of the hook a landing runs once the checks have passed — that a path the hook added is put back where the landing then fails — comes to about 550 bytes written plainly, and does not fit. Moving its fixture into `landing.module.test-fixtures.ts` was refused for a reason of its own: that file already spells `indexIn` as `holding.module.test.ts` spells it and `butTheStamp` as `indexing.module.test.ts` spells it, and `no-rule-in-two-files` refuses the file the moment it is touched. Both duplications are of test files, which nothing imports, so neither can be cleared by importing the other. What the module holds is at least four things standing together: the git cat-file reader and the bodies it answers, the gate's loading, the write-and-put-back, and the landing itself. The reader alone is a third of the code file. Until they stand apart, the module is closed to anything that would state itself in a test.",
} as const satisfies Finding
