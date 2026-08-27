---
id: 15bcc595-51ac-5610-883c-c4c0b95bb6e8
slug: command-help-no-description
page-type-slug: refusal
title: "Command help no description"
holes:
  - command
  - source
---

# Refusal

`ops {command}` has no Help section on its document, so its `--help` renders the usage line and nothing saying what it does.

The dispatcher takes an absent section for an empty one, so this never fails and never says so.

Its file is `{source}`.
