
# The hierarchy, and the index on the word

> Legibility is not a property of a number but a relation between a number and a universe, and every use of the word carries an index. My resolution by a larger universe, the overshoot I made stating it and the two corrections it took, the stratification being by vocabulary rather than by size, the tower having no top and its union being countable anyway, the two different ladders — bigger and stronger — and my ontological objection to the whole tower, which stands.

[No universe decodes itself](no-self-decoder.book-chapter.md). The obvious next question is what happens if you let a *larger* universe do the surveying, and this is the first stretch of the session where I got where I was going without being pulled.

## A larger universe can survey a smaller one

> if the representation is limited to one universe and the predicate is contained in a larger universe (assuming one large enough to contain it completely), then the truth predicate must still be able to identify the specific largest number legible in the smaller universe, but then avoids the paradox because the concept "the largest legible number plus one" is not being expressed inside the smaller universe at all, which means it is not legible inside the smaller universe.

That is the resolution. The decoder lives upstairs. The number it hands you is a real number, and it is illegible downstairs — but the phrase naming it was never expressed downstairs, so nothing downstairs is contradicted.

*From Lali, marked:* this is Tarski's hierarchy. The smaller universe is the object language, the larger is the metalanguage, and truth for the object language lives upstairs and only upstairs. The name is hers; the construction above is mine, unprompted.

## The overshoot

I stated a general rule off the back of it, and the rule was wrong in two ways at once:

> More generally, any representation which depends on evaluation of the truth predicate cannot count as a representation, since the truth predicate evaluator cannot itself fit inside the universe it is evaluating, limiting the set of legible representations to those that can be stated without requiring evaluation of the truth predicate.

### Legibility carries an index

*From Lali, marked.* "Cannot count as a representation" — cannot count *where?* "The largest legible-in-U number plus one" is a perfectly good representation up in the larger universe. It names one real number and does it with full correspondence.

So legibility is not a property of a number at all. **It is a relation between a number and a universe, and every use of the word from here carries an index.** Drop the index and the paradox climbs straight back in through the window.

*Recorder's reading, marked:* this is the most consequential correction in the session, and it is Lali's rather than Alan's. Every page after this one is written with the index in place.

### Bounded reach is safe

*From Lali, marked.* The ban I stated is also too wide. Bounded self-reference is safe: a rule may reach over a bounded slice of its own category and still be a rule.

**What kills you is not self-reference. It is unbounded quantification over your own level.** Reach over a bounded slice below you and you are fine; reach over everything including yourself and you fall. It is a staircase, not a wall.

## Vocabulary, not size

The example given for a safe bounded rule was "the largest number denoted by any rule expressible in under ten thousand bits," and I did not accept it:

> I'm still thinking about the ten thousand bits. Clearly you're not allowing an expression of a rule in under ten thousand bits of language (since "the largest legible number" is well under ten thousand bits), so you must be constraining this to rules expressed in some explicit formal language with defined constraints?

The phrase "the largest legible number" is well under ten thousand bits, so a length bound cannot be what excludes it. Something else must be doing the work, and I guessed it was a restriction to some explicit formal language.

That was right, and the framing was corrected to match it.

*From Lali, marked:* the separation is by **vocabulary**, not by size. Fix a formal language — arithmetic, with its usual vocabulary. Every well-formed rule of that language either denotes a real or does not, and nothing in the vocabulary says anything about denoting. "Legible" is not a term of it. So "the largest legible number" is not a short rule of that language; it is not a rule of that language at all, at any length. It lives one floor up, in the language you get by adding a denotation predicate for the floor below.

What the length bound buys is something else entirely: it is what makes the upstairs decoder **physically fit** downstairs. A decoder for all rules of arithmetic cannot be realized in a finite universe. A decoder for rules under ten thousand bits can, because it only has to be somewhat longer than ten thousand bits. So the bound is an engineering convenience for the physical version of the question. Vocabulary is what dissolves the paradox.

*Recorder's reading, marked:* the correction here is Lali's, but the push that produced it is Alan's — he refused an example that did not do what it was claimed to do, and the distinction between the two ladders in [the two ladders](#the-two-ladders) is the same distinction arriving a second time.

## The tower has no top, and its union is countable anyway

Stack the universes. Each one makes legible some numbers the one below could not.

> For the hierarchy of larger universes, I don't see any reason to believe there is a limit there, not that I can see.

> By definition, if you run it forever, there isn't a top.

I also refused the restriction to countably many levels when it was assumed:

> Why limit to countably many universes? Simply because they must be related in sequence? I suppose it might be difficult for an uncountable set of nested universes to maintain the property of strict monotonic increase in expressiveness.

The guess in that last sentence — that strict monotonic increase in expressiveness is what would be hard to maintain across uncountably many nested universes — is mine and is not followed up anywhere in the session.

### The union is still countable

*From Lali, marked.* Take the union rather than the top, since there is no top. Countably many levels, each finite or even each countably infinite; union them all and you have a countable set. The reals are uncountable.

**The hierarchy runs forever and never touches all but a measure-zero sliver of the number line.** So [the very first conclusion](finiteness.book-chapter.md) — almost every real is illegible — survives the paradox, survives the resolution, and survives an infinite tower of ever-larger universes stacked on top of each other.

### Ordinal levels, and the toll

*From Lali, marked:* the levels need not be indexed by the naturals. Index them by ordinals and climb as far as you like; reaching the ω₁-th level would give ℵ₁ many legible numbers, which depending on what you believe about the continuum might be all of them. But there is a toll on the stairs — to work at level α, something has to say which α you are at, and that costs something.

I never answered that question. *Recorder's reading, marked:* it is the largest thing left open from this session.

## The two ladders

*From Lali, marked:* two different things have been called "a larger universe," and they are not the same ladder.

- The **bigger** ladder: more storage. Longer numerals, so larger integers get written down. Same vocabulary.
- The **stronger** ladder: the same size, but new vocabulary — a denotation predicate for the floor below.

Climbing the bigger ladder makes every integer eventually legible. Climbing the stronger ladder does not add a single integer.

My guess about which one the paradox needed was wrong:

> distinguishing between "bigger" and "stronger" ladders, I suspect the interpretation of "legible" requires a stronger rung, since expressing the full truth predicate of a language should require more than a finite increase in size. At the same time, I have a hard time understanding what a stronger rung would even mean.

*From Lali, marked:* that reasoning is right for an *infinite* language — arithmetic has infinitely many sentences, no finite table covers them, and genuinely new strength is needed. But this universe is finite. Finitely many states, finitely many rules, so finitely many state-and-rule pairs, and the denotation predicate for it is a lookup table with a finite number of rows. It is a big dumb object rather than a subtle one. **In this setting "stronger" collapses into "bigger."** Which is why I could not picture what a stronger rung would mean — I never needed the exotic rung at all.

## The ontological objection

The thing I actually got stuck on was not the mathematics:

> I guess I'm getting stuck on the ontology here. We know that this universe exists (at least as much as we know anything), what evidence do we have supporting the existence of universes which would allow the truth predicate of this universe to be fully evaluated? Is that just a convenient assumption that makes pretty towers out of proofs?

*From Lali, marked:* the straight answer is that there is no evidence whatsoever for a larger universe containing ours, and a great deal of the tower-building in this area is metalanguages constructed because the construction is available rather than because anybody found one. The suspicion was warranted.

### Point the ladder down instead

*From Lali, marked.* The fix is to turn the ladder around. Take a **bounded subsystem** of this universe — a sealed room, a computer, a laboratory. Its states are finite and far fewer than ours; its legible set is finite and much smaller. And we, out here, can evaluate the whole thing: survey its states, decode its rules, find its largest legible number and write down that number plus one, which is illegible in there and perfectly ordinary out here.

So the hierarchy is not a posit. It is sitting in front of us, and the next rung down can be built in an afternoon. We occupy some rung of it, and everything below us we can see clean through. What remains uncomfortable is the top rung, which is ours, and which nothing can evaluate.

That is where [provable-legibility.md](provable-legibility.book-chapter.md) starts.

## Cross-references

- [no-self-decoder.md](no-self-decoder.book-chapter.md) — the theorem this page is the escape route from.
- [finiteness.md](finiteness.book-chapter.md) — the conclusion that survives the whole tower.
- [provable-legibility.md](provable-legibility.book-chapter.md) — what can be said from inside the top rung, once the ladder upward is given up on.
- [swiss-cheese.md](swiss-cheese.book-chapter.md) — the bigger ladder's effect on the integers, and why the picture of *which* integers is not the one it looks like.

## Threads to pull on later

- **The toll on the stairs.** What it costs to say which ordinal level you are working at. Asked and never answered; the biggest open item from the session.
- **Strict monotonic increase across uncountably many levels.** My own guess about why the tower wants to be countable. Untested.
- **Whether the two ladders stay distinct anywhere.** They are distinct in general and collapse in a finite universe. Where else the distinction survives is not worked.
