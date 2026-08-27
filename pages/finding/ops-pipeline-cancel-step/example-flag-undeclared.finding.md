---
id: f48fe7d4-97a0-524c-9fed-7e1afca3555e
slug: example-flag-undeclared
page-type-slug: finding
title: "Example flag undeclared"
domain-slug: domain/global
---

# Claim

Both `ops pipeline cancel-step` and `ops pipeline force-fail-step` carry an example invoking `--fail-reason-file`, a flag neither of them declares, so the advertised example cannot parse.

# Evidence

`tools/commands/pipeline/cancel-step.ts:59` and `tools/commands/pipeline/force-fail-step.ts:66` both carry this example, word for word:

    ops pipeline cancel-step --pod ci-pipeline-8200-typecheck-abc12 --exit-code 143 --fail-reason-file ./reason.txt

The declared flag in both files is `--fail-reason` (`cancel-step.ts:38`, `force-fail-step.ts:45`). Neither `help.flags` list names `--fail-reason-file`.

`ops pipeline cancel-step --help` and `ops pipeline force-fail-step --help` both print the example, so a caller copying it is handed an invocation the parser will refuse.

Separately: three of the four examples on `cancel-step`'s own usage screen invoke `force-fail-step` rather than `cancel-step`, so the alias's help mostly demonstrates the other name.
