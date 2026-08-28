---
id: 5ad74de7-7312-5925-a8d9-045e7afb4e12
slug: libsetslib-nine-duplicate-declarations
page-type-slug: finding
title: "Libsetslib nine duplicate declarations"
domain-slug: domain/temper
---

# Claim

`interface LibSetsLib`, declaration-merged across 15 `.d.ts` files in `packages/temper/shared/addon-libraries/lib-sets/src/types/`, has 9 of its 287 members declared more than once with differing types (measured with a brace/paren-depth-tracking parser) — a TS2717 condition masked only because the repo sets `skipLibCheck: true`, so each merged member's effective type currently falls out of declaration order rather than being checked or chosen.

# Evidence

From project #16214 (`temper`, `someday_maybe`, `live-on: deploy`), no objective — captured 2026-07-25, moved from `notes` 2026-08-15.

Defect: `interface LibSetsLib` merges across 15 `.d.ts` files under `lib-sets/src/types/`. For property declarations (unlike methods, which overload), TS requires merged members to share identical types — TS2717. Suppressed because `tsconfig.base.json:10` sets `skipLibCheck: true`, so the merged member's effective type falls out of declaration order.

Measured with a brace/paren-depth-tracking parser (a line regex miscounts multi-line function-type params as boundaries): 287 members on `LibSetsLib`, 9 declared twice with differing text.

The nine: `openMapOfZoneId`, `showWayshrineNodeIdOnMap`, `GetDropMechanicName`, `GetAllDropZones`, `GetAllDropLocationNames` (api-a/api-e vs. searchui); `SearchUI` (constants vs. searchui, differing shape); `GetDropMechanicTexture`, `GetZoneName`, `ShowSettingsMenu` (searchui vs. tooltips). `lib-sets-searchui.d.ts` is one side of 7 of 9 — re-declared what it consumed rather than relying on the existing declaration.

Why it matters: `lib-sets-tooltips.d.ts:24-29` forbids exactly this for `buildSetTypeInfo`/`BuildSetDataText`, then line 50 of the same file does it anyway for `GetZoneName`. The narrow-vs-wide split is the live hazard: one declares `zoneId: number`, another `zoneId: number | undefined` — code against the narrow one is unsafe for nilable callers, and nothing checks which declaration a call site resolved against. #16173's `GetZoneName` port implemented the wider parameter.

Scope: not a mechanical dedupe — each needs a correctness call on which type is right, checked against call sites; why #16173 did not absorb this inline. Suggested: find the true contract from implementation and upstream; keep one declaration in the owning layer, delete the other; prefer wider parameter/narrower return in doubt; consider disabling `skipLibCheck`, or a check catching a twice-declared member.
