---
id: f6560c16-0702-5bb5-a377-b368c561ee4e
page-type-slug: finding
title: "Intra package move uncovered"
domain-slug: domain/global
---

# Claim

A directory move inside one package passes every instrument a developer can run locally, while surfaces holding the old path literal stay broken until branch CI.

The package-move tooling keeps a registered list of files carrying workspace-path literals, and it fires on a package move. Nothing fires on a move within a package, so the same class of stale literal has coverage on one shape of the change and none on the other.

# Evidence

Observed while landing #18131 on 2026-08-07, which moved `lib/`, `types.ts` and `utils/test/setup` under `src/` in three workspaces to drain the `check-tsconfig` allowlists.

Four surfaces held stale path literals after those moves: `retired-status-scan.ts`, `status-rank-boundary.ts`, the `work-surfacing-surfaces.ts` table, and `ast-unused.config.json` — two checks, a surface table and a config.

The seat that landed it reports local typechecks, lint and per-package tests all green with three of those four still broken. Only branch CI refused. That is the part worth keeping: the instruments a developer reaches for before pushing agreed the tree was sound while three surfaces named directories that no longer existed.

The package-move tooling holds a registered list of files that hardcode workspace-path literals, so the class is known and its sites are enumerated. Its trigger is a package move. A `lib/` to `src/` move inside one package reaches none of it.

Not measured: how many surfaces carry workspace-path literals in total, whether the registered list is complete for package moves, whether any instrument other than branch CI would eventually have caught these four, and how often an intra-package move happens. The four sites above are what one project turned up, not a survey.
