---
id: 81dccce6-55f0-598f-8fc3-f0ea942e765d
page-type-slug: finding
title: "Email whitelist untested on the wire"
domain-slug: role/handler
---

# Claim

The email whitelist is verified in the decision, in the shell and in production's page type, and no message has ever been driven through it over the wire.

# Evidence

Verified on 2026-08-11 by `amy-person-lead` against `8314ee4d0499` on `main`, deployed the same day.

The decision holds. Driving the landed `decide` myself over twelve combinations — {no channel, `amy@`, `bob@`} x {honest `From`, a `From` forging the watched account} x {empty rules, a populated LIVE rule set} — no message lacking Gmail's `SENT` label produced an `agent-handle` decision. Alan's `SENT` mail to two channels still woke both personas, and ordinary stranger mail to his inbox still surfaced.

The record holds. The `email-discard` page type is declared in production carrying `messageId`, `addressedTo`, `sender`, `reason` and `discardedAt`, and no column for a subject, a body or a snippet. Driving the pure writer, every key it writes is one the production type declares, and its title carries the sender and the address it was written to and nothing the sender composed.

What none of that reaches is the wire. Cloudflare's forward from `<slug>@alanwalton.com`, Gmail's labelling, the watcher's history cursor and the row that lands are all upstream and downstream of the pure decision, and no live mail has arrived since the deploy. So two things stand unobserved: that mail to a persona channel from an account other than the watched one leaves an `email-discard` row and wakes nobody, and that Alan's own mail to that address still reaches the persona.

Only somebody holding a mailbox can take that reading. It is the email twin of `handler/discard-untested-on-the-wire`, which says the same of the text-message route.
