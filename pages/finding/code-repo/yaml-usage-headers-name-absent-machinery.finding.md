---
id: 0be7af8d-0437-56f3-ac09-e912273bfdb7
page-type-slug: finding
title: "YAML usage headers name absent machinery"
domain-slug: repo/code-repo
---

# Claim

`check-yaml-usage.ts`'s header names an import specifier that resolves to nothing, a package the file does not import from, and a registration function that does not exist. Its pure lib's header then credits a wider set of rule files than the code credits. Both sentences sit in the same file as the code contradicting them, so neither needed a repository crossing to repair, and neither was repaired.

# Evidence

Read against `~/code` at `383bf60d35`.

`packages/infra/checks/src/checks/check-yaml-usage.ts:11` says: "Routes the yaml cohort through the unified fileNodeProducer (@infra/checks/producers/yaml-file): createEngine (from @shared/graph) + registerYamlFileTypes + iterate graph.nodes(YAML_FILE_NODE_TYPES)." Three of those four are wrong.

`@infra/checks/producers/yaml-file` resolves to nothing. `packages/infra/checks/package.json` exports `"./producers": "./src/producers/index.ts"` and nothing beneath it, and `src/producers/` holds one file, `index.ts`.

`createEngine` is imported at line 34 from `@shared/graph-core`, not `@shared/graph`.

`registerYamlFileTypes` appears nowhere in the file or the package. What the file imports from `../producers` and calls at lines 119-120 is `registerFileNodeTypes(engine)` followed by `engine.registerProducer(fileNodeProducer)` — the unified producer that replaced the per-extension ones. Only the fourth clause holds: line 125 does iterate `graph.nodes(YAML_FILE_NODE_TYPES)`.

The pure lib's header overstates its own first rule. `src/lib/yaml-usage.ts` enumerates the four use patterns, and pattern 1 credits "any file under a `rules/` directory whose parent contains an `sgconfig.yml` / `sgconfig.yaml`". `isAstGrepRule` at line 74 credits a direct child only: after `const rulesIdx = parts.lastIndexOf("rules")` it returns null unless `rulesIdx === parts.length - 2`, commented "must be direct child". A rule nested one level deeper is credited by the header and orphaned by the code.

What makes this worth recording beyond the two repairs: both wrong sentences sit in the same file as the code that contradicts them, correctable in the same edit as the behaviour they describe. Neither was. Whatever holds a description apart from its subject here, it is not the cost of crossing a repository.

Found ingesting `dirty/questions/code-repo-check-self-description.md`, now removed.
