---
id: bf7b37e7-0c8b-50b9-8d36-86b082b2b398
page-type-slug: finding
title: "Dispatch Reach says file class where the machinery says node type"
domain-slug: domain/992
---

# Claim

One concept carries two spellings across prose and code. The Dispatch Reach rule on `domains/check.md` says "file class"; the machinery says node type — `ts-file:` and `md-file:` at `packages/infra/ci/worker/src/pure/matcher.ts` lines 40-69, and `watchNodeTypes` in `packages/infra/checks/src/lib/check-configs-source-scanners.ts`.

# Evidence

Read off the `review-instructions` reading of `domains/check.md` finished 2026-08-21, read line by line, bottom to top, 58 entries. The reading names both call sites in the code repository.

It landed nothing: "Ubiquitous Naming" on `domains/global.md` asks that a rename land in every layer at once, which is more than a line-by-line reading reaches.

Not measured here: I did not open either file, and I did not check which spelling the interface or the stored data uses — so which of the two a rename should keep is unread.
