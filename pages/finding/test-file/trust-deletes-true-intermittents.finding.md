---
id: d3f8e698-4a84-516c-b11d-e37c47de609d
page-type-slug: finding
title: "Trust deletes true intermittents"
domain-slug: domain/test-file
---

# Claim

The `Trust` rule cannot separate a flaky test from a test correctly reporting an intermittent product defect. Both fail, clear on a re-run, and read identically at the moment of failure, so the rule as written prescribes deleting the true positive.

# Evidence

The case is `"and survives it with 200 lines already queued ahead of it"` in `packages/shared/cli-core/src/verdict-channel.cli.test.ts`, met during project #19139.

It failed intermittently and passed on re-run, which is the exact shape `Trust` names. Investigating it instead of deleting it showed the failure was real: the probe truncated its output at 166 lines on one run and 144 on another against 200 queued, so the verdict line was genuinely being lost. The test was reporting the product's defect — the same defect #19139 existed to remove — and `Trust` read literally would have had me delete the only thing reporting it, on the strength of the re-run that passed.

I did delete it in the end, but on `Removal` grounds: the remedy makes the channel one line, so the queued-volume case it covered can no longer arise. That is a different reason arriving at the same act, and the difference matters — `Removal` required me to establish the structure first, where `Trust` would have let me skip straight to the deletion while the defect stood.

The rule's own aid sentence anticipates half of this: "A repair is confirmed by an absence of failure, which is what the flake looked like." The same sentence is true of a deletion — an absence of failure after deleting the test is what a fixed product looks like too, and nothing afterwards tells the two apart.

NOT MEASURED: how often this shape occurs. This is one case. I have not looked for other tests deleted under `Trust` to see whether any of them were reporting real intermittency, and I do not know whether the rule has ever been applied to a true positive before this. Nor have I drafted a replacement wording or established that one exists which keeps what `Trust` buys — the rule's warrant, that a tolerated flake charges every test beside it, is sound and any change has to keep it.
