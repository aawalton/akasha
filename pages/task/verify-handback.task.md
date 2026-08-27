---
id: 5f38d0f1-db30-5bf3-bf16-552234a7b3a1
page-type-slug: task
title: "Verify handback"
slug: verify-handback
domain-parent-slug: domain/seat-delegating
required-reading-slugs:
  - page-type/task
---

# Definition

- **Verify handback** — rendering the verdict on work somebody else did, against what it was told.

# Sequence

1. **What the work was told to do.**
   - **Read** the intent the initiative carries before you read anything the work produced. Taken the other way round the verdict becomes a judgment of whether the work is coherent, which finished work always is.
   - **Read** the `# Notes` of the initiative the work serves for what was built, checked and verified. Work with no such account lets you conclude nothing either way, and the missing section is what you say rather than something to work around.

2. **What the work actually did.**
   - **Settle** the intent by an instrument you run yourself rather than by the account of one. The account is the seat's own report on its own work.
   - **Refuse** an intent the delivering seat rewrote, and judge the work against the line the initiative carried when the work began. An intent amended by whoever delivers against it has stopped being a standard, so the drift is a definition failure rather than something you can pass; git holds what it said before.
   - **Observe** what the change does rather than what it says it does, wherever the intent reaches something observable.

3. **The verdict.**
   - **Write** the verdict into the initiative's `# Notes` before you tell anybody: `ops memory edit --help`. A verdict travelling only by message reaches one seat and no later one, so the copy that survives is on the document the next seat opens anyway.
   - **Resolve** the intent on the initiative where this work makes it true: write it into the domain's `# Design` or delete it. Other work may bear on the same line, so read it against what now stands rather than taking this delivery for the whole of it.
   - **File** as a finding against the domain what the intent leaves to elapsed time or an outside event: `ops finding create --help`. A finding is read again by a later sweep; work held open waiting for one is read by nobody.
   - **Return** it to the seat that handed it back otherwise, with the reason on the revive: `ops seat resume <t> --prompt <why>`. A revive carrying no prompt brings the seat back warm, silent and reading nothing.
   - **Escalate** where the work is right and the intent was the wrong one to close, sending the definition back to the seat that chose it. Where the line itself is wrong rather than the choice of it, that goes on to whoever defines the domain it bears on. That is a definition failure rather than a delivery one, redefining is not yours, and without this exit a verdict forces a pass or a fail onto work that did what it was asked.
   - **Carry** to Alan only what no instrument settles and no principle decides, with the concrete example that raised it.

# Invariants

- **You did not do this work and you may not do it now.** Finishing what a hand-back left undone is the fastest route to a verdict in the work's favour and destroys the only thing this task produces: an assessment made by somebody who could disagree with it.
