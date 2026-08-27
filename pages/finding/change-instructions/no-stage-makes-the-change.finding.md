---
id: 3277d2b0-c664-564c-94a9-69fe2c876e7c
page-type-slug: finding
title: "No stage makes the change"
domain-slug: task/change-instructions
---

# Claim

The Sequence of `change-instructions` no longer names making the change as a stage. It is a fork and a check, with the act between them carried by the Definition line and by Composed Outside on `agent-harness`. The reviewer that cut it judged the cut correct — a stage whose only content is "now do the thing" is scaffolding — and flagged it as the call on its run it would most expect a second reader to reverse.

# Evidence

Landed rather than left: commit `4d38af1d` cut the stage 2 bullet "Put it through a command under `ops instructions`" and the stage name that fell with it, then renumbered stage 3 to 2. This finding records the call, not a dispute with it — the reviewer named it itself.

Its argument, as reported: `agent-harness` is a parent of `task`, this document's only parent, so Composed Outside is already in every reader's boot and the bullet added only the namespace's spelling. It reports reading `tools/hooks/block-instructions-direct-write.sh` and finding a native Edit or Write into the root refused at the tool call, with the shell write the one case the hook cannot see — which is the failure Composed Outside is worded for. It reports the stage name fell because `tools/document/schemas/task.ts` declares children required, so the gate settled that rather than its judgment.

I did not read the hook, the schema, or the document before the cut.
