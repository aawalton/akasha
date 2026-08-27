---
id: 630d0d74-3a97-56c0-8260-91b5cd9813b2
slug: turn-end-rule-path-dead
page-type-slug: finding
title: "Turn end rule path dead"
domain-slug: domain/agent-turn-end
---

# Claim

Eight sites in the code repository say the turn-end rule is stated at `domains/seat-turn-end.md`, and no such document exists — it was renamed to `domains/agent-turn-end.md`, and the sweep that repointed `tools/lib/legal-endings.ts` beside them missed these. One of them is the registry string `ops seat halt-census --help` prints, so a seat sent to read the rule that instrument classifies against is sent to a path resolving to nothing.

# Evidence

`ls domains/seat-turn-end.md` — no such file; `domains/agent-turn-end.md` stands. `grep -rn "seat-turn-end" ~/code/packages/agents/cli/src/agent/*.ts` returns eight sites: `halt-census-baseline.ts:104`, `halt-census-core.ts:42`, `halt-census-shell.ts:7`, `halt-census.ts:32`, `interactive-cases.unit.test.ts:12` (as a `domain-parents:` value in a fixture), `interactive-census-core.ts:5`, `interactive-census.ts:25`, and `registry.ts:134` and `:152`. Ran `ops seat halt-census --window 6h` and its help block: the printed text carries the dead path.

Found while reviewing `domains/tasks/definer/decide-principle-or-rule.md`, whose stage 1 instructs re-deriving a claim where the instrument the evidence names is gone. The claims themselves are untouched by the rename — the census still classifies against `tools/lib/legal-endings.ts`, which was repointed at the same time.

NOT MEASURED: whether anything outside `packages/agents/cli/src/agent/` names the dead path; only that directory was grepped. Whether any seat has actually followed the pointer and failed. Whether the fixture at `interactive-cases.unit.test.ts:12` is a live domain reference or a deliberately synthetic one. Not repaired here: it is a code-repository change, which needs a branch, CI and a deploy rather than a commit.
