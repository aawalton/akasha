---
id: 6eb852e4-df80-5e47-9894-7eff172087a7
slug: whoami-reads-a-launch-question-in-modes-vocabulary
page-type-slug: finding
title: "Whoami reads a launch question in modes vocabulary"
domain-slug: barred-meaning/agent-launch
---

# Claim

`ops seat whoami` tells its reader to interpret `parentAgentId` beside `mode`, in mode's vocabulary, for a question that is about launch. It reads `interactive` with no parent as a session a person started, and `headless` with no parent as a seat whose launcher went unrecorded. Both readings are now wrong: a mode flips the moment somebody walks away from a seat, and `ops seat start` states in its own help that a parentless spawn is the ordinary shape of a scheduler-launched seat.

# Evidence

THE TEXT, in `ops seat whoami --help`, lines 27-31 of its output:

> `parentAgentId` is answered beside them too and is likewise not an axis: it is WHO LAUNCHED this seat — the spawning agent's id, recorded at mint from --agent-id/AGENT_ID. Read it beside `mode`: `interactive` with no parent is a session a person started and correctly has none, while `headless` with no parent is a seat whose launcher went unrecorded.

WHY THE PAIRING IS WRONG. #18013 separated the two questions and gave the second its own vocabulary: `domains/agent-launch.md` declares `spawned`, `opened` and `nested`, sharing no value with mode. Mode answers whether anything is attending the seat now and flips when a person walks away; launch is written once at mint and never rewritten. The inference this help asks a reader to make — parent absent, therefore something is missing — is a launch inference, and it is made on the field that cannot support it.

WHY THE CONCLUSION IS ALSO WRONG NOW. `ops seat start --help` says of `--agent-id`: "absent from both, the seat is spawned parentless — the shape a scheduler-launched seat has, a systemd timer being no agent." So a spawned seat with no parent is a legitimate shape rather than a lost record, and the two verbs disagree about the same reading.

WHERE IT WAS FOUND. #18034's seat met it while working in these files and carried it to #17960's manager, who declined to fold a help-text repair into a tree already losing landings to churn in the same paths and carried it to the lead instead. Both judgments were right; what neither closed is the text.

WHY IT MATTERS MORE THAN A COMMENT WOULD. This is the help of the verb a seat runs to learn what it is, so its reader is by definition a seat that does not yet know — the one reader who cannot catch the error.
