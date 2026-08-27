---
id: 05fa45a6-6dfd-557f-9e10-14f485f6f59a
page-type-slug: finding
title: "One reply against one at a time"
domain-slug: task/review-initiative
---

# Claim

`review-initiative` line 8 asks that a report be "ruled on in one reply", and One At A Time on `domains/persona.md` names being answered as one as the failure — its warrant is about exactly this artifact. The two documents ask opposite things of the same report. It is a call across two owners: persona is sophia's, and this domain resolves to athena.

# Evidence

Raised by the review-instructions reading of 2026-08-07, which landed one commit and carried this back because no instrument settles it and it crosses an ownership line.

The reading reports resolving this domain's owner with `ops instructions champions --domain review-initiative`. I did not re-run it.

Context on the reading itself, which bears on how much of the document was actually new: a slice-by-slice reading landed on 2026-08-06 as `2f0f9e63`, then four commits moved the document without re-dating the record, and `git diff 2f0f9e63 HEAD` reaches nine of the twenty-two review lines. So for nine lines this was the first reading of the text now standing — which is also why `stale-reviews.ts` named the document again.
