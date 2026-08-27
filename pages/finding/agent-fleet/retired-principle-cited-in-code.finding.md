---
id: fb8606ae-7d95-5d83-bf6b-3a78554c352d
page-type-slug: finding
title: "Retired principle cited in code"
domain-slug: domain/agent-fleet
---

# Claim

`packages/agents/routing-core/src/standing-persona-spec.ts` grounds a standing persona's `dormancyPolicy: { kind: "manual" }` on "Global Principle Never Restart Running Agents Automatically", and no live instruction by that name stands anywhere in the instructions repo.

# Evidence

The citation is at `standing-persona-spec.ts:68`, inside the `standingPersonaSpec` docblock: "`dormancyPolicy: manual` — a standing persona is dropped ONLY by explicit action (Alan stops her) or her own self-election at a turn boundary, NEVER by an idle timer (project #15119, Global Principle Never Restart Running Agents Automatically: no automatic timer-driven teardown of a live agent)".

`grep -rniE "never restart running agents|restart running agents" domains/ tools/` in the instructions repo returns nothing. `domains/global.md` carries Value, Grounding, Parsimony, Ubiquitous Naming and Plain Or Declared, and no Safety section.

The only holders are quarantined and queued for removal: `dirty/code/packages-agents-claude.md`, which names it and a sibling, Never Auto-Relaunch a Failed Agent, as "two Global Principles → Safety prohibitions", both "exceptionless"; and two documents under `dirty/skills/agent-harness/findings/`. When that sweep finishes, the citation points at nothing a reader of either repo can reach.

Not the same claim as `pages/finding/agent-harness/code-cites-deleted-instruction-paths.finding.md`, which is about instruction-repo PATHS cited in code. This citation is by NAME, so no path-resolution check could ever reach it — which is what it adds.

Found while ingesting `dirty/questions/wake-watcher-doctrine.md`, whose entry on arming a seat rests on the same code line. The behaviour the docblock describes is real — the timer-driven dormancy-entry mechanism was removed and the value is documentary — so what dangles is the warrant, not the fact.
