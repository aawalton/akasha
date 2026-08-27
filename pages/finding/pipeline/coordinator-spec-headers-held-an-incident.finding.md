---
id: 2b8f112c-feb5-5272-b425-600eed54552c
slug: coordinator-spec-headers-held-an-incident
page-type-slug: finding
title: "A production incident write-up was deleted with the coordinator spec headers, and no reachable copy remains"
domain-parent-slug: page-type/pipeline
domain-slug: page-type/pipeline
---

# Claim

A written-up production incident was deleted along with the merge-queue coordinator's FizzBee spec headers, and no copy of it is reachable from this machine. This page is what remains: a record that the material existed and what it covered, not a pointer to where it can be read.

# Evidence

Re-measured 2026-08-27, and the reading has changed since this was filed.

`#19288` deleted 478,669 bytes of comment from 71 FizzBee specs on 2026-08-16, under the rule that a comment outside the forms goes to a domain or goes away. The largest, at 27,498 bytes, was an incident write-up rather than drifting rationale: which subprocess timed out, how the throw escaped `advanceForming` and killed the reconcile tick, why the batch held the staging slot for about a hundred minutes, and what bound the retry. The top eight files, all merge-queue coordinator specs, held 125,510 of the 478,669 bytes.

This page previously sent the reader to the parent tree's branch point, `997aed4667^`, as holding every deleted line. That is no longer a place anyone can go, and following it is the failure this rewrite exists to stop.

- `git cat-file -t 997aed4667` in akasha answers `Not a valid object name`, against a control SHA in the same command that resolves.
- `git log --all -- '*.fizz'` in akasha is empty: these specs were never in this repository's history, which begins at `a1d265eda Open akasha`.
- The repository that held them is gone from disk. `/var/home/walton/code` and `/var/home/walton/instructions` do not exist; `/var/home/walton/repos` holds `akasha`, `akasha-probe` and `code-editor` only.

The subject is gone too, so nothing can be recovered by rebuilding it from the code: there are no `.fizz` files in akasha and no merge-queue coordinator.

Deleting the headers was the right call and is not in question. What changed is that the deletion was taken on the understanding that git held the text, and for this material git no longer does.

# Not measured

Whether any off-machine backup, clone or archive of the former `code` repository still holds `997aed4667`. Nothing on this machine can answer it, and that is the one question that would decide whether the write-up is recoverable or lost. Anyone with access to such a copy should read this page as an open request.

Whether any of it should be rebuilt as a domain. That was never claimed here and is a judgment for whoever holds the pipeline domain.
