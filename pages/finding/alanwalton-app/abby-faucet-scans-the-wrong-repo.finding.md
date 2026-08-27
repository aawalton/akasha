---
id: e4e552ee-7606-54a2-a6ee-58a174d13c3f
slug: abby-faucet-scans-the-wrong-repo
page-type-slug: finding
title: "Abby faucet scans the wrong repo"
domain-slug: domain/alanwalton-app
---

# Claim

Abby's daily faucet counts her writing under a path the corpus has left, while her balance ledger was moved to follow it, so the two surfaces score the same work against different repositories. `balance.ts` reads `all-about-alan/**/*.md` in the books repo; the faucet reads her persona row's `pointsPathPrefix`, which `balance.ts` says still carries the old `packages/books/…` value, against the code repo — where no markdown under that path remains.

# Evidence

Read 2026-08-07 at the working tree of `~/code`.

`packages/alanwalton/abby/cli/src/abby/balance.ts:41` — `const BOOKS_MD_PATHSPECS = [":(glob)all-about-alan/**/*.md", ":(glob)all-about-alan/*.md"]`, under a docblock reading "Relative to the BOOKS repo, which is where the prose moved. The Abby persona row's `pointsPathPrefix` still carries the old `packages/books/…` value and no longer mirrors this — known-broken pending the points rebuild." What that comment does not say is that a second live consumer reads the row.

`faucet-engine.ts:229` — `readNetBytesForWindow(repoRoot, getEsoDayWindow(dayStr), recipe.pointsPathPrefixes)`, where line 152 resolves those prefixes from the row's `pointsPathPrefix`.

`run-commit-points.ts:217` passes `repoRoot`, the code repo. The same file resolves a separate `bookRepoRoot` at line 131. Two roots in one file, and the faucet gets the code one.

`git ls-files "packages/books/all-about-alan/**/*.md"` in `~/code` returns 0; `git ls-files packages/books/` returns 31 files, none markdown. `git ls-files all-about-alan` in `~/books` returns 427.

The surfaces disagree today: `ops abby balance` gives `netBytes 4777582`, `level 4`; `ops persona daily-standing abby` gives `dailyGreenDays 0`, `dailyColor none`.

Measured 2026-08-08. `ops page show` on Abby's row returns `pointsPathPrefix packages/books/all-about-alan/`, `totalPoints 4693255` — my measurement now, not `balance.ts`'s claim. Talia's row carries the same shape against `packages/books/my-faith/`, so this is the class and not one row.

`net-bytes-points.ts:20-30` declares both halves at module level: the persona-row faucet "scans one root for every row, so the four book personas read zero there", and the rows "still carry the old `packages/books/…` values. Both are known-broken pending the points rebuild, not oversights." A declared gap with a named remedy — what stands unsaid there is still the second live consumer.

Still not established: I did not run the faucet, and a zero green-day count is also what a day with no commits looks like.
