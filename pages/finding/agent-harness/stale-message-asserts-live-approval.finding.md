---
id: dfd3363d-1ac0-51f3-922a-b687f6000032
page-type-slug: finding
title: "Stale message asserts live approval"
domain-slug: domain/agent-harness
---

# Claim

A message can arrive days after it was written, carrying an assertion of Alan's approval for work that has since been completed, with nothing in it marking its age.

# Evidence

Observed 2026-08-04. A message from `athena-intake` arrived asking the lead to dispatch #17261 and its five children, stating "He asked for it to be dispatched through you, which is his approval for the dispatch."

The tree had completed six days earlier. #17261, #17262, #17263 and #17264 all carry `completedAt` of 2026-07-29; #17265 and #17266 sit at `someday_maybe`. The sending seat no longer appears in `ops seat list`.

Nothing in the message marked its age. It was written in the present tense, described the tree as "defined and at `awaiting_manager_claim` with five children, all at `awaiting_worker_claim`", and that is a true description of a state six days gone. Acting on it would have re-dispatched finished work against a real claim of Alan's authorisation.

Its technical premises are superseded too. It warns that renaming strips persona because `setAgentName` re-classifies the axes from the name it binds, and a compound name takes UNCLASSIFIED on all three. Names are now composed FROM stated identity rather than parsed into it, and the lead's row carries `persona=athena role=lead domain=agent-harness` as stored axes.

Its process claim does not match the corpus. It states the lead does NO definition work, while `roles/lead.md` reads "Cut and dispatch the rows that close it, and rule on what comes back". A surface binds and a message does not. Its claim that nineteen of the lead's parent rows sit stalled also fails: zero rows owned by `athena` stand at `exploration`, `intent`, `problem` or `principles`.

Not verified: why delivery was delayed, whether other messages are queued behind it, and whether the sending seat was retired before or after it sent.
