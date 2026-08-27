---
id: 5a5ee849-3f85-5239-882f-5002db6aa81e
slug: command-declares-no-summary
page-type-slug: refusal
title: "Verb declares no summary"
holes:
  - command
  - source
---

# Refusal

`ops {command}` declares no summary, so it renders as a blank line in `ops --help` and in the listing for its group.

Its file is `{source}`.

A command is every file under `tools/commands/`, so a summary that goes missing leaves the command standing and dispatching — this check is what says so, and without it nothing would.
