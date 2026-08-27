---
id: 374006ba-62f9-597a-9c93-1d43d4875285
slug: conditions-with-no-words
page-type-slug: finding
title: "Two alert conditions have a document and no words, so nothing says what either means when it fires"
domain-slug: page-type/alert
---

# Claim

Two alert conditions have a document and no words anywhere, so nothing says what either one means when it fires.

# Evidence

`domains/alerts/host-survival-kill.md` and `domains/alerts/slow-suite-red.md` carry no summary and no description, and neither slug appears in `tools/` or `services/` in this repository.

They are unlike the eleven that compose their words as they fire. Nothing composes these at all: there is no fixed sentence on the document and no rendered one in the code here. `slow-suite-red` has text in the code repository, in the slow-suite sweep's own notifier, which is a copy standing where no page type governs it and no reader of this tree can reach it. For `host-survival-kill` nothing was found either side.

A reader who receives one of these has the condition slug and nothing else. Whoever answers for each condition is the one who can say what it means and what to check, so this needs an owner named before it needs prose.
