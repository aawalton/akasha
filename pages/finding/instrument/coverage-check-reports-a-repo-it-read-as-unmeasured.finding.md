---
id: 7c6666b5-51e1-5bd0-8de5-073bc722a6cf
page-type-slug: finding
title: "Coverage check reports a repo it read as unmeasured"
domain-slug: domain/instrument
---

# Claim

`check-work-surfacing-coverage` opens files in two repositories and reports `instructions UNMEASURED`, because it attributes each surface to the first file the surface declares and every instructions-sited surface also declares a code-side one. A reader of the population line concludes the run never reached the instructions repository, and the run is the one built to reach it.

# Evidence

Read 2026-08-14 on `project-19011` at `0c25044565`, in `packages/infra/checks/src/`.

    [work-surfacing-coverage] OK — 9 declared work-surfacing surface(s) all accounted for
    [over 9 of 9 surfaces] [repos: code-repo 9, instructions UNMEASURED, books UNMEASURED, ...]

Two of the nine carry `instructionsFiles` — `ops project list --awaiting` and `ops project summary`, at `lib/work-surfacing-surfaces.ts:86` and `:105`, each naming a file under `tools/commands/project/`. The run asked the tree about both through `ops instructions holds` and used the answers, so it read them in the only way `Command Or Row` permits.

`checks/check-work-surfacing-coverage.ts:225` is where the attribution is made: `siteOf` returns `join(repoRoot, surface.files[0])` whenever a code-side file exists, and falls to the instructions path only for a surface declaring nothing else. Both surfaces above declare code-side files first, so all nine sites land in the code repository and the instructions arm of the population is never populated.

The comment above it argues the choice, and the argument holds for a *site*, which is single by construction. It does not hold for the repo group, which exists to say which repositories a verdict covers. So sound reasoning about one field is being read off another.

This is the shape the check's own tree was built to remove — an instrument stating a bound narrower than the reading it took — differing in direction and so in consequence: `check-ast-unused` understated its ENTRY set and accused, while this understates its POPULATION and only misreports. No verdict here is wrong.

Nothing catches it because the population unit is surfaces rather than files, and nine of nine surfaces really were examined. The likely repair is a second site per surface, in `examinePopulation`'s member-to-site mapping, which every reporting check passes through.
