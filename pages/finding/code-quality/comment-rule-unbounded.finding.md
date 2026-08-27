---
id: 071fbbab-2cd3-53ce-b020-d67b275ba5aa
slug: comment-rule-unbounded
page-type-slug: finding
title: "Comment rule unbounded"
domain-slug: domain/code-quality
---

# Claim

The Code Comments rule admits no explanatory comment at all, while the code it governs is written throughout in explanatory comments, so every seat touching a file decides for itself how much of what it reads is now wrong.

# Evidence

The rule says to write a code comment only where a tool reads it as a field, and gives as its reason that a note in code rots unseen by any reader of the instructions tree. Read literally it permits a parsed field and nothing else, which makes every block comment carrying reasoning a violation.

The corpus it lands on is built the other way. The files touched by #18245 — `PipelineHealthWidget.swift`, `widget-bucket-color-mirror.ts`, `check-widget-bucket-color-mirror.ts`, `project-progress-fold.ts` — carry long block comments stating why a decision went the way it did, several of them recording what an earlier attempt got wrong. None is a field any tool parses.

The seat that built #18245 hit this and split the difference: it moved a standing design claim onto `readout-pipeline-health` as a Design line, and still wrote provenance comments on the constant and the detector it added. It reported the split rather than hiding it, and said it could not tell whether the rule intends the existing corpus to be wrong.

That reading is not in the rule. Nothing in the text separates a standing design claim from a local mechanical explanation, so two seats reading it carefully will divide the same file differently, and the divergence lands as committed code rather than as a question. The next seat inherits whichever way the last one went.

Filed on 2026-08-09, the day the rule landed, from the first project to meet it.
