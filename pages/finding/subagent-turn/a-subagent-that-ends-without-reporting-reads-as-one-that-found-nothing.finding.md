---
id: 01a047e6-a08f-7615-b3cc-5b75571718d9
page-type-slug: finding
title: "A subagent that ends without reporting reads as one that found nothing"
slug: a-subagent-that-ends-without-reporting-reads-as-one-that-found-nothing
domain-slug: domain/subagent-turn
---

# Claim

A subagent that ends its run without reporting is indistinguishable, to the agent that launched it, from one that ran and found nothing. The task is marked `completed` either way, and the launching agent reads the empty result as an answer. This is the pages system rule Answer Or Refuse — a true empty and a failure read alike, and only one of them is a fault — failing one layer above the code it was written about.

# Evidence

Three delegates in one night, observed 2026-08-28 by seat astra.

Task `af16a35cd457019d7`, launched to verify page-naming claims, status `completed`. Its entire final output was: "Three of four agents are in. Waiting on the last (claims 3, 5, 9, 11) before reporting." Three subagents' worth of verification work stood in its transcript and reached the launching agent as nothing. Nothing in the completion signal distinguished this from a delegate that had checked everything and found nothing to say.

Task `a3529f714b32d50c7`, launched to verify ablation claims, was in an escalating sleep-poll — six background `sleep` commands of 120, 150, 180, 200, 240 and 300 seconds — waiting on two grandchild agents that never returned. Each wait was longer than the last, so the loop had no terminating condition. Its status read `running`, which is true and useless: it was not working, it was waiting on the dead.

Task `aba1c9757e6db1690` hit the same thing and handled it correctly, which is the control: "The two remaining subagents died without reporting, as the first one did; I verified their highest-value claims myself instead." Same failure three times in one night across three independent delegates, so this is a property of the harness rather than of any one agent.

`pages/domain/pages-system.domain.md:36-38` binds Answer Or Refuse. `pages/domain/subagent-turn.domain.md:23` already states the mechanism: a subagent's death announces itself to nothing.

NOT MEASURED: how often a subagent dies without reporting — three cases in one night, with no denominator counted. NOT MEASURED: whether the harness can tell a clean exit from a death at all; I did not open the code that sets the task status.
