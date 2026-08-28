---
id: 8b09429c-d0e4-5a43-9c10-61455f53538e
page-type-slug: task
title: "Split file"
slug: split-file
domain-parent-slug: domain/code-quality
required-reading-slugs:
  - page-type/task
---

# Definition

- **Split file** — dividing one file into parts named for their subjects, without changing what it does.

# Sequence

1. **The subjects the file is about.**
   - **Read** the whole file before moving anything. A split decided from the first screen divides at where the reader tired rather than at what the code is about.
   - **Name** each subject, and give it a directory or a sibling named for that subject, per [File arrangement](../domain/file-arrangement.domain.md).
   - **Match** a layout already standing beside it rather than inventing one. Where a sibling directory has factored out the same subjects, taking its names is the split.

2. **Everything that imports what you are moving.**
   - **Find** every importer, and search test files as their own population. A `*.test.ts` file importing a module reads as a test rather than as a dependant, so a search for dependants stops one short of it.
   - **Decide** whether the original goes or stays as the composing file over the parts it now imports. Both are ordinary. What is not is an original left holding one fragment nobody named.
   - **Land** the readers before the parts, each one taking both the old shape and the new. Something reads the file between the two commits, and a reader that knows only the parts is broken until the data moves. A reader that takes both does nothing new while the root file still names no parts, so it is safe to land on its own.

3. **What the boundary was keeping private.**
   - **Say** what became exported. A private function that becomes an export enters every check keying on exports, and its return and property types now stand in escape positions.
   - **Say** what left a `*.test.ts` file, and keep every `mock.module` call beside what it delegates to. Moving the call to a non-test sibling leaves whatever keyed on it being a test. Moving only what it delegates to is quieter and worse: the call stays where it was, delegation is legible solely inside the file the call stands in, and a key still delegating at runtime reads there as a stub.
   - **Register** each new part wherever the original was registered. A new helper is a new sampling site, and a census naming the old one does not name it.
   - **Find** what writes the file as well as what reads it. A writer that picks its targets by path passes over a new directory of parts in silence, because a listing that does not recurse never descends into it. It goes on reporting the work it did on whatever stayed in the root file, so the run still reads as a success, and a test pinned to the old shape stays green.
   - **Re-export** from a new index only what something consumes. A barrel written to cover the directory publishes more than anything imports.

4. **What runs at import.**
   - **Prove** load-time behaviour unchanged. An index re-exporting the parts moves their values without necessarily running their statements, and where it does run them the order can change; a typecheck is silent on both.
   - **Read** what the consumer does with the parts before settling their shape. A parent distributing its children counts a fragment as one child and an array as its members, so a group returned as a component collapses where the same group returned as an array does not.

5. **The verification, against a control.**
   - **Run** whatever measured the file on the branch you came from as well as here, which is what satisfies [Negative Control](../domain/instrument.domain.md#negative-control) for a split — the same files failing there and passing here.
   - **Compare** test counts rather than test results. A suite still passing with fewer assertions is a split that carried a file's tests off with it.
   - **Diff** the real reader's output over the old shape and the new, where what you split is data. Tests over a data file carry their own fixtures, so they pass the same either side of the split and say nothing about it. The consumer's output is the only place a lost entry shows.

6. **What this task got wrong.**
   - **Report** to your principal what it sent you wrong or left you to work out — a stage that did not fit the file, a boundary it never named, an order that had to be reversed. Say so where nothing did: a run reporting nothing reads the same whether the task held or nobody looked, and only the seat that has just run it can tell the two apart.

# Invariants

- **A split changes nothing about what the code does.** Anything that changes behaviour is a separate act, taken separately and verified on its own; folded into a split it lands as a relocation nobody reads twice.
