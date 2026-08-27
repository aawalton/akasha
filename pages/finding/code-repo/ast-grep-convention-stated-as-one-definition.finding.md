---
id: 5cbf6b24-575e-524a-99f2-5f1edb945ae2
page-type-slug: finding
title: "Ast grep convention stated as one definition"
domain-slug: repo/code-repo
---

# Claim

`check-configs-ast-grep.ts`'s header says the repo holds one definition of the ast-grep rule-file convention, read by two consumers. The two consumers hold a definition each, and they agree only because both sgconfigs in the tree happen to declare the same rule directory name. A unit test is what keeps them agreeing, and the header states as a settled fact what that test states as a hazard.

# Evidence

Read against `~/code` at `383bf60d35`.

`packages/infra/checks/src/lib/check-configs-ast-grep.ts`'s header closes: "Discovery anchors on `sgconfig.yml`, whose `ruleDirs` names where a package keeps its rules. That is the same anchor `check-yaml-usage` uses to recognise a rule file as used, so the repo holds one definition of the convention read by two consumers." Line 81 repeats it above the `findFiles` call: "Direct children only — the same shape `check-yaml-usage` recognises."

Only the direct-child depth is shared. This file parses `ruleDirs:` out of each discovered sgconfig and globs `<ruleDir>/*.yml` and `*.yaml` beneath that config's directory, so a rule dir may be named anything and sit at any depth.

`isAstGrepRule` in `src/lib/yaml-usage.ts:74` opens no sgconfig. It takes `parts.lastIndexOf("rules")`, refuses `-1` and `0`, refuses anything but `parts.length - 2`, then tests for `sgconfig.yml`/`sgconfig.yaml` exactly one level above. A segment spelled literally `rules` is required; `ruleDirs` is never read.

The two agree because both sgconfigs in the tree say the same word. `packages/infra/checks/sgconfig.yml` and `packages/infra/workflow-dsl/sgconfig.yml` are the only two, and each holds `ruleDirs:` with the single entry `rules`. Rename either and `check-configs-ast-grep` keeps discovering those rules while `check-yaml-usage` stops recognising them, so every rule file in that package reports as an orphan yaml.

What holds them there is a test. `check-configs-ast-grep.unit.test.ts:36` asserts every discovered rule path matches `/\/rules\/[^/]+\.ya?ml$/`, under the comment: "If this drifts, the repo holds two definitions of one convention and rule files start reading as orphaned yaml." The test states as a hazard what the header states as settled, and it is why a rename reddens rather than splitting the two silently.

Found ingesting `dirty/questions/code-repo-check-self-description.md`, now removed.
