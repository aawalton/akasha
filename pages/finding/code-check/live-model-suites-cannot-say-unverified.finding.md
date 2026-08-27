---
id: 964e04d2-a968-508c-bd66-55eeac4251ad
slug: live-model-suites-cannot-say-unverified
page-type-slug: finding
title: "Live model suites cannot say unverified"
domain-slug: domain/global
---

# Claim

Fourteen `.model.test.ts` suites reach live models through a macbook pool that serializes requests, so their verdict is a statement about that queue at that moment rather than about the commit under test. A busy pool reports `fail` and a timeout, where the honest answer is that nothing was verified — and branch CI cannot tell the two apart, so the tree's single CI run can red on a resource no commit touched.

# Evidence

Found while attributing a red #18452 handed up rather than claimed: `packages/infra/inference` reported 4 failures, all `.model.test.ts`, one watched timing out at 300s against a live service. Its unit type was 315 pass, 0 fail.

WHAT I ESTABLISHED. Branch `project-18484` touches exactly two files in that package against `main`: `src/cli/voice-clone.ts`, a help-string edit with no behaviour, and `src/cli/upscale.ts`, +9/-1 for a positional subject. No `.model.test.ts` in the package references either file. So the branch is not a plausible cause, and the failures are round-trips against real models — `csm`, `higgs-audio`, `kokoro`, `moss-tts`, `mlx-vlm`, `music` and four `image-gen` smokes among fourteen.

WHAT MAKES IT A CLASS RATHER THAN A FLAKE. The pool's behaviour is documented in the same package's help text: "the macbook pool serializes requests, so this budget also counts against the queue wait behind a slow in-flight inference", with an 1800s default sized to absorb a ~9m20s cold load. One slow in-flight request makes every waiting suite fail on time rather than on content, and nothing in the result says which happened.

WHY IT IS THIS INITIATIVE'S SHAPE. A run that could not reach its subject reports the same verdict as one that reached it and found the subject wrong — `count-floor-admits-wrong-members` one layer out. The population machinery here already says `[over N of M — 1 could not be examined]` and exits 2; a live-model suite has no equivalent, so it says `fail`.

WHAT IS OWED, and it is not this tree's to land. Either these suites distinguish "the pool did not answer" from "the model answered wrongly" and report the first as unverified, or they are not branch-CI members at all. Until one of the two, a red here is not a branch signal and should not be routed to a child.

Not established: whether the four fail on `main` today. Running them costs a live-service round-trip each on a machine currently at 12 concurrent agents, which is the very condition that would produce the failure.
