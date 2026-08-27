---
id: 274ccb82-88b7-5c59-a659-bc7fc63aac49
slug: control-left-in-the-history
page-type-slug: finding
title: "Control left in the history"
domain-slug: domain/instrument
---

# Claim

A negative control that was run and discarded is indistinguishable from one that was never run, so almost no check in this estate can show it was ever made to fail. One can: `check-app-build-audhdalan-web` has its control standing in the commit history as a planted break and its revert, which makes the proof auditable by anyone, years later, without re-deriving it.

# Evidence

`domains/instrument.md` § Negative Control requires an instrument be made to fail before it is trusted: "A blind instrument and a clean one both return nothing." The rule says to run the control. It does not say to leave it anywhere, and the default is that nothing survives it.

The exception, found by an artifact-path sweep over the 64 no-evidence checks: `366063d51c`, titled "TEMPORARY: a bundle-only break in audhdalan to prove the new gate can go red", reverted by `0d0ef5e519`, "now the gate has been shown to catch it". Two commits, a plant and a revert, each naming its purpose. The gate's ability to refuse is readable off `git log` forever, by someone who never met the author.

What that is worth, measured against the alternative on the same audit. Four `review-check` runs this week each had to hand-build a control before any verdict could be reached: a planted tree in /tmp with node resolution repointed for `check-service-dockerfiles-gitignored`; 89 source files restored at a specific SHA for `check-addon-hook-eager-capture`; a copied DDL and generated file for `check-codegen-raw-page-row-schema-fresh`; 241 access files plus 87 SQL files for `check-rpc-access-grants`. Every one was thrown away afterward, so the next reader pays it again.

The reviewer who found the audhdalan pair categorised it separately rather than counting it as a catch, and that distinction is the point: it is not evidence the gate has refused anything in the wild, it is evidence the gate CAN refuse. Only the second is what stage 3 of `domains/tasks/code-harness/review-check.md` asks for.

The cost of the practice is two commits at the moment the check is authored, when the break is already in the author's hands because they just built the check against it.
