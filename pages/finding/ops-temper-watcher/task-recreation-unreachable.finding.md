---
page-type-slug: finding
title: "The Temper watcher's task-recreation path cannot run"
domain-slug: ops-temper-watcher
slug: task-recreation-unreachable
---

# Claim

The Temper task watcher holds a recovery path nothing can reach.

`clearCompletion` reads a task back after clearing its completion, tests `deletedAt` on it, and calls `undeletePageById` to bring the task back. Every page type the watcher reads is file-backed, and a file-backed removal takes the file away rather than raising a flag on the page, so no read returns a page carrying `deletedAt`. The `recreated: true` outcome is unreachable, and were it reached `undeletePageById` refuses a file-backed page type outright, so the path would throw rather than recover.

# Evidence

Read on 2026-08-26: `temper/scripts/src/watcher/import-tasks.ts:279-298`, `shared/pages-access/src/get.ts:24-38`, `shared/pages-access/src/file-write.ts:284-288`, and `shared/pages-access/src/page-type-file-only.unit.test.ts:215-224`.

`get.ts:24` refuses a page type that is not file-backed, saying pages are no longer read from a table, so every page type the watcher reaches is file-backed. `file-write.ts:284` carries the refusal a file-backed undelete raises: a removal takes the file away rather than raising a flag on it, so there is nothing there to undelete. `page-type-file-only.unit.test.ts:215` asserts that refusal for `undeletePage`, `undeletePages` and `undeletePageById` alike.

Not measured: the watcher was not run against real saved variables, so the branch was not observed failing to fire in a live import. Whether any page type outside Temper is still row-backed was not checked. The 167 watcher tests pass, and none of them reaches this path.
