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

`ops {command}` has no Help section on its document and no `help.description` in its code, so its `--help` renders the usage line and nothing saying what it does. Both places were read before this was printed.

`renderCommandHelp` in `tools/ops/render.ts` reads the document's help and falls back to the code's description, and the dispatcher takes an absent section for an empty one, so this never fails and never says so.

Its file is `{source}`. Nothing anywhere states what this command is for, so the repair here is prose written into its document — hours of work, not minutes. Where a description already exists in code, `command-help-declared-in-code` is printed instead.
