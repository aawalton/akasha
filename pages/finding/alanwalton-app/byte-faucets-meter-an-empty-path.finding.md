---
id: d150dfc6-946c-583d-9a48-8f29857e26e9
page-type-slug: finding
title: "Byte faucets meter an empty path"
domain-slug: domain/alanwalton-app
---

# Claim

All four of the fleet's byte faucets meter a path holding no markdown. Abby, Ali, Lali and Talia each carry `faucetAggregate: bytes` and a `pointsPathPrefix` of `packages/books/<book>/`, resolved against the CODE repo, where all four prefixes return zero markdown files; the corpora live in `~/books`. Each row is coherent and passes the deployed guard, so four personas are dark by construction and the zero reads as a quiet day.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/persona-craft/economy-decisions-faith.md`.

The rows, read live through `ops page list --type persona --properties slug,greenDayPoints,faucetKind,faucetAggregate,pointsPathPrefix --limit 100 --json` (42 rows). All four carry `greenDayPoints 10000`, `faucetKind windowed`, `faucetAggregate bytes`:

    abby   packages/books/all-about-alan/
    ali    packages/books/book-of-everything/
    lali   packages/books/my-math/
    talia  packages/books/my-faith/

The paths are empty in the repo the faucet resolves them against. In `~/code`, `git ls-files "packages/books/<book>/**/*.md"` returns 0 for each, and `git ls-files packages/books/` returns 31 files, none markdown. In `~/books` the same four books hold 424, 274, 1 and 2 markdown files. `faucet-engine.ts:229` passes `repoRoot` — the code repo — to `readNetBytesForWindow` with the prefixes line 152 resolves from the row.

Nothing reports it. `PERSONA_FAUCET_COHERENCE_RULES` in `packages/alanwalton/personas/core/src/faucet-coherence.ts` requires only that a `bytes` aggregate carry a `pointsPathPrefix`, never that the prefix resolve to anything, so all four pass. `ops persona daily-standing abby --json` returns `dailyGreenDays 0`, which is also what a day with no writing looks like.

What this adds to two standing findings. `alanwalton-app/abby-faucet-scans-the-wrong-repo.md` names the defect for Abby and closes saying "I did not read Abby's persona row, so the prefix value is `balance.ts`'s claim rather than my measurement"; the row is read here and confirms it. `alanwalton-app/faucet-cannot-observe-its-metered-author.md` notes in passing that Lali's prefix holds no markdown there. Neither establishes the population: this is the whole byte-metered family, four of forty-two personas, not one stale row.

Not established: whether the repair is repointing the rows or moving the faucet's repo root, and whether any `totalPoints` reflects points earned before the corpora moved.
