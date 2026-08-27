---
id: 0c2fe5ae-676c-5f00-bc14-e84f589c54bd
page-type-slug: review-instructions-report
title: "Code comment"
---

# Lines

1. **No Code Comments warrant — "Opus 5 obeys a comment as readily as a domain … Changing it takes a deploy; a domain line takes none."**
   - Trim the third sentence. Ran the hook both ways: it denied a code-repo payload and returned silently for the same one under `~/repos/instructions`. Yet `ops instructions governs --file-path tools/read.ts` names this domain, and `instructions-path` reaches 2260 files here, where no deployed code stands. So the deploy clause is false across that half of the reach, and the first two sentences carry the warrant whole.

2. **No Code Comments act — "Write a code comment only in one of the code comment forms; everything else goes to a domain."**
   - Keep, untrimmed. Ran the hook against a code-repo payload carrying one prose comment: it denied and named `domains/lists/code-comment-forms.md`, so the act is judgeable exactly as worded. The second clause is the working half — without a destination a reader deletes the content rather than moving it, and the refusal I triggered spends a paragraph saying so.

3. **`## No Code Comments` and the section beneath it**
   - Keep. `grep -rn "No Code Comments" --include=*.md .` returns this document alone, and nothing else in the corpus binds what a comment may hold: `domains/file-length.md` names `tools/code-comment/tree.ts` only to borrow its machine-written test, and `refusals/comment-outside-the-forms.md` is the deny-time text rather than a second authority.

4. **`# Rules` and the section beneath it**
   - Keep whole. One rule in the section, and it binds an agent at the keyboard rather than describing the domain. `ops audit code-comments` reports 18 findings across 12752 files read in the code repo, so the rule still weighs a live population rather than an empty one.

5. **Design — "A fixture a test reads is outside this domain."**
   - Keep. Ran the gate over seven probe payloads: a file under `__fixtures__/` is allowed through, one under `packages/infra/spec/cli/test/fixtures/` is denied, and the audit sets aside 238 files as under test. The line is the wider claim and is the authority for it; `tools/code-comment/tree.ts` honours only the `__fixtures__` spelling. Which side moves is a call for the principal, not a repair here.

6. **Design — "A file whose path says it is generated is outside this domain."**
   - Cut, and line 7 mended in the same commit to carry both tests. The gate allowed `src/generated/zz.ts` and `zz.generated.ts` and denied a plain path, so the path test is real — but the line stated the conclusion line 8 already states, where line 7 states a test. One fact, what makes a file generated, now stands on one line: "A file is generated where it carries a header saying so, or where its path says so."

7. **Design — "A file is generated where it carries a header saying so."**
   - Keep as mended. The gate allowed a `// GENERATED …` header and denied the same file with a lowercase `// generated …` one, so `tools/code-comment/tree.ts` reads the word in capitals only. The line states the domain's test and is the authority for it; whether the classifier should be case-blind is the principal's call.

8. **Design — "A generated file is outside this domain."**
   - Keep. This is the Absence the two carve-outs hang from, and the audit prints its reason back — 414 files set aside as machine-written, "their comments belong to whatever writes them". Without it a reader takes the header and path tests for the whole rule rather than for tests of scope.

9. **`# Design` and the section beneath it**
   - Keep whole. Three entries, each an Absence in the sense `domains/domain-design.md` names — what the domain deliberately leaves out — and `ops audit code-comments` shows every one of them live: 414 machine-written and 238 under test held out of a 13404-file population.

10. **Definition bullet — "Code comment — text inside a source file that the language does not execute."**
   - Keep. One bullet, one concern, no clause on purpose or placement, as `domains/domain-definition.md` asks. Weighed a rewrite for the relative clause, which can attach to "source file" as well as to "text", and left it: the second reading says nothing, so no reader acts on it, and every plainer form I drafted was wrong about the shebang the kernel does act on.

11. **`# Definition` and the section beneath it**
   - Keep. `bun tools/run-gates.ts --file-path domains/code-comment.md` reports 16 parts against the shape `domain` states, which requires this heading.

12. **Frontmatter**
   - Keep. Every key is load-bearing: the audit names `code-path` as what reaches 13404 of 15088 tracked code files, `lists-slugs` draws the forms in on the read, and `ops instructions governs --file-path tools/read.ts` shows `instructions-path` putting this domain over files in this repo.
   - Fork for the principal. The two globs are different lists. `code-path` names 21 extensions, five of which match nothing in the code repo, so it is written by kind rather than by census. `instructions-path` names five, of which `service` and `timer` match nothing here, while 10 tracked `.yaml` files carrying comments go unreached. Whether the two should be one list is his call, and it grows what every reader pays for.
