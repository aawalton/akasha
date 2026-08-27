---
id: 7c2c2b64-bb96-524f-9be6-18f6be6311b3
slug: fold-is-undeclared-vocabulary
page-type-slug: finding
title: "Fold is undeclared vocabulary"
domain-slug: domain/global
---

# Claim

`fold` carries a sense of its own across code, commands and instructions, and no domain declares it, so every reader meets it as an ordinary word.

# Evidence

Re-measured 2026-08-27 in `/var/home/walton/repos/akasha`. The word stands in the tree at:

- `tools/commands/ali/fold.ts`, the body of an ops command
- `tools/lib/book-of-everything-coverage-fold.ts` and `tools/tests/book-of-everything-coverage-fold.test.ts`
- `pages/old-ops-command/ops-ali-fold.old-ops-command.md:16`, whose Definition reads "computed mastery refolded over the whole Book of Everything, into every node and the dashboard"

No domain declares it. `rg -n '^slug: fold$' pages/` returns nothing, and the nearest bolded term is `pages/domain/folder.domain.md:14`, which declares an unrelated concept: "a named container for files and other folders".

That neighbour is what makes this cost something. `fold` and `folder` read as one word and its noun, and they name nothing in common.

The sense looks consistent at each site — many rows reduced to one summary — but consistent use is not a declaration, and nothing holds a later use to it.
