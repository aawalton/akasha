---
id: 88f7e4df-9ff3-59ff-9b1a-bf1c3101ca81
slug: empty-backlog-is-not-an-idle-domain
page-type-slug: finding
title: "Empty backlog is not an idle domain"
domain-slug: domain/sleep
---

# Claim

A lead's standing ruling on the sleep domain: an empty backlog is not an idle domain. Everything this domain does apart from its experiment program runs in conversation and leaves no project behind it, so the backlog measures how much of it happens to be decomposable, never how much is running. A lead who reads a short list as a quiet domain has read the project system rather than the domain. Nothing live carries this, and every instrument a reader consults agrees with the wrong reading.

# Evidence

A standing ruling of 2026-07-27 held in `dirty/skills/sleep/rulings.md`, filed here by the ingest seat emptying that source so the judgment outlives the sweep. Its own words: "**Everything else this domain does today runs in conversation and leaves no project behind it.**"

The instruments agree with the wrong reading, measured 2026-08-07. `ops project list --tags author:ione` returns nothing, because its own help says `done`, `not_doing` and `someday_maybe` are excluded by default. Naming those statuses explicitly returns two rows and only two: #15687, `done`, a story-chapter word-count fix, and #15572, `someday_maybe`, the sleep audio experiment program, parked with `updatedAt` 2026-08-04. `ops persona digest ione` returns one owed ping and no open project.

So the surface a lead boots from shows an empty domain, and the parked row is not visible from it either — `pages/finding/project/digest-hides-the-parked-shelf.finding.md` measured exactly that mechanism on another persona the same day: "a shelf is invisible from it and only a second query nobody is sent to run renders one."

The activity the ruling points at is real and is recorded off the backlog. Project row #15572 carries 28,424 characters of `notes`, five trials from the 2026-07-16 intake to the 2026-07-19 staging of exp-5, including Alan's verdicts in his own words. None of that is a project row of its own.

Nothing live carries the ruling. `rg -uuu -n -i "empty backlog|idle domain|short list|quiet domain|empty digest|decomposable"` over `domains/` returns nothing. The same search over `~/memory/findings/` returns four files — `project/digest-hides-the-parked-shelf.md`, `collections/dormancy-recorded-only-under-quarantine.md`, `code-quality/cadence-stand-down-recorded-only-under-quarantine.md` and `alanwalton-app/manual-faucets-have-no-absent-row-alarm.md`. The first is the mechanism; the middle two are this same shape filed for two other domains on this same day. None is about sleep.
