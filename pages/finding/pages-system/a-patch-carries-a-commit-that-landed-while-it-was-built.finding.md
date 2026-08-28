---
id: 53adb275-d098-5d66-987b-5c529142f347
slug: a-patch-carries-a-commit-that-landed-while-it-was-built
page-type-slug: finding
title: "A patch carries a commit that landed while it was built"
domain-slug: domain/pages-system
---

# Claim

`patchText` reads HEAD into a temporary index and then diffs that index against HEAD, resolving `HEAD` twice at different moments. Where a commit lands between the two, the patch carries that commit's paths as though the caller had written them, and the gate judges files the call never named. It refuses rather than passes, so it is not lossy.

# Evidence

Seen twice on 2026-08-27 while landing changes to the write command, under roughly forty agents committing into one checkout. Both times the refusal named a subagent page in no call of mine — `agent/subagent/astra--a292c96a6e723857a.subagent.md`, then `astra--a8eee280f8604e5b9.subagent.md`:

    read-before-write: .../agent/subagent/astra--a292c96a6e723857a.subagent.md — NOT YET READ —
    `pages/page-type/subagent.page-type.md` is required reading for this path.

The call named one file, `ops-cli/global/write/write.command.code.attachment.ts`. Retrying the identical call landed it on the first attempt, which says the window had closed rather than that anything about the call was wrong.

`patches/patch.ts:74-90` is the shape. `git read-tree HEAD` fills a temporary index, the caller's landings and removals are applied to that index, and the patch is `git diff --cached HEAD`. The first `HEAD` and the last are separate resolutions. Where a commit lands between them the index holds the older tree while the diff is taken against the newer, so the paths in the commit that landed appear in the patch as changes the caller is making.

The load is the cause and is ordinary here rather than exceptional: git's refs move whenever any seat commits, and the fleet runs many seats against one checkout by design.

This is the shape of two other things found the same night: an instrument answers, the answer looks like the one asked for, and the gap between the population it judged and the one it was asked about is stated nowhere in the output. Here the gap surfaces as a refusal naming a stranger's file, which reads as the caller's own fault.

Not established: whether the same window can drop the caller's own change out of the patch rather than adding another's, which would be a gate passing over a file it never judged.
