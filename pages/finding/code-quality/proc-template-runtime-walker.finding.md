---
id: 9c5ef6cd-1ecd-5c4e-a3d3-85c0a14eeeeb
slug: proc-template-runtime-walker
page-type-slug: finding
title: "Proc template runtime walker"
domain-slug: domain/code-quality
---

# Claim

Three comments in `packages/shared/proc-template` describe a runtime walker the package does not hold: `sql.ts` says "the runtime path replaces them with bind positions", `types.ts` types `ArgRef` "so the compile / runtime walkers can emit either the plpgsql parameter name or the bind position", and `compile.ts` keeps a predicate local to spare "a runtime dependency on the runtime walker". Nothing in the tree resolves an `ArgRef` to a bind position, and the head document that said so has left the code repo.

# Evidence

Read at `origin/main` `13135651993c19af09ce41b6295264191071d3c1`.

`packages/shared/proc-template/src/sql.ts:1-2` — "Both are pure shape-builders; neither walks the template (the compile and runtime arms own their walkers)." Line 9, closing the `sql` tag's comment — "the runtime path replaces them with bind positions."

`packages/shared/proc-template/src/types.ts:70-71` — `ArgRef` carries "the arg's name + type so the compile / runtime walkers can emit either the plpgsql parameter name or the bind position."

`packages/shared/proc-template/src/compile.ts:143-146` — the local `isSqlTemplate` predicate is "kept inline here so the compile walker doesn't take a runtime dependency on the runtime walker (the two arms intentionally walk the same shape independently)."

No such walker exists. `src/` holds `compile.ts`, `compile.unit.test.ts`, `index.ts`, `sql.ts`, `types.ts` and nothing else, so `compile.ts` is the package's only walker. `src/index.ts` exports `compileUnknown`, `defineProc`, `sql` and three types. `grep -rn "bind position\|bindPosition" --include=*.ts packages/`, less `dist/`, returns exactly three hits: the two comments above, plus an unrelated line in `packages/shared/pages/access/src/pg/page-proc-ctx/insert-page.ts:25` about plpgsql parameters.

The one document that said so is gone from the code repo. `packages/shared/proc-template/CLAUDE.md` stated it correctly — "There is no in-process TS-runtime executor; if a future caller needs to run an SQL template against a `pg` client without going through the compile-and-deploy flow, add a runtime arm at that point" — and no CLAUDE.md is tracked under that directory now. The text stands only in the instructions repo's quarantine, at `dirty/code/packages-shared-proc-template-claude.md`, which is itself queued for removal. So the correction has left the tree while the three comments claiming the walker remain in shipped source.

Filed while ingesting `dirty/questions/code-repo-source-comment-reach.md`, whose second entry recorded this and was cut as not being instruction.
