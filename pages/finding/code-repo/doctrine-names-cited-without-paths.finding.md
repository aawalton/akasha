---
id: cab4ceec-84aa-5873-979a-c82206824f7d
page-type-slug: finding
title: "Doctrine names cited without paths"
domain-slug: repo/code-repo
---

# Claim

Ten tracked files under `packages/` justify their own shape by a doctrine named **Omit Needless Ink**, which names no document in either repository. The citations are prose rather than paths, so neither existing dangling-citation finding reaches them and no check can: a name carries no path to resolve. `pages/finding/code-repo/checks-docs-citations-dangling.finding.md` called its own count of 36 a floor because of this spelling, and nothing has measured what the floor hides.

# Evidence

Read against `~/code` at `main`, commit `383bf60d35`, on 2026-08-07, while ingesting `dirty/docs/omit-needless-ink.md` — the quarantined document carrying the name, emptied and removed the same day.

`grep -rn "Omit Needless Ink"`, `node_modules` excluded, returns 14 lines in 12 files. Two are not citations: `packages/agents/instruction-document/src/principle-registry.unit.test.ts:87` is a fixture string in a negative case asserting `toEqual([])`, and `packages/alanwalton/personas/core/dist/src/boot-digest.d.ts:150` is build output, `git ls-files` on it returning nothing. The other 12 lines sit in 10 files, each confirmed by `git ls-files --error-unmatch`:

    packages/agents/shared/persona-chat-classify.ts:37
    packages/alanwalton/web/app/components/mini-player-bar.component.test.tsx:100
    packages/alanwalton/web/app/awen/components/action-box.tsx:102, :223
    packages/alanwalton/web/app/personas/persona-chat.tsx:120
    packages/alanwalton/personas/core/src/boot-digest.ts:275, :327
    packages/alanwalton/awen/core/src/gm-boot-sections.ts:302
    packages/alanwalton/awen/core/src/game-schema.ts:109
    packages/alanwalton/awen/src/awen/display-defaults-seed.ts:12
    packages/infra/domain-expiry/src/rdap-fetch.ts:47
    packages/shared/pages/cli/src/page/version-format.ts:10

They decide values, not tone. `version-format.ts:10` sets a max rendered length by it, and `mini-player-bar.component.test.tsx:100` pins a control count by it — a test asserting a number whose only stated reason is the name.

The name resolves nowhere: no `principles/` directory exists in the instructions repo, `grep -rn "Omit Needless Ink" domains/` returns nothing, and the quarantined document is removed. The claim stands under another name, **Parsimony** on `domains/global.md`.

`git grep -l "Error-Body Hygiene" -- packages/` returns 8 files citing a second name that likewise stands in no live document.

Horizon: one commit for the code repo, `main` the same day for the instructions repo.
