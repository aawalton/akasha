---
id: 73a0d92a-3439-5792-970f-934c768788d2
slug: stale-name-parse-routing-note
page-type-slug: finding
title: "Stale name parse routing note"
domain-slug: domain/agent-harness
---

# Claim

`parseProjectSeqFromHandle`'s docstring in `packages/agents/shared/project-binding.ts` still says the dispatch-slot count, revive, boot child-reconcile, the wedge roster and capacity "stay on the narrow parse". Since #19053 none does: no live source outside that file calls `parseProjectSeqFromName`. It is the fault the same docstring names two paragraphs earlier — a routing note outliving its consumers, sending each later audit of what reads a project out of a name somewhere that no longer does.

# Evidence

## What was observed

Found by the lead verifying #19053's first criterion at `c46b79c85b`, by asking which readers still parse a seat's name rather than reading the hand-back's account of it.

`grep -rn "parseProjectSeqFromName(" packages --include=*.ts`, less `dist/` and tests, returns no call site outside `packages/agents/shared/project-binding.ts`. Inside it the one caller is `parseProjectSeqFromHandle`, whose two consumers — `set-name` screening a handle a person is proposing, and `db-agent-resolve`'s `lookUpUnheldName` interpreting one the store has just said nobody holds — both ask of a handle no seat holds. That is correct, and the docstring argues it well.

The stale part is the closing paragraph, which names the dispatch-slot count, revive, boot child-reconcile, the wedge roster and capacity as staying on the narrow parse. Every one of them was moved onto the seat's own `projectSeq` slot by the project being verified.

## Why it is worth filing

Two paragraphs above, the same docstring records that `reapable` "outlived every one of them and sent each later audit of 'what still reads a slot out of a name' to a function that no longer does". The file names this failure mode, about its own history, and then re-creates it in the paragraph closing the same comment.

It also sits on the exact claim #19053 landed. The next person asking whether readers were finished being moved off the name reads a comment answering no, in the file that is the authority on the question.

## The larger question around it

`domains/code-comment.md` binds `**/*.ts` and allows only the six forms; its Intent records that the code repo has not reached that. This is first-hand evidence for the rule's warrant. The same verification also leaned on two prose docstrings worth more than any domain line would have been. Neither reading settles the other, and that belongs to whoever rules on `code-comment.md`.

## Delete this when

The paragraph is corrected or removed, or the file stops being where that question is asked.
