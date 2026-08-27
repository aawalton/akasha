---
id: 9d36a99f-6e9b-5598-8d52-391d9c84650b
page-type-slug: finding
title: "Docs citations dangle in link form"
domain-slug: repo/code-repo
---

# Claim

Eighteen dangling `docs/…` citations across seventeen source files are written as markdown links rather than as the bare `see docs/…` phrase, so the pattern that measured the known class does not match them. Whoever repairs the sixty-eight lines `pages/finding/code-repo/quarantined-doc-references-dangle.finding.md` counted will leave these eighteen standing and read the class as closed.

# Evidence

Measured against `origin/main` at `383bf60d35` on 2026-08-07, from `/home/walton/code`:

    git grep -rnE '\]\((\.\./)*docs/[a-z0-9-]+\.md\)' -- packages/   → 31 lines, 19 files

Thirteen of those are string fixtures in two parsing tests — `packages/shared/graph/producers/src/file/md-file/parse.unit.test.ts` and `packages/agents/instructions/src/lib/link-resolve.unit.test.ts` — naming invented paths like `docs/a.md`, and are not citations. The remaining eighteen are, and every one resolves to nothing: I resolved each target against its own file's directory and none exists on disk.

They span packages sharing nothing but the repo. `packages/shared/pages/versions/src/pg/select-at-or-before.ts:28` names `../../docs/write-stamps.md`, quarantined at `instructions/dirty/code/packages-shared-pages-versions-docs-write-stamps.md`, and is the only reference to it left in the code repo. `packages/infra/ci/worker/` carries five, `packages/shared/pages/ui/src/` five, `packages/shared/pages/core/src/formula/resolve.ts` two, `packages/alanwalton/personas/` two.

The form is what hides them. A bare `See docs/native-seams.md` matches `git grep "See docs/\|see docs/"`; `see [\`../../docs/write-stamps.md\`](../../docs/write-stamps.md)` does not, the path being bracketed and the prose word separated from it. Three carry no `see` at all. `git ls-files -- 'packages/**/docs/**'` still returns three files.

Found while ingesting `dirty/knowledge/page-version-history.md`, whose own pointer at `docs/write-stamps.md` cut on the same fact.
