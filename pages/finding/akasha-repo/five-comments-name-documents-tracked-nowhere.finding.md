---
page-type-slug: finding
slug: five-comments-name-documents-tracked-nowhere
title: "Five comments name documentation paths no file in this repository carries"
domain-slug: repo/akasha-repo
---

# Claim

Five comments across three files direct a reader to documentation paths that no file in this repository carries.

Three of the five sit in one file and name one absent document. A reader following any of them finds nothing, and cannot tell a document that moved from one that never existed.

The documents they name are not in this repository under any path, so repointing them is not a rename this repository can resolve on its own. Whether each comment should be repointed at whatever now holds the material, or struck as naming something that no longer binds anyone, is open.

# Evidence

Measured 2026-08-28 at `47f1d0645` over the akasha checkout, which is the whole population — the code repository these were originally counted in does not stand on this workstation.

The five:

    editor-extension/src/features/status-bar/render.ts:19    `docs/feature-status-bar.md` (Failure model).
    editor-extension/src/features/status-bar/render.ts:126   see docs/feature-status-bar.md
    editor-extension/src/features/status-bar/render.ts:161   principle in docs/feature-status-bar.md
    templates/characters/abby/portrait.md:3                  packages/stories/engine/docs/representation-and-data-layout.md
    infra/eso-rig/Containerfile:36                           .claude/docs/dependency-policy.md

EVERY TARGET IS TRACKED NOWHERE. `git ls-files` matching each named path returns 0:

    docs/feature-status-bar.md                                        0
    packages/stories/engine/docs/representation-and-data-layout.md    0
    .claude/docs/dependency-policy.md                                 0

POSITIVE CONTROL ON THAT ZERO. The same command against a path known to stand — `pages/domain/page-storage.domain.md` — returns 1, so the zeros above are real absences rather than a search that cannot match.

WHAT IS EXCLUDED, AND WHY. A wider search for `docs/*.md` across the repository returns many more lines, and almost all of them are unit-test fixtures — `at.put("docs/x.md", …)` and similar in `repoint/`, `infra/workspace-cli/` and `tools/lib/check-workflow/`. Those are test data rather than a comment sending a reader anywhere, and counting them would inflate this figure several times over. Two further instances stand under `dirty/`, which is quarantined, and are left out on that ground.

Not measured: whether the material these five name still exists anywhere reachable, so nothing here says what the right target would be.
