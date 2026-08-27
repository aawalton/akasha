---
id: b1e841cc-79e6-543e-a865-932d84ea2135
slug: commits-name-no-seat
page-type-slug: finding
title: "Commits name no seat"
domain-slug: repo/akasha-repo
---

# Claim

Commits in akasha carry no `Agent:` trailer. Every seat writes into this one repository, so nothing on a commit says which of them made it.

# Evidence

`git log --format="%B"` over the recent history returns no line beginning `Agent:`, and `git log --format="%an <%ae>"` returns the same human on every commit. The committer this repository ships writes no attribution of its own.

The mechanism existed before. The door that committed on a seat's behalf added the seat as an `Agent:` trailer taken from a shared module, so the field was spelled one way wherever it was written. That door later moved into a tree that could not import the shared module and shells out instead; the attribution went with the move, and nothing reports its absence.

What this costs is specific rather than tidiness: a commit message here is the durable record of a verdict. A seat's reasoning survives its own source's removal only in the commit and the seat's report, and `%an` names the human who pushed, which is the same on every commit and answers a different question.
