---
id: e12875b9-e957-5d82-ace4-d224eed36242
slug: theme-child-under-the-wrong-head
page-type-slug: finding
title: "Theme child under the wrong head"
domain-slug: task/define-initiative
---

# Claim

Stage 2 of `domains/tasks/definer/define-initiative.md` is headed "Whether to open it at all", and its second child names the theme in the `theme:` key — which is where the initiative sits once opened, not whether to open it.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/tasks/definer/define-initiative.md` dispatched from `review-documents`. The reading raised it and left it standing.

No criterion in `domains/tasks/archivist/review-instructions.md` reaches it: the child is not false, no instrument settles what it should say, it carries no surplus clause, and it has no second reading. What is wrong with it is where it sits.

The child has no obvious home to move to. Stage 3 is the `# Objective`, and `theme:` is frontmatter rather than an objective. So the fork is to widen the head or to find the child a stage, and both are judgments about what stage 2 is for.

The reading verified the theme claims the stage rests on against `tools/document/schemas/initiative.ts` and `theme.ts`: the `theme:` key is declared optional, and `theme.ts` declares no key pointing down, so "a theme lists no initiatives beneath it" and "nothing else records the edge" both hold.

Not measured: whether the other two stage heads cover every child beneath them, or whether a definer has ever missed the `theme:` child for its being under this head.
