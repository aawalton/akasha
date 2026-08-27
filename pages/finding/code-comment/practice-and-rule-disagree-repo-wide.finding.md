---
id: e3764218-16ef-5773-b671-43dc06789f85
slug: practice-and-rule-disagree-repo-wide
page-type-slug: finding
title: "Practice and rule disagree repo wide"
domain-slug: domain/code-comment
---

# Claim

`No Code Comments` bars every comment outside the code comment forms, and 1341 files in the instructions repository carry one. There is no module-header form, so the explanatory header that is this repository's pervasive actual practice is barred by the rule it lives beside.

# Evidence

`bun tools/code-comment/scan.ts` exits 1 and names 1341 files. By directory: tools/tests 603, tools/lib 481, tools/document 48, tools/checks 31, tools/hooks 27, tools/gates 13, tools/aw 10, tools/ops 8, tools/commands 5, plus singles including tools/write.ts and tools/supervisor-decide.ts. The rule's `instructions-path` is `**/*.{ts,sh,service}`, so all of them are governed.

The shape flagged is the module header, not a stray note. `tools/lib/code-errors.ts` opens with 48 lines explaining why the refusal class has to be the code repository's own — that `exitCodeForThrowable` classifies through four `instanceof` arms reading no field, so a hand-rolled error spelling `name` and `code` the same way exits 70. `tools/commands/exercise/schedule-create.ts` explains that `DAYS_OF_WEEK` is Sunday-first because its index is `getUTCDay()`'s numbering. Neither is restatable from the code below it.

The measurement that raised this: the ops port added 678 command files and 183 lib modules tonight. Of the 678 commands, 5 carry a barred comment — the `// command:` discipline held at 99.3%. Of the 183 lib modules, 110 do. Nine seats, working from the same task and the same exemplar, independently wrote headers rather than domain lines.

So the rule and the practice disagree repo-wide, and the disagreement predates this port by every one of the 1226 files it did not create. `code-comment-forms` lists ten forms, all programmatic — shebang, expect-error, three linter suppressions, two JSDoc checker directives, deprecation, source map, and `// command:`. Every one is read by a tool. There is no form for prose a reader needs and no tool consumes.

`Form Approval` requires Alan's ruling before a form is added, so nobody can close this by writing one. The rule's own remedy — "everything else goes to a domain" — is a domain change, which is his too.
