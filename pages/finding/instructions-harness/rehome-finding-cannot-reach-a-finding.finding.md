---
id: 1b508f96-e187-526b-98cf-b2178f47840b
slug: rehome-finding-cannot-reach-a-finding
page-type-slug: finding
title: "Rehome finding cannot reach a finding"
domain-slug: domain/global
---

# Claim

`ops instructions rehome-finding` resolves its `--file-path` against the instructions root alone, and every finding lives in the memory tree, so the verb cannot reach any finding that exists.

# Evidence

Measured 2026-08-05 while moving one finding between domains.

`tools/rehome-finding.ts:147` calls `resolveRoots()` and thereafter uses `roots.instructions` alone — line 148 tests it for a `.git`, line 153 takes the path against it, line 156 composes the absolute path from it. There is no `--tree` flag; `--help` lists `--file-path`, `--domain`, `--message`, `--message-file`, `--dry-run` and nothing else.

Three spellings were run and all three refused. A root-relative `findings/ruling/ruling-claimed-without-a-document.md` returned "does not name a finding — one lives at `findings/<domain>/<name>.md`", the path not existing under the instructions root. The absolute `/home/walton/memory/findings/...` returned "does not land inside the instructions root (/home/walton/instructions)". Running it with the working directory set to the memory root returned the first message again.

`domains/finding.md:4` declares `memory-path: findings/**/*.md` and the schema at `tools/document/schemas/finding.ts:9` claims `{ tree: "memory", glob: "findings/**/*.md" }`, so the memory tree is where findings are; `findings-sorted` is levied over `trees: ["memory"]` and measured 326 of them there today. `ops memory` offers write, read, edit, rm, file-finding and run-gates, and no rehome. `tools/file-finding.ts` takes `--tree` and defaults to instructions, so the pair disagree about a question one of them answers.

The rehome was performed by hand instead — `ops memory write` at the new path, then `ops memory rm` of the old — which is the two-commit shape the verb's own docblock says it exists to prevent, the key and the folder being apart between them.

Not measured: whether any finding has ever been rehomed through this verb, and whether `checks/findings-sorted.ts` has reported a disagreement that went unrepaired for this reason.
