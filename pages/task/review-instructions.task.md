---
id: 8ff2d6be-f3e2-55ca-9ab4-878573082485
page-type-slug: task
title: "Review instructions"
slug: review-instructions
domain-parent-slug: page-type/task
---

# Definition

- **Review instructions** — reading one document with nobody to ask and landing what it should become.

# Sequence

1. **What is required for the subject.**
   - **Read** the subject through `ops read`, which brings every required document and every page type with it.

2. **Each line, bottom to top.**
   - **List** every line before judging any, numbered from the bottom: the frontmatter as one line, each paragraph, each item of a list, and each heading with the section beneath it. The report is a `review-instructions-report` in the memory repo, at `pages/review-instructions-report/<subject slug>.review-instructions-report.md`. Nothing reports a line you never listed.
   - **Take** the lowest line nobody has judged. Cutting upward leaves every line above it where it was.
   - **Run** whatever the line claims about the machinery rather than reading the code for it — the command's `--help`, the gate, the check. A piece of the machinery you have only read, never run, gives a confident wrong answer that reads exactly like a checked one.
   - **Search** the repository for the claim before judging the prose. What another document already binds is cut here rather than restated.
   - **Cut** unless keeping, repairing, trimming or rewriting clearly passes [Cut The Obvious](../domain/context-push.domain.md#cut-the-obvious).
   - **Repair** a line whose claim is false rather than surplus — the command that lost a flag, the path that moved, the count that has drifted. Trimming and rewriting both take the content as true, so a line that is wrong survives them intact.
   - **Add** what a correction needs where the line is incomplete rather than wrong, and only where an instrument settles what it should say. This is the one act here that grows what every reader pays for at boot, so anything resting on judgment goes back to the principal rather than into the document.
   - **Trim** a line you are keeping clause by clause. One earns its place whole while carrying a qualifier, an aside or a second reason that earns nothing, and a verdict of keep is what ends the reading before those are looked at.
   - **Rewrite** where the line breaches [Simple Language](../domain/context-push.domain.md#simple-language), or where its sentence has two readings. Trimming never reaches this: no single clause is surplus, and the plainer sentence is one nobody has written yet. Ambiguity is the harder of the two, because it is short and reads clean — a pronoun landing on the wrong noun, or a word the repository uses two ways. Where the readings ask for different things, the line goes back to the principal.
   - **Write** that line's verdict into the report before landing it, one append per line, carrying what you ran. Composed at the end instead, one judgment over everything wears the shape of many and cannot be told from a line-by-line reading.
   - **Land** each decision as its own commit, and mend whatever it made untrue in that same commit. One commit per decision is what lets a single call be taken back without unpicking the rest.

3. **The document as a whole.**
   - **Judge** it against everything stage 1 put in your hands, re-read from disk with `--full` rather than from your context.
   - **Name** what no line could reach: a term whose antecedent one of your cuts removed, a section earning nothing though every line in it earns its place.

4. **The hand-back.**
   - **Hand** back to the principal who dispatched you, in reading order, what you changed and what you ran to justify each, what you left standing with the fork stated, and where the report is.
