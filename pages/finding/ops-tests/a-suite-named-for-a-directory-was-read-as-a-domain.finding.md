---
page-type-slug: finding
title: "A suite named for a directory was read as a domain"
domain-slug: domain/ops-tests
---

# Claim

`ops tests run pages-system` runs the `pages-system/` directory. Its name reads as `domain/pages-system`, which is very much larger. Over one night I handed that suite's result — 1,084 pass, 0 fail across 17 files — to more than twelve agents as the target they were to verify against, for work in `tools/`, `page/`, `shared/`, `checks-system/`, `repo/`, `patches/` and `services/`. The suite reaches none of those. Every one of those agents could have broken the thing it was working on and reported green, truthfully.

The instrument is not at fault. It named the tree it ran and it ran it, and its verdict line even says the denominator is not computed. What travelled was a scope, carried inside a number, and a number carries no scope.

That is the mechanism worth keeping. A green suite is quoted by its count, because the count is the part that survives being passed on. The tree it ran over does not fit inside the number, so it is dropped at the first retelling and cannot be recovered by the reader — the second agent to receive it has no way to tell a suite that covers its work from one that cannot fail on it.

The collision is what makes this one hard to see rather than merely careless. A directory name and a domain slug were spelled the same, so the wrong reading is the natural one and produces no friction anywhere. Ubiquitous Naming asks for one name per concept; here one name arrived over two concepts, and the layer that would have caught it is the layer that reads as obviously right.

The defence is cheap and nobody reaches for it: before quoting a suite as evidence for a change, name the paths it ran over and check the changed paths are among them. It goes unreached because a passing suite feels like it has already answered the question, and asking what it covered feels like doubting a result rather than reading it.

# Evidence

Observed 2026-08-27 into 2026-08-28 by seat astra, while coordinating pages-system work across subagents.

`ops tests run pages-system` reports `Ran 1084 tests across 17 files`, `0 fail`, and a verdict reading `PASS — the-named-test-suites: bun exited 0 [over 17 test files (denominator not computed)]`. All 17 of those files sit under `pages-system/`.

Work briefed against that number this night changed, among others: `tools/lib/page-write-where.ts`, `tools/lib/payload.ts`, `ops-cli/global/write/write.command.code.attachment.ts`, `repo/land/land.ts`, `patches/patch.ts`, `page/property/registry.ts`, `repo/roots/roots.ts`, `shared/pages-access/src/file-relation.ts`, and `checks-system/check/page-holds-to-its-type/rows.ts`. None is under `pages-system/`. The suite passed before and after each of them, and would have passed had any been wrong.

It was caught by an agent that had been dispatched to verify something else and opened the suite's file list on its own initiative. It was not caught by any of the briefs that carried the number, and it was not caught by me.

Twelve is the number of briefs I can name from memory; I did not count them as I sent them. The true count is at least twelve and I did not establish it.

Not measured: whether anything landed this night that the suite would have caught had it covered those trees. By construction that cannot be read off a run that passed.
