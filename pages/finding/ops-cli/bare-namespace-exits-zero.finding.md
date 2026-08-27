---
id: 421bd872-8110-5949-9730-13a1098cb0b1
slug: bare-namespace-exits-zero
page-type-slug: finding
title: "Bare namespace exits zero"
domain-slug: domain/ops-cli
---

# Claim

In the ops CLI, invoking a namespace with no command writes its usage listing to stdout and exits 0, so a scripted caller piping that output (`| wc -l`, `| head`, `| jq`) receives a plausible-looking result built from help text instead of a signal that nothing identifiable was asked for.

# Evidence

From project #16424 (domain `ops-cli`, status `someday_maybe`). Never carried an objective — this is its capture.

Observed (reproduced by dalla): `bun ops pipeline` with no command exits 0 and writes 23 lines to stdout — a namespace invoked with no command writes its usage listing to stdout and exits successfully.

Same hazard as #16336, different mechanism. #16336 was `ops pipeline steps 26176` rejecting the positional form, writing two lines of error text, where a caller counting lines misread 2 as a step count. Same shape at the namespace level: exit 0 reads as "it worked", 23 stdout lines read as "here is your data". A pipeline doing `ops <namespace> | wc -l`, `| head`, or `| jq` gets a plausible answer built from help text. Not a general error-routing defect — errors are already stderr-only, confirmed by the #16336 worker. The defect is specific to the no-command case, treated as a successful help request rather than a malformed invocation.

Governing distinction: `--help` explicitly requested → stdout, exit 0 (help is the result). No command given → stderr, exit non-zero (usage error). Today the second is handled as the first.

Deliberately not folded into #16336: that worker found this, left it, and asked. Changing the stream and exit code of a commonly run command has blast radius: a script, alias, or agent habit expecting exit 0 on a bare namespace would start failing, warranting its own verification.

Verification: `bun ops pipeline` → exit != 0, 0 stdout lines, usage on stderr; `--help` → exit 0, stdout (unchanged); `steps --seq <n>` → unchanged. Enumerate all 668 namespaces (the #16336 method) and assert the property for all — #16336's cause was #15265 fixing three commands with no gate; `check-cli-positional-alias-coverage` is the precedent to copy.

Do first: grep the repo and agent instructions for bare-namespace invocations before changing anything — exit 0 to exit 2 is the whole risk, and is enumerable rather than speculative.
