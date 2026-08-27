---
id: cd70de1e-e011-5903-9652-5dd938a1b81a
page-type-slug: finding
title: "Read failure clear advances wedge latch"
domain-slug: domain/agent-fleet
---

# Claim

A failed upstream read in `landed-no-main-pipeline` renders `clear`, and a `clear` advances the devops-monitor's consecutive-clean-tick latch. Three ticks of read failures therefore de-escalate an open incident through `recovering` to `cleared` on no evidence of recovery — the collapse `wedges/observed.ts` exists to remove, live in the one classifier that declines the construction. Each module's comments are right alone; neither connects the fail posture to the latch.

# Evidence

`packages/agents/devops-monitor/src/wedges/landed-no-main-pipeline.ts:101` states the fail posture and confirms both inputs degrade to a non-firing read: "`recentBatches` is never null (`[]` on read failure → no stuck batch → per-land path silent)" and "An unreadable/absent `mergeQueue` (or null `mainSha`) leaves the backstop clock PRESERVED and un-fired for that tick".

Neither path renders a non-answer. Line 174 is the only verdict the classifier produces:

    state: wedged ? "wedged" : "clear",

So both read failures arrive at the consumers as `clear`.

The latch is in the other module. `packages/agents/devops-monitor/src/devops-monitor.worker.ts:259`:

    const prev = ctx.consecutiveCleanTicks.get(verdict.wedgeClass) ?? 0
    if (verdict.state === "unobserved") continue
    ctx.consecutiveCleanTicks.set(verdict.wedgeClass, verdict.state === "wedged" ? 0 : prev + 1)

`unobserved` holds the count; `clear` advances it. With `CLEAN_LATCH_TICKS = 3` (`process-verdict.ts:18`), three such ticks release the latch, and `dedup.ts:161` then emits `cleared` from a `recovering` prior.

The fail posture reasons only about whether the classifier fires — "a transient blip must not reset a real divergence's age nor fire without an observable tip". That holds for opening an incident. It does not consider the same `clear` being read as evidence of recovery for an incident already open, which is the opposite direction.

The raw read is deliberate: `observed.ts` records that `requiring` short-circuits to `unobserved` and cannot express preserve-the-clock-and-render-nothing. The gap is that "render no verdict" was the intent and `clear` is what the code emits.

Adjacent, from `dedup.ts:108`: nothing escalates a long `unobserved` streak either, so a monitor blind for an hour is silent about being blind. The code names that one as a known gap; this one nothing names.

Found while ingesting `dirty/knowledge/wedge-alerting.md`, which states the latch consequence in one sentence. That source has been removed.
