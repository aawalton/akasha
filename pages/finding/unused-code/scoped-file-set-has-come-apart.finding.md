---
id: 133ffd13-1e2f-5e21-b602-85bcc331498c
slug: scoped-file-set-has-come-apart
page-type-slug: finding
title: "The three files scoped together for unused-code no longer stand as one set"
domain-slug: domain/unused-code
---

# Claim

The three files scoped together for unused-code violations no longer stand as one set, so a row scoped around them would be aimed at a group that has come apart.

One file is gone from every repository, one has moved into the instructions repository, and one remains where it was. A removal scoped across the three would have to be three decisions in three places rather than one.

# Evidence

Searched `~/instructions`, `~/code` and `~/code-editor` by file name, excluding `node_modules`:

- `summarize-by-owner.ts` — no match in any of the three.
- `proxy-seats.ts` — `/var/home/walton/instructions/tools/lib/model-gateway/proxy-seats.ts`, so it stands in the instructions repository rather than the code repository.
- `dispatch-predicates.ts` — `/var/home/walton/code/packages/alanwalton/projects/core/src/lib/dispatch-predicates.ts`.

Whether each is still unused was not measured here; only where each file stands was.

The grouping came to this seat second-hand, in an announce naming six violations across the three as work scoped into a row of its own. No such row was found.
