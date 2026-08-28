---
page-type-slug: finding
title: "The write gate runs no test"
domain-slug: checks-system
---

# Claim

The write gate judges a change against the akasha checks and refuses on a failure, and those checks include a typecheck, but no test is among them. A change that compiles and breaks a test is admitted, committed and pushed, and reports `none refused` while doing it.

There is no working fallback either. `bun test` over a directory is blocked, and the refusal that blocks it names `ops akasha run-checks --check suite-runs` as the change-aware route to run instead. That command does not exist: `ops akasha` takes only `work-tree`. So the message that stops the broad run points at nothing, and an agent following it exactly gets `unknown command under ops akasha`.

# Evidence

`b4eeb9b14` removed the `indexed` field from the `Landed` type in `repo/land/land.ts`. `repo/land/landing.unit.test.ts:18` asserted on that field. The gate reported `gate: 8 akasha check(s) over N changed file(s), none refused`, the commit was written, and the push was handed off to origin. The test stood red on main for about three minutes until `11236716e` fixed it, and nothing on the write path had said anything.

The typecheck itself is real and does refuse: composing an edit set that left `page/index/build.ts` importing a function removed from `page/index/store/store.ts` was caught. So the gate is not weak generally — it is specifically blind to tests.

`ops akasha run-checks --check suite-runs`, run at 2026-08-28 02:5x, exits 1 with `ops: unknown command under ops akasha` and prints a usage block listing `akasha work-tree` as the only subcommand. The blocked-`bun test` message that recommends it is at the refusal for `bun test <directory>`.

What does work is `ops tests run <path>` per file, and running the files an import graph says a change reaches, worked out by hand. For the change this was found on, that was five files; run individually all five pass, and run together 23 of 54 fail on an unrelated shared-process index-anchor collision that the failure text itself names ("Run this file on its own"). So the per-file route is the only honest one, and nothing automates picking the files.
