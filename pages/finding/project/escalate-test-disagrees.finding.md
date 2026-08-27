---
id: ec20c6e5-bef1-5850-b189-e7674fa40581
page-type-slug: finding
title: "Escalate test disagrees"
domain-slug: barred-meaning/project
---

# Claim

The three build tasks tell a seat to escalate a failing check on two different tests — one by where the failure lands, one by what caused it — and the third states one and gives the other as its reason.

# Evidence

Raised by a reader on `domains/tasks/projects/build-parent-commit.md` during the plain-language sweep, while checking whether a line could be plained to match its sibling.

The three lines:

- `build-parent-commit.md:34` — "Escalate a red from outside your tree's own work." That is a test of location: escalate where the failing paths lie outside what your tree touched.
- `build-parent-deploy.md:57` — "Escalate a red the tree did not cause." That is a test of cause.
- `build-singleton-commit.md:28` — "Escalate a red you did not cause rather than fixing it. Other seats commit into this repository while you work, so a check failing on a path you never touched is theirs." That states cause and then gives location as the reason, as though the two were one thing.

They come apart in the ordinary case. Another seat commits into a path your tree also touched, and its landing turns the check red. By location the failure is yours to fix, because it is inside your tree's paths. By cause it is theirs to take back. A seat reading the parent-commit document and a seat reading the parent-deploy document do opposite things with the same failure.

The second sentence of `build-parent-commit.md:34` — "Other seats commit into this repository while you work" — argues for cause, while its first sentence states location. So the contradiction sits inside one bullet as well as across the set.

Which test a seat should apply is a decision. The reader rewrote nothing here and flagged it instead. Whichever way it goes, the fix is one sweep across all three files rather than a wording change on any one of them.
