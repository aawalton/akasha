---
id: d74fac4a-222f-531c-948d-8c0acdce0753
slug: delete-path-ungated-for-command-loss
page-type-slug: finding
title: "Delete path ungated for command loss"
domain-slug: domain/global
---

# Claim

`tools/rm.ts` levies two gates rather than the gate set, so deleting a file is not held by `command-kept`. A file directly under `tools/` that declares `command:` in its header is an `ops` verb by that line alone, and removing the file removes the verb with nothing refusing and nothing recording that it went.

# Evidence

`tools/rm.ts` imports `holdSeat` and `hookLiveness` and no others; it does not import `runGates`. `tools/mv.ts` does not import the gates directly either, but reaches them through `lib/rename.ts`, which calls `runGates` — so the move path is held and only the delete path is not.

`tools/gates/command-kept.ts` is what refuses a write that would drop a declaration, and it is reached from `tools/write.ts` and `tools/replace.ts` through the gate set. It is also not-applicable to a path that does not exist yet, so neither end of a file's life is covered by it: creation is outside its arm by design, and deletion never runs it at all.

What this class costs is on record. `262deee67` is a revert titled `revert the comment sweep: it took out lines the ops CLI parses for its verb list`, and `9f686c140` restored five declarations a sweep had removed. Both were writes, which is the path that is held.

Not established: whether making `rm.ts` levy the whole gate set is right, or whether the delete path wants a smaller set chosen for what a deletion can invalidate. Several gates measure a body, and a deletion has none.
