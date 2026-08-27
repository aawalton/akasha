---
id: bb049e6c-7505-5b6e-93ff-a8c7d194c952
page-type-slug: finding
title: "Edit leaves a write uncommitted on index contention"
domain-slug: domain/global
---

# Claim

`ops instructions edit` holds no lock on the git index and does not retry. Under ten concurrent seats one call gated its change, wrote it, lost `.git/index.lock` to another seat mid-commit and exited 3 — leaving the edit live in the working tree and uncommitted, which is the one state the verb's exit codes describe as operational rather than refused. The recovery is handing the edited file back to `write.ts` as its own source, and it is discoverable only by triggering the refusal that names it.

# Evidence

Reported by an archivist seat emptying `dirty/folders/pages-ui.md`, one of ten running `ingest-instructions` concurrently against this repo. It recovered on its own and the change landed byte-identical, so nothing is outstanding from that run.

Measured here rather than taken from the report: `tools/lib/git.ts` carries no `flock`, no `withLock` and no rebase path. The only occurrence of the word retry is a comment on `pushBranch` explaining why a retry would erase the report. `commitPaths` is path-scoped, which is what keeps concurrent commits of different files mostly clean, so the index is the contention point rather than the content.

A second seat, on `dirty/folders/code-repo.md`, reported a push rejected on the same contention and confirmed by `git fetch` that its commit had already reached `origin/main`. That one is benign and self-correcting; this one is not, because the working tree is left changed.

Not measured: how often it happens. Two seats reported contention across roughly thirty runs, and only one was left in the written-and-uncommitted state.

Not judged: whether the repair is a lock, a retry, or leaving it and documenting the recovery in the exit-3 message. The verb already names the recovery once the refusal is triggered, so the cheapest change may be saying it in the exit rather than serialising the writers.
