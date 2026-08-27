---
id: db281204-2463-58dd-bd30-ea66779cec6e
slug: no-document-says-to-commit
page-type-slug: finding
title: "No document says to commit"
domain-slug: domain/global
---

# Claim

No commit-track build document tells the seat to commit, though `build-child-commit`'s Definition is "live as each commit lands" and its hand-back is gated on having done so. `ops project move-to --help` states the gate as the row having recorded at least one commit or declaring why it recorded none, with no `--force`. The deploy-track documents name `ops project commit` in a bullet; the three commit-track ones name no commit act at all.

# Evidence

Raised by the review-instructions reading of `domains/tasks/projects/build-child-commit.md` on 2026-08-07, which wrote neither branch because nothing it could run separates them without writing to a live project row.

Verified myself, and my count differs from the report's: `grep -rln "ops project commit" domains/` returns TWO documents, `build-child-deploy.md` and `build-singleton-deploy.md`. The reviewer named only the first. Its claim is unaffected — both are deploy-track, and no commit-track document names the verb.

The two branches, as stated: either a commit-track child commits with `ops project commit` under its own seq, in which case all three commit-track documents want a bullet and whether a commit-track parent has a worktree on disk decides whether the verb even runs; or it commits with plain git as this repo's own history is written, in which case `commitHashes` stays empty and the gate is wrong rather than the document.

The reviewer reports `ops project list --updated-since 2026-07-25` showing `commitHashes` populated on real rows and `noCommitReason` on none. I did not run it.
