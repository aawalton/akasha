
# Where stability comes from

> Alan's account of what stability is made of, stated on 2026-08-11 — preventing failures and making failures easy to fix — and the trade-off between the two. Records his judgement that for code running on his workstation, the code-repo mechanics hurt recoverability to buy prevention that is not worth nearly as much there. This is the reasoning the delivery-boundary rule was derived from.

Stability is first in my priority ordering — see [003-priorities.md](003-priorities.book-chapter.md) — so what it is made of decides a lot.

> Its not only that, lets talk about where stability comes from.

> Stability is the combination of two things. 1. is preventing failures and 2. is making failures easy to fix. There is a trade-off between them, and for code running on my workstation, the code-repo mechanics are hurting #2 to help #1, without #1 providing nearly as much value.

So stability has two halves, **prevention** and **recoverability**, and they trade against each other. Machinery that catches failures before they land also slows down the fixing of the ones that get through.

That trade is the whole argument. It is not that the code repo's checks are bad. It is that on my workstation they are buying prevention I do not need much of, and paying for it in recoverability I do.

## Why the first question was the wrong one

Working out where the line falls took three tries at the question. My priorities gave the first attempt:

> If a specific area of functionality does not require the full machinery of the code-repo to ensure stability, then it should not be in the code-repo.

> In particular, functionality that runs locally on my workstation should not go through the machinery of the code-repo, since there is no remote deploy needed.

Then I rejected two framings of the question in a row:

> Okay, this might be the wrong question, its too general to answer in any meaningful way.

> Now, I think the question you mean is "what makes a failure expensive enough to be worth running the code through the code-repo instead of instructions repo?"

> That's also the wrong question, but its closer. I think the right question in this case is "when should code run through the code repo?" This question is concrete enough to have answers.

The answer to that one is in [008-when-code-runs-through-the-code-repo.md](008-when-code-runs-through-the-code-repo.book-chapter.md).

---

*Recorder's reading, marked.* The move worth keeping from this page is the one about questions rather than the one about stability.

He rejected two formulations before accepting the third, and his stated reason each time was the same: the question was not concrete enough to have an answer. "What makes a failure expensive enough to be worth the machinery" is a question about a threshold on a continuum, and any answer to it is a judgement call that has to be made again for every case. "When should code run through the code repo?" asks for a rule, and a rule can be checked. He got a durable boundary out of the third question and would have got an argument out of either of the first two.
