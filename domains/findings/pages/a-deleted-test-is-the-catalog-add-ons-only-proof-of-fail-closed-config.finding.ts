import type { Finding } from "../finding.page-type.ts"

export const aDeletedTestIsTheCatalogAddOnsOnlyProofOfFailClosedConfig = {
  id: "01a063b0-9da1-79be-afb7-075547fa1d86",
  pageTypeSlug: "finding",
  slug: "a-deleted-test-is-the-catalog-add-ons-only-proof-of-fail-closed-config",
  domainSlug: "workspace-package/temper-catalog-core",
  claim:
    "`temper/catalog-addon/src/side-file-config.unit.test.ts` went at `09f964f5c5` on 2026-08-30, 74 lines and ten cases, under a message about ablating task pages. Nothing in akasha holds `getPendingInvalidation`, so those ten are the only record of what its validation refuses. At the tip the add-on and akasha are at parity with zero tests each, which would license the ablation.",
  evidence:
    "The body is at `git show 09f964f5c5^:temper/catalog-addon/src/side-file-config.unit.test.ts`. `git log --diff-filter=D` over the folder answers that one path and no other; the folder arrived whole at `0e69821019` and has lost nothing else.\n\n`git grep getPendingInvalidation -- akasha/` answers nothing across 16,192 tracked TypeScript files under `akasha/temper`. `temper-catalog-side-file` is named for file paths and the side file rather than the in-game config global, so it is no twin.\n\nSix cases hold a fail-closed rule that reads as an ordinary guard and is a choice: an absent global, a non-object payload, a missing `version`, a non-numeric `invalidateVersion`, an `invalidateDomains` that is no array, and an array carrying a non-string each answer `undefined` rather than a partial view.\n\nTwo carry the `--all` encoding, and a reader gets them backwards. An absent `invalidateDomains` is normalised to `[]`; one already `[]` is preserved. Both answer the same value by different routes, so collapsing them looks right against either case alone.\n\nOne is a sentinel rather than a range check: `version` at `0` answers `undefined`, zero being the placeholder written before the host fills it in. The tenth is the well-formed payload.\n\nNot one of the ten is a compile-time claim, so no typecheck and no build reports their loss.",
} as const satisfies Finding
