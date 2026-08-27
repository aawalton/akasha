---
id: 7b23f97e-e48f-5f71-8130-e153b1cc630c
slug: two-steps-still-claim-lockfile-coverage
page-type-slug: finding
title: "Two steps still claim lockfile coverage"
domain-slug: domain/global
---

# Claim

`check-unused-deps` carries a registry comment listing `bun.lock` among what it watches, and it does not wake on a lockfile-only change. The node type it would need now exists — #18594 added `lock-file` and seeded it on the playwright entry alone — so closing it is one line plus the judgment about whether that check's reach should grow.

# Evidence

Measured by dalla on 2026-08-11 against the real watch graph built over `project-18682`, running the entry's own declared seeds through `closureIntersectsChangedFiles`:

  unused-deps   bun.lock: false    packages/infra/checks/package.json: true

The manifest column is the control: the seed set is live and selects on the class it does cover, so the `false` is a miss rather than an empty probe. Seeds were passed as a `ClosureSeeds` object; a bare array returns true for every input through the permissive-empty branch at `matcher.ts:271`.

`check-configs-source-scanners.ts:135` lists `bun.lock` first among the legacy globs for this check.

`check-postinstall` carried the same false claim at `check-configs.ts:81-82` and measured the same `false`, and that check was removed entirely under #18603 — bun gates postinstall on `trustedDependencies`, which it never read. So one of the two closed itself.

`check-unused-deps` walks the workspace import graph; whether a lockfile regeneration is a change it must re-judge is a question about that check's reach, which is why #18594 correctly declined to widen it from inside a project about the playwright gate.
