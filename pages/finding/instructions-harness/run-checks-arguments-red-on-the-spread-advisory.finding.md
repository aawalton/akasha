---
id: 0398e056-f18f-535d-b3df-ceef8654ba2d
slug: run-checks-arguments-red-on-the-spread-advisory
page-type-slug: finding
title: "Run checks arguments red on the spread advisory"
domain-slug: domain/global
---

# Claim

`tools/tests/run-checks-arguments.integration.test.ts` is red on main. Two of its six tests fail, and both are about the `checks-spread` advisory that `faae348f9` added to the runner's output.

# Evidence

Reproduced in isolation, not only inside a full-suite run: `bun test tools/tests/run-checks-arguments.integration.test.ts` gives 5 pass, 1 fail on one invocation and a second failure on the next, at 2026-08-15.

The first, at line 20, asserts the output of a single named check is exactly one line. It is now four, because the run appends a `[checks-spread] advisory` line and two timing rows beneath it.

The second, at line 24, asserts that naming a check as a positional gives byte-identical output to naming it through `--check`. The two runs now differ only in the elapsed figure the advisory prints — `0.00s` against `0.01s` — so the assertion fails on timing rather than on behaviour, and will pass or fail by load.

Not mine and not touched. `faae348f9`, "checks: hold each check to lagging and the whole run to slow", is the commit that added the advisory, and it landed today while its author was plainly still working. I left it alone rather than repair a test under someone's hands.

The two failures want different answers, which is why this is filed rather than fixed. The first is a question about whether an advisory belongs in the output of a single named check. The second is a test comparing two runs on a value that measures the run, and no wording change makes that stable.
