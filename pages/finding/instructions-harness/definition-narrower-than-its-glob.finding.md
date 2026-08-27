---
id: d6a682fd-eda6-5741-8f25-ea9d17a7073b
page-type-slug: finding
title: "Definition narrower than its glob"
domain-slug: domain/global
---

# Claim

`instructions-harness` is defined as the tooling by which every file in the repository CHANGES, but it governs verbs that change nothing and no narrower domain claims them.

# Evidence

`domains/instructions-harness.md`: "**Instructions harness** — the tooling by which every file in the instructions repository changes."

`ops instructions governs` returns `domains/instructions-harness.md` and no narrower domain for each of `tools/read.ts`, `tools/compose-boot.ts`, `tools/dag.ts` and `tools/stale-reviews.ts`. For `tools/read.ts` the full set is `agent-harness`, `code-quality`, `code`, `file-kinds/typescript`, `folders/instructions-repo`, `global` and `instructions-harness` — nothing nearer.

None of those verbs changes a file. `tools/glossary.ts`, `tools/owns.ts`, `tools/unreached.ts` and `tools/statusline.sh` sit in the same position.

Two ways out, and nothing settles which: widen the definition to cover reading and composing, or narrow `instructions-path:` off the verbs that change nothing.

Not landed, because `domains/domain.md` keeps `define-definition` for exactly this case and the words are a lead's to write.

Raised by the `review-instructions` reading of `domains/instructions-harness.md` on 2026-08-06.
