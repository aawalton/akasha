---
id: 91fb30de-f40f-56bf-93d5-7ed453022b1e
page-type-slug: finding
title: "Lualib basename copy has drifted"
domain-slug: domain/global
---

# Claim

The lualib carveout in `check-no-class.ts` is keyed on a hand-maintained copy of TSTL's `LuaLibFeature` keys, its header calls that copy "Synced manually", and it has drifted in both directions. Nothing measures the drift, so the gate is green either way.

# Evidence

`LUALIB_FEATURE_BASENAMES` in `packages/infra/checks/src/checks/check-no-class.ts` holds 118 entries. `LuaLibFeature` in `packages/temper/shared/build-deploy/tstl/src/LuaLib.ts` holds 121 keys. Comparing the two sets:

Upstream but not in the gate — `JSON`, `Performance`, `Scheduling`, `StructuredClone`. All four have live polyfill sources at `packages/temper/shared/build-deploy/tstl/lualib/src/`, so those four files are scanned rather than skipped. They pass today only because none of them declares a `class`; the one match for the word in `StructuredClone.ts` is comment text and a thrown string. This is the direction the header claims is safe — the gate rejects a new polyfill rather than widening — and it is safe, but it is already firing on four real files rather than being hypothetical.

In the gate but not upstream — `SourceMapTraceBack`. No `LuaLibFeature` key of that name exists, and no file stands at `packages/temper/shared/build-deploy/tstl/lualib/src/SourceMapTraceBack.ts`. The entry licenses a path nobody occupies: because `isLualibPolyfill` is a `preFileSkip`, a file created there would be dropped before it is opened, and every class shape inside it would pass unexamined — expression, anonymous, extending anything.

Nothing cross-checks the two sets. `rg` for `LUALIB_FEATURE_BASENAMES` across the repo returns only its declaration and its single use inside `check-no-class.ts`; there is no test, no check and no generator holding it to `LuaLib.ts`.

Measured 2026-08-07 against `~/code` at the checkout this seat read.
