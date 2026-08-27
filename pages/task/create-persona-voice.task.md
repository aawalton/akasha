---
id: 91032082-494f-5835-a84b-4b76eb56d27a
page-type-slug: task
title: "Create persona voice"
slug: create-persona-voice
domain-parent-slug: role/persona-craft
required-reading-slugs:
  - page-type/task
---

# Definition

- **Create persona voice** — rewriting one persona's file into a voice only she has.

# Sequence

1. **What she already is.**
   - **Read** her file whole, and neither her `championed-domain` document nor her `role` document. Both carry what she is answerable for, which her history is not, so reading them costs two documents and puts role prose in front of you moments before you write a voice.
   - **Take** that reading through `ops read --file-path pages/persona/<name>.persona.md`, which hands you every document required for her file along with it. Without those the draft is refused at the write, by a document named nowhere here.
   - **There is no second source of what is true of her, and there was one until 2026-08-11.** Persona specs stood under `packages/alanwalton/personas/core/src/persona-specs/` and are deleted: nothing read them and nine of forty had gone stale against the picture. What they uniquely held is in git history and in her page row's `portrait`, which no command prints by name. A fact you cannot find in her file, her anchor image or Alan is one to ask him about rather than one to cut.

2. **Her history, which answers the same question for all forty.**
   - **Write** her history as [History](../role/persona-craft.role.md#history) binds it: the reason she champions her domain. Every persona answers that same question, so whatever differs between two files is voice and nothing else — which is what makes them comparable at all, and what no amount of varied subject matter could establish.
   - **The sentence length you are writing to sets how many sentences you get, and everything you meant to keep may not fit inside them.** A thousand characters at mean 47 buys four sentences; at mean 12 it buys fifteen. Hold the figure, cut the weakest of what you meant to keep, and name in the hand-back what you dropped.
   - **Hold** it to the length your dispatch names. A figure repeated here would be a second number beside that one, and two numbers are read as a range and written to the top of it.

3. **How she sounds.**
   - **Give** her a sentence length she keeps to, and not the one the whole cast writes at. Your dispatch names the range the forty files run across and where each of them sits in it, measured from those files themselves, which is what makes *not the house length* checkable rather than felt; a persona who runs short and flat, or runs on without stopping, or alternates the two, is audible before her content arrives.
   - **Set** her self-repair: whether she restarts, trails off, corrects herself mid-clause, or lands every sentence whole and first time.
   - **Settle** her vocabulary: Latinate or Anglo-Saxon, plain or ornate, whether she swears and how coarsely, and whether the words of her occupation reach her ordinary speech.
   - **Set** her concreteness: named objects, counts and exact numbers at one end, abstraction at the other.
   - **Set** how her sentences open, which the counter cannot see. Five of eight sentences in one appearance began `The X is` while its sentence lengths measured perfect, and twenty-five of the forty appearances use that opening, so it is how the whole cast writes appearances rather than anyone's voice. Read the openings as a column: each sentence is fine alone and the monotony exists only across the section, which is why both ear tests certify it.
   - **Set** her volume, which is a different question from her force: one persona is quiet and softens nothing at all, another shouts and softens nothing either. Both are audible, so each is set on its own, and reading the two as one produced a false pairing that was acted on.
   - **Set** her force: whether she states a thing at its true size or shrinks it to spare him. That is what separates a woman who reads cold from one who reads soft; fondness is not. Teasing needs no setting of its own, because it is warmth delivered as force.
   - **Distinguish** her by nothing in the punctuation, which no ear test can hear. Whatever her history and her appearance give her on it is hers to have and not hers to claim.

4. **Her appearance, which is a task of its own.**
   - **Write** her appearance by [describe-persona-appearance](describe-persona-appearance.task.md) and restate none of it here. It lands in a file of its own. Reading the picture takes instruments this task does not carry, and stage 5 counts her appearance beside her history, so it has to be written before those tests run.

5. **The three tests, and only two of them are by ear.**
   - **Read** the draft as sound, sentence by sentence, and trust it on what it can settle and no further. Voice is the whole subject here and cannot be judged silently: two personas differing only in what they talk about are identical in the ear, which is the failure this task exists to catch. A reading that goes well is where a seat stops looking, so it certifies what the ear cannot hear rather than missing it.
   - **Count** her sentence lengths in each section on its own, settling evenness — standard deviation over mean — as well as mean, against the figures your dispatch names. The ear hears a sentence's shape and not its size, so two of near-equal length sound wholly different where their grammar differs, and a section that never varies reads as varied aloud. Both an appearance and a history have shipped flatter than any other persona file, each having passed the ear honestly.
   - **Mean and evenness are settled jointly, and one lever moves them independently: rewriting a sentence away from the mean.** Adding or removing short sentences moves the two in opposite directions and cannot hit a target set for both at once. Rewriting toward the mean costs evenness at the same mean — one seat lost 0.045 replacing a 12-word sentence with a 21-word one against a mean of 30. Another took 0.660 to 0.711 by shortening one near-mean sentence and lengthening two already-long ones.
   - **Read** it again beside the files your dispatch names. They are her voice neighbours and not her subject-matter ones, and two women whose subject matter is close can be nothing alike in the ear.

6. **The hand-back.**
   - **Report** what she now sounds like that nobody else does, naming who used to share it. A report that she reads as more distinctive is the author grading his own work.
   - **Say** where her subject matter genuinely overlaps another persona's: that is a finding about the pair, and neither file closes it alone.

# Invariants

- **The three tests do not reach what the shared question causes.** They set a draft beside files near it in how they sound, and the shapes that keep recurring — the numbered citation, the dinner course, absolving him of a fault — come from the question every file answers, so they turn up in files that sound nothing alike and no comparison set would catch them. Every instance so far was found by a dispatcher reading across the whole set and none by a seat. Report what you notice, and do not rely on this task to catch them.
- **Compose where no other seat will reach.** The obvious path is hers — `/var/tmp/<name>-draft.md` — which is the one path a seat working the same persona before you already took, so put your own seat name in it.
- **Her frontmatter is not what this task changes.** Nothing refuses it: `domain-edges` is a check rather than a gate, so an edit to `championed-domain` lands clean and surfaces only later, against `persona-champion:` on the domain document. `championed-domain` and `role` are also her seat defaults, so an edit to either moves the name of every seat she sits in, and no check reads that at all. Change one deliberately where it is wrong; what is refused here is changing it in passing while writing a voice.
