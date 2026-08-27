---
id: 6074b86e-c856-5fa3-96a3-3f4877d363f4
page-type-slug: finding
title: "Supervisor entry still crosses for setagentname"
domain-slug: domain/agent-harness
---

# Claim

The supervisor entry point still resolves `setAgentName` out of the code repository, and no project is cut to change that — the crossing closes as a consequence of #18891 landing rather than by any work aimed at the entry point.

# Evidence

`tools/run-supervisor.ts` injects three symbols. Two now resolve inside this repository. The third, `setAgentName`, imports from `/home/walton/code/packages/agents/shared/db-agent-rename.ts`.

Nothing it imports is a capability this repository cannot have: `@shared/supabase-server` and `@shared/pages-access` are the database and `@shared/instructions-corpus` reads this repo, all of which `domains/repos/instructions-repo.md` Reach Directly places here. What holds the file is its own unported siblings inside `packages/agents/shared` — the name-bind chain `gatherAgentNameBindInput` and `decideAgentNameBind`.

That chain is #18891's subject, traced there from the other end as `coldStartHandlerSeat` to `mintNamedAgent` to `setAgentName` at `db-agent-rename.ts:267`. #18891 stands defined at `awaiting_worker_seat`, sequenced behind #18836 because both rows live in `packages/agents/shared` and two seats are not opened on that package at once.

So no row names this crossing as its subject, and none should be cut for it: a third seat on that package is what the sequencing exists to prevent. The entry point is left reaching over for exactly one symbol, and that reach ends when the name-bind chain crosses.

What a later sweep should check is narrow — whether `tools/run-supervisor.ts` still names a `/home/walton/code` path. While it does, the supervisor does not boot from this repository alone, whatever the removal projects downstream assume.

The other injected symbol that still crosses, `watchSessionFile`, is a different case and is not outstanding: a null object store makes the whole watcher a no-op, and Reach Directly puts the object store over there, so a capability holds it and that is settled rather than deferred.
