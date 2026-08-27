---
id: e47d3075-ce2e-5d34-b569-48d7f5072c29
slug: question-answers-unrouted
page-type-slug: finding
title: "Alan's answers to questions name work that reaches the work system through nothing"
domain-slug: domain/work-system
---

# Claim

Alan's answers to questions name work he wants done, and that work stands only as the answer's own text. The question store holds 351 answered questions; an answer routinely carries a ruling to apply, a rewrite to start or a backfill to run. The answer reaches the seat that was waiting on it and nothing else, so once that seat ends the want survives as a question body in a store nothing rereads. No finding, no domain intent and no project is written from it.

# Evidence

Counted in `pages/question` on 2026-08-22: 435 `.md` files, of which `status: answered` 351, `status: dismissed` 83, `status: open` 1.

Read the bodies of the last twenty answered questions taken in file-name order. Eleven of the twenty name work Alan wants done. Four verbatim: "Backfill all 23 days"; "Switch over now, we should have the database on node-02, that explains a lot."; "Lets do the rewrite now, based on the previous 100 of these we've done, I expect it will likely be hours, not weeks to resolve those."; "Change the widget — drop umbrellas everywhere". A fifth defers work without recording it anywhere: "lets close this out for now, not my current priority. I'll create a new project when I'm ready to work on the audio more."

`pages/page-type/question.page-type.md` declares `domain-parent-slug: domain/alan-harness-tracking-source`, `files: akasha:**/*.question.md` and the Design line "A question's body is the answer it was given". Nothing in it names a finding, an intent or a project.

Searched akasha for a reader of the store: `pages/task/**` names questions in `capture-time-tracking`, `extract-topics`, `interview-loop` and `prepare-interview`, none of which sweeps answered questions for work. `tools/lib/turn-end-reading-questions.ts` shares the word and is unrelated — it parses the gate questions in `turn-end/reading/*.md`, not this page type.

Not measured: whether any individual answer's work was in fact carried into a finding, an intent line or a project by the seat that received it. The sample was read for whether the answer names work, not for whether that work was recorded elsewhere. The 83 dismissed and the 1 open question were not read. The code repository was not searched for a reader of the store; only the instructions repository was. One of the twenty sampled answers records its own capture in its body ("CAPTURED by athena-lead as initiatives/corpus/ruling.md"), so the store is not uniformly unrouted.
