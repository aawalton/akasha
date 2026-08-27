---
id: 9990f285-e954-5aa4-8be3-71798ff58999
slug: graph-checks-sleep-through-tsconfig
page-type-slug: finding
title: "Graph checks sleep through tsconfig"
domain-slug: domain/global
---

# Claim

`check-ast-unused` wakes only on `.ts` and `.tsx` changes, but a `tsconfig.json` is what decides which files are in the module graph the check reads, so a commit that changes only tsconfig never dispatches it. Its neighbour `check-unused-deps`, walking the same graph, deliberately watches `json-file` and eight other types; `ast-unused` carries a watch list its own comment marks "Legacy".

# Evidence

Read 2026-08-11 at 00:15Z against `/home/walton/code`.

OBSERVED. Commit 78530f8b1d (#18599) changed three files, all `.json` — three tsconfigs. No `.ts` file changed. Branch CI passed 71 of 71 steps and `check-ast-unused` was not among them. The merge queue's staging CI ran it over the landed SHA, found four violations in `synth-longtail-assets.ts`, and ejected entry 11491 on run 27753, which then ejects everything behind it. Reproduced by hand on main over 10888 of 10888 modules.

THE CONFIGURATION. In `check-configs-source-scanners.ts` the `ast-unused` entry declares `watchNodeTypes: TS_POPULATION`, which is `["ts-file", "tsx-file"]`; its `watchNodes` are the check's own implementation files. A tsconfig matches none. Its comment on that list reads "Legacy".

THE NEIGHBOUR THAT GOT IT RIGHT. `unused-deps`, declared immediately above and walking the same import graph, adds YAML, package, `css-file`, `sh-file`, `dockerfile-file` and `json-file`, under "Intentional: this check must rerun whenever any importer of any workspace package changes." Two neighbours answered one question oppositely, one by decision and one by inheritance.

TWO MORE SITES OF THE CLASS. `acyclic-imports` declares `["ts-file", "tsx-file"]` and imports the same `ts-import-graph.ts` that `ast-unused` uses. `typecheck` declares `[...TS_POPULATION, ...PACKAGE_POPULATION]`, and `PACKAGE_POPULATION` is `["package"]` — package.json, not tsconfig.

WHY THIS FILE CLASS. A tsconfig does not sit near the graph, it defines its boundary. #18599 added `k8s/**/*.ts` to one include, putting twelve invisible files into the analysis. No `.ts` file changed; what changed was which existed as far as the compiler was concerned. A check whose input is every module reachable from an entry cannot be woken by watching modules alone. `domains/code-check.md` carries the rule already: Dispatch Reach.

NOT MEASURED. Whether `typecheck` genuinely fails to run on a tsconfig-only change, inferred from its watch list rather than observed. What a `json-file` addition would cost in wake rate.
