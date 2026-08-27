---
id: 1ae36a7a-6e76-5542-9e74-69e2449fefcc
slug: invitation-rules-name-no-command
page-type-slug: finding
title: "Invitation rules name no command"
domain-slug: domain/alan-email
---

# Claim

Two email rules tell an agent to answer an invitation on Alan's behalf and to check his calendar for a clash, and neither names a command that would do either. Nothing else in akasha routes an agent from those rules to the calendar. So the standing instruction is read, agreed with, and left undone, and what stops it is a gap no document mentions rather than a refusal anyone would see.

# Evidence

Measured 2026-08-19 across the instructions, code and memory repositories; re-measured 2026-08-27 in akasha, which replaced all three.

`pages/email-rule-agent/alan/jens-invitations.email-rule-agent.md:19` states the decision and no act: "Their calendars should agree, so an invitation from her is a yes by default. It covers what she organizes and never an invitation she was merely sent."

`pages/email-rule-agent/alan/ki-invitations.email-rule-agent.md:17` states a second one, and adds a read the agent would have to perform: "Accepting is reversible, so a standing yes commits the default and never the outcome. Jen is invited on her own address and answers for herself. A clash with his calendar goes to him."

The commands exist. `ops calendar events rsvp` sets Alan's own response without touching another guest's, and `ops calendar events list` reads a window of his calendar. Both work today: a live `events list` returns real events off `aawalton@gmail.com`, and the OAuth refresh token in `~/.secrets.env` exchanges against Google for a 200.

Neither rule names either command, and no task document does. Re-measured 2026-08-27: `ops calendar` matches in neither rule, and nowhere across the 30 pages under `pages/task/`.

The two rules are the only documents in this system that assign calendar work to an agent, which is most of why every command in the namespace has zero callers.

Not measured: whether an agent handling one of these rules has ever found the commands on its own, and whether Alan intends the answering to be an agent's act at all rather than his.
