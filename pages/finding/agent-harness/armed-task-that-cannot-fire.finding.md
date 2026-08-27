---
id: 2f8312b3-f1e9-5a92-a8d2-5e9438889a75
slug: armed-task-that-cannot-fire
page-type-slug: finding
title: "Armed task that cannot fire"
domain-slug: domain/agent-harness
---

# Claim

An armed background task whose filter can never match keeps a headless seat approved to go idle forever. `wakeSourceFrom` in `tools/lib/turn-end-decide.ts` reads `payload.runningTasks !== 0` and returns `running-task`, so the seat records `waiting: yes` and is let go on every turn end, with nothing that will ever start it again. The engine cannot tell a task that will fire from one that cannot, and no rule, gate or check measures the difference.

# Evidence

Read 2026-08-14 against `tools/lib/turn-end-decide.ts` lines 48-66, where `wakeSourceFrom` counts a running task by presence alone, and against `turn-end/rules/code/headless-wake-pending.md`, which approves any headless seat whose `waiting` is `yes` on the warrant "Something already set will call this seat back".

The case was written down. `domains/lists/headless-not-blocked.md` carried it as "Task that cannot fire — an armed monitor whose filter can never match stays live and reports nothing", one of five entries in a list nothing opens: `grep` across `tools/` and `domains/` finds no reader of any `headless-*` list, against three `interactive-*` lists that `tools/lib/interactive-cases.ts` opens off disk at run time.

The other four entries in that list are caught elsewhere and this one is not. "Idling announced" is caught by `claimsNobodyWaiting` in the same file, "Report sent" by the same announce warrant, and "Custodian dead" by the `CUSTODIAN_DEAD` refusal in `tools/lib/turn-end-refusals.ts`. Nothing corresponds to this entry.

This finding is filed because that list is being removed as redundant with the six `seat-turn-start-pending` domains, and this is the one claim in it that the replacement does not carry.

How often it happens is unmeasured, and so is whether any live seat is in this state today.
