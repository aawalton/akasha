---
id: fd35b05d-2997-54cc-b076-a297f6897125
slug: agent-and-agents-split-carries-no-meaning
page-type-slug: finding
title: "Agent and agents split carries no meaning"
domain-slug: domain/ops-namespace
---

# Claim

Both of the surface's singular/plural namespace pairs split two unrelated subjects, and the spelling says nothing about which is which — in one pair, two verbs one letter apart, the useless one holding the name a reader reaches for.

# Evidence

Measured 2026-08-15, running `review-command` on `ops agents inflight`.

Of 97 top-level namespaces, exactly two are singular against plural. `agent` holds 51 verbs that all act on the live fleet — `spawn`, `send`, `halt`, `reap`, `project-seat`. `agents` holds 3 that all import a code-repo module and print a constant it declares, touching no running agent. `ops book import` logs an Open Library match as a `book` page, one Alan read; `ops books seed` and `ops books word-count` work `authored-book` pages, ones he wrote. Both distinctions are real and neither name carries any of it.

The collision the agent split produces is sharp. `ops seat in-flight` reports a manager's live dispatch-worker count, derived fresh from spawn-state ownership, the stated `projectSeq`, and a wrapper-pid `kill(0)`. Its help calls it "the derive-at-gate source that retired the prose in-flight tally the manager / lead role documents carried in scratch", so a gate depends on it.

`ops agents inflight` prints a `CONTRACT` object literal hardcoded in its own command file, describing the surface of `@agents/shared/in-flight-tracker` — an OAuth proxy request counter, unrelated to dispatch workers — plus a count that is 0 by construction. Its help says the live counter "is not observable from a separate CLI process". So a seat after the dispatch-worker count that types the plural gets a constant table and a zero, with nothing in the output saying it answered a different question.

Nothing invokes any `ops agents` verb and none of the three has a test.

Not measured: whether any seat has reached for the wrong one of either pair.
