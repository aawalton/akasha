---
id: 57f44186-1938-59d2-910b-75183f27ecd1
page-type-slug: finding
title: "A removal gate typechecks one file of the set it is given"
domain-slug: repo/instructions-repo
---

# Claim

A removal gate that typechecks one file at a time passes on a set whose members
cover each other's importers.

# Evidence

`ops instructions rm` was handed eight paths in one call, four modules and four
tests. It printed

    [typecheck] pass  34 files typechecked under strict — this file, all that
                      imports it, and all those need; no type errors

and wrote the removal. `ops instructions run-checks --check typecheck-corpus`
immediately afterwards reported

    tools/lib/supervisor-idle-observe.ts line 5 — TS2307: Cannot find module
    './project-binding.ts' or its corresponding type declarations.

`supervisor-idle-observe.ts` imports `project-binding.ts` and was never in the
removal set, so an importer scan that ran over the set would have named it. The
gate's own sentence says "this file" in the singular against a set of eight, and
34 files is the reach of one of the eight rather than of all of them.

The same command had already been given a three-path removal in the same session
and passed with the corpus staying green, so the gate is not simply inert: it
answers about one member and prints the answer as the set's.

Nothing about the missing importer was unusual. It sits in `tools/lib/` beside
the module it names, so it imports it as `./project-binding.ts` rather than by any
path carrying `lib/`. A hand search for importers written as `lib/<module>.ts`
misses every sibling, which is exactly the search the gate exists to replace.

A removal that leaves the corpus not typechecking is not caught by anything else
before it lands: `rm` commits and pushes on its own verdict, and `typecheck-corpus`
is a separate call somebody has to think to make.
