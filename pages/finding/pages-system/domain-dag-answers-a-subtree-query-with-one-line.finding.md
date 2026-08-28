---
page-type-slug: finding
slug: domain-dag-answers-a-subtree-query-with-one-line
title: "The domain dag answers a subtree query with one line"
domain-slug: domain/pages-system
---

# Claim

`ops domain dag --domain pages-system` prints one line, and so does `--domain global`. It matches `domain-parent-slug` against bare slugs while every value is written `<page-type>/<slug>`, so every edge dangles: bare it prints 52,834 slugs flat where its help promises them indented, and 714 of 740 domain pages are missing. A one-line answer to a subtree query reads as a small subtree, and `pages-system.domain.md:40` names that: "A true empty and a failure read alike, and only one of them is a fault."

# Evidence

Measured 2026-08-28 at `ef1e39b351`. `pages/old-ops-command/ops-domain-dag.old-ops-command.md` gives `command-path: tools/dag.ts`.

FOUR ANSWERS. `--domain pages-system --paths` prints one line, `pages-system  pages/domain/pages-system.domain.md`. `--domain global` prints one line, `global`. `--domain pages-system` prints one line. Bare prints 52,834 lines, none beginning with whitespace, with no line equal to `global` or `pages-system`. Control: a line equal to `finding` is there, so the test can hit, and an invented token matches nothing.

THE TOOL NAMES ITS OWN FAULT. `--up pages-system` prints `pages-system`, then `  domain/global  — declared by no document`. `pages/domain/global.domain.md:5` declares `slug: global`. The parent value is the address `domain/global` and the tool looks it up as a bare slug, so it resolves nothing and every edge dangles. That is why nothing indents, and why a rooted print stops at its root.

WHAT THE BARE LIST HOLDS. Absent: 714 of 740 domain pages, 18 of 18 commands, 355 of 391 page types. Present: 3,082 of 3,083 findings and all 15 initiatives. The print of the domain DAG is the leaves with the domains dropped.

WHY IT MATTERS. The 144 findings standing beneath `domain/pages-system` could only be counted by walking `domain-slug` and `domain-parent-slug` afresh, because the tool for that question answers that the subtree holds one domain, and answers it confidently. Its help promises "Every domain declared on any live document, indented beneath the domains it names in `domain-parent-slug:`".

SITING. This could as well sit at `domain/ops-domain`, which the command page names as its parent. It is here because the fault is resolving a page address, and because Answer Or Refuse is the line it crosses.

NOT MEASURED: whether `--up` is right past one hop; what else calls `tools/dag.ts`; whether the 52,834 lines are exactly the pages carrying a slug.
