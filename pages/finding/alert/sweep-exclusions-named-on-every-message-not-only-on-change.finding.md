---
id: 0416e8ac-aae5-53e5-bc2c-9087ad1b0abc
page-type-slug: finding
title: "Sweep exclusions named on every message not only on change"
domain-slug: page-type/alert
---

# Claim

The nightly slow-suite sweep now names its excluded suites in the message dalla receives, on every run rather than only when the set changes. #19033's seat chose the standing form because a standing exclusion is exactly the one that goes quiet, and would not settle her surface silently. The lead confirmed it rather than spawn a seat for one line. It costs a line per message against twelve suites; the alternative is silence between changes, which hid a suite red on main for a fortnight.

# Evidence

## What changed

`packages/infra/ci/slow-suite-sweep/src/build-notification.ts` carries `excluded_suites` into the message body, each with its stated reason, under a line reading that they are "EXCLUDED from this sweep and watched by nothing else". Landed on main at `f8087472bfd6`. Verified here: 14 unit tests pass over the notification builder, and the sweep reports 606 suites swept with 12 excluded and named.

It reports and never refuses — verdict, failure sets and exit code untouched, on the reasoning that an unrun suite is neither green nor red.

## The open call, and why it was settled this way

The seat put the clause on EVERY message rather than only when the exclusion set changes, and asked for that to be ruled on rather than assumed. Its reasoning: a standing exclusion is exactly the one that goes quiet.

The lead confirmed it on 2026-08-14 without spawning a seat, dalla having no live seat and the question being one line. That is a decision taken about dalla's surface by someone who does not own it, which is why it is filed here rather than left on a project document that gets deleted.

## The case that produced it

`supervisor-compact-resume.integration.test.ts` had never passed on main since 2026-07-28. `ops tests slow-suite-sweep` was built for that class under #15423, runs nightly and messages dalla, and swept 609 suites on 2026-08-13. It never reported this one: the suite sat on `SWEEP_ENV_INCOMPATIBLE_SUITES` and the excluded set went only to a pod log.

The exclusion's reason had also absorbed a second failure that was not its reason, citing two failing cases where only one was the timeout it named. That wording is corrected on the same commit.

## What would overturn it

A count of exclusions large enough that the standing clause crowds the message, or evidence that dalla stops reading its tail. Twelve is the count today. Nobody has measured whether a standing list is still read after the first few nights, and that is the honest gap in the decision rather than an argument against it.
