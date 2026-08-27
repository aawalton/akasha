---
id: cb44f35e-6e52-5f1d-938c-838236fa2b45
page-type-slug: old-ops-command
title: "Ops ask-alan"
slug: ops-ask-alan
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/ask-alan.ts
path: ask-alan
irreversible: true
---

# Definition

- **Ops ask-alan** — putting one question to Alan as a page linked to your persona, pushed to him for an answer.

# Help

Ask Alan a question when you need his input (project #15489). Opens a `question`
page linked to your persona and pushes it to Alan through the notify() chokepoint,
deep-linking him to the question page's answering surface, where answering it is
what closes it. Nothing else closes a question: an answer he gives in conversation
leaves it open, so a question you no longer need an answer to is yours to withdraw.

Persona-backed: a caller that resolves to no persona errors — escalate up your
chain to your persona principal instead (this is a data prerequisite, not a
caller restriction).

You may hold as many open questions as you have things to ask: a question you
have not asked before opens its own page and fires its own notification, whatever
else is already open. Retry-safe on the QUESTION — re-running an ask whose text
matches one you already have open returns that question with no second push, so a
crash-retry cannot double-notify. `created=false` therefore means *this exact ask
is already outstanding*, never *someone else's question absorbed yours*.

This is not a licence to ask freely. Interactive, ask him in your last words and
reach for this only where you are fully blocked — prevented from continuing to
work at all. Headless, this is your standing route to him, one question a call.
Asking at a poor moment costs him attention and is visible; not asking costs the
work and shows up nowhere, so a bar read as `stay quiet` is read wrong.

Supply --context (tl;dr orientation so Alan can answer from the question
alone) and repeatable --option (quick-answer choices) to enrich the ask.

Default stdout: `<questionId>\tcreated=<bool>` TSV. --json: the full result.
