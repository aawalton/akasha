---
id: 18573121-ed5e-5adc-af28-2944b510df3a
page-type-slug: task
title: "Define directive"
slug: define-directive
domain-parent-slug: domain/domain-directive
required-reading-slugs:
  - page-type/task
---

# Definition

- **Define directive** — writing one directive's act, warrant and two aids.

# Sequence

1. **The directive as it stands, read with everything above it.**
   - **Read** the whole document it sits on with `ops read --file-path <p> --full`. Without `--full` the command prints only what changed since this seat last read the file, which on a document it has never read leaves out most of it.
   - **Read** every directive that is required for the same reader, which `ops domain required-reading --file-path <p>` names. An aid blocking what a directive above already blocks spends the line and dilutes both.
   - **Keep** the act unless it states something false. What this task writes is the warrant and the two aids, and a run that rewrites the act as well has changed what the directive requires without anyone asking for that.

2. **What obeying looks like, in your own words.**
   - **Write** down the act a reader takes when they get it right, without reusing the directive's own wording. Ten aids drafted straight off its sentence come back as ten paraphrases of it.
   - **Take** the reader to be every agent that boots with this document rather than the one whose case prompted it, per [Dilution](../domain/context-push.domain.md#dilution).
   - **Stop** where you cannot write that act down at all, and report it. A line saying what is true rather than what a reader does is a Definition or a domain invariant standing under Principles or Rules, and no warrant or aid turns a statement into an act.
   - **Say** which section it belongs in and leave it where it stands. Moving a line changes what the document claims about itself, which is a different piece of work from this one and one its readers were never asked about.

3. **Ten aids, each against a different category of failure.**
   - **Draft** ten sentences that could each stand as this directive's aid, and name beside every one the category of failure it blocks. An aid with no category named beside it was tested against nothing.
   - **Give** ten, rather than the three that arrive before the drafting gets hard. In a field of three, whichever was written first wins by default, and denying it that is the whole of the exercise.
   - **Aim** each at something a reader does while believing they obeyed. "Misreads what counts as a limit" is a misunderstanding; "enforces a limit nobody stated" is an act, and only an act can be blocked by a sentence.
   - **Mine** what the directive already says for the categories known. Whatever it warns against is a failure somebody met, and it is the one piece of evidence in front of you that nobody had to imagine.
   - **Split** the mirrors. Doing too much and doing too little are two categories rather than one, and a list holding only one side of a pair is still short.
   - **Test** each new aid against the ones already on your list before you add it. Two aids blocking one category are one aid, and a field that reads as ten is really the eight you have left to draft.

4. **The two, picked by what a misreading costs.**
   - **Rank** by which is most likely to cause problems if misunderstood, which is neither how often it happens nor how bad it is alone. A common misreading costing a retry ranks below a rare one that lands something false in front of Alan.
   - **Drop** any aid that restates something the reader has already met: the warrant, a directive above, or the page's own Definition and Design. Every one of those is read before this line, so an aid behind it blocks nothing while reading exactly like one that does, and stating one claim twice is what [Single Authority](../domain/agent-harness.domain.md#single-authority) forbids.
   - **Leave** a redundant aid out rather than writing it onto another directive. A claim moved to a neighbour changes a directive nobody dispatched, and its readers then meet a line that no run's ten aids were tested against.
   - **Look** at what the pair leaves open where both aids push the same way. Two cautions read as one caution, and a reader obeying both drifts into the failure neither of them names.
   - **Write** out the single sentence that would block both categories, rather than judging whether one could. A pair earns two lines only where the merged sentence you drafted is plainly worse than the two it replaces, and that shows only once it is written down.

5. **The four parts, measured before they are shown.**
   - **Write** the act in bold and the warrant and the two aids as three paragraphs beneath it. The act and the warrant take a hundred characters or fewer, and each aid fifty.
   - **Ask** why the act pays, then why that is true, until the answer holds outside this directive. The first answer is always the act said back to you, and it reads exactly like a reason.
   - **Write** each aid as one sentence. Where a second sentence arrives to justify the first, that sentence is warrant and belongs on the warrant line.
   - **Measure** every part with `ops edit --dry-run`, and count the characters yourself as well. The shape holds every part to a hundred, so an aid half again over its fifty passes the command and lands.

6. **The plainest words that carry them.**
   - **Read** the four parts back cold once they are written, and rewrite anything a reader would go over twice. Density reads as rigour from inside the draft, which is why this cannot be a pass made in the same breath as the writing.
   - **Spend** a word rather than compress, per [Simple Language](../domain/context-push.domain.md#simple-language). A part just under its cap that reads once beats a shorter one that reads twice, and every cap here is a ceiling rather than a target.
   - **Simplify** the sentence and never the claim. A part that got easier to read by saying less has been weakened rather than simplified, and nothing downstream reports which of the two happened.
   - **Cut** a claim that will not fit rather than reporting the part as too long for its cap. The caps are settled and were set knowing real claims would go, so a part running long is one carrying more than its reader can hold, and picking what goes is the work rather than a way out of it.

7. **The landing and the handback.**
   - **Land** the four parts with `ops edit`, straight onto main per [Land On Main](../domain/seat-writing.domain.md#land-on-main).
   - **Report** the ten aids with their categories, and which two you picked. The pick is what your reviewer judges, and two aids arriving without the eight you rejected cannot be told from the first two you thought of.
   - **Show** the whole directive last, copied out of the file as it now reads. A reader judges an act, a warrant and two aids by how they run together, and four parts listed apart take that away.

# Invariants

- **The act survives.** A run handing back a new act has changed what the directive requires, which is a different piece of work and one the directive's readers were never asked about.

- **Nothing landed is the right handback for a line that is not a directive.** Four parts written over a statement of fact make it read as an instruction, and every reader below then obeys something nobody meant as an act.

- **Ten is the evidence and two is the conclusion.** A handback carrying only the conclusion is a claim, and the only move left to a reviewer is to run the exercise again themselves.
