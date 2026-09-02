---
id: 01a06122-d3ef-7edd-bdf2-e77b4c41e92b
slug: command-help-parser-unread
page-type-slug: refusal
title: "Command help parser unread"
holes:
  - path
  - command
  - flags
---

# Refusal

`{path}` documents flags for `{command}` — {flags} — and nothing here reads what accepts them. The help object is not what its parser is handed, and no second flag spec could be read out of the file either.

A documented flag with no parser anyone can trace it to is a promise with no keeper: it reads exactly like a flag that works. Hand the help object straight to `parseArgs` so the two cannot part, or keep the spec where this reading can find it.
