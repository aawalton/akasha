---
id: e29ae1d6-6fe5-5695-b563-acf8de00627a
page-type-slug: finding
title: "Carrier taxonomy reads quarantined docs"
domain-slug: domain/code-quality
---

# Claim

`carrier-taxonomy-routes.unit.test.ts` asserts against three documents that were deleted from `packages/alanwalton/projects/core` when the instruction surfaces were quarantined into the instructions repository. The suite errors on `ENOENT` rather than failing an assertion, so what it reports is that the files are gone rather than that the routes it exists to pin are broken.

# Evidence

`packages/alanwalton/projects/core/carrier-taxonomy-routes.unit.test.ts` opens each of `CLAUDE.md`, `docs/external-block.md` and `docs/project-lifecycle.md` relative to that package, and asserts that each names the next — the taxonomy being "stated once, in `docs/external-block.md`", per the file's own header.

None of the three is on disk. `git log --diff-filter=D` names commit `7205e28efd`, "quarantine every instruction surface into the instructions repo", as what removed them; the test was not removed or repointed with them.

Run under project #17615's seat on 2026-08-03, `bun test packages/alanwalton/projects` reported two errors and one failure from this file: `ENOENT: no such file or directory` for each of the three paths. Nothing else in the projects suite reads them.

Two further test files still cite the departed docs in prose rather than opening them — `owner-dispatch-classify.unit.test.ts` reasons from `project-lifecycle.md`, and `derive-deploy-phase.unit.test.ts` from `CLAUDE.md`. Those pass, and will go on passing whatever the surviving surfaces say.
