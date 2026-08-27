---
id: 0154c3b0-7ea1-5875-a18d-1f5ea7b60219
slug: presence-names-two-things
page-type-slug: finding
title: "Presence names two things"
domain-slug: domain/presence
---

# Claim

Two domains carry the word "presence" with different senses, and nothing distinguishes them at the point a reader meets either.

`domains/presence.md` defines it as when Alan was actually at his machine. `domains/seat-presence.md` defines it as whether an agent is in a seat, and `domains/seat.md` lists `presence` among a seat's properties using the bare word.

# Evidence

Surfaced 2026-08-15 by the audit setting `coined:` across the vocabulary, which made the clash operational rather than latent.

With `coined: true` on `domains/presence.md`, `words-read` matches the bare term "presence" and directs every writer who mentions a seat's presence to read the Alan-at-machine document. The term is used in the seat sense on `domains/seat.md:20` and glossed as `seat-presence` on `page-types/role.md`, so the misdirection fires on ordinary seat prose.

The flag was removed at `c91ab4c2` to stop the wrong pointer. That stops the symptom and leaves the clash: the word still names two things, and no instrument reports it, because two domains may legally hold overlapping terms.

`domains/global.md` carries Ubiquitous Naming — "Use the same name for a concept in code, data, interface and prose alike" — whose converse is what is broken here: one name over two concepts.

Two readings, and the audit could not settle which:

- Alan's presence is the narrower thing and should carry a qualified slug, leaving `presence` to the seat sense.
- The seat sense is the derived one, already spelled `seat-presence`, and `domains/seat.md:20` should spell it out rather than using the bare word.

Not measured: whether any other coined term collides the same way. The audit weighed 251 single-word terms one at a time and did not cross-check them against each other.
