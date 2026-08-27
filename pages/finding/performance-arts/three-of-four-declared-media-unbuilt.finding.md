---
id: e655811f-a22b-595c-82d0-5f74ab548108
slug: three-of-four-declared-media-unbuilt
page-type-slug: finding
title: "Three of four declared media unbuilt"
domain-slug: domain/performance-arts
---

# Claim

Three of the four media `domains/performance-arts.md` declares have no substrate at all. Its live definition is "the craft in music, theatre, film, and dance", and only music is built: `song` and `artist` page types, `ops music` verbs, an exploration selector and a points worker. Theatre, film and dance have no page type among the 275 that exist, no property and no verb. Whether the gap is worth closing is a judgment about what the domain is for, and nobody has been asked it.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/performance-arts/rulings.md`,
whose open-items list recorded the same gap against "the lead's own words".
The live domain document now carries the same scope, which is what makes this
a mismatch inside the estate rather than one persona's ambition:
`domains/performance-arts.md` is "the craft in music, theatre, film, and
dance", `domain-parents: fun`, `persona-champion-slug: eppie`.

No page type. I enumerated every page type unbounded rather than off a default
page — `ops page list --type page-type --properties title,slug --all`, 275 rows
— and searched them for theatre, play, perform, film, dance, stage, show,
concert, gig and venue. The only hits are unrelated: `temper-player`,
`temper-vampire-stage` and `temper-eso-player-equipment-constant` belong to a
game, `game-display-defaults` is configuration, and `show` / `ki-show` are
television — `ops page list --type show` returns "Sword Art Online" and "Sword
Art Online Alternative: Gun Gale Online". A bounded first page would have shown
`Show` and stopped, which is why this was run with `--all`.

No verb. `ops music` is the whole surface and is entirely recorded music:
import-artist, listening, next, search, play, queue, now-playing, rate — the
last routing to `artist` and `song` pages. Searching every top-level `ops`
command for theatre, perform, film, dance and stage returns nothing about live
performance; `inference music` generates audio and `exercise log-set`
"performed set" is a false hit on the word.

No property. The rated axes all hang off `song` — `rating`, `singability`,
`tags`, `emotions` — and off `artist`.

So the built half of this domain is exactly one of its four declared media, and
the instrument that reports on it, `eppie-song-points`, counts rated SONGS. A
domain reading as active on its own numbers can be untouched across three
quarters of its stated scope, and nothing shows that.
