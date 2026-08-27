---
id: 91e794c4-763c-50a4-a750-fca808f078ab
page-type-slug: refusal
title: "Bash env settings absent"
---

# Refusal

`settings/agents.json` is not there, so nothing in this repository declares BASH_ENV, and every agent shell starts having sourced nothing unless `~/.claude/settings.json` declares BASH_ENV instead.
