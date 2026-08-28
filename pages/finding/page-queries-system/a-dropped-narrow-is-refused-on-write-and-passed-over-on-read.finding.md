---
page-type-slug: finding
slug: a-dropped-narrow-is-refused-on-write-and-passed-over-on-read
title: "A narrow dropped for want of an owner-slug is refused on the write path and passed over on the read path"
domain-slug: domain/page-queries-system
---

# Claim

`askableNarrows` hands back the conditions it kept and the keys it took away. Taking a key away widens the answer: a read located by fewer conditions than it was given reaches every page of the type rather than the ones meant. The write path refuses on that and says so. The read path takes the kept conditions and never looks at the removed ones. One function warns both callers; one acts on the warning and one throws it away.

# Evidence

Read on 2026-08-28 against `1675fa0f2` on `main`.

`askableNarrows` at `shared/pages-access/src/file-narrow.ts:106-119` returns `{ where, dropped }`. `askableNarrow` at `:88-104` puts a key into `dropped` only where `SETTLED_BY_THE_REPO` holds it — that set is `new Set(["userId"])` at `:76` — and the page type states no `owner-slug`. Where one is stated, the condition is kept with its key renamed at `:100-101`.

**The write path refuses.** `refuseDroppedNarrow` at `shared/pages-access/src/file-write.ts:83-88` throws where `dropped` is non-empty, and its own text carries the argument: "A write located by fewer conditions than it was given reaches every page rather than the ones meant, so nothing has been written." It is called at `:118`, before the query is composed.

**The read path does not.** `getFilePages` at `shared/pages-access/src/file-read.ts:336-338` reads `where: askableNarrows(given.where, given.shape.ownerSlug ?? null).where`. `.dropped` is not bound, not tested and not reported.

**The local filter does not catch it either.** `file-read.ts:325-328` reduces `args.where` through `matches`, but `args.where` is the already-narrowed set, so the removed condition is not tested there.

**The operator split is a different thing and does not widen.** `narrowing` at `file-narrow.ts:121-142` sends the query only `eq`, `in`, `notIn`, `includes` and `isNotEmpty`, passing over every other operator with no else branch. That is a push-down: the full `args.where` is still tested locally at `:325-328`. A narrow is split by operator and removed by key, and only the removal loses the restriction.

`pages/finding/code/condition-dropped-not-refused.finding.md:17` measured the widening on 2026-08-20 — `userId=<garbage>` on `finding` gave 3244 of 3244, control `slug=<garbage>` gave 0 — with 355 of 367 page types stating no `owner-slug`. That finding is the class across six sites; this is the asymmetry inside one, and the refusal it names did not exist then.
