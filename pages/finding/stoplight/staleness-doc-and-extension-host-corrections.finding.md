---
id: fa1c45a5-37e3-54a1-9a79-8a602fcb4f14
page-type-slug: finding
title: "Staleness doc and extension host corrections"
domain-slug: domain/stoplight
---

# Claim

Project #17552 (domain `stoplight`), captured by `amy-lead` 2026-08-02 after #17546 landed, records `docs/ambient-hud-staleness.md` naming five status-bar slot ids (`opsStatusBar.projects.singleton.{blue,yellow,orange,purple,green}`) #17546 removed, violating the document's own stated defense against exactly this; a same-day correction found "#17537 carries no extension host" false — the host still launches, only 34 of 95 builtin extensions with `main`/`browser` are removed.

# Evidence

Project #17552, domain `stoplight`. Captured by `amy-lead` 2026-08-02, right after #17546 landed. Three leftovers, none reported by any check.

**1. Staleness audit names five dead slot ids.** `docs/ambient-hud-staleness.md` lists `opsStatusBar.projects.singleton.blue/.yellow/.orange/.purple/.green`. #17546 moved the merge inside `foldProjectProgress`; the status bar reads that fold, so the singleton section is gone — stale within hours of landing. The document broke its own stated limit: rows are "keyed to the endpoint and its payload struct rather than to a frozen field list" — the status-bar section is exactly that. Nothing reports it: #17539's D4 declined a check over the document on grounds shown wrong on that tree's own definition reading.

**2. Two dead SQL sites still map singleton to parent.** `get_status_bar_snapshot.sql:119` (`doneTodayBySpecies`) and `:137` (per-row `species`) — #17546 established both read by nobody: `get-status-bar-snapshot.ts` doesn't declare `doneTodayBySpecies`, the fold reads `row.track`, no Swift decodes either.

**3. Not surveyed:** other sites naming the old ids or species keys. Doc correction more urgent (Alan may read it); SQL retirement smaller.

**Correction, 2026-08-02T18:45:55.131Z.** "#17537 carries no extension host" is false; conclusion survives, mechanism doesn't. The host launches once with nothing to activate, `Install from VSIX` stays contributed; removed are 34 of 95 builtins carrying `main`/`browser` — the other 61, declarative, stay (tokenisation, language id, theme, icons). Both Alan's extensions (Claude Code's, `alanwalton.@agents/vscode-extension` rendering his ambient HUD) are activating, still retired — #17539's standing unchanged. Source: #17543's Q2 already said the host keeps launching; #17537's identical C8 was dropped for that reason. Reached `docs/ambient-hud-staleness.md` on main; correction tracked here with the five slot ids.

Capture ended at a paragraph boundary; never defined, carries no objective.
