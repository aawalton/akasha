---
id: cc420bd3-9fb6-50a8-8375-ec1f99c1b08c
slug: hand-search-for-projects
page-type-slug: finding
title: "Hand search for projects"
domain-slug: task/review-initiative
---

# Claim

Line 21 of `domains/tasks/lead/review-initiative.md` prescribes a hand search of memory frontmatter for the projects under an initiative, and `ops memory project-tree` composes that tree from the corpus at the moment of asking. The same substitution was landed on the sibling document `review-theme`. It cannot simply be repeated here, because the line also asks for each project's status, which the tree does not carry.

# Evidence

Raised by the reviewer seat `claude-review-theme-archivist-review-instructions` on 2026-08-13, while reading the sibling document `domains/tasks/definer/review-theme.md`. Its report is at `~/agents/claude-review-theme-archivist-review-instructions/review-review-theme.md`.

On its own subject that seat did land the substitution (`df2b8ffcd`): two bullets prescribing hand searches for initiatives carrying `theme:` and themes carrying `parent:` became one call to `ops memory project-tree`, which it ran — it printed `no-code-comments` nested under `change-throughput` and collects initiatives naming no theme under a `no-theme` root, so one call settles both searches and shows the initiative that never named its theme rather than hiding it. The document lost 79 bytes.

It did not carry the change onto `review-initiative`, judging that where status comes from is a judgment rather than a correction an instrument settles.

I did not open `review-initiative` or run `project-tree` myself.

Not measured: whether project status is available from any other composed source, which is what would decide whether this is a one-line substitution or a redesign.
