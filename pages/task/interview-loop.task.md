---
id: 99f2d117-df18-5e9f-a6a7-48a563727bd6
page-type-slug: task
title: "Interview loop"
slug: interview-loop
domain-parent-slug: page-type/task
---

# Definition

- **Interview loop** — one question put to the person and what it draws out, run again until they stop.

# Loop

1. **The question you ask.**
   - **Ask** one thing, in the words you would say it out loud, per ["Alan answers one item in a message."](../domain/alan-harness-agents-interaction.domain.md).
   - **Follow** what they just said rather than returning to the questions you drew up. Those were written before they spoke, so a session that is working leaves most of them unasked, and reading down the list turns an interview into a form.

2. **Where the answer goes.**
   - **Delegate** the landing to a subagent, naming the standing domain it goes against and the rules binding whichever part it would change. Landing in-session spends the context the conversation runs on and stalls the turn you owe them.
   - **Run** [define-domain-structure](define-domain-structure.task.md) where what they said needs a domain that is not there. Creating one outside that task lands a shape nobody settled, and the edges are the expensive part to move afterwards.
   - **File** it through [file-finding](file-finding.task.md) where what they said is an observation nobody has judged yet.

3. **The threads you are holding.**
   - **Leave** the question of whether to continue alone. They stop when they stop, mid-turn and without warning, and asking spends the attention it is asking about.
   - **File** each open thread as a finding when it appears rather than at the end. A session with no closing bell has no end to gather them in, and a thread you are still holding goes when you do.

# Invariants

- **A session that changed nothing is not a failed session.** What stood was right, which is worth knowing. An interviewer asking until something moves is manufacturing an answer, and what that interviewer writes down afterwards looks exactly like one the person meant.

- **Nothing here is armed.** Their next turn is what runs the next iteration, so this task schedules nothing and leaves nothing to take down afterwards.
