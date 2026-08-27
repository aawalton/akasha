---
id: 1dfddda9-d863-507e-8e50-75669807df36
page-type-slug: finding
title: "Removed dormancy decider still listed"
domain-slug: domain/agent-fleet
---

# Claim

`packages/agents/routing-core/src/on-demand-agent-spec.ts:9` lists "the idle-streak dormancy decider" among the machinery hidden behind `OnDemandAgentSpec`. That mechanism was removed, and `standing-persona-spec.ts:69` in the same package says so: "the timer-driven dormancy-entry mechanism that once consumed it was removed". The stale line points a reader at a timer-driven teardown whose absence is the named Global Principle Never Restart Running Agents Automatically.

# Evidence

Read both files whole against `~/code` on 2026-08-07, while ingesting `dirty/code/packages-agents-routing-core-claude.md`.

`on-demand-agent-spec.ts` lines 8-10, in the type's header docblock:

    A consumer declares ONE ~6-field descriptor; all the dormancy / revive / wake machinery
    (the wake-watcher, the idle-streak dormancy decider, and the `resumePolicy` acquire-branch —
    `decideAcquireResume` + the opt-in branch in `@agents/cli`'s `acquireHelper`, #13727 §4.4)
    is hidden behind it

The other two members of that list are live: the wake-watcher daemon runs, and `decideAcquireResume` is called from `helper-lifecycle.ts:486`. The middle one is not.

`standing-persona-spec.ts` lines 65-70, on `dormancyPolicy`:

    a standing persona is dropped ONLY by explicit action (Alan stops her) or her own
    self-election at a turn boundary, NEVER by an idle timer (project #15119, Global Principle
    Never Restart Running Agents Automatically: no automatic timer-driven teardown of a live
    agent). The value is documentary — the timer-driven dormancy-entry mechanism that once
    consumed it was removed

Searched for a surviving decider: `rg -n "decideDormancyEntry|dormancyEntry"` over tracked source, exit 1, no hits.

WHY IT IS MORE THAN A STALE WORD. The two statements sit 60 lines apart in one package and disagree about whether a mechanism exists. A reader meeting the first learns that an idle-streak decider is part of what the descriptor hides — which is exactly the timer-driven teardown that #15119 forbids — and may go looking for it, or may believe idle timers tear agents down. The second statement is the correct one, and nothing connects them.

Neither file is under quarantine; both are live tracked source. `~/code` is read-only to me, so this is filed rather than repaired.

NOT MEASURED: whether other docblocks list the removed decider; when it was removed.
