---
id: 61b94180-13a7-5fd0-aecd-637eacd660b7
page-type-slug: finding
title: "Remedies carry no cost"
domain-slug: domain/global
---

# Claim

A check offering the reader more than one way to clear it states no cost for either, so an
order that reds one branch and an order that reds the whole fleet are presented as
interchangeable.

# Evidence

Measured 2026-08-04, 19:30–20:20 UTC.

`check-status-vocabulary-drift` closes its violation report with two remedies and nothing
separating them: "If this branch does not touch the vocabulary, the ROW moved: written out of
band, or main is ahead — rebase. If it does touch the vocabulary, the SOURCE moved and the row
has not caught up — land it, then write the row."

The check's membership arm is symmetric — it reports a source value the deployed row does not
offer, and a deployed option the source does not declare. The costs are not symmetric.
Source-not-deployed reds every checkout carrying that source, which for a value on main is
every branch in the fleet. Deployed-not-source reds only checkouts that have already dropped
the value, which during a narrowing is the landing branch alone.

Row #17806 narrowed the vocabulary from 22 values to 19 and wrote the data at 19:36:30 with
its source narrowing unlanded. Branch CI went red for every branch cut from main until it
landed at roughly 20:10. Row #17816 was stopped by it. The seat holding #17806 reported
afterwards that it had read the constraint as a two-sided equality, concluded a red window was
structural either way, and picked the shorter-looking one — and that it never ran the case it
expected to work, only the case it expected to fail.

The estate's own footer was correct. What it did not carry is that one of its two branches
costs a single checkout and the other costs all of them, which is the fact that decides
between them.

NOT MEASURED. How many of the 177 checks print more than one remedy. Whether any check
anywhere states the blast radius of a remedy it offers. Whether the ordering for a narrowing
is stated on any task surface a seat performing one would read.
