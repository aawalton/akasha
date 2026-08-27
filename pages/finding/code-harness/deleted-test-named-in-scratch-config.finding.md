---
id: 27017247-bb55-5a71-8153-f9041aa4ae57
page-type-slug: finding
title: "Deleted test named in scratch config"
domain-slug: domain/global
---

# Claim

`tmpfs-scratch.config.json` in the code repository names a test file that no longer exists.

# Evidence

Line 24 of `tmpfs-scratch.config.json` lists `packages/agents/shared/hook-decision-log.unit.test.ts` with `entriesPerRun: 27`, inside the `pending` backlog.

Project 19103 deleted that test when it removed the turn-end decision-log duplicates from the code repository; the removal landed on main at `73c5174495`. At `9787854eb6`, `git ls-files` under `~/code` returns no tracked path matching `hook-decision`, `halt-census`, `interactive-census` or `legal-endings` — the config entry is the only surviving mention of the file anywhere in the repository.

Nothing reports it. `tsgo --build` over the workspace exits 0, and `check-ast-unused` returns OK with zero unused exports over 13,588 modules across 382 workspaces. Main pipeline 28034 at `9787854eb6` completed with all five workflows green.

What it costs is a reader: the `pending` list is a backlog of test files still writing outside tmpfs, and it now counts one file that cannot be worked.
