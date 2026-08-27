---
id: 783da6d9-6075-5575-8dd5-3dce96c2c6f1
page-type-slug: finding
title: "The docblock finding names a docblock, a document and a phrase that are all gone"
domain-slug: domain/992
---

# Claim

Every part of the claim on `pages/finding/check/docblock-cites-a-distinction-that-is-elsewhere.finding.md` has stopped describing the world. The docblock it quotes is gone — `tools/checks/findings-sorted.ts` is now `tools/audits/findings-sorted.ts` and opens on its imports with no docblock at all. `domains/instructions-harness.md`, the document it says is cited, no longer exists. The phrase it says lives on `check` is no longer on `domains/check.md`.

# Evidence

Raised by the `review-instructions` reading of `domains/check.md` finished 2026-08-21, which reported the finding quoting pre-conversion wording, and checked here rather than taken on report: `ls domains/instructions-harness.md` finds nothing, `find` puts `findings-sorted.ts` under `tools/audits/`, its first sixteen lines hold no docblock, and grep finds the quoted phrase nowhere in `domains/`.

`page-types/finding.md` says a finding is deleted when its claim stops being true. I did not delete it: `ops memory rm` refused while a review report still named it, and whether the finding is dead or its subject merely moved is a call for whoever owns this domain.

Not measured here: I did not search the code repository for the docblock text at its new path, so whether the sentence survived the move into some other file is unread.
