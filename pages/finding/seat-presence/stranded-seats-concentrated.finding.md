---
id: ef43ae99-d455-5e0f-b620-63dc9e48927b
slug: stranded-seats-concentrated
page-type-slug: finding
title: "Stranded seats concentrated"
domain-slug: page-property-definition/seat-presence
---

# Claim

The stopped seats holding work that nothing will wake are not spread across the fleet. Half of them are a single initiative's ingest cohort, and a handful of task kinds cover most of the rest, so the class can be worked by cohort rather than seat by seat.

# Evidence

Measured on 2026-08-09 with `ops instructions sweep-seats`, the verb #18208 built. Over 1014 agent rows — 20 live, 993 stopped, one with no seat bucket — it reported 962 stopped seats holding an unfinished assignment and 0 running seats holding none.

Of the 962: 957 headless and 5 interactive. 961 are held by a task and 1 by an initiative alone, which is what makes the class within a seat of everything that ever stated a task, a task being held on presence because nothing observable ends one. 528 carry an initiative alongside the task.

The distribution is where the result is. Sorted by what holds them, the head is 477 seats on `task:ingest-instructions` under `initiative:trusted-curation` — half the class in one work stream. Then 199 `task:review-instructions`, 97 `task:build-singleton-deploy`, 37 `task:define-principle-or-rule`, and 17 each on `task:build-singleton-commit` and `task:build-child-deploy`. Six kinds account for roughly six sevenths of the population.

That bears on what any intervention against this class can be. Read as a flat list of 962 stranded seats the class is unworkable, because deciding each on its merits is 962 decisions and nobody will take them. Read as a distribution it is a handful of cohorts, and the largest is a campaign whose seats were spawned to ingest a corpus and stopped when their work ran out — which may be correct behaviour wearing the shape of a defect, or may be a fleet's worth of unfinished ingest nobody is holding. Which of those it is has not been established here and is the question the number raises.

The reading was taken twice. A first pass through a pipeline of mine truncated at 483 rows and looked like a smaller class; the instrument itself refuses a truncated population and reports its own count on stderr, which is what caught it. Any later reading of this should compare the printed rows against that summary line rather than trusting either alone.
