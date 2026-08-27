---
id: cc4b5d6e-c136-531f-b20c-dd4605106fa5
page-type-slug: finding
title: "Intent entry reads true"
domain-slug: role/handler
---

# Claim

`domains/roles/handler.md` carries "A handler is started by the message it must serve, and holds no process between messages" under Intent, and it reads true: `handler-cold-start.ts` mints the row dormant and quotes the line as the requirement it implements, and two handler seats report no row at all. `domains/domain-intent.md` says Intent holds only what is not yet true. Alan split the entry into Design on 2026-08-10 and reverted the split 25 minutes later under a message saying nothing.

# Evidence

Read by a dispatched `review-instructions` seat on 2026-08-11, which ran `ops seat session` against `amy-ki-handler` and `claude-jenny-handler` and read the cold-start code. Both commits verified at the dispatching seat: 714a91047 "true since #18470, so it states rather than intends it" at 21:59, d07cda919 "instructions: edit domains/roles/handler.md" at 22:24, both authored by Alan.

The reader's guess at what is still untrue: a handler STOPPING after its message is not mechanised, only its start.

Riding on the same fork, and unresolvable without it: the Design entry "Alan's handler is interactive and stays running" is the exception to this Intent entry, and nothing ties them across the section boundary.

Not measured: what #18470 actually delivered, and whether the revert was deliberate or a stray edit.
