---
id: 86546c11-8be9-5645-b459-2d6e615c0212
slug: owed-reading-satisfiable-unread
page-type-slug: finding
title: "The command that pays an owed reading records it whether or not the body reaches whoever ran it"
domain-slug: domain/global
---

# Claim

The command a write's refusal prints to pay its owed readings records the reading whether or not the body reaches whoever ran it. On a large change set that output runs to thousands of lines, past what a tool result carries, and the harness spills it to a file rather than printing it. The gate then passes on a reading nobody did.

# Evidence

A delegate landing a 50-file change in this repo hit the owed-reading command twice. Both runs exceeded its tool output limit and were spilled to files of 2898 and 4362 lines. The reading was recorded by the run itself, so a retry of the write passed `read-before-write` and `read-what-governs` either way.

That delegate opened both spill files and read them through before retrying, so nothing landed unread here. Nothing in the refusal, the command, or the record would have said otherwise had it not.

The hole widens with the size of the change: a one-file write prints its reading and is honest by construction, and the calls that most need a reader are the ones whose output cannot reach one.
