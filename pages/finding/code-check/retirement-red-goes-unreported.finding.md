---
id: 98b08c9d-0d12-59cf-8c29-5c5e552a6b60
page-type-slug: finding
title: "Nothing reports the gap between a retirement landing and the fleet going red"
domain-slug: domain/global
---

# Claim

`check-ast-unused` reads its entry set live from the instructions repository, which lands on commit and runs no pipeline. So a retirement there can red the check for every branch at once, and nothing reports it until some branch happens to run CI. Main's last pipeline can read green while main is already red.

# Evidence

Observed 2026-08-17 from the seat on #19357, across three pipelines on one branch.

Pipeline 28203 on `main` completed green about two hours before the readings below. Nothing ran on `main` after it.

Pipelines 28204 and 28205 read the instructions repository at 962 reaches and reported 10 violations, all in the three files #19356's port had orphaned. Removing those cleared them: pipeline 28206 names none of the three.

28206 read 956 reaches and reported 15 different violations, in five files the branch never touched. The six reaches lost between the two readings were three separate retirements landing in the instructions repository while the branch worked. Neither wave had anything to do with what the branch changed, and the two waves are disjoint.

At the time of writing, `main` is red on this check and its last pipeline says green. The horizon on that claim is short: `ops pipeline list` was read once, over the twelve most recent rows, spanning about three hours.

The delay is the part not already written down. `pages/finding/code-check/reaches-always-read-from-main.finding.md` holds that the entry set comes from instructions `main` and only from there, and `live-data-check-reds-the-fleet.md` holds that a check reading live state reds every branch on a step it never touched. Neither says anything about how long the red stands unobserved, and that gap is what decides whether the next author meets it as a known condition or as a surprise on their own change.

Not measured here: how long the gap typically runs, whether anything watches for it, whether `main` is re-run on a schedule, or how often a retirement orphans anything at all. One session is the whole of the population seen, and it is the session that raised the question, so it is not a sample anybody drew.
