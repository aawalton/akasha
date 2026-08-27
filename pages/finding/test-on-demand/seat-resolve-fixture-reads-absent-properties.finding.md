---
id: 0f13bdde-6fe4-5a35-8f0e-138065842617
page-type-slug: finding
title: "Every test in seat-resolve.on-demand errors on a fixture path that does not exist"
domain-slug: domain/test-on-demand
---

# Claim

Every one of the 22 tests in `tools/tests/seat-resolve.on-demand.test.ts` errors before
it asserts anything. Its fixture reads a `properties/` directory at the instructions
root, and no such directory exists, so `plant` throws for each test.

The file reports as failing rather than skipping, so it is visible to anyone who runs
it. What hides it is the habit of running the suite as
`tools/tests/!(*.on-demand).test.ts`, which excludes this file along with every other
on-demand test.

# Evidence

Measured 2026-08-22.

- `bun test tools/tests/seat-resolve.on-demand.test.ts` at HEAD: 0 pass, 22 fail. Every
  failure is `ENOENT: no such file or directory, scandir
  '/var/home/walton/repos/instructions/properties'`, thrown from `seatProperties` in
  `tools/tests/seat-fixture.ts:36` by way of `seatStore` and `plant`.
- The same test run in a worktree at `b5bbc1ee7^`, the parent of that day's seat
  refactor: 0 pass, 22 fail, identical error. So it is not a regression from that work.
- `git log -S` puts the `readdirSync(`${LIVE}/properties`)` line at `3f07947b0`,
  2026-08-19.

Not established: when `properties/` ceased to exist, or whether it ever did at this
root — the line's age is not the same as the breakage's age. Also not checked: whether
other `*.on-demand` test files depend on the same fixture path.
