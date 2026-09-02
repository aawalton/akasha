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

`ops {command}` declares no summary. Its name still renders: `render.ts:12` prints the name padded to the width of the group and then nothing after it, in `ops --help` and in the listing for its group, and `render.ts:33` heads its own `--help` with `ops {command} —` and nothing after the dash. So the line is not blank and the command is not hidden — what is missing is the sentence saying what it is for.

Its file is `{source}`.

This check reads the whole command surface rather than one folder. `commandSet()` merges what `declared.ts` finds under `tools/commands/` with what `akasha.ts` and `forwarders.ts` contribute, and most but not all of the result has a file under `tools/commands/`; the rest are declared elsewhere in the tree or have no file of their own, in which case the file named above reads `unknown`. A command missing its summary dispatches exactly as it did before — this check is what says the summary is gone, and without it nothing would.
