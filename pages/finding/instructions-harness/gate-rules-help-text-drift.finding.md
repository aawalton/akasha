---
id: 3e8d300b-cad3-521c-ae3d-78358ed042f2
slug: gate-rules-help-text-drift
page-type-slug: finding
title: "Gate rules help text drift"
domain-slug: domain/global
---

# Claim

`write.ts`'s help text hand-lists 11 of the 14 members of `GATE_RULES` (missing `kind`, `sibling-statement`, `claim-probe`), so its derived header count reads 14 correctly while the prose enumeration below it names only 11 — an Aggregate Derivation violation where the derived half stays right while the hand-listed half drifts, unnoticed because nothing tests the prose against the tuple.

# Evidence

Project #17335, domain `instructions-harness`, status someday_maybe, live-on commit. Captured, not defined — no objective was written.

Captured out of #17323's boundary: `deliver-17323` noticed this building the fourteenth gate rule, correctly declined to act, and reported *11 of 13*; verified here as worse than that.

Measured: `GATE_RULES` in `packages/agents/instructions/src/lib/gate-outcome.ts` has 14 members: `placement, frontmatter, token-ceiling, length, invocable, kind, sibling-statement, hub, link, routing, claim-probe, source-position, principle, repo-path`. `write.ts`'s help text hand-lists 11; missing `kind`, `sibling-statement`, `claim-probe`.

The header `${GATE_RULES.length} rules, all checked in-process…` is derived and correctly reads 14; the enumeration below it is prose and names eleven — a reader counting the list gets a different answer from the sentence introducing it.

This is the pure form of Aggregate Derivation: a displayed aggregate derives from the same run that produces its explanation. Here the aggregate derives and the explanation does not — the worst version, since the derived half keeps being right: a hand-list beside a hand-count drifts visibly, beside a derived count it drifts while looking maintained. Nothing tests the prose against the tuple; the package's own `CLAUDE.md` already records this failure mode for a duplicate table, so the knowledge existed and a second instance landed anyway.

Unexplored: derive the enumeration from the tuple (each rule carrying its own one-line gloss as data), or keep the prose and add a check asserting every `GATE_RULES` member appears in it — both live, neither tried.

Two adjacent surfaces likely to hold a third copy: `~/instructions/docs/gate-rules.md` still opens "The thirteen rules" (a #17314 post-deploy obligation, tracked separately), and the `SIBLING_POLICY` / per-rule tables may carry their own hand-lists.

Moved off the row's retired `notes` attribute on 2026-08-15.
