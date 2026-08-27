---
id: d220c2b2-1322-5e09-986a-7ead6b297a46
slug: catch-column-cannot-retire-a-check
page-type-slug: finding
title: "Catch column cannot retire a check"
domain-slug: domain/global
---

# Claim

A catch column built by grepping commit messages cannot supply a removal candidate. Every one of the eight checks replayed against extracted trees came back different from its sweep figure: four counted at zero had caught between one and six, one counted at 1 had 27, one counted at 3 had 1. The error runs in both directions, so no scaling corrects it. A non-zero count is evidence that something fired; a zero is evidence of nothing.

# Evidence

Measured 2026-08-08 over the 178 registered checks, `~/code` at `4799485a23`. The sweep used `git log --all --grep`, reaching repo creation.

    check                                sweep  replay
    tstl-plugin-emit-fresh                   0       1
    liveness-census                          0       6
    codegen-raw-page-row-schema-fresh        0       2
    cli-help-flag-references                 0       2
    app-capacitor-parity                     1      27
    fizz-subset                              3      12
    liveness-subject                         1       6
    cli-prose-flag-route-coverage            3       1

Four of four replayed from the zero bucket had caught something. The last row runs the other way: three passing mentions counted as catches where replay found one refusal.

A third direction inflates. `check-app-build-audhdalan-web` sits in the caught bucket on `0d0ef5e519`, reverting a break its author planted at `366063d51c` to prove the gate could go red. The refusal was real; the defect existed only inside the proof. So filtering for genuine refusals does not correct the column either — the better an author obeys Negative Control, the more it credits.

Three causes of the undercount.

Eleven catches across six checks were cleared by commits naming nothing a sweep could match. `f1e8f5f594` cleared three gates at once and named none, verified against the full body rather than the subject.

Fifty-two of the 178 are under two weeks old and one landed the same day. A check with no history to grep and one that never caught anything produce identical output.

And the replay's own suspect rule swept one direction. On `check-fizz-subset`, "the source moved and its dependent did not" found 2 catches; the reverse found 10 more.

The consequence inverts the instrument's purpose. It was built to find removal candidates and cannot supply one. Every removal case that survived scrutiny rested on replay or on structure — a population measured at zero, a carrier deleted — never on this column.
