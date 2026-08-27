---
id: 7e99cab8-8905-5b43-9aa3-f2d4fc9f54c7
slug: one-foreign-file-disables-test-narrowing
page-type-slug: finding
title: "One foreign file disables test narrowing"
domain-slug: page-type/pipeline
---

# Claim

One non-TypeScript file anywhere in a branch's cumulative diff switches runtime test narrowing off for every workspace of that pipeline at once, the selector falling back to run-all on the first changed path that is not `.ts` or `.tsx`. Over a 7-day window narrowing was active in 52 of 154 test-step runs, and of 16,986 per-workspace decisions 13,592 ran the full set. It pays about a third of the time, and one file of any other kind is what disables it.

# Evidence

Found on 2026-08-10 by the seat delivering #18431, a child of tree #18484, and reported to the tree manager as a correction to its own earlier hand-back. It replaces a finding filed the same day claiming the narrowing never fires, which was false and has been deleted.

The reading is from real CI logs over the 7-day Loki window: 60 pipelines, 154 test-step runs, 16,986 per-workspace decisions. 115 decisions ran a narrowed selection and 3,279 narrowed to nothing.

THE METHOD THAT PRODUCED THE FALSE VERSION IS WORTH MORE THAN THE FIGURES. The seat built a git instrument treating K consecutive commits on main as one branch of K commits, and it reported that a 20-commit branch is never all-TypeScript. Consecutive commits on main are many different branches' landings interleaved, so their union is far more diverse than any real branch's diff, and the instrument overstated the escape hatch badly. It agreed with the standing claim it was testing, and that agreement was allowed to stand in for a direct reading. Anyone measuring what a branch looks like should read branches rather than windows of main.

The seat's own negative control had the answer in it: stripping the non-TypeScript paths flipped two workspaces to a narrowed selection. That was recorded as proof the instrument could see narrowing, when it was also evidence that narrowing happens in the world.

THE LIVE QUESTION. Narrowing the escape-hatch classes to those that can actually affect a test would reach the two thirds of runs currently taking run-all. The fallback is deliberate — safety over precision — so this is about whether that trade is set where it should be, not a defect in the selector.

NOT MEASURED. What the reverse-reachability artifact build and the per-workspace invocations cost in step-seconds. Which non-TypeScript classes account for the run-alls. Whether the 7-day window is representative.
