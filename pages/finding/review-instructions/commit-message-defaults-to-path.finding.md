---
id: 110dd5ea-109d-5d6b-92dc-9b868ac98f1e
slug: commit-message-defaults-to-path
page-type-slug: finding
title: "Commit message defaults to path"
domain-slug: task/review-instructions
---

# Claim

The Land step sends every archivist decision through a door whose commit message defaults to naming the edited path, while the convention already standing on `main` is that the message names the decision. Nothing in the step names the `--message` flag, so the default lands unless the archivist reads the door's help far enough to find it and decides on their own that the default is wrong.

# Evidence

Observed on a `review-instructions` pass over `domains/alert.md`, seat `claude-alert-archivist`, 2026-08-06.

The Land step reads: "Land each decision as its own commit through the door that gates it, and mend whatever it falsified in that same commit." It names the door and the granularity, and says nothing about the message.

`ops instructions edit` committed and pushed `48e446f488002104669281f0e7711ac55665df41` with the subject:

    instructions: edit domains/alert.md

The five commits standing on `main` immediately before it name the decision instead:

    agent-mode: reviewed-at moves to the day of this reading
    agent-governance: reviewed-at moves to the day of this reading
    agent-governance: `either repo` named two of the three repos one judgment binds a write in
    code-check: reviewed-at moves to the day of this reading
    code-check: Zero At Landing's second sentence carried three readings and no way to settle which

`ops instructions edit --help` carries the flag that would have produced the second shape, thirty-odd lines into the forwarded tool's own help:

    --message <msg>       Commit message. Defaults to one naming the edited paths.
    --message-file <path> Read the message from a file.

The help states the default plainly, so the default is not hidden; what is absent is any instruction that the archivist should override it. This seat read the task surface in full before landing and still took the default, which is one instance rather than a rate.
