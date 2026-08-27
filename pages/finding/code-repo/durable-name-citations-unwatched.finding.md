---
id: c85ac371-2c80-5fa4-93c4-042b9fbb9b30
page-type-slug: finding
title: "Durable name citations unwatched"
domain-slug: repo/code-repo
---

# Claim

Live code cites instruction documents by durable name, and nothing reports when such a name stops resolving. Three comments in `packages/shared/design/primitives/src/components/` — `filterable-list.tsx:27`, `dropdown-menu.tsx:16` and `sub-view.tsx:12` — close on `See Filterable Select Lists.` That document is removed today. The gate on this boundary asserts direction rather than resolution, by a decision on record, so a name reaching nothing reads exactly like one that reaches its document.

# Evidence

`grep -rn "Filterable Select Lists"` over `.ts`, `.tsx` and `.md` under `~/code`, excluding `node_modules` and `dist`, returns exactly three hits, all comments and all in `packages/shared/design/primitives/src/components/`: `filterable-list.tsx:27`, `dropdown-menu.tsx:16` and `sub-view.tsx:12`. Each closes a block comment describing the shared list-filter core.

The convention is deliberate. Code-repo commit `cf7670c96d` states it: this repo cites the instruction estate by the durable names its registries resolve rather than by path, because the two trees land on different clocks — an address across that boundary breaks with nothing raising it.

`packages/infra/checks/src/checks/check-instructions-citations.ts` is the instrument on that boundary. Its header says "WHAT IT ASSERTS IS DIRECTION, NOT RESOLUTION"; that `check-repo-paths` once carried an arm asking whether each citation resolved, that the arm "landed against a frozen population of 872 and failed when the count moved, and it was removed on Alan's ruling"; and that this one "ASKS THE OTHER TREE NOTHING, which is what lets it run anywhere", needing no checkout of the instruction tree. It exits 0 when no citation crosses the boundary and 1 when one does. A durable name is not a crossing, so all three sites pass.

The destination went today. `dirty/knowledge/filterable-select-lists.md` was emptied line by line under commits `d0698df512`, `5a1fb72a7f`, `ec871a6c3c` and `bef8e80183`, and removed. One paragraph survived, kept at `dirty/maybe-keep/knowledge/filterable-select-lists.md`, which is not a destination a durable name resolves to.

The scope is wider than one document: `dirty/knowledge/` is what these names pointed into, and it is being emptied across many concurrent seats. Whether other names in code point into the same tree is not answered here, and nothing in either repo asks it.
