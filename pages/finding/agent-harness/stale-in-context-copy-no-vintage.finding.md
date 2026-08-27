---
id: bf60a460-66b6-58a2-9997-7f2ba37bbf2c
page-type-slug: finding
title: "Stale in context copy no vintage"
domain-slug: domain/agent-harness
---

# Claim

A running agent holds an in-context copy of an instruction surface with no way to tell its own vintage, so a copy corrected live on main reads as complete rather than stale — measured by #16960 at a 46-minute gap between the fix landing and a manager reporting the still-absent clause as a contract defect — and the `[instruction-reload]` notice worsens this by naming no path, forcing a `git log` walk across repos to judge whether a restart is needed.

# Evidence

From project #17050 (status someday_maybe, live-on: deploy, domain agent-harness), captured and never defined, no objective was ever written.

Instance 1, measured to the minute by #16960: commit e2c7c14 (2026-07-28T08:56:01-06:00) landed the revive clause in manage/SKILL.md (#16908); commit d84de9c (2026-07-28T09:42:03-06:00) a manager filed a finding saying that clause was missing, 46 minutes apart. It was reading a copy loaded at session boot, not a contract lacking the clause. The instructions were corrected live; the in-context copy never moved. It reported the absence as a contract defect, and a domain lead spent an edit fixing text already correct.

Instance 2, an hour later: an instruction-reload notice read "Agent instructions (system prompt / global principles) or MCP configuration changed on main," naming no path. The reader had to walk git log in two repositories to confirm nothing spawn-baked had changed and no restart needed. The notice can say something moved; it cannot say whether what's held is what moved.

Why the direction is bad: a stale copy missing a clause reads as complete, so the agent reports the gap as diligence, costing an edit before anyone checks the timestamp. Routed instructions are signalled at each new task, but an agent mid-task keeps using its copy, since re-reading everything each time is the cost that scheme avoids; the signal changes nothing. Writers reach every agent instantly with no deploy, documented elsewhere; that every agent's copy has unknowable age is documented nowhere.

Not an argument for pinning instructions, nor re-reading constantly. The cheap fix: the notice knows which paths changed and does not say. Told a path moved, a reader decides in one thought if its copy matters; told "instructions changed," it can only re-read everything or nothing, and chooses nothing.

Still needed: whether naming paths is enough or a copy needs its own vintage marker; which carriers it can enumerate; what to do with it.
