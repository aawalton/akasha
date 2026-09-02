---
id: d6f7f48d-6f70-5d2c-9cf7-e7b168396232
slug: command-help-flags-drift
page-type-slug: refusal
title: "Command help flags drift"
holes:
  - path
  - command
  - difference
---

# Refusal

`{path}` documents `{command}` one way and parses it another: {difference}.

The help object here is not what its parser is handed, so the flags are declared twice and either declaration can be edited without the other. What the parser holds is what a call meets; what the help holds is what a reader is told. A flag documented and not accepted refuses whoever follows the help, and a flag accepted and not documented is reachable only by someone who read the source. Hand the help object straight to `parseArgs` and neither can happen.
