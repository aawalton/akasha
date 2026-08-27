---
id: 6b005b5a-5cbb-520a-8794-7acee4473186
slug: validator-unreachable-but-cited
page-type-slug: finding
title: "Validator unreachable but cited"
domain-slug: domain/pages-system
---

# Claim

`validatePageData` in `@shared/pages-core` is a ~200-line per-definition validator with 82 unit tests, zero production callers, and no export from the package index — and `schema/pages.ts` tells its reader, in prose, that value validation happens downstream in it. So the write boundary reads as guarded at a function unreachable from outside the package and called by nothing inside it.

# Evidence

Read 2026-08-07 against `~/code`. Three legs, probed separately.

NO PRODUCTION CALLER. `rg "validatePageData" --type ts --glob '!**/dist/**' --glob '!**/*.test.ts'` returns three lines: the definition in `packages/shared/pages/core/src/schema/validate-page-data.ts`, a `{@link}` reference in that same file's doc comment, and the prose line below. Every other occurrence is a unit test.

NOT EXPORTED. `rg "validatePageData" packages/shared/pages/core/src/index.ts` returns nothing. The control is its sibling in the same module: the same grep for `evaluateSelectWrite` returns `export { evaluateSelectWrite, type SelectWriteViolation } from "./schema/validate-page-data"`. The index does draw from that file — it draws the other symbol.

THE COMMENT, WHICH IS THE SHARPER HALF. `packages/shared/pages/core/src/schema/pages.ts` carries in prose: "Only validates the identifying triplet (id, title, type); per-type config and value validation happen downstream in validatePageData and propertyTypeOpsRegistry." A reader is told a downstream validation exists, stops looking, and it is not there. Dead code costs storage; a false assurance costs the check somebody then does not write.

IT COULD NOT CLOSE THE HOLE IT IS NAMED FOR EITHER. Its loop at `validate-page-data.ts:209` reads `for (const def of propertyDefinitions)` and takes `properties[def.id]` at :217, so a key with no definition is never visited and never rejected.

NOT CLAIMED: that the code should be deleted. A validator worth wiring up and residue worth removing are different dispositions, and this measures neither.

Searched `~/memory/findings/` first: `rg -l -i "validatePageData|validate-page-data" findings/` returns nothing. `pages-system/proc-subset-checker-unwired.md` is the same shape on a different subject — `findForbidden` and the absent `check-proc-subset` gate.

Recorded emptying `dirty/skills/pages-system/findings.md`, which held this dated 2026-07-28 and is queued for removal.
