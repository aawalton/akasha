---
id: 4527ceb2-f13d-5371-ac97-150579c85a56
slug: ambient-type-declaration-duplicate
page-type-slug: finding
title: "Ambient type declaration duplicate"
domain-slug: domain/temper
---

# Claim

Two ambient type-declaration files under `packages/temper/addons/types/libs/` — `lib-codes-common-code.d.ts` and `lib-extended-journal.d.ts` — both declare `LibCodesCommonCodeApi` and a global `declare const LibCodesCommonCode`, with conflicting `GetLibAddonMenu` return types; the conflict compiles silently because no tsconfig currently includes both files in one program, and nothing in the repo's checks asserts a global ambient declaration name appears once across the ambient type surface.

# Evidence

From project #16197 (domain: temper). Found by #16187's implementer while renaming batch B; surfaced rather than scope-crept, and explicitly NOT fixed there.

Files: `packages/temper/addons/types/libs/lib-codes-common-code.d.ts` and `packages/temper/addons/types/libs/lib-extended-journal.d.ts`. Both declare `LibCodesCommonCodeApi` AND `declare const LibCodesCommonCode`, with conflicting `GetLibAddonMenu` return types.

WHY IT COMPILES TODAY: no tsconfig pulls in both files, so the two declarations never meet in one program. The conflict is real and latent, not inert.

RISK NAMED IN NOTES: whoever widens a tsconfig glob first hits it, as a confusing duplicate-identifier or incompatible-declaration error surfacing in a package that touched neither file — the edit that reveals the defect reads as having caused it.

WHY IT'S INVISIBLE TO NORMAL CHECKS: this is an ambient-declaration duplicate. Neither file imports the other and no call site references both, so import-graph reasoning misses it. Nothing in the repo's checks currently asserts a global `declare const` or interface name appears at most once across the ambient surface.

DURABLE FIX SUGGESTED IN NOTES, not decided: a check that each ambient `declare const` / global interface name appears at most once across `packages/temper/addons/types/**` — a grant of enforcement, suppressing nothing, decide-by-default. The notes flag that the real duplicate count is unmeasured, since this pair was found by accident; there may be more such collisions in the same ambient surface. See also project #16198, the unowned ambient type-surface tail in the same directories.
