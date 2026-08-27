---
id: 049d66a0-ce26-5385-bc99-2d2b5c4e462e
slug: memory-namespace-omits-the-rename-verbs
page-type-slug: finding
title: "Memory namespace omits the rename verbs"
domain-slug: domain/global
---

# Claim

`ops memory` names no `mv` or `rehome-finding`, and the registry's own comment says why in terms that no longer hold — the rename machinery it says addresses one root now takes the tree as an argument.

# Evidence

Measured 2026-08-05, after `tools/mv.ts` and `tools/rehome-finding.ts` were given `--tree` at `979232ed`, over machinery made tree-aware at `bd700c27`.

The capability is live and reachable: `ops instructions mv --tree memory` run with `--from` an initiative document, `--to initiatives/probe/seat.md` and `--dry-run` gates the moved body against the `initiative` schema, surveys 433 memory files for mentions and reports `[links] pass — 432 surface(s) checked`. The instructions door forwards every argument verbatim, so the flag reaches the tool through it.

What is absent is the namespace spelling. `packages/agents/instructions/src/memory/registry.ts:45-77` lists six verbs and neither of these is among them, so `ops memory` prints six commands where `ops instructions` prints eighteen. Its docblock at `:19-23` states the reason: "`mv` and `rehome-finding` still address the instructions root alone ... `repoint.ts` reads bodies, identity edges and reader notification out of `roots.instructions` throughout". Bodies and identity edges now go through `targetRoot`, and reader notification was already stood down for a non-instructions tree at `tools/lib/verb.ts:192`.

The same file at `:9-17` argues why the namespace is the thing rather than the flag: "a flag can be FORGOTTEN and its absence means the instructions tree ... A namespace cannot be forgotten." By that argument the two verbs reachable only by flag are the shape the file was written to refuse.

`tools/tests/rename-tree.test.ts` and `tools/tests/rehome-finding.test.ts` exercise both verbs against a real memory repository — a rehome landing folder, key and repointed citation in one commit, and a rename leaving the instructions tree's own spelling of the moved path untouched. 950 tests pass across 66 files.

Not established: whether the docblock's remaining paragraph — `owns`, `pin`, `dag`, `glossary` and `compose-boot` reading the identity corpus — still holds. It was not measured here.
