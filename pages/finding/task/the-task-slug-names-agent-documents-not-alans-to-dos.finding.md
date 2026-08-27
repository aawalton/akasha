---
id: 01a0201e-3553-7000-b7d5-a79c7fbd9de7
page-type-slug: finding
title: "The task slug names agent task documents, not Alan's to-dos"
domain-slug: page-type/task
---

# Claim

`page-types/task.md` is the agent task-document type: `extends-slug: domain`, `files: instructions:domains/tasks/**/*.md`, Definition "a piece of work an agent can finish". Alan's own to-dos, which carry a due date and a difficulty tier, are a different population wearing the same slug. So `ops page list --type task` cannot reach them, and pointing a reader at that glob returns agent work items instead, silently and with a plausible shape.

# Evidence

Found 2026-08-20 while checking whether `ops page list` could be removed and its callers pointed at files instead.

`domains/personas/aelwyn.conduct.large.md:17` instructs Alan's health coach to "list via `bun ops page list --type task` filtered to the Health value, reporting names and difficulty tiers", and to complete one with `bun ops page complete <id>`. The glob `page-types/task.md` declares is `instructions:domains/tasks/**/*.md`, which holds documents such as `domains/tasks/general/loop.md`. None of them carries a due date, a difficulty tier or a value.

The two populations share the slug and nothing else. `page-types/task.md` carries `body-shape-slug: task` and sits under `domain-parents-slugs: agent-harness`.

The page-type migration reported the same class for `theme` and `topic`, a file type minted under a slug a row population was already using. I did not re-measure those; what I measured is `task`. Its file half is live, so a reader following the glob gets a well-shaped wrong answer rather than an error.

Not measured here: where Alan's to-dos now stand, or what still reads them. The claim is only that this glob does not reach them.

No repoint was made. `ops page list` and `ops page show` were held for this reason.
