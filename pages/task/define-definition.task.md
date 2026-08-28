---
id: 21a2e43a-12f7-5ed5-8281-679ea94c395f
page-type-slug: task
title: "Define definition"
slug: define-definition
domain-parent-slug: page-body-section/domain-definition
required-reading-slugs:
  - page-type/task
---

# Definition

- **Define definition** — writing one domain's definition, or finding it needs no change.

# Sequence

1. **The subject, and what a reader gets from the line alone.**
   - **Read** the whole document with `ops read --file-path <p> --full`. Without `--full` the command prints only what changed since you last read the file, so a reading whose body your context has since lost answers `nothing follows` and leaves you without it.
   - **List** the domain's children with `ops domain dag --domain <slug>`, which starts the print at the domain itself rather than printing its children alone: a leaf prints one line, its own slug, and a parent prints generations deep with repeats. Most domains are leaves, and that is a fact about the domain rather than evidence the line was written blind.
   - **Read** every document and page type `ops domain required-reading --file-path <p>` names, all of each, except those it marks as required only where a section you are not touching changes. Two instruments count the documents differently and neither is wrong: this one prints every one with the conditional ones marked, and `[read-what-is-required]` counts only those in force for the section the change touches.
   - **Ground** the line in what the repos hold: the package page a code file resolves to, and the exact files a document claims with a key like `command-path:` or `producer-path:`. Nothing maps a domain to a set of files by glob, so for most domains this yields nothing and the material has to be chased by name in the code that meters it. A line written from the term alone names the thing in the world rather than the concern here.

2. **The family, printed together.**
   - **Read** the Definition of every child `ops domain dag --domain <parent-slug>` names, and the parent's own line beside them. Nothing prints a family together, so the set you judge is one you assembled: a child you did not open is a line you are judging blind.
   - **Take** the shape from wherever it sits: the parent's line where the family descends from it, or a sibling pair where the family is flat and `domain-parent-slug:` says the same thing for every member.
   - **Judge** whether the set tells its members apart. Two lines differing only in a word a reader cannot weigh are one definition written twice, and what separates them belongs in the lines rather than in prose elsewhere.
   - **Lift** to the parent whatever every sibling would otherwise repeat, short of what each domain is about, which stays on its own line however many siblings share it. What lifts is a repeated fact and never a repeated grammar: role lines all opening "the role answerable for" would be one shape used many times, and the shape is what the print above is for. Where this reaches a name, the Strike test in stage 3 settles it and this bullet gives way.

3. **What the standing line gets wrong, if anything.**
   - **Keep** it unless a reader would take something false or vague from it, per [Cut The Obvious](../domain/context-push.domain.md#cut-the-obvious). Most definitions need nothing, and a merely plainer line does not earn a change.
   - **Repair** a false claim before a dense one: a word meaning something narrower or wider than the line says is a defect no rewording reaches.
   - **Search** every domain's line for the material yours names, rather than only the family's. A line reaching what another domain already owns is false wherever that domain sits, and the collision is usually outside the family, a shared layer one branch away being the likeliest owner: two lines saying which items are in the collection and how far each is read were both stating what `pages/domain/collections.domain.md` binds, from under `learn` and under `fun`.
   - **Cut** a named person from the line wherever they use the thing rather than are it. That they are its only user today, own the hardware it runs on, or gave the product its name are facts about the deployment rather than about the concern, so single-tenant machinery and a possessive standing in a sibling's line are evidence about this system and none about this concern.
   - **Strike** the name to test that, and read what is left. The same concern, now not tied to one person, means the name was a fact about the deployment and comes off. A wider concern, or none at all, means it was a term of this one and stays — `alan-harness` has no life left to keep without him, a role or a task loses whoever the work is done with, and a practice indexed to one body becomes a topic in the world.
   - **Add** a name where none stands and read it the same way: where the concern narrows, the name was owed, a practice of Alan's read as the discipline in the world being the common miss.
   - **Repair** a line narrower than the domain it names, which is the defect no reading of the sentence can show you. What the domain holds is in the code that meters it, and the line is what a reader takes for the whole of it.
   - **Cut** any word that reads like a term of art no domain declares, and any term it uses in several senses. This reaches pretend vocabulary and never plain English, which is what a definition is made of — `ops domain dag` lists the slugs, and a term's own spelling can differ from its slug. Where the bolded term is itself the defect, the remedy is the move at stage 7 and no rewording of the sentence reaches it.
   - **Read** [domain-definition](../page-body-section/domain-definition.page-body-section.md) and apply what it binds, rather than taking this line's word for what that is: its Design is six sentences in four paragraphs, and a summary of them here is what a seat would act on instead of the ruling. It claims the `Definition` heading, so it is required for whatever markdown you are editing — and `required-reading` marks it conditional on that section, so nothing forces the reading on a keep and it is yours to make anyway.

4. **The draft, measured before it is shown.**
   - **Measure** the sentence after the dash against `SM` and the bolded term against `XS`, both levied by the `domain` body shape and inherited by every page type extending it. Each slot answers for itself, so a long term takes nothing from the sentence, and the list marker, the bold marks, the backticks and the ` — ` separator all fall outside both measures.
   - **Count** every draft, including the one you are sure is under. Nothing refuses an over-long definition before it lands, so the only count is the one you take, and both caps are inclusive.
   - **Re-print** what the document requires immediately before you land, rather than trusting stage 1's list. The set is composed live, so a page type or document landing mid-run adds to what you owe, and nothing here refuses a write for missing it.
   - **Name** the members where the class's own name would need looking up, and let them carry the sentence.
   - **Name** the material and the craft inseparable from it — a game is played, a serial is read. What `domain-definition` cuts beside that is its own to say.
   - **Write** one predication, a condition hanging off it being no second clause. Recast rather than truncate: dropping the tail leaves whatever it reached outside the line — a parent's children, or half the concern — and the repair is a head wide enough to reach it.
   - **Ask** whether either fact is true without the other, which picks the recast. Where each stands alone, join them with a verb that relates them rather than with a comma. Where the second only restates the first, that side goes — a pronoun pointing back is no restatement, `how it is cooked` being the shape already approved. Where the second reaches material the first does not, both stand: a body and its upkeep, a people and the bonds between them.
   - **Draft** the replacement for every member a changed fact reaches rather than the one you started on, since landing half a family leaves the repo saying it two ways.
   - **Leave** a grammar shared by a whole branch to the principal, naming it rather than drafting it away. A run asked for one line cannot rewrite three generations to make itself consistent, and opening that rewrite is the principal's call.

5. **Everything the line makes untrue, searched before anything moves.**
   - **Stop** here where nothing is being replaced and no alternative is being shown: every bullet below asks what a replacement would break, so with nothing being replaced there is nothing to look for. On a change every one of them applies.
   - **Survey** the alternative instead where your verdict is keep and you have drafted and measured one anyway, since that is what the principal may take.
   - **Search** akasha for the sentence being replaced. Nothing mirrors it: a domain naming the term in `required-reading-slugs:` carries no text of it, so whatever a search turns up is prose that quoted the line rather than a copy something keeps in step.
   - **Search** for its phrases as well as its sentence, because a phrase shared with a warrant or a sibling makes one idea read as two the moment one line moves.
   - **Measure** every place that must follow, since a part already at its cap refuses the longer phrase — and the mismatch is then a decision to state rather than an oversight.

6. **What the principal settles.**
   - **Show** one line at a time, word for word, with the standing line's number in the file and both lengths.
   - **Take** a keep as a reading on the bar rather than on the line, and raise your own threshold for proposing where two land in a row.
   - **Report** a child whose `domain-parent-slug:` your reading exposes as wrong, rather than repairing it. An edge is not a definition, and moving one re-reads every document beneath it.

7. **The landing, once the line is settled.**
   - **Move** the file first with `ops mv` where the term needs scoping rather than rewording: it rewrites the slug, every frontmatter value and every link label naming it, and it leaves the bolded term and the sentence to you.
   - **Land** the definition and whatever the line made untrue, in one commit.
   - **Land** from your own seat or a headless one. A subagent's readings are recorded against itself rather than the seat, so it starts owing the whole required set again.
   - **Delete** a finding whose claim your change has just ended, per [finding](../page-type/finding.page-type.md), and leave every other memory document as it is.

# Invariants

- **Keeping is the commonest outcome.** Rewriting every line you read is the mark of a seat that read stage 3 rather than ran it.

- **A run that cannot write ends at stage 5.** What it delivers is the survey stage 5 gathers and each draft in stage 6's form, though that is a stage it does not reach. A proposal reported as a landing is the one failure nothing downstream can see.
