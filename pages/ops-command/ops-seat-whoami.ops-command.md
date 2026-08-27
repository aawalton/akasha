---
id: f589f26f-a707-5532-88f3-6964179a2990
page-type-slug: ops-command
title: "Ops seat whoami"
slug: ops-seat-whoami
domain-parent-slug: domain/ops-seat
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/seat/whoami.ts
path: seat whoami
---

# Definition

- **Ops seat whoami** — the identity slots stated on the seat page the caller's `AGENT_ID` names.

# Help

Answer WHO AM I from the environment alone: resolve the calling session's
own seat page and report its name and identity slots.

This is the mechanical source for an agent's own name, and for the slots a
relaunch has to restate. `sn` reads this output and pulls each slot back out
of it with `sed`; `ask-alan` and `seat-facts` reach the same lookup as a
function. Without it the only source for a seat's own name is having been
TOLD it in a seed prompt, so a compacted or resumed session cannot recover it.

The name is deliberately NOT an env var: a re-statement whose name follows the
attributes, and a `/clear` rebind, both change it mid-session, so a stamped
copy would go stale. The lookup is keyed on `AGENT_ID`, which does not.

Every slot is read as STATED on the seat's page, never re-derived. A gate keyed
on those values must see what this command prints; re-deriving here would make
the two disagree. A seat whose page is gone is answered from the memory repo's
history, which is where a stopped seat's attributes stand.

`mode` is answered beside the five and is not one of them: it records whether
anything is reading this seat's output, not who the seat is.

`parentAgentId` is answered beside them too and is likewise not a slot: it is
WHO LAUNCHED this seat — the spawning agent's id, read from the seat's
spawn state. Read it beside `mode`: `interactive` with no parent is a session a
person started and correctly has none, while `headless` with no parent is a
seat whose launcher went unrecorded. A seat whose spawn state has been reaped
answers null here while still answering every slot from its page.

A slot the page carries no key for prints `null`, which is NOT the same
as the stated value `unknown`: `unknown` is a determination that nothing
could classify the seat, `null` is the absence of any determination.

Default stdout (one key per line):
  id=<uuid>
  name=<name>
  role=<role>
  domain=<domain>
  persona=<persona>
  task=<task>
  mode=<mode>
  principal=<who>
  parentAgentId=<uuid>

--json stdout (stable shape, single line):
  { id, name, role, domain, persona, task, mode, principal, parentAgentId }
