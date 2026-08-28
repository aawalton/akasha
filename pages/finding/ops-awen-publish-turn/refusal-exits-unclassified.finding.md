---
id: b2cbf568-f018-56f7-8880-7aa159f878a2
slug: refusal-exits-unclassified
page-type-slug: finding
title: "The publish-turn command exits 70 where its four siblings exit 2 on the same probe"
domain-slug: domain/global
---

# Claim

`ops awen publish-turn` exits 70 where its siblings exit 2. Given a game that does not exist it refuses correctly and writes nothing, but returns the unclassified-defect code, which establishes nothing about what went wrong. `commit-entity`, `commit-turn`, `update-game` and `update-doctrine-pack` all exit 2 — the data-error code — on the same probe.

# Evidence

Found during the review-instructions reading of `domains/ops-awen.md` on 2026-08-19, by running all five commands `--dry-run` against a game that does not exist.

Measured: the exit code of those five commands on that one probe. Not measured: whether `publish-turn` exits 70 on every refusal or only this one, and whether any other awen command shares the fault.
