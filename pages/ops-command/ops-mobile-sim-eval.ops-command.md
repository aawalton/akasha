---
id: dfe313c0-ddf1-5578-b81b-79cededb7eb1
page-type-slug: ops-command
title: "Ops mobile sim eval"
slug: ops-mobile-sim-eval
domain-parent-slug: domain/ops-mobile-sim
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/mobile/sim/eval.ts
path: mobile sim eval
---

# Definition

- **Ops mobile sim eval** — what one JavaScript body returns when it is run in the sim's webview.

# Help

Evaluate JavaScript in the sim's webview context and print the JSON result. The script runs as a WebDriver execute/sync body, so it must `return` the value you want (e.g. `return document.querySelector('[role="status"]').innerText`). Pass `--script -` to read the script from stdin. Reuses the active session; re-acquires the webview context first.
