---
id: 81540585-140a-58ab-bd29-689a1cc38565
page-type-slug: task
title: "Define domain structure"
slug: define-domain-structure
domain-parent-slug: domain/domain-property
required-reading-slugs:
  - page-type/task
---

# Definition

- **Define domain structure** — settling how many domains one idea is, and what each sits under.

# Sequence

1. **The subject in the principal's own words.**
   - **Take** their wording down before translating any of it, their own terms included. What they reach for carries the shape: four terms glossed as integrals of one another are a chain. A plain paraphrase made first loses the shape and reads like a service.
   - **Read** the material the words name, through whichever path key the nearest standing domain declares.
   - **Report** a collision between their wording and what the domains hold rather than resolving it. Where a note separates two things their phrase joins, the split is theirs to settle, and a run that picks a side lands a ruling nobody made.
   - **Take** their own exit test where they state one. The commonest asks for simple clear language with no undefined words, and it is a harder bar than any ceiling the shape levies.

2. **How many domains it is.**
   - **Draft** the single line first and count the facts in it that stand without each other. Two that do are two domains, and this is the test [define-definition](define-definition.task.md) runs inside one line, run here to find how many lines there are.
   - **Stop** at one where one is the answer, and say so. Most subjects are one domain.
   - **Count** the pieces the standing domains already split the material into, and expect that count to disagree with yours. One word covered a four-resource model and a four-reading stack at once here, and the two fours were not the same four.
   - **Settle** the count with your principal before creating anything. A family created on your count arrives for approval with its shape already paid for.

3. **The parent, settled before any child is created.**
   - **Create** the parent first and never a child before it. Two families landed under the wrong parent in one run here and both had to be moved, and an edge that moves re-reads every document beneath it — which is why `define-definition` refuses this work rather than doing it.
   - **Write** the parent where none stands rather than hanging children off the nearest ancestor that will take them. Six domains sat under `alan-harness` because the parent they belonged under had not been written, and nothing in the tree reported it.
   - **Ask** `ops domain dag --domain <slug>` what stands under the candidate parent before adding to it.
   - **Name** the one parent a member sits under, and put every other domain it must be read with in `required-reading-slugs:`. The parent is where it stands and what ownership descends; the rest is reading, and nothing on the write asks which is which.
   - **Read** what each child inherits along `domain-parent-slug:` and say where that misses rules it needs. A concept hung under a mental-model parent inherits the rules of that branch and not those of the branch its material sits in, and nothing refuses it.

4. **The names, tested against every context they are used in.**
   - **Ask** them where else they use the word before naming anything. One word can be right in two of their contexts at once — Health the value and Health the bar — and `domain-slug-unique` catches a slug declared twice and never the collision.
   - **Suffix** rather than rename where the collision is real and both names are theirs. The word they say is the word that stays, and what tells them apart goes on the end.
   - **Cut** a count out of every name. A model named for holding four survived until the count changed and then said something false, and nothing renames it at the moment it goes false.
   - **Price** a rename reaching another repo before proposing it, by counting the places the word appears. One here was 114 occurrences across 37 files, which is a decision to put in front of them rather than a detail to carry.

5. **The lines, drafted as a family.**
   - **Run** [define-definition](define-definition.task.md) for each line rather than writing it here. That task carries the ceilings, the family print and the survey of what a line makes untrue, and a line drafted outside it is one nothing measured.
   - **Draft** the whole family in one run where its members are defined against each other. Four readings each built on the one below cannot be written one at a time.
   - **Read** each line with its siblings hidden. One that stops making sense alone has borrowed from a neighbour that a reader meeting it through a search will not have.
   - **Show** them one at a time even so, per ["Alan answers one item in a message."](../domain/alan-harness-agents-interaction.domain.md).

6. **The landing.**
   - **Land** the family in one call. `ops write` takes an array, which is the only way to create files that link to one another, and every member is gated against the repo as the whole call would leave it.
   - **Move** a member with `ops mv` rather than writing it twice.
   - **Name** a new term in the `required-reading-slugs:` of every domain whose readers need it, which is the whole of putting it in reach.

# Invariants

- **One domain is a whole answer.** The tree takes its shape from what the subject is and never from how much the run produced, so a family every time is the failure this task is most likely to land.

- **The shape is settled with them and the words are yours.** They hold the model the subject came out of, so the count, the names and every edge are theirs to rule on.
