---
id: 0935c2aa-d4dd-5e18-a72b-8c88f87b9f7e
page-type-slug: finding
title: "Seeded automations reference doc dangling"
domain-slug: repo/code-repo
---

# Claim

Six tracked live modules in the code repo cite `packages/automation/orchestrator/docs/seeded-automations.md` as their reference document for the seeded-automation catalog. No revision of that document is live anywhere in the code repo; it stands only under quarantine in the instructions repo, which is queued for removal. Nothing mechanical reports the dangling citations, because they sit in comments.

# Evidence

Found while ingesting two of that document's children, `dirty/code/packages-automation-orchestrator-docs-seeded-automations-notes-and-editing.md` and `-overdue-rollover.md`, both emptied and removed in this run.

`git ls-files 'packages/automation/orchestrator/**/*.md'` returns zero — no markdown survives in that package. `git check-ignore -v packages/automation/orchestrator/docs` exits 1, so the tree is absent rather than ignored.

`rg -uuu -l "seeded-automations" . --glob '!.git/**'` over the code repo returns six files, and `git ls-files` confirms all six are tracked source rather than build residue:

- `packages/temper/scripts/src/watcher/import-tasks.ts:142`
- `packages/automation/orchestrator/scripts/seed-story-tracking-completion-automations.ts:13` and `:25`
- `.../seed-project-completion-notification.ts:27`
- `.../seed-recurrence-eso-anchor.ts:30`
- `.../seed-task-completion-delete-source.ts:20`
- `.../seed-project-completion-automations.ts:13`

Five spell it "Reference doc: `packages/automation/orchestrator/docs/seeded-automations.md`". These are the scripts that create the automation rows, so each sends a reader from the code seeding a row to the catalog saying what the row is for.

The document was never destroyed: `git log --all --diff-filter=A --name-only -- '*seeded-automations.md'` shows it added at `18b56dad70` under the older path `packages/workers/automation-orchestrator/docs/`. It now stands at `dirty/code/packages-automation-orchestrator-docs-seeded-automations.md`.

I opened `code-repo/checks-docs-citations-dangling` and `code-repo/property-definition-doctrine-citations-dangling`: both record the aftermath. Here the target still stands under quarantine, not yet ingested, so the repair window is open. Once a seat empties it, the six citers point at something recoverable only from history.

Horizon: read against `~/code` and `~/instructions` at `main` on 2026-08-08.
