---
id: cad412c4-a80a-5574-832e-4aab0322e0c0
slug: two-roles-run-a-lead-task
page-type-slug: finding
title: "Two roles run a lead task"
domain-slug: task/verify-handback
---

# Claim

`verify-handback` is a lead task that two roles run, and its placement is the only thing saying otherwise. `domains/roles/manager.md:16` lists it beside `domains/roles/lead.md:27`, and both parent build tasks send a manager to it. Because `lead.md` declares `instructions-path: domains/tasks/lead/*.md`, the lead's role document governs the file and arrives in the governing set of every read — so a manager running this task reads the lead's role document as binding.

# Evidence

Raised by the review-instructions reading of 2026-08-07, from the document as a whole: no line-level verdict could reach it, and no line carries the repair.

Verified myself: `grep -rn "verify-handback" domains/roles/*.md` returns `lead.md:27` and `manager.md:16`, and `lead.md:4` declares `instructions-path: domains/tasks/lead/*.md` while `manager.md:4` declares `domains/tasks/projects/*.md`.

Why no line is wrong for it, as reported and consistent with what I read: every line is role-neutral, and the Pass and Return bullets say `<s>` rather than naming a lead's rung, which is exactly what lets a manager use them.
