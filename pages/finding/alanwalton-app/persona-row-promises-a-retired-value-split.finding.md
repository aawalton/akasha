---
id: c2465771-f4d6-5603-ad46-1cef0bea8414
page-type-slug: finding
title: "Persona row promises a retired value split"
domain-slug: domain/alanwalton-app
---

# Claim

Lali's persona row promises a separation against the arrangement that now stands. Its `earningNarrative` says her bytes "raise the **Mathematics** value (a child of Learn)" and that "Mathematics is its **own** value so my bytes never double-count into Learn (Ali's)". The Mathematics value page was soft-deleted on 2026-06-28 with fourteen other sub-values, her `value` relation points at Learn, and Ali's id sits beside hers in Learn's `personas` array. The row states as a guarantee the only state now available.

# Evidence

Measured 2026-08-07 against the live database, while emptying `dirty/skills/mathematics/findings.md`, whose entry on this reaches the opposite conclusion from older data and is queued for removal.

The narrative. Lali's `persona` row carries `earningNarrative` reading, in part, "Those bytes raise the **Mathematics** value (a child of Learn) and my own `totalPoints`" and "Mathematics is its **own** value so my bytes never double-count into Learn (Ali's)." Read through `ops db psql`.

The value model it describes is gone. Selecting `value` rows with `deleted_at is null` returns six — Faith, Fun, Health, Learn, Love, Wealth — which is exactly the glossary of `domains/alan-values.md`. Counting all `value` rows returns 21. The other fifteen are soft-deleted inside one six-second window on 2026-06-28, 14:53:54 to 14:54:00: Anime, Chess, Food, Literature, LitRPG, Mathematics, Medicine, Performance Arts, Prayer, Romance + Sex, Scripture Study, Sleep + Hygiene, Technology, TTRPGs, Visual Arts. A sweep rather than an attrition.

Both halves of the sentence fail. There is no Mathematics value for bytes to raise. And her `value` relation is `019eb7d1-0072-7909-a9a7-6fa76806f067`, the Learn page — the same id `chess/value-axis-says-fun-and-learn.md` reads for Erin. Learn's `personas` array holds six ids: Ali's, `019eb890-a3cd-710e-a420-39f5ef568bcd`, is first, and Lali's, `019f0a42-42c4-7a8d-8b99-97aded91020a`, is third.

So the row does not merely name a missing page. It asserts an arrangement that keeps her bytes off Ali's value, and that arrangement was withdrawn six weeks ago, leaving her pointed at it.

Not established. Whether anything reads `earningNarrative` at runtime, and whether the daily stoplight in fact credits Learn for her bytes, are unmeasured here — and her faucet reads nothing at all for a separate reason at `alanwalton-app/faucet-cannot-observe-its-metered-author.md`.
