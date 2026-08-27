# Where an agent can settle a category, and where it cannot

What this measures, and what it deliberately refuses to report.

## The question

Written rules cover the volume. What no rule reaches goes to an agent or to Jenny,
and her attention is the scarce resource the whole initiative spends. So the
question is not whether an agent can categorize. It is where it can be trusted to,
and whether it knows when it cannot.

An agent trusted where it should not be spends Jenny's attention on corrections
instead of on questions, which is worse than never having asked her.

## Why there is no headline accuracy figure

Alan already ruled on this shape for rules: being right about a merchant most of
the time still cannot set a category, because the rest needs a person and nothing
says which ones. The same holds for an agent.

One rate over everything is equally consistent with an agent that is flawless on
half the history and hopeless on the other, and with one that is mediocre
everywhere. The first is worth deploying behind a gate; the second is worth
nothing. `score.ts` prints a reconstructed overall figure last, labelled as
reconstructed, and says to refuse it.

The deliverable is the partition, and the pair that matters inside each part is
**coverage and reliability together** — if only `high` were applied without
asking, how much of Jenny's queue disappears, and how many wrong categories land
where nobody looks again.

## The population

Measured against the running system rather than taken from any record:

- 10382 transactions stand.
- 2283 are reached by a standing rule, so they are not the subject.
- **1690 of the remaining 8099 carry `Uncategorized`** — no category anyone chose,
  so no answer to be scored against.
- **6409 are scorable.** That is the denominator, and it is not the 8099 the
  intent named.

Those 1690 are the rows this pipeline most exists to serve, and they are exactly
the rows it cannot be measured on. That is a finding rather than an omission.

## The split, fixed before anything was scored

`sha256(monarchId)`, last hex character: `0`-`7` is DEV, `8`-`f` is HOLDOUT.

A held-out set drawn by a shuffle has to be stored, and a stored one can be
redrawn after a disappointing result with nothing showing it was redrawn. A hash
has no state to redraw.

The prompt is built and revised against DEV alone. HOLDOUT is read once, and
`run.ts` refuses a second HOLDOUT run rather than trusting anyone to remember.
Any figure taken after a first one was seen is reported as a rerun in its own
output, so it cannot be quoted as if it were clean.

## The strata

Declared from the category names and from Alan's recorded rulings, never from how
the agent scores. A stratum drawn after seeing results is a description of the
results.

| Stratum | What settles the category | Population |
| --- | --- | --- |
| `PAYEE` | who was paid, which the merchant carries | ~567 |
| `FLOW` | the account and the direction of the money | ~1639 |
| `ENVELOPE-PERSON` | whose budget Jenny meant, which the transaction does not carry | ~1203 |
| `ENVELOPE-OCCASION` | what the money was for, beyond who was paid | ~2988 |

`Tithing` and `Joseph's Tithing` share a payee and differ only in the envelope.
That is the shape the axis exists to separate.

**`ENVELOPE-PERSON` is where the agent should fail**, because Alan settled that a
category is partly a choice about which budget the money lands in rather than
only a fact about what was bought. A good score there is more likely an artefact
of the sample than a capability, and finding the agent cannot do it is a result.

## What the agent is shown

Date, amount, merchant title, raw statement, account title, and whether the row
is recurring or a split. Both texts, because #18116 established each destroys
signal the other keeps.

**Notes are withheld deliberately.** 4049 rows carry one and they read as a
person's own account of the purchase — `Girls trip! Dinner, go karts, hotel,
crater`. A note is written at or after the moment of categorizing, so it belongs
to the answer rather than the question, and a transaction arriving tomorrow has
none. Scoring with notes in view would measure a capability the live pipeline
could never use. Sizing what a solicited note would be worth is a separate arm.

`needsReview` is withheld for the same reason: Monarch's bookkeeping about this
history, not evidence about a purchase.

**`Uncategorized` is not offered.** It stands in Monarch's list, so an agent given
that list reaches for it the moment it is unsure — on the first DEV batch of 8 it
took it four times. That splits declining across two mechanisms, the confidence
level and a category choice, and neither figure then means what it says.
Confidence is the single channel for doubt: `low` is how the agent declines. The
correction was made on DEV before anything was held out, and is recorded here
because a prompt decision taken after seeing scores is the failure this project
is most exposed to.

## What DEV settled, and what it deliberately left alone

The prompt was frozen after one DEV run of 160 rows, $1.34. Two things came out of
it, and only one was changed.

**Changed:** `Uncategorized` was removed from what the agent may answer, as above.
That is a fault in the instrument — a second channel for doubt making both figures
meaningless — rather than a result about the agent.

**Left alone, and this is the finding:** the agent collapses on `FLOW` almost
entirely on one shape. Venmo payments and named-person payments through the
`Personal Profile` account are `Transfer` by this household's convention, and the
agent called them `Shopping`. It was not being stupid. The gloss it was given says
`Transfer` is money moving between accounts the household already holds, and by
that reading a Venmo to a neighbour for bread is not a transfer. The household
means something else by the word.

That convention exists nowhere except in Jenny's head and in the history. Writing
it into the prompt would be copying the answer key out of the history, and the
score afterwards would describe this history rather than the next transaction. So
the prompt stands, and the result is reported as what it is: **`FLOW`'s ceiling is
set by conventions no prompt can carry honestly, and a one-line rule settles them
exactly.** #18116 already measured that shape — Venmo, 556 rows, unanimously
`Transfer`.

Naming this here rather than fixing it is the whole discipline. The fix was
available, it would have raised the number, and taking it would have made the
number mean less.

## Spend

`claude -p --model sonnet`, ten transactions a call, `total_cost_usd` read back
off each call rather than derived from a rate card this repo would have to keep
current.

A bare call costs about $0.028 before it has read a word of ours, that being the
cached harness prefix. Disabling tools to shrink the prompt **raises** the price
about fivefold, because it breaks the shared cache prefix — measured, not assumed.

## Nothing is applied

Every read goes down `files.ts`, which opens the month sidecars and the domain
folders and writes nothing. `categorize.ts` and `apply.ts` are not imported,
`setCategory` is not called, no page is written, and Monarch is not contacted at
all.

Shown rather than asserted: `snapshot.ts` takes a page count and a content digest
for every `monarch-` page type before the run and again after, both land in the
result file, and the report prints them side by side. A claim that nothing moved
and a run that never checked read identically, which is exactly the condition
under which nobody checks.

## Two limits on what any figure here can claim

Nothing on a transaction records **who** set its category, so a row Monarch's own
categorizer set reads identically to one Jenny chose. The figures are against the
standing history, and that is what they can say.

1003 rows are splits, where the category belongs to a part of the transaction
rather than to the whole, so what the agent sees underdescribes what was
categorized. They stay in, and the report breaks them out.

## Running it

```
bun ~/repos/instructions/monarch/eval/run.ts --pool DEV --per-stratum 40
bun ~/repos/instructions/monarch/eval/score.ts --file ~/monarch-eval-18119/dev-40.json
```

`run.ts` spends money and writes a result file. `score.ts` only reads one, so a
report can be redrawn any number of ways without paying again.
