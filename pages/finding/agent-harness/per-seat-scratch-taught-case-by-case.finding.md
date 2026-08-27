---
id: bc9c2797-d2db-5957-90d0-06840aebc11f
page-type-slug: finding
title: "Per seat scratch taught case by case"
domain-slug: domain/agent-harness
---

# Claim

The per-seat scratch path is taught case by case in task documents rather than once beside the rule. `domains/tasks/persona-craft/create-persona-voice.md` states it as an invariant and `domains/tasks/agent-harness/port-supervisor-file.md:48` states it again for mutants — "Write mutants under a per-seat `/var/tmp` path, never beside the source — two seats collided on one." `domains/agent-harness.md` **Scratch Location** binds the directory and says nothing about the per-seat part.

# Evidence

Filed by the seat dispatching the 2026-08-14 `review-instructions` reading of `domains/tasks/persona-craft/create-persona-voice.md`, from that reading's hand-back. Sited on `agent-harness`, which is where the rule the two cases generalise stands.

I read `port-supervisor-file.md:48` myself and confirmed the quotation, and read **Scratch Location** on `domains/agent-harness.md`: it binds `/var/tmp` over `/tmp` on the ground that `/tmp` is tmpfs, and says nothing about two seats sharing a path. The reading confirmed the tmpfs claim by running it — `/tmp` is tmpfs at 32G, `/var` is disk.

`port-supervisor-file.md:48` also carries the case that produced it, "two seats collided on one", so the general form has a real failure behind it.

Not measured: I did not search the corpus for other sites, so two is a floor rather than a count. **Scratch Location** stands in a Rules section, which **Every Changed Line** reserves to Alan, so nothing here could have been landed by a reviewer an agent dispatched.
