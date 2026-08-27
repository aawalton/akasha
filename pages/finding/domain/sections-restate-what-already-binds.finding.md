---
id: a297aecc-0e6f-51fb-82bd-cb645cf37e6b
slug: sections-restate-what-already-binds
page-type-slug: finding
title: "Sections restate what already binds"
domain-slug: page-type/domain
---

# Claim

Domain sections are written by restating what the schema, the document's own Definition, or the underlying technology already carries, and the restatements survive revision because revision effort goes into making them accurate rather than into asking whether they should exist.

# Evidence

Measured across all 30 `# Vision` sections standing on 2026-08-05, 95 paragraphs classified one at a time: 24 of the 95 restate what something already binding the same path carries. 16 of the 30 files hold at least one. `domains/git-repos.md` is four for four — every paragraph describes what git is rather than what the estate chose about it — and it was written on 2026-08-05, the same day it was measured.

The mechanism is visible in one session. `domains/database.md`, `object-store.md`, `git-repos.md` and `disk-store.md` were composed together in a single heredoc at commit `1e2ace7f`, all four filling one four-slot template, all four closing on a paragraph beginning "What it charges". Both drafts survive in that session. Between them the seat tightened "Every write is reversible" into "A write to a versioned type is reversible... opted into per type by necessity rather than by omission" — a restatement made more accurate — and never asked whether the paragraph should stand at all. `domains/reference.md` at 310 characters and `domains/project-track.md` at 363 are each entirely restatement of their own Definition, so volume is not what carries this.

All of it happened with Cut The Obvious and Parsimony standing, and Single Authority standing, each governing that path.

Not measured: whether the behaviour transfers to the renamed `# Design` section, bounded at 500 characters where `# Vision` was bounded at 2000. `ops enforcement list` turned up `check-prose-mechanism-restatement`, which reaches only prose transcribing a function's parameter field names in the code tree; no other absorbing mechanism was found, in one pass. The measurement is a delegate's, reported to me and not re-run: I confirmed the schema state and the standing of the files it names, and did not re-classify the 95 paragraphs myself.

A rule aimed at this — requiring every entry to name the option a seat would take without it — was drafted, landed and pulled the same day at Alan's judgment. The observation stands unaddressed.
