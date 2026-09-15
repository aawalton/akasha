
# The Berry trap

> The paradox: a finite legible set has a largest member, so 'the largest legible number plus one' must be legible because I just gave it a name — therefore the set has no largest member. The wrong conclusion I drew (that there is a third category of number, neither legible nor illegible), the approximability line I tried and watched fail, and the resolution: the phrase is not a rule of interpretation at all. I had written the condition that kills it two moves before I needed it, and did not turn it on my own description.

The [finiteness result](finiteness.book-chapter.md) has an immediate consequence that looks like it destroys the whole notion.

> Well, this is where the paradox comes in. If the set if legible numbers is finite, then it must have a largest member. However, if it has a largest member, then the number "the largest legible number plus one" must be legible (because I just gave it a name), therefore the set of legible numbers must not have a largest member.
>
> Which implies that legibility cannot be a well defined classifier, which implies that there exist numbers which are neither legible nor illegible, which is what I'm struggling to get my head around.

*From Lali, marked:* this nine-word trap is Berry's paradox, from 1906, and the version phrased in terms of definable reals is Richard's, from 1905. I walked into both without knowing the names.

## The wrong conclusion

The last step of that quote is false, and it is worth keeping because of how natural it felt.

*From Lali, marked:* the correction in this section is hers, in substance and in its "hold a number still" form. Alan had concluded a third category existed; he did not rederive his way out of it, he was pushed off it.

Take a particular real number and hold it still. Either there is some configuration of this universe together with some rule of interpretation that singles it out, or there is not. That is a definite fact about that number. Nothing in the paradox opens a third option for it. There is no number sitting in a gap between the two sets, and it was not the law of excluded middle that broke.

So the contradiction was real, but it was in the wrong place. Something in the derivation was broken instead.

## The clue was in my own words

The phrase that set the paradox running carries the flaw on its face: *because I just gave it a name.*

I had already refused exactly that move. In my second message I would not let "fluff" stand for some transcendental with no way to say which one — [naming is not representing](../001-legible-numbers.book-chapter.md#what-counts-as-a-representation), and I wrote that condition down two moves before I needed it. Then I did not turn it on my own description.

## The line I tried, and watched fail

Before I saw that, I went hunting for a criterion that would let "the largest legible number" in and keep "the largest legible number plus one" out.

> This argument intuitively suggests that the largest legible number has in effect exhausted the representability of numbers in the universe. However, in the broad sense of legibility I started with, an exact representation is not required. For example, "the number that when multiplied by itself equals 2" would be a perfectly legible name for the square root of two, easy intelligible and unique, despite not directly representing an infinite series of non-repeating decimal digits.
>
> For "the largest legible number plus one" to fail to meet the same standard of legibility requires a line between the two.
>
> One possible line is that the square root of two provides at least implicitly the ability to approximate the specific value of the number described to an arbitrary level of precision, that could be one distinction, whereas "the largest legible number" is provably existent and unique, while not being approximatable in any way. However, it feels like "the largest legible number plus one" is at the same level of inability to approximate and yet is still provably existent and unique, which means I can't deny its legibility on the grounds of inability to approximate without denying "the largest legible number" on the same grounds.

The candidate line was **approximability to arbitrary precision**. I proposed it, tested it against my own two phrases, and found it did not separate them.

*From Lali, marked:* approximable-to-arbitrary-precision is a genuine boundary that does not coincide with unique specifiability — there are numbers a finite description pins down exactly which no procedure can approximate to arbitrary precision. So the instinct that the two properties come apart was correct even though the line failed at the job I was putting it to.

## They stand or fall together

What that failed attempt actually established is stronger than the attempt itself. **"The largest legible number" and "the largest legible number plus one" stand on identical footing.** Whatever status the first has, the second has. There is no criterion separating them.

Which leaves exactly two ways it can go: **both descriptions work, or neither does.**

I had assumed the first from my very first move, and had never turned around and looked at it. It seemed obvious — the phrase is short, it is in plain English, it provably picks out exactly one number, so of course it names something. That assumption sat underneath every step, which is why I kept hunting for a line between two phrases instead of asking whether either of them was a representation at all.

> I'm not sure, that's the blind spot I'm not seeing. I suspect there is a Godel number corollary hidden here somewhere, but I haven't found it.

*From Lali, marked:* the fork — both work or neither works — was named by her. I did not derive it, and the branch she walked is the next section, marked as hers.

## The resolution

*From Lali, marked:* this section is hers. She walked the branch after Alan said he could not see it, and it is set out here because the record does not make sense without it.

Walk down the branch where neither works and everything settles quietly.

The set of legible numbers is finite, so it has a largest member. That is just what finite sets do. That member is a perfectly ordinary legible number, legible by way of some representation that has nothing to do with the English phrase. The number one greater than it is not in the set, so it is illegible, exactly as [the counting argument](finiteness.book-chapter.md) said. And the phrase "the largest legible number plus one" is **not a rule of interpretation at all** — it is "fluff" wearing a lab coat.

Nothing contradicts anything. The finite set stays finite, the maximum stays put, and the paradox has nothing left to run on.

## What I asked next

I did not take the resolution on trust. What I wanted was the difference itself:

> how you asked the question implies that "the largest legible number" itself is not a valid representation, but can ONLY be a member of the set of legible numbers through an independent representation. What makes the independent representation and this one fundamentally different?

That question is answered in [no-self-decoder.md](no-self-decoder.book-chapter.md), and answering it is what turns the paradox into a theorem.

## Cross-references

- [../001-legible-numbers.md](../001-legible-numbers.book-chapter.md) — the correspondence condition that kills the phrase, written before it was needed.
- [finiteness.md](finiteness.book-chapter.md) — the largest member the paradox runs on, and why the resolution leaves it standing.
- [no-self-decoder.md](no-self-decoder.book-chapter.md) — the answer to the question this page ends on, and the theorem the paradox becomes.
- [provable-legibility.md](provable-legibility.book-chapter.md) — the same construction run over provability rather than truth, which is where it stops making a mess and starts biting.

## Threads to pull on later

- **The class of exactly-specifiable but non-approximable numbers.** Named in passing as the reason the approximability line is real. Nothing in the session exhibits one, and the failed line might still be worth something somewhere else.
- **Why the assumption was invisible.** The thing that cost the most here was not a bad step but an unexamined one, held from the first move. Whether there is a way to catch that class of error other than being asked "which of the two have you assumed" is worth its own note.
