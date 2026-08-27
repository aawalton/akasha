---
id: 21d1b4d2-e10b-58b1-b079-6bcb8773523d
page-type-slug: finding
title: "Moved surface refusal names no path"
domain-slug: domain/agent-harness
---

# Claim

The identity refusal for a surface that moved since it was read states the count and never the path, so a seat whose notification was lost or ambiguous is told a surface moved and left to guess which one.

# Evidence

Measured 2026-08-05 by this lead. `movedLead` in `tools/lib/identity-words.ts` renders "N surface(s) that govern you there moved after you read them" and names no path; the gate line above it reads "pinned to 4 axis(es) over 8 surface(s); 7 read in full, 0 never read, 1 moved since". Neither says which.

It cost this seat a guess in the same session. A write was refused on that line while four separate rewrites of `roles/lead.md` had arrived as notifications minutes apart; the moved surface was inferred from the most recent notice rather than read off the refusal.

The design intends the notification to carry the path — `movedLead` says "The difference is sent to you when it lands" — and it does, with a diff. So the refusal and the notice are two halves of one answer. The half that arrives at the moment of the refusal is the half without the path.

The channel that carries the other half is not guaranteed. The supervisor's own restart notice states that a message sent while a seat is restarting "is not delivered late — it may not arrive at all".

Raised independently by a blind reader asked to judge the refusal as text with no ability to verify it: it graded the block down from high to medium-high confidence for exactly this, calling `<p>` an unfilled placeholder and noting that naming the path is the cheapest credibility the message could buy.
