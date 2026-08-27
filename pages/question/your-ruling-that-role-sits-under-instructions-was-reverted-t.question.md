---
page-type-slug: question
id: 019fbb9d-1f61-7574-99f2-7b963b2b749c
title: "Your ruling that `role` sits under `instructions` was reverted, then re-reverted as if it were a bug. Nine domains now sit under `global` on the argument you rejected by name. Should they go back?"
slug: your-ruling-that-role-sits-under-instructions-was-reverted-t
status: answered
source-context: "019fba68-7d7f-7283-960d-10abb0f97555"
asked-by: 019f2330-25c9-770c-894f-fd4ac497997c
options:
  - "Undo the reparenting — all nine go back under instructions"
  - "Keep global — the ruling is superseded, record that"
  - "Restore role, persona and task only"
---
ALAN'S RULING, 2026-08-02: "They should be under agent-harness specifically. We didn't have this clarity before, got it recently. These are the core parts of agent identity and behavior, whereas instructions-harness owns the process by which they change."

Neither of the two options the question named. Not `global`, and not the `instructions` domain the original ruling pointed at — that domain no longer exists under that name; Alan's settling of the harness seam produced `instructions-harness` and `code-harness` beneath `agent-harness`.

The line: agent-harness owns WHAT these are; instructions-harness owns HOW THEY CHANGE.

APPLIED by athena-lead, commit 29ff14ca. domains/persona.md, domain.md, role.md, task.md and principle.md moved from `domain-parents: global` to `domain-parents: agent-harness`. All nine estate checks green afterwards (domain-edges 145 domains / 145 parent edges). The governance edge followed: roles/lead.md is now governed by domains/agent-harness.md, which it was not before.

Eight domains remain directly under global — alan-harness, code, infra, memory, personal, technology, and the agent-harness/global roots. None is identity or conduct.

ON THE DURABILITY PROBLEM THE QUESTION RAISED, which is why this ruling was overwritten twice in good faith: a ruling living only in a commit message is invisible to every instrument here. Fixed for this one, commit 6b63514c — domains/agent-harness.md's Vision now reads "Personas, domains, roles, tasks and the principles that bind conduct are this domain's to define, and each hangs beneath it rather than beside it." The Vision is a surface every agent working this domain must read, so the next reparenting attempt meets the ruling rather than an absence.
