---
id: 48d959a8-b664-57be-ab46-8b77512d7c5f
slug: block-whole-suite-run
page-type-slug: refusal
title: "Block whole suite run"
---

# Refusal

A whole-suite `bun test` is blocked. Handing `bun test` a directory, or no path at all, runs every test file in the tree — including the held-back `.on-demand.test.ts` files, which stand apart because they are costly or want a database or a live system that may not be there. That run takes minutes, and most of what it reports failing is the missing system rather than the change being made.

Run a named suite instead, which reports the verdict rather than the raw exit code:
  - ops tests run <path>

Run one file directly while you are working on it — this is not blocked, and it is the fastest verification there is. A path ending `.test.ts` or `.test.tsx` passes, and so does a bare glob, which bash expands after this has read the command. Quotes are stripped before that read, so write the path bare; `$(...)`, `xargs` and `> file` are refused, each of them naming the files somewhere this cannot see:
  - bun test tools/tests/<name>.test.ts
  - bun test packages/<pkg>/src/<name>.test.tsx

A held-back file runs the same way, by naming it:
  - bun test tools/tests/<name>.on-demand.test.ts
