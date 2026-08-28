---
id: 5cbf6b24-575e-524a-99f2-5f1edb945ae2
slug: ast-grep-convention-stated-as-one-definition
page-type-slug: finding
title: "Ast grep convention stated as one definition"
domain-slug: repo/akasha-repo
---

# Claim

The ast-grep rule-file convention is defined twice and the two definitions differ. One reads `ruleDirs` out of each sgconfig; the other hard-codes the segment `rules` and never opens an sgconfig. They agree only because the single sgconfig in the tree happens to name its rule directory `rules`.

# Evidence

`infra/cluster-checks/src/lib/check-configs-ast-grep.ts` anchors on the config. `:11` declares the schema as `ruleDirs`, an array of strings. `:13`-`:19` globs `**/sgconfig.yml` and `**/sgconfig.yaml`. `:22`-`:31` parses `ruleDirs` out of each one and resolves every entry against that config's own directory. `:42`-`:56` then globs `${ruleDir}/*.yml` and `${ruleDir}/*.yaml`. The directory may carry any name the config gives it, and an entry containing a slash puts it more than one level below the config.

`infra/cluster-checks/src/lib/yaml-usage.ts:150`-`:164` recognises the same files by shape alone. `isAstGrepRule` opens no sgconfig. It takes `parts.lastIndexOf("rules")`, refuses `-1` and `0`, refuses anything but `parts.length - 2`, then requires an `sgconfig.yml` or `sgconfig.yaml` exactly one level above that segment. A segment spelled literally `rules` is required, and `ruleDirs` is never read.

One sgconfig survives in the tree, `infra/cluster-checks/sgconfig.yml`, whose entire body is `ruleDirs:` with the single entry `rules`. That word is the whole of the agreement. Rename it, and `check-configs-ast-grep` keeps discovering the files under the new name while `yaml-usage` stops recognising them as rules at all — every file under it then reads as orphaned yaml. Three files sit there now: `infra/cluster-checks/rules/mock-module-outside-test-file.yml`, `no-hardcoded-ast-grep-scan.yml` and `no-user-id-comparison-in-web-app.yml`.

What holds the two together is a test rather than a shared definition. `infra/cluster-checks/src/lib/ast-grep-discovery.unit.test.ts:26`-`:30`, named "every rule lives under a `rules/` dir declared by a sibling sgconfig", asserts every discovered path matches `/\/rules\/[^/]+\.ya?ml$/`. The comment that named the hazard is gone; the test's own name is all that carries it.

Unmeasured. Nothing was run: the divergence is read off the two sources and the one config.
