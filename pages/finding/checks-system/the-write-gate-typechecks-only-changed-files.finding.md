---
page-type-slug: finding
title: "The write gate typechecks only changed files"
domain-slug: domain/checks-system
---

# Claim

The write gate typechecks only the files a change touches, so a change that breaks an unchanged file is admitted, committed and pushed with `none refused`.

This is not the same gap as the gate running no test. The typecheck is real and does refuse — but its population is the changed files, and a rename, a signature change or a removal is a change whose damage lands somewhere else by definition. The one shape of edit the gate is weakest against is the one an ablation makes constantly.

What comes out of it is that main can hold a tree that no project-wide `tsc` accepts, with every commit in its history having passed the gate.

# Evidence

Two dry runs against the same file on 2026-08-28, differing only in whether the damage stayed inside it.

Inside the changed file, refused. Giving `markFrom` in `page/index/store/store.ts` a return type of `number` where its body returns a string was refused with three lines: `typecheck: .../store.ts — line 180: TS2322: Type 'string' is not assignable to type 'number'`, and the same at 184 and 189. Nothing was written.

Outside the changed file, admitted. Renaming that same exported function to `marksFromRenamedProbe` in `store.ts` alone, which leaves `page/index/build.ts` importing `marksFrom` from a module that no longer exports it, returned `gate: 8 akasha check(s) over 1 changed file(s), none refused` and would have written the file. `bunx tsc --noEmit -p tsconfig.json` over the same tree fails on it.

The two probes ran minutes apart against the same working tree, so the difference is the gate's population and not the state of the repository.

Not measured: whether any commit in history actually landed a cross-file break this way. The check would be a project-wide `tsc` per commit over the history, which was not run. What is established is only that nothing on the write path would stop one.
