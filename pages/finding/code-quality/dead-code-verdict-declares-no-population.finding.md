---
id: 7e1d5f02-223d-5d41-a208-5226fe5049c9
slug: dead-code-verdict-declares-no-population
page-type-slug: finding
title: "Dead code verdict declares no population"
domain-slug: domain/code-quality
---

# Claim

`ast-unused` returns zero unused exports across the whole estate while printing `[POPULATION NOT DECLARED]` and skipping 201 workspaces outright, so a clean verdict and a verdict over a population nobody assembled are the same output.

# Evidence

Measured 2026-08-04 by this lead while verifying #17834, run at `packages/infra/checks/src/checks/check-ast-unused.ts` with no `--tree-sha`.

Stdout, whole: `[check-ast-unused] OK — 10610 module(s) analyzed across 174 workspace(s), 9315 entry file(s), zero unused exports [POPULATION NOT DECLARED]`. Exit 0. The `--json` variant emits no diagnostic line at all and `{"coverage":null}`.

Three readings sit under that one line. Zero unused exports over 10,610 modules is the whole estate's answer, not one package's. 9,315 of those modules are entry files, which is 88 per cent seeded as reachability roots. And stderr carries a `skipping workspace "…" — no entry in ast-unused.config.json` line per workspace with no configuration; 201 workspaces sit in `pendingCuration` and are not analysed.

The instrument itself is sound where it looks: an `entry` glob match seeds a module `entry-reached`, which roots it without crediting its own exports, so entry seeding is not what produces the zero. What is unmeasured is the denominator — the check declares no population, and the workspaces it cannot see are reported to stderr rather than to the verdict.

This is not the claim #17834's first objective made. That one held that the entry set in `packages/agents/instructions` suppressed reporting, which was tested and falsified. This is the same class of defect found one level up, in the estate-wide run rather than in one package's configuration.
