---
id: 8b83fdff-5bcc-506d-94a7-325f0173f4ab
slug: stated-slots-threaded-to-nothing
page-type-slug: finding
title: "The slots a seat states are threaded to nothing"
domain-slug: page-type/seat
---

# Claim

`StatedAgentSlots` still declares `domain`, `task` and `mode`, and every path that fills them now hands them to a patch builder that drops all three. The vocabulary set they were once validated against is threaded through four signatures to a function that no longer takes it. Nothing fails, so nothing reports it; the next reader has to walk the whole chain to find out the values stop.

# Evidence

`buildIdentityPatch` in the code repository writes `role`, `persona`, `principal` and the project sequence and nothing else. The three keys it stopped writing are still computed and passed by `fillFromStatedPersona`, which fills a `domain` from the persona's defaults; by `pickCarriedAgentName` and `carriedForSeat`, which carry and then overwrite all three; and by every caller that builds a `stated` object before minting or re-stating a seat.

The vocabulary is the clearer case. `nameVocabularyOf(root).domains` is read in three commands, passed to `mintNamedAgent` or `setAgentName` or `setAgentSlots`, and each of those now takes it as a parameter it names and ignores. It was only ever the corpus a stated domain was filtered against before landing on the row, and it filtered by dropping rather than by refusing, so no command loses a refusal when it goes.

Unthreading it is one act in akasha, and it changes the arity of a function the instructions repository calls positionally through `codeModule`. That boundary has already cost once in this initiative: dropping an argument on the calling side while the called side still required it left `ops seat stop` throwing on its first line, with nothing between the two sides that could have caught it. The same care is owed here.

Found while cutting `domain`, `task` and `mode` off the agent row.
