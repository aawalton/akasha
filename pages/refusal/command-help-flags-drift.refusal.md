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

`{path}` spells `ops {command}` differently from this repository: {difference}.

A command whose flags are spelled in both repositories has two authorities over what it accepts, and the code-repository one is what parses the call. They agree until one is edited, and nothing but this reading compares them.
