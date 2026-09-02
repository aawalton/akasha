---
id: 050fb8fc-82fa-584c-94ab-4d630030ed7e
slug: suite-failed
page-type-slug: refusal
title: "Suite failed"
holes:
  - failed
  - exit
---

# Refusal

The suite reported {failed} failing test(s), and the worst exit code any batch returned was {exit}.

This check runs the suite itself, in a worktree of the commit under test: the `.test.ts` files it selects are handed to `bun test` a few at a time, and both numbers above are totals summed over those batches rather than the answer of any single command. The `(fail)` lines below name up to twenty of the failing tests.

To reproduce one, run the file it names — `bun test <path>.test.ts`. Naming files is the accepted form; handing `bun test` a directory is refused by `block-whole-suite-run`, so there is no one command here whose output this reproduces.
