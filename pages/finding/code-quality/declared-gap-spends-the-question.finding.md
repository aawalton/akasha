---
id: 3828c2ee-e073-5b47-b341-0156f1af4447
slug: declared-gap-spends-the-question
page-type-slug: finding
title: "Declared gap spends the question"
domain-slug: domain/code-quality
---

# Claim

Nothing binds the claim that a surface declaring its own limitation spends the reader's *is this sound?* question, so the undeclared gap beside it goes unlooked-for. A self-declared limitation raises the odds the author thought about the area and lowers the odds the area is covered, and those move in opposite directions. `domains/` holds one line on blind spots and it is about how to file one, not how to read a declared one.

# Evidence

A ruling of 2026-07-28 in `dirty/skills/agent-harness/rulings/instruments.md`, reached by a seat emptying it. Kept verbatim under `dirty/maybe-keep/`; filed here because that copy is queued for sweep.

Its specimen is falsified and the judgment is not, which is why only the judgment is here. The ruling says the per-object gap in `migrations/cli/src/lib/snapshot-drift-decide.ts` "is named nowhere". The file is live and tracked, and its docblock now names it in the second paragraph: "The per-object path has its own gap, and it is the wider one: naming an object explains every content change to that object's file, including the deletion of another project's work inside it... This is priced, not theoretical — three reversions have landed on main through it and were repaired by hand, each found by a person tripping over it rather than by any instrument." A third paragraph names two upstream blindnesses that cost more. The evidence for the defect is now the model for the fix: three gaps declared, ranked, priced.

The judgment stands clear of that. A reader handed an explicit "here is our known limitation" has been given the answer to *is this sound?*, so the question is spent; the declaration does not hide the second gap, it removes the occasion to look for one. The test the ruling gives reads an artifact rather than exercising judgment: when a surface declares its own gap, ask whether the declared gap is the one that would bite you. In the specimen it was not, and the two were one `if` apart.

Nothing carries it. `declared limitation|stated limitation|blind spot|declares its own` over `domains/` returns one line, `ingest-instructions.md`'s "A blind spot is two claims", which binds how to FILE one. The ruling's framing, "Check the Restraint", resolves only into `dirty/`. Here: `declared limitation|self-declared` and `known limitation|absorbs the attention`, plus `findings/code-quality/` listed.

NOT MEASURED: how many docblocks in either repo declare a limitation at all.
