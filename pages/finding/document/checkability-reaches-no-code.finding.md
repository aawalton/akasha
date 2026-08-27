---
id: aafd846a-7df4-5757-8500-7ffed70d9426
page-type-slug: finding
title: "Checkability reaches no code"
domain-slug: domain/global
---

# Claim

`domains/document.md` carries the rule that would have refused every false refusal-comment in the schema corpus, and it reaches none of their authors: `document` declares no path key, and sits BELOW `schema` on `domain-parents:`, so an author writing a schema file inherits `schema` upward and never passes through the child holding the rule.

# Evidence

`## Checkability` on `domains/document.md`: "State the mechanism that makes an invariant you assert true... Naming what carries the invariant exposes the case where nothing does."

That document's frontmatter is `domain-slug`, `domain-parents: schema`, `reviewed-at` — no path key of any kind. It governs no file, and its one edge points UP to schema, whose readers therefore do not inherit it.

Measured 2026-08-04: `ops instructions champions --path tools/document/schemas/file-kind.ts` returns eight surfaces — agent-harness, code-quality, code, global, instructions-harness, schema, typescript, instructions-repo. `document` is not among them. The same call on `tools/document/check.ts` returns seven, `document` and `schema` both absent.

Four breaches in that unreached corpus, each run through `conform-run.ts` the same day and each false, each asserting an invariant while naming nothing that carries it:

- `schemas/domain.ts:146` "the bullet's ceiling below is already the section's" — a surplus paragraph in `# Definition` is admitted.
- `schemas/role.ts:8` "in a line and carrying no link" — a link in a responsibility is admitted.
- `schemas/file-kind.ts:26` "At least one of the three is declared" — a document with no path key is admitted.
- `schemas/folder.ts:12` "At least one is declared" — likewise admitted.

`schemas/folder.ts` obeys the rule and breaches it in one comment by one author: line 10 reads "nothing reads that geometry, so it holds only where the document's author levies it", which is Checkability satisfied exactly; line 12 then asserts the path-key invariant naming no mechanism. `schemas/task.ts:47` obeys it too.

The rule is the right one and well written; what is measured is that it sits where the code it judges does not read it.

Not measured: whether code-quality or typescript reach the same case.
