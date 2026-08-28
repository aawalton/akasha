---
page-type-slug: finding
slug: on-demand-breakage-lands-green
title: "A change that breaks an on-demand test lands green, nothing connecting the test to the change"
domain-slug: domain/test-on-demand
---

# Claim

A change can break an on-demand test and land green. The standard suite never runs one, by
design, and nothing names which on-demand tests bear on the files a change touched, so the
breakage is discovered only when somebody later runs that file by name.

# Evidence

Measured on 2026-08-28 against the findings-store flattening at `6dce800e`.

That commit changed `findingPathIn` in `tools/lib/finding.ts` so a finding's path no longer
carries its domain. It broke three assertions in `tools/tests/finding-create.on-demand.test.ts`
and left four more passing while asserting nothing. `ops write` gated it with 12 checks and
refused nothing, and a full `bun tools/run-checks.ts` afterwards reported four failures, none
of them this one: its output said `105 file(s) held back and not run here, each run by naming
it`. Running `bun test tools/tests/finding-create.on-demand.test.ts` by name reported 10 pass,
3 fail. Among the three was the case asserting that filing never overwrites a claim somebody
else made, whose fixture seeded the collision at a path the command no longer computes, so the
guard was not being exercised at all.

`pages/domain/test-on-demand.domain.md` states the design: an on-demand test is never run by
the standard suite. The gap is not that it was skipped but that nothing connected it to the
change that broke it.

Not measured: how many of the 105 held-back files are currently red, and whether any other
recent change left one broken. I ran one file by name because a subagent's sweep pointed me at
it, not because anything in the harness did.
