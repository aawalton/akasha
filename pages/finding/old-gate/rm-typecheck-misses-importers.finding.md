---
id: 81ac649b-1c7e-5980-94a6-b5cf6c78f7aa
slug: rm-typecheck-misses-importers
page-type-slug: finding
title: "The removal gate does not typecheck what imports the file being removed"
domain-slug: page-type/old-gate
---

# Claim

The typecheck gate on `ops instructions rm` does not typecheck the files that import what is being removed, so a removal that breaks its importers passes. The write gate on the same repository does typecheck them, so the two gates disagree about the same module graph, and the removal path is the permissive one.

# Evidence

Measured 2026-08-22. A removal naming 60 paths, among them `tools/lib/seat-project.ts`, reported `[typecheck] pass — 34 files typechecked under strict — this file, all that import it, and all those need; no type errors`.

Seven live files import `tools/lib/seat-project.ts` at that moment: `tools/lib/seat-stated.ts`, `tools/lib/seat-show.ts`, `tools/lib/seat-whoami.ts`, `tools/lib/seat-work.ts`, `tools/lib/seat-nameable.ts`, `tools/lib/supervisor-rebind-carry.ts` and `tools/seat.ts`. Every one would have lost its import. Between them they carry `ops seat`, so the removal would have taken the command every seat states itself through.

Nothing was removed: the same call was refused by `mentions` over six stranded path strings, which are unrelated to the imports. The refusal that saved it was incidental, and a removal with no prose naming the path would have landed.

The write gate reads the graph correctly on the same repository and the same module. A single-file write to `tools/lib/seat-sweep.ts` earlier the same day reported `194 files typechecked under strict — this file, all that import it, and all those need`, and named 15 errors across 5 importers. The phrase describing what was checked is identical in both; the population is not.

Not established: whether the removal gate resolves the importer set at all, or resolves it against the tree as it would stand after the removal, where a file whose import no longer resolves may drop out of the graph rather than error. The 34 files it did check are unaccounted for either way.
