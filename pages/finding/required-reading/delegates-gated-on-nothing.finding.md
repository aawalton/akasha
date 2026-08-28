---
page-type-slug: finding
title: "The required reading gate has never demanded a document of a delegate"
domain-slug: domain/required-reading
slug: delegates-gated-on-nothing
---

# Claim

The required reading gate has never demanded a document of a delegate.

`read-what-is-required` resolves what a writing agent owes from what that agent's own page states. A subagent's page states none of the eight attributes an obligation is resolved from — not persona, domain, role, task, initiative, principal, mode or on-call — so the set it yields is empty and the gate passes every delegate write unread. This has been so for every subagent akasha has ever recorded, not for a window opened by a change.

A delegate's obligations are computed twice from two different grounds. `ops read --seat` resolves them from the parent seat's domain; the gate resolves them from the delegate's own page. Nothing compares the two, so what an agent is handed to read and what it can be refused for not having read are free to differ without either side being wrong about its own question.

# Evidence

Every version of every subagent page in akasha: 321 distinct pages, 878 revisions touching them, read at each revision and searched for `persona-slug`, `domain-slug`, `role-slug`, `task-slug`, `initiative-slug`, `person-slug`, `start-mode` and `on-call`. No occurrence of any key in any version.

Both resolutions taken in one process against one snapshot of the live tree. The delegate set a parent seat yields, against the seat's own set, for all ten seats: aine 22/31, amy-alan-handler 27/29, amy-ki-handler 25/27, astra 23/32, athena 23/32, dalla 28/37, mari 32/40, nimue 23/32, thea 27/36, vera 23/32. The delegate set is smaller than the seat's own set in every case.

Not measured: how many delegate writes would have been refused had the gate bound them. A subagent's read log is written to `*.readings.uncommitted.attachment.json`, matched by `.gitignore:1:*.uncommitted.*`, and no readings attachment has ever been committed in akasha. What a departed delegate had read when it wrote is not recoverable, so that figure has no evidence behind it and none is offered here.

Not measured: whether a delegate would in practice run `ops read --seat` before writing, or how much of one answer the delegate set fills. The second was modelled and the model discarded as an estimate rather than a reading.

Taken 2026-08-26.
