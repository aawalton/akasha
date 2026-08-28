---
page-type-slug: finding
title: "Untested and already red"
domain-slug: cluster-check/cluster-check-codegen-type-identity-drift
---

# Claim

Nothing green stands over this check. Neither `infra/cluster-checks/src/checks/check-codegen-type-identity-drift.ts` nor `infra/cluster-checks/src/lib/codegen-type-identity-drift.ts` has a test of any kind, so a change to the extraction or to the pair registry is guarded only by someone running the check. The one automated instrument that does reach the file, `biome check`, already fails on it.

# Evidence

Checked on 2026-08-28. `infra/cluster-checks/src/lib/` holds about sixty `*.unit.test.ts` files, one beside nearly every module there, so a unit test per lib module is the house form in that directory. `codegen-type-identity-drift.ts` and `codegen-type-identity-pairs.ts` have none. The only test in that directory whose subject is adjacent is `repo-root.unit.test.ts`, which covers `repo-root.ts` alone. `infra/cluster-checks/src/checks/` likewise holds unit tests beside many checks, and none for `check-codegen-type-identity-drift.ts`.

A whole-tree search for `codegen-type-identity` returns five files: the check, the two libs, a generated declaration under `dist/`, and `tools/lib/check-workflow/check-configs-codegen.ts`. None of them is a test.

`bunx biome check infra/cluster-checks/src/checks/check-codegen-type-identity-drift.ts` reports 2 errors on 2026-08-28. The imports are unsorted, and the formatter would break the long `../../../../tools/lib/check-workflow/violation-reporter` import at `:23` across four lines.

`pages/finding/code-check/self-test-controls-unwatched.finding.md` records three other checks with no test file beside them, and this check is not one of the three. `pages/finding/code-quality/legal-endings-untested.finding.md` is the precedent for filing a bare observation that a module has no test.

Not measured: I did not establish whether any suite exercises the check indirectly through the workflow, and I did not establish whether the biome failure is inside or outside the file set a gate runs biome over, so I cannot say whether it is red on a gate today or only when biome is pointed at the file.
