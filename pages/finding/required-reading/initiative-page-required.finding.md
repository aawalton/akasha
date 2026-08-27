---
id: f87ba4b1-01a9-54a4-8e28-2a55af84d8f0
slug: initiative-page-required
page-type-slug: finding
title: "A memory document is required reading for a seat holding an initiative"
domain-slug: domain/required-reading
---

# Claim

A memory document is required reading for any seat holding an initiative, against the
invariant that says none is. `pages/repo/memory-repo.md` states "No memory document is
required reading." `initiativeWarrant` puts the initiative's own memory-rooted page into
the seat's document set, `withRequired` carries it through, and `hold-seat` turns it into
an owed reading. This is deliberate rather than accidental: a test asserts it by name.
The two cannot both be right, and nothing reconciles them.

# Evidence

Read 2026-08-25 in the instructions repo.

`pages/repo/memory-repo.md:16` states the invariant as an unqualified Design line.

The path that contradicts it: `tools/lib/declared-seat-reading.ts:52-54` builds the
initiative warrant as `[{ root: roots.memory, relPath: place.relPath }, ...]`;
`withRequired` at `:88` seeds its result with every document regardless of root, so the
memory-rooted page survives the `:86` filter that narrows only what gets walked for
onward reading; `tools/lib/hold-seat.ts:148-150` feeds every returned document into
`take(...)`, and `:158-167` turns each into an unread remedy plus an owed path.

That it is intended, not an oversight: `tools/tests/hold-seat.test.ts:322` asserts it
under the name "an initiative the seat carries > its own document is required reading,
named where it actually stands". I established this by changing `withRequired` to drop
documents outside the instructions root, which made that one test fail while the other
73 in the seat and link suites passed. I reverted the change rather than edit the test.

The consequence that makes the conflict matter rather than being cosmetic:
`hold-seat.ts:169-176` answers a required document that is no longer on disk with kind
`unresolvable` and the words "THIS GUARANTEE IS ABSENT for it until they are stated
again". An initiative page is deleted when its intents are met, which is the ordinary
end of an initiative rather than an anomaly. So finishing an initiative takes the
guarantee away from every seat still holding it.

NOT MEASURED: whether that consequence has ever occurred in practice; I did not search
the seat pages for a stated initiative whose page is already gone. Which of the two the
author intended to win. Whether any other warrant besides the initiative one reaches
outside the instructions root.
