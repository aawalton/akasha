---
id: 685a28bd-96ee-51b0-ae64-b79eb257765b
slug: libsets-search-drops-term
page-type-slug: finding
title: "Libsets search drops term"
domain-slug: domain/temper
---

# Claim

In the LibSets addon, `/libsets search <term>` silently discards the search term because `lifecycle-slash-commands.ts:246-249`'s debug-path token-stripping helper (written to remove two leading tokens) is also called on the search branch, which has only one leading token, so the search always runs with an empty argument list.

# Evidence

From project #16027 (domain `temper`, status `someday_maybe`, captured 2026-07-25, owned by ember, child of #15872 "Temper in-game readiness audit — find/fix/verify via Nimue's agent-control engine; Milestone-1 (GATED)"). Encountered by a core/ reader, 2026-07-25.

`lifecycle-slash-commands.ts:246-249`'s `removeStandardDebugSlashCommandOptions` is written for the debug path, per its own comment — it shifts two leading tokens ("debug", then the type). It is also called from the search branch (`:266-268`), which has only one leading token. Emitted Lua (`dist/LibSets/LibSets.lua:50613-50626`) does `table.remove(options, 1)` twice.

Player-visible effect: `/libsets search dawnbreaker` produces options `{"search","dawnbreaker"}`, both get removed, `slash_search({})` runs, the `slashOptions.length > 0` guard at `:74` is false, and the UI just toggles open with no search applied — no error, looks like a no-result search or a bare window-open.

Diagnosable because the sibling command works: `/lss dawnbreaker` routes through `slash_search_helper` (`:87-90`), which does no shift, so the same intent succeeds one way and silently fails the other.

Affects every localized alias in `callSearchParams` (`header.ts:71-79`): `suche`, `cherche`, `buscar`, `поиск`, and the rest — so non-English players hit it on the natural-language form of the command.

Fix direction recorded, not built: do not call the debug-path helper from the search branch; shift one token, or give the search branch its own single-shift helper. The project called the naming the root cause: a function named `removeStandardDebugSlashCommandOptions` called from a non-debug branch is the defect announcing itself, and it survived because the name was in the call and nobody read it.
