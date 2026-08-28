---
id: c761430e-6f00-54ef-83cd-220118b00f41
slug: definition-covers-two-areas
page-type-slug: finding
title: "Definition covers two areas"
domain-slug: domain/ops-cli
---

# Claim

The Definition of `domains/ops-instructions.md` takes two clauses to cover its area, and the 36 files it governs split along them.

# Evidence

`domains/domain-definition.md` states that where a second concern is needed to cover the area, the area is more than one domain. The review of `domains/ops-instructions.md` on 2026-08-15 reports the split as real: the commands that read and write the repository on one side, and on the other the four daemons plus run-checks, run-tests, run-gates, seat, sweep-seats, turn-end-* and compose-*, which run the harness. It verified the frontmatter glob against exactly 36 files carrying `instructions` in `repos:`. Whether this is one domain or two was not judged. The file split was not re-checked here.
