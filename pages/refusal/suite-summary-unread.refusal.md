---
id: 4de6bed4-0f0e-561a-9db8-59e971ef33f0
slug: suite-summary-unread
page-type-slug: refusal
title: "Suite summary unread"
holes:
  - exit
---

# Refusal

A batch of the suite exited {exit} and printed no line this check could read as a summary, so nothing here says whether its tests succeeded, failed, or were never collected at all.

This check runs the suite in a worktree of the commit under test, handing `bun test` a few named `.test.ts` files at a time; {exit} is the worst code any batch returned, not the answer of any single command. The batch that answered nothing readable is the one to reproduce, by running its files one at a time — `bun test <path>.test.ts`, which is the form `block-whole-suite-run` accepts.
