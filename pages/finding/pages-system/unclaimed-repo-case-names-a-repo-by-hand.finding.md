---
id: 09a2bcf4-4e39-5384-8203-6f166e6cbab3
page-type-slug: finding
title: "A test names a repo by hand to stand for an unclaimed one, so the case goes stale on the first claim"
domain-slug: domain/pages-system
---

# Claim

`tools/tests/pages-hold-properties.test.ts` names a repo by hand to stand for "a repo no page type claims", so the case goes stale the moment a page type claims that repo.

# Evidence

The case read `stories` until 2026-08-17, when it began failing with `ENOENT: no such file or directory, open '/nonexistent-stories'` — the check no longer short-circuiting, because a page type had started claiming that repo. `ops instructions run-checks` reports `pages-hold-properties (stories)` sweeping 10527 claimed pages, so the claim is real and the test's premise was simply out of date.

Repaired at `ee5fe0364` by pointing the case at `code`, which no page type claims: of the six roots the test states, `files:` across `page-types/*.md` names only `books`, `instructions`, `memory` and `stories`. That restores green and repeats the shape — `code` is a detail of the case rather than the invariant, and the next page type to claim it fails this the same way.

`domains/test.md` names the shape under Assert The Invariant: an assertion about the one case breaks when nothing is wrong. What the case is for is the Population rule on `domains/instrument.md` — an instrument that looked at nothing must not exit beside one that found nothing — and that invariant is worth a case. Deriving the unclaimed repo from the page types would settle it, but reads the same parse the check under test reads, which Never Ask The Code refuses.
