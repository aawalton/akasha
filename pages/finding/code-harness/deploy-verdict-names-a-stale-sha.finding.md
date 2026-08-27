---
id: 99c0f2cd-a72c-5907-8f64-1f1191ec6036
page-type-slug: finding
title: "Deploy verdict names a stale sha"
domain-slug: domain/global
---

# Claim

`ops project deploy` resumed after a failed step re-verifies the SHA already recorded against the project rather than the one just landed. On #19204 its second claim came back PASS naming `ea1ee5e6c453` — three commits behind the removal that had actually shipped. The verdict is real, the subject is wrong, and nothing in the output says which commit it read. A deploy verdict naming a stale SHA is indistinguishable from one naming the right SHA.

# Evidence

Found by #19204 and verified independently: the removal's own pipeline is 28074, 4 of 4 workflows and 18 of 18 steps at exit 0, so the deploy did land and the work is sound. The defect is in what the verb certified, not in what shipped.

The sequence that produces it: a deploy fails partway (here at `deploy_baseline_sync` on `ECONNREFUSED` to the Postgres endpoint), the operator re-runs as the verb's own text instructs, and the resumed run reads the SHA recorded on the project row rather than re-deriving it from what just landed. Where the project recorded an earlier commit — a two-deploy project like this one, where deploy A landed the widening and deploy B the removal — the two are different commits and the verb reports on the wrong one.

Why it matters more than it looks. The `awaiting_lead_verification` gate is a green full CI verdict at the effective pushed SHA, and this verb is one of the things a lead reads to decide that gate is met. A PASS naming a SHA that is not the one under test is a green that could not have been red, which is the one property a verdict has to have. It also fails silently in the safe direction here — the real pipeline was green too — so nothing about the run looked wrong, and the only reason it was caught is that the delivering seat read the pipeline separately rather than trusting the verb.

The cheap cure is not to fix the resume logic but to make the verb NAME the SHA it verified in its own output, where a reader comparing it against the commit they just pushed can see the disagreement. A verdict that does not say what it is about cannot be checked by anyone.
