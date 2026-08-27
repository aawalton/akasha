---
id: 465c8f4e-ecb0-5778-affa-187349fdef3c
slug: the-definition-names-a-row
page-type-slug: finding
title: "This service's Definition says it books onto a row while the service reads and writes files"
domain-slug: domain/global
---

# Claim

This service's Definition says it books onto a tracking row, and the service reads and writes
daily-tracking files. The word is the one thing a Definition carries, and under
`Ubiquitous Naming` a name moved in one layer and not the rest is two names. Read 2026-08-20.

# Evidence

The Definition entry: "the service that books the standing completion score onto today's
tracking **row**."

`services/fun-points-reconcile.ts` reaches the day through the file corpus and nothing else.
`dailyCorpusOf` asks `whereFor(roots, "daily-tracking", "any")` for the page type's file glob
and raises where there is none -- "states no file glob in an addressable repo, so its days can
be neither read nor written". `readDailyDays` lists that directory, parses each `.md` with
`parseFrontmatter`, and raises on any file that does not parse. The write goes out under
`WRITER = "fun-points-writer"` through `landingTextFor`. The commit that made it so is
`f2e4e736d4`, "read and write the day on files, and raise rather than book a missing prior".

A second half of the Definition is stale in the same direction. "Books the standing completion
score" no longer describes the failure case: `computeFunDelta` raises where the prior snapshot
is not a finite number, with "booking against nothing would score the whole standing total as
one day's earnings". So it declines to book rather than booking a maximum.

The module still imports `postgresStore` and `closePostgresStore` from `tools/lib`, so the
service is not free of the database half even though the day itself is a file. Whoever rewrites
the Definition should look at what that import is still for; I did not trace it.

The correction is one word in a Definition, and `page-types/domain.md`'s `Every Changed Line`
rule puts it with Alan rather than with whoever notices it.
