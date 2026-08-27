---
id: f37c947f-7a0f-5561-a9f7-e3ab3b3210f4
page-type-slug: finding
title: "Dispatched seat does not stop"
domain-slug: domain/agent-harness
---

# Claim

A dispatched seat does not stop when its work is done: it hands back, idles at a prompt, and holds its supervisor until someone ends it by hand.

# Evidence

Measured 2026-08-05 on dalla's own children. `ops seat list --parent-agent-id` returned five seats, all `running live`. Four had handed their rows back and three of those rows were closed; the fourth was parked on Alan. Only one had work left.

Their logs show what they were doing: an idle prompt. `code-check-developer-17875` read "Worked for 31m 9s" then a bare prompt and nothing after it — half an hour resident, work delivered, row closed. Each held three supervisor pids.

A standing instruction asserts the opposite. `tasks/lead/verify-handback.md` tells a lead to return a row by writing the reason onto it because "the seat that did the work has retired, so there is nothing to wake."

The two verbs disagree about what a dispatched seat is. `ops seat start --help` opens "Use this for a PERSISTENT / RESIDENT helper — one that must outlive your current turn/session... NOT for one-shot task delegation", and it is accurate about what it builds: a spawned seat idles when not working and wakes on inbound messages. But the same help's `--task <slug>` exists because "a dispatcher has decided, before the seat exists", and `tasks/lead/dispatch-project.md` sends every lead to that verb to dispatch a row.

Nothing reports the population. A lead who dispatches four rows in an afternoon and verifies all four is left with four idle supervisors, visible only if someone asks what seats they own.
