---
id: 89c1da89-4ea0-515b-a308-64dfdfb684e2
page-type-slug: task
title: "Review tests"
slug: review-tests
domain-parent-slug: domain/test-file
required-reading-slugs:
  - page-type/task
---

# Definition

- **Review tests** — reading one test file against everything required for it, line by line.

# Sequence

1. **What is required for the subject, and what it is written against.**
   - **Read** everything required for it, which `ops domain required-reading --file-path <absolute path>` prints and `ops read` reads.
   - **Read** the code under test, and everything that would already catch the defects the file names — the baseline [Nothing Cheaper Catches It](../domain/test.domain.md#nothing-cheaper-catches-it) names.

2. **Each line, bottom to top.**
   - **Read** the line against every domain required for it. One test is a line, and so is each assertion inside a test, and each import, fixture and helper the file declares; a `describe` is the whole block beneath it. Every line in a block can earn its place while the block does not.
   - **Recommend** cutting unless keeping, repairing or rewriting clearly passes [Nothing Cheaper Catches It](../domain/test.domain.md#nothing-cheaper-catches-it).
   - **Ask**, with your recommendation attached.
   - **Wait** for the answer rather than taking the next line.
   - **Land** the answer at once. Batch them and several are judged together, where a thinner reading reads exactly like a full one.
   - **Mend** whatever that landing made false, in the same commit. Nothing reports an assertion that quietly stopped being about anything.

3. **The file as a whole.**
   - **Judge** it against everything stage 1 put in your hands, re-read from disk rather than from your context. The answers moved it, so what you are judging is not what you read.

4. **The suite.**
   - **Run** the suite the subject sits in and leave it green. A cut that takes a helper with it, or a repair that changes what a shared fixture returns, lands as a failure somewhere you were not reading.
