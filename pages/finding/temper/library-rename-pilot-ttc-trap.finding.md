---
id: 4f222d9d-4c9d-5add-a28d-9f2c1604a9bf
slug: library-rename-pilot-ttc-trap
page-type-slug: finding
title: "Library rename pilot ttc trap"
domain-slug: domain/temper
---

# Claim

The pilot rename of LibTableFunctions-1.0 to TemperTableFunctions (executing Alan's third-party-library ruling from #16111) landed clean on a branch and stayed green, refuted the assumed "old folder survives a rename" trap since a manifest-driven prune already removes it, and surfaced the real blocking trap: TamrielTradeCentre depends on three other libraries by their original names, so renaming those needs a decision about where it gets its dependencies.

# Evidence

Project #16116, domain `temper`, no objective written; capture off its retired `notes` attribute 2026-08-15. Pilot for #16111 (Alan's ruling: no third-party addon distributed; ports being 100% TypeScript already — zero .lua files across 28 libraries — may just need renaming, not reimplementing).

Scope was the cheapest instance: LibTableFunctions-1.0, 5 ts files, 3/7 functions consumed, 16 call sites, one consumer (TemperCharacters). Rename to Temper identity end-to-end and delete the upstream-fidelity apparatus (oracle pin, fetch-upstream script, docs, bug register).

Verdict (2026-07-25T13:29Z): parked green, unlanded. Two commits, not deployed: `8d1e750` rename (24 files, one atomic commit — ESO hard-gates `DependsOn`), `538e6a0` fix-up. Identity: name/author/version updated, consumer edge dropped its version floor (per the `TemperHud` precedent). CI green: 97/97 steps (first run failed 1/97 legitimately, fixed by updating the assertion).

The assigned trap ("deploy installs but never uninstalls, old folder survives") is refuted: a manifest-driven prune (#12783) already exists — install the new name, then a drift sweep removes `manifestKeys minus deployables`. Observed 50 live dirs vs 49 repo addons (unmanaged one is TTC); a prior real rename (#15093 Bite 11) left no residue.

The real trap: TTC — the one third-party addon Alan keeps, Minion-installed, never Temper-stamped, unprunable — declares `DependsOn: LibAddonMenu-2.0>=40 LibCustomMenu>=730` and `OptionalDependsOn: ... LibHistoire`. ESO hard-gates `DependsOn`, so renaming LibAddonMenu-2.0/LibCustomMenu breaks TTC; renaming LibHistoire silently drops its TTC integration. LibAsync, LibDebugLogger, LibTableFunctions-1.0 return clean. Found in live `.txt` manifests, not the repo.

Deliverable 2: `packages/temper/addons/docs/library-rename-checklist.md` (200 lines), one agent doing ~23 sequential renames. Step 0 is four pre-flight aborts, first the TTC check with a positive control.
