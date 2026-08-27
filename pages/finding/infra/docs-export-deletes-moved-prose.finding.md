---
id: c2b86533-b518-5b6f-84af-01cbb8d7a50d
page-type-slug: finding
title: "Docs export deletes moved prose"
domain-slug: domain/global
---

# Claim

The documentation exporter reconciles page rows against whatever working directory it is launched in, and hard-deletes every row whose source file that directory does not hold — so prose moved to a repository the exporter cannot reach reads to it as prose deleted, and 41 story rows now stand condemned by a sweep nobody has to run deliberately.

# Evidence

`sourcePath` is computed in `packages/infra/scripts/src/docs-validator/parse.ts` as `relative(repoRoot, filePath)`, and `repoRoot` is `process.cwd()` — `full-export.ts` and `export.ts` both take it from there, with no directory argument and no root environment variable. The only entry point is `docs:export` in the code repository's root `package.json`, so the effective root is that repository and nothing else.

Reconciliation is set-difference against disk. `full-export.ts` builds the incoming path set from what it scanned and marks every existing row outside that set for removal, and its orphaned-package sweep drops every row of a page type in a package with no files of that type on disk at all. The removal is a hard delete rather than a soft one. Full export is the default rather than the exception: the mode decision in `export.ts` falls back to it whenever `CI_COMMIT_SHA` and `WORKFLOW_NAME` are unset, which is every local invocation.

`packages/stories/authored/` left the code repository in books commit `f2e8b06` on 2026-08-04. Measured the same day, 41 rows still name a path beneath it — 1 `story`, 7 `story-chapter`, 33 `story-wiki`. Their files are now in the books and stories trees, which no invocation of the exporter reaches, so the next full export from the code repository removes all 41 whatever `sourcePath` they carry.

The rows were corrected to the locations their files now have, which is what the exporter itself would compute if it were pointed at those trees. That correction does not survive the sweep, and making the exporter reach them is a change in the code repository.
