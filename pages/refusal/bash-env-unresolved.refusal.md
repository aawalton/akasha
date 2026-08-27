---
id: 88262dbf-668e-586c-b1db-615b95617e1b
slug: bash-env-unresolved
page-type-slug: refusal
title: "Bash env unresolved"
holes:
  - declared
  - path
---

# Refusal

`settings/agents.json` declares `BASH_ENV` as `{declared}`. That resolves to `{path}`, which names no file in this repository. Bash sources what is there and says nothing about what is not, so every agent shell starts short of whatever that file sets.
