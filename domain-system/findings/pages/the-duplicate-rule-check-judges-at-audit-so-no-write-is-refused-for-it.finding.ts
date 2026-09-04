import type { Finding } from "../finding.page-type.ts"

export const theDuplicateRuleCheckJudgesAtAuditSoNoWriteIsRefusedForIt = {
  id: "01a06303-88a4-7248-ae17-8670cf5abe69",
  pageTypeSlug: "finding",
  slug: "the-duplicate-rule-check-judges-at-audit-so-no-write-is-refused-for-it",
  domainSlug: "domain/temper",
  claim:
    "`no-rule-in-two-files` carries `runsOnPatch`, `runsOnWorktree` and `runsOnDeploy` all false and `runsOnAudit` true, so it never judges a write and cannot refuse one. Two files holding one rule land freely, whoever lands first, and whether or not they share a package. Its audit refusals are debt no writer is held up by. The check compares rule shape rather than slugs, so a report that a duplicate slipped past a slug test has read the wrong mechanism.",
  evidence:
    "Read at `f0154251b7`. `no-rule-in-two-files.code-check.ts:10` sets `runsOnPatch: false`, `:11` `runsOnWorktree: false`, `:12` `runsOnDeploy: false`, `:13` `runsOnAudit: true`, and the invariant at `:74` says the check judges at audit alone. The phase settings rather than the comparison are why a duplicate lands, and that is `Zero At Turning On` working as written: the whole-tree phases wait until the count is zero, and the count was 439 at `3dc359e66b`. The comparison itself is by rule shape. `no-rule-in-two-files.code-check.code.ts:39-49` walks `speltIn(path, text)`, drops each `one.forwards`, and groups by `one.rule` across every file the index names; nothing in it reads a slug. `code-rule.module.ts:14` says two functions say the same thing when their shapes match with each bound name read as its order. A second reason applies to the pair that prompted this, two spellings of `isDailyCraftingWritQuest` in one package: one member decomposed into `isWritCraftType` and `isDailyCraftingQuest` and the other did not, and `code-rule.module.ts:65` says the same rule written with statements reordered reads as another rule, so the pair may not match even at audit. Two seats reached the same wrong conclusion from this, first that landing order protected a duplicate and then that a shared package did. Neither holds, because nothing was ever consulted at write time. The practical guidance drawn from the wrong mechanism is still sound: search the package folder for a function name before minting a slug.",
} as const satisfies Finding
