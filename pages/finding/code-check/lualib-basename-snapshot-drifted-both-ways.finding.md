---
id: 59315851-ff31-527a-8456-beb8f7603fe6
page-type-slug: finding
title: "Lualib basename snapshot drifted both ways"
domain-slug: domain/global
---

# Claim

`LUALIB_FEATURE_BASENAMES` in `check-no-class.ts` is a hand-copied snapshot of `LuaLibFeature`, and it has drifted in both directions. Its docblock claims drift can only be fail-loud, but the set holds `SourceMapTraceBack`, which the enum does not, so a polyfill created at that basename would be waved through. Four enum names are missing from the set the fail-loud way. Both directions are inert today by accident rather than by design.

# Evidence

Measured in `~/code` at `383bf60d35c15cd5d10cd07f39ac33ffb38e2bfa`.

Parsing both sets and differencing them: `LUALIB_FEATURE_BASENAMES` at `packages/infra/checks/src/checks/check-no-class.ts:59` holds 118 names; `LuaLibFeature` at `packages/temper/shared/build-deploy/tstl/src/LuaLib.ts:13` holds 121.

In the set and not the enum: `SourceMapTraceBack`. In the enum and not the set: `JSON`, `Performance`, `Scheduling`, `StructuredClone`.

The set's own docblock states the guarantee the first of those breaks: "Snapshot of the `LuaLibFeature` enum … Synced manually. If TSTL adds a new lualib feature, the gate will reject a matching new polyfill class until this set is updated — fail-loud, not silently-permissive." The gate permits a file at `**/lualib/src/<Basename>.ts` iff `<Basename>` is in the set (line 193), so a name in the set but not the enum is the silently-permissive direction the comment says does not occur.

Both directions are inert today, and by accident in each case. `git ls-files` matches no `lualib/src/SourceMapTraceBack.ts`, so nothing is being waved through yet; created, the gate would skip it whole. The four lagging names all have polyfill files — `lualib/src/JSON.ts`, `Performance.ts`, `Scheduling.ts` and `StructuredClone.ts` — and each declares zero classes, so none of them trips the rejection the comment describes.
