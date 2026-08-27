---
id: 9c6f6f38-bf27-52c3-a311-3d079cd8c35f
page-type-slug: finding
title: "Four music page types stand only as rows"
domain-slug: domain/music
---

# Claim

In music, four page types stand as database rows with no page type document and no property definitions: `song` (1656 live rows), `song-listen` (560), `heard-track` (560) and `artist` (14). `domains/music.md` already names all four — "the artists, songs, ratings and listening this system keeps for Alan" — so the domain stands and only the page types are missing. `heard-track` holding exactly as many rows as `song-listen` is either a real one-to-one or a duplication nobody has looked at.

# Evidence

Measured 2026-08-19 by read-only query against the live rows.

`song-listen` carries a `persona` key whose value is identical on all 560 rows: Eppie's id. It is a scoring address rather than a subject. Her persona row declares `pointsSourceKind: windowed`, `pointsSourceAggregate: sum`, `pointsSource: song-listen` and `pointsSourcePointField: newMusicMinutes`, and the points engine finds a day's plays by querying that id. Moving the declaration to another persona would put her id on every future row instead.

One `song-listen` row is one time Alan played one track, captured from Spotify's recently-played feed by `packages/collections/music/src/listening/capture.ts`, run every fifteen minutes by the service `domains/services/music-listening-capture.md`. Rows are never updated — the only type in its cluster that does not churn — and the natural key `playKey` is `<trackId>@<playedAt>`, unique across all 560. Growth is roughly 73 rows a day.

`firstListen` and `newMusicMinutes` on a `song-listen` row are meaningful only against the separate `heard-track` ledger, which decides whether Alan had heard the track before. Neither row declares a relation to the other, so the join is by convention alone.

`music` sits under `performance-arts`, which names Eppie as its persona owner, so this stands in her territory.

Alan ruled these four out of scope for the persona conversion on 2026-08-19; they are recorded here rather than carried.
