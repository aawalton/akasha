---
id: 70a0417c-18b8-55db-8954-197095fd5be8
slug: addon-init-never-executed
page-type-slug: finding
title: "Addon init never executed"
domain-slug: domain/temper
---

# Claim

`check-addon-sandbox-load` proves only that a Temper addon bundle's Lua parses and its top-level chunks execute — it never fires `EVENT_ADD_ON_LOADED`, so the init path (`onLibraryLoaded -> createUIStuff -> initSearchUI -> InitializeFilters`) has never executed under any gate this repo has, including the exact function that crashed in the field.

# Evidence

Project #16177, domain `temper`, status `someday_maybe`, no objective; moved off retired `notes` 2026-08-15. Found by ember while fixing #16155's ghost function; flagged out-of-scope there, correctly not worked.

Observation: `check-addon-sandbox-load` was green before and after the crash. It proves a bundle's Lua parses and top-level chunks execute; it never fires `EVENT_ADD_ON_LOADED`, so it never reaches `onLibraryLoaded -> createUIStuff -> initSearchUI -> InitializeFilters`. `InitializeFilters` — the exact function that threw in the field — has never executed under any gate in the repo.

Why it matters: Aranya's predicate — the pass state and the instrument-failure state produce the same observation; green meant "bundle parses" OR "addon is fine," one symbol. Ember: "Green meant 'the thing I measured is right'."

Type system was a second blind rung, inverting the usual assumption: the `.d.ts` declared `lib.GetSpecialZoneNameById`; every call site type-checked clean. A declaration is an assertion, not evidence — here it hid the defect by promising a member nothing assigns. Both cheapest reliability rungs (types, checks) were green on a defect that crashed on the first real reload.

Blast radius: every Temper addon's init path is equally unexercised; the crash surfaced only because a deploy prompted a `/reloadui`.

Candidate work (captured, not scoped): (1) fire `EVENT_ADD_ON_LOADED` in the sandbox so the gate exercises init, not parse; (2) two-sided acceptance is a hard precondition on (1) — must be proven to FAIL on the pre-fix ghost-function tree (a known-bad input in history); (3) name what the gate proves in its own output, per the #16048 convention — cheap, independent of (1).

Evidence grade: observed, with a two-sided control from reality — gate green on both broken and fixed trees, field crashed on the broken one. Encountered, not sought.
