---
id: 8dd5c679-658c-50cc-af17-de63d0a65439
slug: bash-env-outside-repo
page-type-slug: refusal
title: "Bash env outside repo"
holes:
  - declared
---

# Refusal

`settings/agents.json` declares `BASH_ENV` as `{declared}`, which does not resolve inside this repository. What every agent's shell sources is then a file nothing here gates, moves with, or reports missing — and bash skips an absent one in silence.
