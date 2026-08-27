---
id: cc62adae-0dda-54bb-905b-274affc049cd
slug: owned-project-completions-names-a-deleted-pass
page-type-slug: finding
title: "Owned project completions names a pass Alan deleted"
domain-slug: domain/persona-points
---

# Claim

Fifteen personas name the points-source marker `owned-project-completions`, which no pass claims, so their points stopped computing on 2026-08-19. The marker is right and must not be rewritten: `declaresPointsSource` joins a persona to her pass on `kind: external` AND the marker together, so relabelling one `unavailable` would hide her from the rebuilt pass silently. What is false is the Intent on `page-types/persona-points-source.md`, "The engine can read every source a persona's document names."

# Evidence

Measured 2026-08-20 by running `ops persona points-source check`: 40 examined, 19 disagreeing, 15 of them `source-unresolvable` on this one marker, zero `bar-disagrees`.

The pass was `code:packages/alanwalton/daily-tracking/src/completion-points.ts`, deleted by Alan at `3c26b97f42`, 2026-08-19 06:55:51 -0600, ten minutes after `points-source-replay` at `f93318a18d`. His message gives the reason — Done project rows have no carrier once projects are file-backed, so nothing holds the 13,488 finished ones — and records that "Fifteen persona rows still name the marker". No successor exists. `MARKER_PASSES` holds seven markers, none for project completions, and the only spelling of `owned-project-completions` left outside the fifteen documents and three test files is a stale `dist/completion-points.d.ts`.

The freeze is exact and unanimous. All fifteen — astra, athena, atlas, aura, awen, dalla, echo, elin, ember, nimue, olwen, rhia, ryn, thea, vera — have a last file under `memory:persona-days/<slug>/` of 2026-08-18. Personas on a live pass carry 2026-08-19 and 2026-08-20: ceri, erin, iris, nova, zadi. So they stopped earning the morning the pass went.

`personasDeclaringPointsSource` at `code:packages/alanwalton/personas/core/src/points-source-declarers.ts:22` is how a live worker finds the personas it meters; `aria-story-points.worker.ts:9` uses it. `pointsSourceMayWrite` in the same package refuses every write for an `unavailable` kind, so the relabel would block the rebuild twice over.

Three more that nothing computes are correctly labelled, not casualties: `mari` is a `seed` with one day ever and a fixed total, `aine` and `sophia` are `manual` and last moved 2026-07-25 and 2026-07-04, `elaine` is `unavailable` with 44 days to 2026-08-10 and no total at all.
