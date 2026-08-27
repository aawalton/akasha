---
id: b0e09624-0a0b-590f-8e7f-2ac2f46c5bbb
slug: ask-alan-examples-invoke-undeclared-flags
page-type-slug: finding
title: "Ask Alan examples invoke undeclared flags"
domain-slug: domain/ops-cli
---

# Claim

Every one of the four examples `ops ask-alan` prints invokes a flag the verb does not declare. A reader who copies an example gets an unknown-flag refusal, and the refusal is correct — it is the help that is wrong.

# Evidence

Found 2026-08-13 by the seat writing the domain documents for the eight namespaceless verbs, reading the help block at `tools/commands/ask-alan.ts`.

The declared flags are `--question`, `--context` and `--option`, each taking text directly. The four examples invoke `--question-file`, `--context-file` and `--option-file`. No file-taking form is declared anywhere in the block.

Either the file-taking forms were dropped from the flag list and the examples were left behind, or the examples were written for forms that were never added. Nothing in the block says which.

What makes it worth filing rather than fixing in place: the surfaces under `tools/commands/` were landed byte-identical to what the code repository declared, so this defect was carried across faithfully and stands at both ends. Repairing it here alone makes the two disagree, which is a second fault on top of the first.
