---
id: 0d6ccf44-e5c8-519e-8685-34399f0eb708
page-type-slug: finding
title: "Book word count unscheduled"
domain-slug: domain/code-quality
---

# Claim

The deploy-time recompute of `authored-book` word counts has had no scheduler since `76e3e645c9` moved the book prose into a repo of its own. `packages/books/core/src/recompute-word-count.ts` still carries an `import.meta.main` entrypoint and a docblock naming the `books-word-count` CI workflow as its caller; that workflow was deleted in the same commit. The eight books in `~/books` have their `wordCount` refreshed only when someone runs `bun ops books word-count` by hand.

# Evidence

`git log --follow --diff-filter=RD -- packages/books/core/apps.workflow.ts` in `~/code` returns exactly one row: `76e3e645c9 D packages/books/core/apps.workflow.ts`, whose subject is "move the book content out to a top-level books repo". Deleted rather than renamed.

`git ls-files '*apps.workflow.ts'` returns 16 tracked files and none is under `packages/books/`, so the workflow mechanism itself is alive and this package's use of it is what went.

`rg -n -F "books-word-count" packages/` returns four hits, none a definition: the docblock at `packages/books/core/src/recompute-word-count.ts:8` ("Run by the `books-word-count` CI workflow"), two fixture strings in `packages/infra/ci/cli/src/lib/pipeline-subscription.database.test.ts:146,157`, and a historical pipeline specimen list in `packages/alanwalton/projects/cli/src/lib/deploy-resolved-decision-specimen.unit.test.ts:36`.

`rg -n -F "ops books"` and `rg -n -F "books word-count"` across `~/code` (excluding `dist` and `.git`) and across `~/instructions` (excluding `dirty/`) return only the module's own strings, its `cli/word-count.ts:17` examples, and `verdict-coverage.config.json:201`, which is a CLI verdict-coverage config rather than a scheduler. Nothing invokes the verb on a timer.

The entrypoint still stands: `recompute-word-count.ts:74` is `if (import.meta.main)` wrapping a `main()` that reads `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` and upserts each book's count.

The books it would count are live: `ls ~/books/` returns eight directories, and `packages/books/core/src/books.ts` `listBooks()` is a `readdirSync` over `booksRoot()`, which `packages/books/root/src/index.ts` resolves to `$HOME/books`.
