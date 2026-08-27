---
id: fbd2c0c9-687a-5709-b55b-f40832fac612
page-type-slug: finding
title: "No episode is marked watched"
domain-slug: domain/anime
---

# Claim

Nothing records that Alan watched an episode, so Ceri's faucet has no watching to meter. He has ruled that her metric stays episode duration and that he will mark episodes himself the next time he is watching, so what is owed here is the marking rather than a build.

# Evidence

Measured 2026-08-10. There are 147 episode rows. None carries a completion date and none carries a rating, so nothing on any of them says it was watched.

The durations are there. All 147 rows carry `length` and every one of them has an empty `runtime`. That pairing is a trap for whoever writes the recipe: `runtime` is the field the type reads as if it were the duration, and summing it returns zero for every episode. A faucet built against it would run cleanly, report nothing, and look identical to a day Alan watched nothing.

Ceri's live faucet today counts rated episodes at one point each and high-waters the result. Her domain document says minutes of anime he watched, twenty-eight a green day. So her total is ratcheted from a measure her document does not name, and correcting it needs a downward write.

The capture path was examined before this was raised with Alan. The AniList integration is a keyless catalogue search rather than a sync of anyone's watch list, and its per-episode path is deferred in its own header. The one working anime-logging command belongs to Ki, writes her page types, and records a whole series at a time. Alan's session-activity catalog holds fourteen entries and none of them is anime or television.

He was offered hanging it on his existing time tracking instead, and declined: the metric stays episode duration.
