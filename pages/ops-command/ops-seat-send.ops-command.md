---
id: bf6d2447-8b35-564f-8b26-c6ba77c79d02
page-type-slug: ops-command
title: "Ops seat send"
slug: ops-seat-send
domain-parent-slug: domain/ops-seat
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/seat/send.ts
path: seat send
irreversible: true
---

# Definition

- **Ops seat send** — a message written to one agent or person, and the recipient resumed or started where none is live.

# Help

This command DELIVERS, and may start a recipient that is stopped. What it
always carries is a claim about whether the SENDER is waiting on it, and
you make that claim by passing --blocked or by leaving it off.

WITH --blocked, you are saying this seat is stopped dead until the message
is answered. WITHOUT it, you are saying it is not — an announce. Both are
delivered; the difference is what a reader may later conclude about the
SENDER, and the sender is the only party a message can claim is waiting.
A seat whose last unanswered message was an announce has told nobody it is
waiting, so nothing is coming back for it, and the turn-end rule is
entitled to end it. One that claimed itself blocked is left alone.

SO DO NOT CLAIM TO BE BLOCKED WHERE YOU ARE NOT. Until #18767 this flag
defaulted on, and that is how every hand-back in the store came to assert
its own sender was stopped until answered — a claim that read identically
to a worker genuinely parked on a ruling, and kept finished seats resident
for days.

WITH NO RECIPIENT NAMED, this goes to your PRINCIPAL — the seat recorded
as your `parent`, which `ops seat whoami` prints as `parentAgentId`. That
is the hand-back your task asks for, so the ordinary case needs no address
at all. Reaching anyone else takes `--to`. A seat carrying no parent (Alan's
own, and anything he started by hand) is refused rather than defaulted to
nobody, and told to name one.

A SEAT WITH A PERSONA IS ADDRESSED BY NAME. `--to amy` reaches the seat named
`amy`, whoever you are and whatever seat dispatched you. A name is resolved at
the moment you send, so it reaches whatever seat spells that way then rather
than the one it spelled when you wrote it down.

`--domain` addresses by what the recipient must HAVE rather than by who
they are. It takes a `--role` beside it and is refused without one, and a
role alone is refused too, the same role being held across every domain.
It names a seat STANDING on that domain, matched exactly — a seat on a
domain beneath the one named does not answer for it. Where more than one
seat matches, the most recently active one is the recipient.

WHERE NOTHING LIVE MATCHES, this REVIVES the most recently active stopped
seat that states the address, and the message is written before the revive
so the seat has it to read on the way up. Where no seat has ever stated a
domain and role, one is STARTED: the persona is derived from the domain,
which states domain and role, and the sender is its parent.
A slug this repo declares no document for is refused before any seat is
read.

`--person` addresses a HUMAN by the slug their document under `pages/person/`
declares, and states nothing else — being that person is the whole address.
Alan is the one person this system carries a mailbox for; everyone else is
reached on a channel their own document names, and the refusal says which
persona reaches them. This is the route to Alan, whose seat is not addressed
by the word `alan` as a name.

Sender identity defaults to the `AGENT_ID` env var; pass `--from` (alias
`--agent-id`) to override. `--from` accepts a UUID, UUID prefix or name —
the same shapes as the recipient positional. It asserts
an identity whose mailbox this process does NOT drain, so the seat named
there is not the one running here. It used to make `--blocked` REQUIRED;
it no longer does, a message needing no blocked claim to be delivered.

Provide exactly one of --content (short literal text) or --content-file
(path, or `-` for stdin). Use --content-file for anything prose-bearing,
whatever its length: house style writes identifiers in backticks, and the
shell substitutes a backticked span inside double quotes before this
process exists, so those words are DELETED and the message arrives
grammatical, plausible and missing exactly them. Neither end can see it.

Default stdout (TSV, one line):
  <message_id>\t<target_agent_id>\twritten\t<announce|blocked>

--json stdout (stable shape — callers may depend on field names):
  {"id","agent_id","status":"written","warrant","path"}

`written` is the whole of what happened: the message is a FILE, and the
write is the delivery rather than a step toward one. Nothing updates it
afterwards and there is no later state to poll for. The fourth column is
the claim this message carries about its sender.
