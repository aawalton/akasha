---
id: bf7b37e7-0c8b-50b9-8d36-86b082b2b398
slug: file-class-versus-node-type
page-type-slug: finding
title: "Dispatch Reach says file class where the machinery says node type"
domain-slug: domain/old-check
---

# Claim

One concept carries two spellings across prose and code. The Dispatch Reach rule on `pages/domain/old-check.domain.md:103` says "file class"; the machinery says node type — the `NodeType` union carrying `ts-file` and `md-file` at `tools/lib/workflow-dsl/types.ts:74`, and `dispatchNodeTypes`, once spelled `watchNodeTypes`, in `tools/lib/check-workflow/check-configs-source-scanners.ts`.

# Evidence

Read off the `review-instructions` reading of what now stands as `pages/domain/old-check.domain.md`, finished 2026-08-21, read line by line, bottom to top, 58 entries. The reading names both call sites; both moved into this repository rather than dying.

It landed nothing: "Ubiquitous Naming" on `pages/domain/global.domain.md` asks that a rename land in every layer at once, which is more than a line-by-line reading reaches.

Not measured here: I did not open either file, and I did not check which spelling the interface or the stored data uses — so which of the two a rename should keep is unread.
