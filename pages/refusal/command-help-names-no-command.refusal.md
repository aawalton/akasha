---
id: 1be585c6-e011-5103-9585-f4d3808092d6
slug: command-help-names-no-command
page-type-slug: refusal
title: "Command help names no command"
holes:
  - path
---

# Refusal

`{path}` declares a `CommandHelp` object and names no command this repository carries, so nothing binds what it accepts to what `ops` documents.

Name the command in the file, or take the flags and help out of it.

A command whose flags are spelled in both repositories has two authorities over what it accepts, and the code-repository one is what parses the call. They agree until one is edited, and nothing but this reading compares them.
