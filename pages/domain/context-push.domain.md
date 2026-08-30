---
page-type-slug: domain
id: 11b711d8-7b81-59fe-a1bc-b62659d7caaa
title: "Context push"
slug: context-push
domain-parent-slug: domain/context-machinery
sequence-slugs:
  - domain/declared-reading
  - domain/required-reading
  - domain/system-prompt
  - domain/tool-definitions
  - domain/incoming-message
  - domain/turn-injection
  - domain/tool-result-injection
  - domain/transcript-rewrite
settled: true
---

# Definition

- **Context push** — something an agent knows because somebody else handed it over.

# Design

The tool definitions carry context we do not control.

# Intent

We push context by required reading and nothing else.

# Principles

## Dilution

**Weigh an instruction against every reader at every boot, never against the one it was written for.**

The cost is not the line but the weight it takes off every other line, and nothing reports that.

Put a line on the narrowest document it serves.

Never reword a narrow line to sound general.

## Cut The Obvious

**Keep an instruction only where Opus 5 would consistently make avoidable mistakes without it.**

A line the model would have obeyed anyway reads exactly like one it needs.

One agent's slip is not a consistent mistake.

Test a single word the way you test a document.

## Simple Language

**Write every instruction in the plainest words that carry it.**

Density reads as rigour, so a hard draft survives review while the reader it lost leaves no trace.

Spend a word rather than compress.

Simplify the sentence, never the claim.
