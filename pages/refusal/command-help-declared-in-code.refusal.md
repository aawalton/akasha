---
id: 3a6badcf-b6d6-590e-bf66-161038aa9dd0
slug: command-help-declared-in-code
page-type-slug: refusal
title: "Command help declared in code"
holes:
  - command
  - source
  - length
---

# Refusal

`ops {command}` has no Help section on its document, and its `--help` is not blank. `renderCommandHelp` in `tools/ops/render.ts` reads the document's help and falls back to the code's, so what the reader sees is the {length} characters of `help.description` this command declares in TypeScript.

The reader is not left without words. What is wrong is where the words live. `old-ops-command.page-type.md` says every command's help belongs in its own document, and a description declared in code is prose no page shape can measure and no page read can reach.

So this is prose to move rather than prose to write, which is minutes against hours. Usually the move is verbatim: the description into the document so what `--help` prints is unchanged to the byte, and the `description` it came from deleted. Where a description interpolates a runtime value a markdown document cannot hold, freezing that value into prose is the cost, and the move becomes a decision rather than a transcription.

Its file is `{source}`.
