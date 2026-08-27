---
id: e30e42fd-b075-5962-ab49-6e07b4573628
slug: reconciler-withholds-on-an-unreadable-corpus-and-carries-on-past-an-unused-fault
page-type-slug: finding
title: "A reconciler withholds on a corpus it cannot read and carries on past a fault it does not use"
domain-slug: domain/alan-harness
---

# Claim

Drafted for Alan's review as a Design line, not landed: **a reconciler withholds on a corpus it cannot read, and carries on past a fault in a property it does not use.**

The nova words-read cluster now depends on that distinction and nothing states it. The two halves pull opposite ways, so a reader holding only one half will make the wrong trade in the other direction and it will look like consistency.

# Evidence

Measured on 2026-08-20 against the live page query service on port 8787.

The first half landed at `32ecc11489`. `wordsReadFrom` in `packages/alanwalton/nova-words-read/src/aggregate.ts` now refuses when a sum returns null over a non-empty corpus, because a key the reader cannot see and a corpus nobody has read answer identically:

    ownProgress      n=17709  value=20316978  used
    own-progress     n=17709  value=null      refused
    totallyBogusKey  n=17709  value=null      refused

`absent` is null in all three, so it does not separate them. Before that change the null was written onto Alan's daily record as nought words read: `words-read-snapshot` stood at 0 on three of his days while the corpus held 35,501,681 words.

The second half is the opposite trade and was deliberately not made. `readWordsReadScore` ignores the `faults` array the same query returns, where its sibling `readDailyDays` throws on any fault. Three faults stand right now, all one shape — `collection-total-length`, `collection-total-progress` and `collection-total-remaining` each state an `expression` the evaluator refuses because the right side of `/` is zero.

Those are computed properties on the same page type. The reconciler reads none of them; it reads `ownProgress` and nothing else. Making faults fatal there would stop it on a defect it neither owns nor uses, trading a silent wrong answer for a loud stopped one.

The distinction is what the written value depends on, not how loud the failure is. A fault in the number a reconciler writes must stop it; a fault in a neighbouring property must not. Both read as rigour from inside the code, and this file does one of each with nothing recording why.

Filed rather than commented because `domains/lists/code-comment-forms.md` permits eight parsed forms and no prose; a ninth is Alan's ruling under `Form Approval`.
