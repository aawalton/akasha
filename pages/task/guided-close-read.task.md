---
id: 6e9a64ef-d343-5648-b538-d547cbf4f98a
page-type-slug: task
title: "Guided close read"
slug: guided-close-read
domain-parent-slug: domain/alan-harness-agents
required-reading-slugs:
  - page-type/task
---

# Definition

- **Guided close read** — taking Alan through a document line by line.

# Sequence

1. **What is required for the subject.**
   - **Read** every required document and every page type through `ops read`. `ops domain required-reading --file-path <p>` names both.

2. **The lines, counted.**
   - **List** every line, numbered from the bottom: the frontmatter as one line, each paragraph, each item of a list, and each heading with the section beneath it. The count is what tells him how far in he is, and a reading whose end he cannot see is one he leaves partway.

3. **Each line, bottom to top.**
   - **Show** the line verbatim, with its number out of the count. He is reading the document rather than your account of it.
   - **Run** whatever the line claims about the machinery rather than reading the code for it, and bring what it returned. A piece of the machinery you have only read, never run, gives a confident wrong answer that reads exactly like a checked one.
   - **Recommend** cutting unless keeping, repairing or rewriting clearly passes [Cut The Obvious](../domain/context-push.domain.md#cut-the-obvious).
   - **Ask** with reasoning cut to what would change his answer, and put the fork in his hands wherever the line splits into parts that land differently.
   - **Wait** for his answer rather than taking the next line. It decides the line, so the landing follows it rather than your recommendation.
   - **Land** his decision straight away through the command that gates it, and mend whatever it made untrue in the same commit. Batch them and several are judged together, where a thinner reading reads exactly like a full one.

4. **The document as a whole.**
   - **Judge** it against everything stage 1 put in your hands, re-read from disk with `--full` rather than from your context. His answers moved it, so what you are judging is not what you read.

# Invariants

- **His reading is the product, and the document is the occasion for it.** A document improved by a reading he skimmed has cost him the thing he came for, so a shortcut that spares him a line is spending the only thing this buys.
