---
id: 8a6d315c-cdae-5539-a01e-168a2b11845b
slug: scope-wording-pinned-by-parser-test
page-type-slug: finding
title: "Scope wording pinned by parser test"
domain-slug: page-type/role
---

# Claim

A test in the instructions repository pins the exact wording of one rule on `domains/role.md`. `tools/document/parse.test.ts` reads that document from disk and asserts that the first paragraph under `## Scope` is the sentence standing there now, so rewording that act, renaming the rule or changing the shape of the section under it turns a green suite red. Nothing on the document says it is pinned, and the reading that would notice is a reading of the test rather than of the instruction.

# Evidence

Read and run on 2026-08-13 by a review-instructions seat on `domains/role.md`.

`tools/document/parse.test.ts` opens a `describe("the section fold")` block over `const relPath = "domains/role.md"`, folds the `# Rules` section, and inside `test("blocks stand under the heading that owns them")` asserts two things about `## Scope`: that its blocks are exactly `["paragraph", "paragraph"]`, and that the words of the first are `"Deliver the whole scope; where part is blocked, deliver the rest and say what you left out."` — the sentence the rule carries. Two neighbouring tests in the same block also count headings and levels against the live file, so they hold against any document of that shape rather than against this one's wording.

`bun test tools/document/parse.test.ts` on the same day: 21 pass, 0 fail. So this is not a break; it is a coupling nobody meets until they edit the sentence, and then it arrives as a red suite under Green Or Gone rather than as a refusal from a gate.

The reviewer left the rule standing and carried this to its principal rather than editing either file.

Not measured: whether any other instruction document has its prose asserted by a test, and whether the test needs a real document at all or would hold against a fixture.
