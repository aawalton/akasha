---
id: d2da751b-5981-5b69-983f-1a009bb246e8
slug: help-examples-name-undeclared-flag
page-type-slug: finding
title: "Help examples name undeclared flag"
domain-slug: old-ops-command/ops-browser-test-verify-render
---

# Claim

Both examples on `ops browser-test verify-render` invoke `--expect-text-file`, which the verb does not declare, so a reader who runs either example verbatim gets `unknown flag: --expect-text-file` and exit 1.

# Evidence

The help block declares two examples, both ending `--expect-text-file ./expect-text.txt`. The flag list declares `--expect-text` and no `--expect-text-file`. The parser refuses any flag it was not given, so neither example runs as printed.

Measured on 2026-08-13 while moving the verb's body into this repository. The examples were carried across verbatim and are unchanged by that move: the same two lines stood in `packages/shared/browser-test-harness/cli/src/verify-render-help.ts` before it, so this predates the move rather than arriving with it.

Both examples also name `--page-type story` against a `/story/...` and a `/game/...` path, so the second example pairs a game route with the story slug.
