---
id: 9fab7118-5f7e-592d-8dbd-def274075e47
slug: duplicate-hook-scripts-unmeasured
page-type-slug: finding
title: "Duplicate hook scripts unmeasured"
domain-slug: domain/agent-harness
---

# Claim

Thirteen of the fleet's hook scripts now stand in two places at once — under `tools/hooks/` in the instructions tree, where every registration points, and at their original paths in `packages/infra/scripts/`, where nothing points. `hooks-registered` counts code-repo REGISTRATIONS rather than code-repo FILES, so an unregistered duplicate is invisible to it and to every other instrument in either tree. Nothing reports that the two copies have diverged, and nothing owns deleting the unreferenced one.

# Evidence

Measured 2026-08-04 while verifying #17768. `tools/hooks/` holds 21 files: the 8 that were always there plus the 13 moved. `packages/infra/scripts/` still holds all 13 of those same names, beside `block-headless-halt.sh` and `block-shell-active-prose-flag.sh`, which are registered there and are not duplicates.

The duplication is deliberate and was correct when it was made. `hooks-delivered` fails with 15 live seats across 3 distinct payloads still launched from a settings file naming the old paths, and a hook whose file is absent exits 127, which the client treats as non-blocking rather than as a refusal. Deleting the code-side copies before those seats turn over would silently disarm those guards for them, which is the failure mode the hook checks exist to break.

What has no owner is the state after turnover. `hooks-registered` has two arms and neither reaches this: one walks `tools/hooks/` for a script nobody registers, the other counts registrations naming the code repository, and its failing finding today names `block-headless-halt.sh`, which is a registration. Neither looks in `packages/infra/scripts/` for a file nobody registers, and by the check's own stated doctrine that tree is outside the perimeter and is evidence rather than a subject.

Nor does a row carry it. #17768's objective was the move and says nothing about the copies left behind; #17769's is the code-side wiring and the test suites. Two copies of a guard with no instrument comparing them is the shape that hid a hook for four months in the other repository, which is the history `hooks-registered`'s own header cites as its reason for existing.
