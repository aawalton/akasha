---
id: 6a3e2854-5e37-54d5-bc3f-9267e2aefb74
slug: attendance-unstated
page-type-slug: finding
title: "Attendance unstated"
domain-slug: task/review-tests
---

# Claim

`domains/tasks/code-quality/review-tests.md` does not say whether it is run attended or by whom, and three of its steps turn on that: stage 2's **Ask** names nobody to ask, no step lists the file's lines before judging any, and the task ends at the suite with no hand-back, so the whole-file judgment stage 3 produces reaches no one. Both sibling tasks settle it in their own definitions — `review-instructions.md` says "unattended", `guided-close-read.md` says "taking Alan through".

# Evidence

Filed by the seat dispatching the 2026-08-14 `review-instructions` reading of `domains/tasks/code-quality/review-tests.md`, from that reading's hand-back. Its report stands at `~/agents/claude-review-tests-archivist-review-instructions/review-review-tests.md`, and the 2026-08-07 report it archived beside it at `review-review-tests.2026-08-07.md`, unread, so the two readings are independent.

I read the document at `060237ebe` and confirmed all three: stage 2 holds a bare "**Ask**, with your recommendation attached"; its steps run Read, Recommend, Ask, Wait, Land, Mend with no listing step; and stage 4 ends on running the suite. I read both sibling definitions and confirmed the two quotations.

The reading names three settled shapes the bare **Ask** could mean, each running differently: ask Alan as `guided-close-read.md` does, `ops ask-alan` and stop as `review-command.md:28` does when headless, or ask the principal once as `author-persona-scene.md:67` does. It reports a headless seat reaching line 40 of a test file as having no defined behaviour under any of them.

It landed three cuts and the stamp — `3c884d793`, `2229bf760`, `91704ce6d`, `060237ebe` — and I confirmed all four stand.

Not measured: I did not open the three tasks it names as the candidate shapes, and nothing here says whether any seat has run this task and stalled on the **Ask**.
