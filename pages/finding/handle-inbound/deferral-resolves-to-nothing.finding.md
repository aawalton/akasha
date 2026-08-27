---
id: 2c128595-d7c0-58a5-8efa-cbf0644c72a8
slug: deferral-resolves-to-nothing
page-type-slug: finding
title: "Deferral resolves to nothing"
domain-slug: task/handle-inbound
---

# Claim

A deferral on `handle-inbound.md` resolves to nothing today. L14 sends the seat to "the set your governing documents name", and no governing document names an intent set. `ops instructions governs` lists six and none carries one; `ops instructions dag --domain handle-inbound --paths` returns that document alone; no document declares `domain-slug: ki`; and `dirty/skills/handler/` is empty. The sets live only in code, as `KiIntent`.

# Evidence

Raised by the review-instructions seat on `domains/tasks/handler/handle-inbound.md`, which left the line standing and was right to: the document serves ki-handler and jenny-handler alike, so naming one set on it would be wrong. Its reading is that the gap sits in the handler role's coverage rather than in this line.

I verified two of its four checks myself: no file under `domains/` declares `domain-slug: ki`, and `ops instructions dag --domain handle-inbound --paths` returns only that document.

Not measured: whether a handler seat's boot supplies the set some other way, which would make the deferral resolve at run time even though it resolves to nothing on disk.
