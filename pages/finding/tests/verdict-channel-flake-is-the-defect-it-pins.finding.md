---
id: 00523f35-e6ad-5eb6-8569-54d4038da8b0
page-type-slug: finding
title: "Verdict channel flake is the defect it pins"
domain-slug: domain/global
---

# Claim

`verdict-channel.cli.test.ts` intermittently fails under parallel test load with a partial stdout drain — which is the exact defect the file exists to pin. The loss lands on the setup assertion, that the filler was written, rather than on the verdict assertion, so it reads as flakiness; a suite that tolerates it is tolerating an observation of the defect the channel was built against, on a rung that cannot tell "the filler was lost" from "the verdict would have been lost too".

# Evidence

REPRODUCED, TWICE IN SIX RUNS. `bun test packages/shared/cli-core` — 277 tests across 19 files — failed on runs 2 and 4 and passed on the rest. The captured failure:

    Expected: > 60000
    Received: 58234
      at verdict-channel.cli.test.ts:132:27
    (fail) a verdict survives the exit its own verb takes > the filler really was written, so the queue was not empty

The case spawns the verdict probe with a filler payload and asserts `stdout.length` exceeds 60,000; the probe writes about 61,400 bytes and then calls `process.exit(0)`. An earlier reading of the same case recorded 51,994 on one failure in four, so the shortfall varies run to run.

IT IS THE FILE'S OWN SUBJECT. The suite exists because `process.exit()` does not drain pending async stdout writes on a pipe, and the filler is there to make the write genuinely queued. So the intermittent loss is not noise contaminating the test — it is the drop happening, observed by the instrument built to observe it.

WHY IT READS AS FLAKINESS INSTEAD. The loss lands on the setup assertion. The verdict assertion beside it — that the verdict line survived — keeps passing, because the verdict is written last and a partial drain takes the middle. So the suite's own division of labour hides which of the two facts was established: nothing in the failure distinguishes "the filler was lost" from "the verdict would have been lost too under a little more load."

IT CORRELATES WITH LOAD, NOT WITH CODE. It passes in isolation and fails inside the multi-file run, and the same command passes on an immediate re-run. Nothing about the file changed between my six runs.

NOT MEASURED. How far the shortfall can go before it reaches the verdict line itself, which is the number that would say whether the channel's guarantee holds under load or only under light load.
