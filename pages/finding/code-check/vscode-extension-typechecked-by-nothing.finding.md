---
id: 0065333e-8c2b-5b7f-8cd4-859d3a3317ec
page-type-slug: finding
title: "Vscode extension typechecked by nothing"
domain-slug: domain/global
---

# Claim

Nothing typechecks `packages/agents/vscode-extension`: the root composite build never reaches it, its own `tsconfig.json` cannot be built alone, and it has no `typecheck` script — so its bundle ships from `bun build`, which typechecks nothing.

# Evidence

Found on 2026-08-07 while emptying `dirty/skills/alan-harness/findings.md`, which recorded the same gap on 2026-07-28. That document is queued for removal, so the observation is filed here to outlive it. Every figure below was re-measured against `~/code` rather than carried over.

The root graph excludes it. `tsconfig.json` at the repo root carries 110 entries under `references`, and none of their paths contains `vscode-extension`. So `bunx @typescript/native-preview -b` at the root — the repo `typecheck` script — never builds this package.

Its own config cannot stand in for that. `packages/agents/vscode-extension/tsconfig.json` declares no `composite`, no `references` and no `types`, and its `lib` is `["ES2022"]` alone, so building it directly pulls every transitive workspace source into one program under those options. The finding this replaces measured 51 environmental errors that way — `Buffer`, `bun:test`, `node:os`, `URL`, `setInterval` — across packages nobody had touched.

It has no `typecheck` script. `package.json` declares exactly one script, `compile`, which is `bun build --target=node --format=cjs --outfile=out/extension.js --external=vscode src/extension.ts`. `bun build` does no typechecking. The live build tasks at `domains/tasks/projects/build-child-deploy.md` and `build-singleton-deploy.md` both say "Run each touched package's own `typecheck` script", and here there is none to run.

No check covers it either. `ops enforcement list` names `check-tsconfig`, `check-typecheck`, `check-app-typecheck` and `check-service-typecheck`; `rg -n 'vscode-extension'` across `packages/infra/checks/src/` returns three hits, in `color-literal-scan.ts`, `work-surfacing-surfaces.ts` and a liveness baseline, each naming one file inside the package rather than compiling it.

Not established: whether adding it to the root references would surface real errors in its own source, and how many. The finding this replaces reported that it would be a project's worth of work rather than an inline fix, and this seat did not re-measure that.
