---
id: 1b1a15a2-4e09-5b73-a2c7-9e09abb222f4
page-type-slug: finding
title: "Verb declaration lives in a comment"
domain-slug: domain/global
---

# Claim

A tool declares its `ops` verb inside a comment and nothing checks the declaration, so removing comments deletes verbs from the CLI fleet-wide with no test, no gate and no error.

# Evidence

`commandsDeclared` in `packages/agents/instructions/src/instructions/command-set.ts` builds the `ops instructions` and `ops memory` verb list by reading every file in `tools/` and scanning for a line whose trimmed text starts with `*` then `command:`, taking `repos:` from the line after it. The verb's existence is therefore a property of a comment.

Its own header says nothing guards this: "in branch CI, through `commandsAmong` below, until the estate retired every check that reads the instructions tree; nothing asks it now, so a verb that stops being declared leaves the CLI on the deploy that lands the header change."

Observed 2026-08-13. Commit `d66474bcd` ("instructions: take the comments out of 200 file(s)", 13:44) stripped the leading docblock from five tools and took their declarations with it. From 13:44 until `9f686c14` restored them, `ops instructions edit`, `ops memory edit`, `ops instructions file-finding`, `ops memory file-finding`, `ops instructions dag`, `ops instructions glossary` and `ops instructions compose-subagents` all answered `ops: unknown command`.

Nothing reported it. The tools themselves still ran when spawned directly, `ops --help` listed 749 other verbs, and every refusal message that tells an agent to run `ops memory edit --help` still named a verb that had stopped existing. It surfaced only because a seat typed one of them.
