---
id: 7ce6392c-02cb-4278-a22e-b52b96d5987c
slug: a-page-type-outside-the-pages-directory-is-reached-by-no-path
page-type-slug: finding
title: "A page type outside the pages directory is reached by no path"
domain-slug: domain/pages-system
---

# Claim

The `page-type` page type states `akasha:**/*.page-type.md`, and its own Intent says a page type lives where its domain lives, so a page type's document is meant to stand outside `pages/page-type/`. `pageTypePathIn` looks in `pages/page-type/` alone and composes its fallback there too, so for every page type filed elsewhere it answers a path no file occupies. Eleven stand there now. Unlike the sibling fault in `whereFor`, this one is active rather than latent: seven call sites use it, and those that read the answer get nothing back.

Fixing it cannot disturb seq minting, which was the risk worth settling before touching it. None of the eleven states `next-seq`, and all four page types that do state one stand inside `pages/page-type/`, where the function already answers correctly. The seq counter is keyed by the page type's path, so a change to that path would otherwise have restarted a live counter.

# Evidence

Read 2026-08-28, against `page/page-types.ts:231-234`:

```ts
export function pageTypePathIn(root: string, slug: string): string {
  const held = pageFileIn(root, placeDirOf("page-type"), slug)
  return held ?? `${placeDirOf("page-type")}/${slug}.page-type${MARKDOWN}`
}
```

`pageFileIn` at `page/page-file.ts:11-21` is a single `readdirSync` of the one directory it is given.

Ran it against the real tree. `pageTypePathIn(root, "graph-node")` answers `pages/page-type/graph-node.page-type.md`, which does not exist; the document stands at `graph/node/graph-node.page-type.md`. The same for `readout` and `readout-widget`. It answers correctly for `domain` and `pipeline`, which stand inside `pages/page-type/`.

`git ls-files '*.page-type.md'` holds 11 outside `pages/page-type/`: seven under `graph/` and four under `readouts/`.

Seven call sites: `tools/lib/page-write-compose.ts:32` for seq minting, `tools/lib/page-type-repo.ts:33`, `tools/commands/page/suffix.ts:130`, `tools/audits/checks-reached.ts:15`, `tools/lib/finding.ts:35`, `tools/lib/main-pipeline-creator/seqs.ts:5`, and `ops-cli/worktree/start/start.command.code.attachment.ts:187`. `page-type-repo.ts:33` passes the answer to `textAt`, which returns null for the eleven, so their `files:` cannot be read back through it.

On seq: grepped `^next-seq:` over every `*.page-type.md`. Four state one — `pipeline`, `step`, `workflow`, `worktree` — and all four stand in `pages/page-type/`. None of the eleven states one, so `statesNextSeq` at `tools/lib/page-seq.ts:63-67` answers false for them either way, before the fix because the file is absent and after it because the real file states no counter.

Cost of the widening: `scanIn(root, ["**/*.page-type.md"], "akasha")` answers 391 files in 19.3 ms, served from the page index rather than a tree walk, against 21.0 ms for the narrow `pages/page-type/**` scan. There is no scan-cost argument for the narrow search. A cheaper shape still is to keep the single `readdirSync` and widen only on a miss, which leaves the 382 common cases untouched.

Not fixed here. `page/page-types.ts` is being converted to reach page types through the index by other work in flight — `014a2c82d`, `38ac197f9` and `14ab92b7f` — and this function is the next step in that sequence rather than a separate repair.
