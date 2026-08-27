---
id: 61f4f25c-6bcb-588a-be14-8628c97f3c51
slug: bash-env-undeclared
page-type-slug: refusal
title: "Bash env undeclared"
---

# Refusal

`settings/agents.json` declares no BASH_ENV, so unless `~/.claude/settings.json` declares BASH_ENV instead, every agent shell starts having sourced nothing — no `pipefail`, no secrets file, and no error anywhere saying so.
