---
id: 00aef74c-4ca0-5fc2-a01c-aed3d48cd96e
slug: emotions-axis-never-written
page-type-slug: finding
title: "Emotions axis never written"
domain-slug: domain/performance-arts
---

# Claim

The `emotions` property on `song` has never been written. It carries values on 0 of 30 rated songs, while the two properties born the same night are in heavy use — `singability` on 30 of 30 and `tags` on 21 of 30. All three sit behind the same write path, so awkward tooling does not explain the gap on its own. Whether the axis is wanted, wanted-but-unreachable, or should be removed is unsettled, and the parsimony question and the tooling question are not the same question.

# Evidence

Re-measured 2026-08-07 while emptying `dirty/skills/performance-arts/findings.md`,
which recorded the same counts on 2026-07-27. Every number is unchanged.

Counted server-side rather than by reading rows, each as its own filtered count
over `ops page list --type song --count --body-file`, filtering
`rating is_not_empty` and then the axis `is_not_empty` beside it:

    rated songs        30
    with emotions       0
    with singability   30
    with tags          21

`is_empty` in this CLI is true when a property is absent, json-null, an empty
string or an empty array, and `is_not_empty` is its exact complement — so an
`emotions` value of `[]` counts as unwritten, which is the reading wanted here.

The counts are identical to the 2026-07-27 measurement eleven days earlier, so
nothing has been captured on the axis in the interval either. Eppie's row
carries `totalPoints` 30, which is the same 30 by construction: the
`eppie-song-points` worker high-water-writes `S = |{ song : rating set }|`.

The write path is live and is one path for all three: `ops music rate` covers
`rating` and the prose fields, and `singability`, `tags` and `emotions` all go
through `ops page update`. So the two used axes and the unused one are reached
the same way.

This is filed as the observation only. `dirty/skills/performance-arts/rulings.md`
carries the judgment attached to it — that the question is unsettled and that
parsimony and tooling are not one question — and that entry is a ruling, kept
verbatim under quarantine rather than reconstructed here.
