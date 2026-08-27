---
id: eb4b2ccc-6087-5ba5-9fee-a2b96d69d6b5
slug: four-terms-out-of-reach
page-type-slug: finding
title: "Four terms out of reach"
domain-slug: page-type/domain
---

# Claim

Four readings in one run of `review-documents` each found a declared word or domain outside the reach of the readers who need it, and none could see the other three. The cases: `recorder` on interview-loop, `domains/interview-session.md` reachable from no seat at all, `instrument` on define-project, and `track` across the lead tasks. Each reading judged its own case too small or too corpus-wide to remedy alone. Whether they are one problem is a question no single reading was placed to ask.

# Evidence

Measured by the seat running `review-documents` on 2026-08-07, across subjects 37, 38, 46 and 47 of 59.

The four findings, each filed against its own domain and each verified by me before filing:
- `findings/interview-loop/recorder-out-of-reach` — `ops instructions governs` on the subject returns neither `domains/roles/recorder.md` nor `domains/interview-session.md`.
- `findings/interview-session/reachable-from-no-seat` — `grep -rn "interview-session" domains/ tools/` returns nothing outside the file itself.
- `findings/define-project/instrument-out-of-reach` — `ops instructions governs` on that subject names `instrument` zero times.
- `findings/project-track/track-undeclared-across-lead-tasks` — `verify-handback.md:27` uses "its track" with nothing anchoring it.

What the four have in common is the remedy's shape rather than the words: each is closed either by a `glossary:` key, which charges every reader of that document for a whole domain, or by rewording to avoid the term. Every one of the four readings weighed that trade and declined to take it alone, three of them saying in as many words that the call was not theirs.

`terms-in-reach` exists and reports 9 advisory uses across the corpus. It caught none of these four: it keys on capitalised uses, and all four are lowercase mid-sentence. That is the one fact here that suggests an instrument rather than a judgment could close the class.

This is an observation about a pattern, filed because no reading in the run could see past its own subject. It rules on nothing.
