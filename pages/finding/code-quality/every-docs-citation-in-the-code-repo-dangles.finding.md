---
id: b007e480-5c43-5fcc-91cf-a456410c58b7
page-type-slug: finding
title: "Every docs citation in the code repo dangles"
domain-slug: domain/code-quality
---

# Claim

526 tracked TypeScript files in the code repo carry doc-comment citations to `docs/*.md` paths, and the repo contains no markdown file under any `docs/` path at all. Every non-fixture citation among them is dangling, and no check reports it.

# Evidence

Measured 2026-08-07 at `~/code` HEAD `d01942409a`, while ingesting two quarantined documents whose subjects cited such paths.

The population: `git grep -l "docs/[a-z0-9-]*\.md" -- '*.ts' | wc -l` returns 526.

The absence: `git ls-files '*.md'` returns 26 tracked markdown files for the whole repository, and `git ls-files '*.md' | grep -ci docs` returns 0. Not one sits at a path containing `docs`. The only tracked `docs/` directory holds TypeScript, at `packages/infra/workspace/cli/src/docs/`.

The targets were moved rather than deleted, which is why this reads as a live pointer rather than an obvious hole: the instructions repo holds them under quarantine at `dirty/code/`, named for the old path with separators flattened — `packages/agents/supervisor/docs/per-agent-monitors.md` stands there as `dirty/code/packages-agents-supervisor-docs-per-agent-monitors.md`, with seven supervisor siblings beside it. `git log` names the sweep: `7205e28efd`, "quarantine every instruction surface into the instructions repo".

The heaviest single targets, by citation count: `personas/docs/persona-storage-tiers.md` (42), `s/docs/build-and-swap.md` (26), `packages/temper/docs/data-to-pages-migration.md` (21), `packages/infra/checks/docs/acyclicity.md` (15). A handful of hits are test fixtures (`docs/a.md`, `docs/foo.md`, `docs/gone.md`) and are not part of the claim.

One package read closely as a sample: `packages/agents/supervisor/src/` carries 18 such citations, six of them to `docs/per-agent-monitors.md`, each in a module header offering it as where the monitor's doctrine is written.

A finding already on file, `doc-citations-point-at-deleted-files.md`, records four files in `packages/temper` naming two missing documents. That framing understates this by two orders of magnitude and points at deletion where the cause is a move.
