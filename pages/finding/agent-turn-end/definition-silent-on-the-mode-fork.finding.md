---
id: b2674665-b1e0-597c-9eac-9c5c7509bb5d
page-type-slug: finding
title: "Definition silent on the mode fork"
domain-slug: domain/agent-turn-end
---

# Claim

The interactive/headless fork is now the spine of `domains/agent-turn-end.md` — three of its six Design entries split on it — and the Definition names neither mode, so a reader meets the fork three entries in with nothing preparing them for it.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/agent-turn-end.md` dispatched from `review-documents`. The Design section was re-read here rather than taken from the reading.

Three of six entries now name the fork: "the halt guard may refuse a headless turn end"; "An interactive turn end is judged by a model reading the transcript; a headless one is judged from state, with no model called"; "An interactive turn end nothing can judge is allowed; a headless one is refused." A fourth names one half — "The words a headless seat ends a turn with start nothing." The Definition reads "an agent's work in a seat ending until its next turn starts", which names no mode.

Two of those three said only the interactive half as though it were the whole until this reading; it landed `1eea4f459` and `6accaaa85` against that, having found the headless guard says at length that it reads no transcript and calls no model, and that the two guards resolve the same blindness in opposite directions — "blind is not guilty; unanswered is not acquitted". So the spine is newly visible rather than long-standing.

`seat-mode` already stands in the document's `glossary:`, which is what gives a reader the two words before they reach the entries.

Not measured: whether the glossary entry is enough on its own, or whether the fork reaches the Intent, which names no mode either. The reading judged this the same call as the Definition's scope and left both to Alan, his wording being two days old at `5af0c2ae0`.
